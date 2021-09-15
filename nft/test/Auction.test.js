const {
    expectRevert,
    expectEvent,
    BN,
    ether,
    constants,
    balance,
    send
  } = require('@openzeppelin/test-helpers');
  
  const {expect} = require('chai');
  
  const MarketTradingAccessControls = artifacts.require('MarketTradingAccessControls');
  const MarketTradingNFT = artifacts.require('MarketTradingNFT');
  // const NFTAuction = artifacts.require('NFTAuctionMock');
  const NFTAuction = artifacts.require('NFTAuction');
  // const BiddingContractMock = artifacts.require('BiddingContractMock');
  
  contract('NFTAuction', (accounts) => {
    const [admin, smartContract, platformFeeAddress, minter, owner, seller, bidder, bidder2] = accounts;
  
    const TOKEN_ONE_ID = new BN('1001');
    const TOKEN_TWO_ID = new BN('2');
    const TWENTY_TOKENS = new BN('20000000000000000000');
    
    const randomTokenURI = 'rand';
    const instagrmUrl = "https://www.instagram.com/p/CM1uZPbgOpk/";

    beforeEach(async () => {
      this.accessControls = await MarketTradingAccessControls.new({from: admin});
      await this.accessControls.addMinterRole(minter, {from: admin});
      await this.accessControls.addMinterRole(seller, {from: admin});
      await this.accessControls.addSmartContractRole(smartContract, {from: admin});
  
      this.token = await MarketTradingNFT.new(
        this.accessControls.address,
        {from: admin}
      );
  
      this.auction = await NFTAuction.new(
        this.accessControls.address,
        this.token.address,
        platformFeeAddress,
        {from: admin}
      );
  
      await this.accessControls.addSmartContractRole(this.auction.address, {from: admin});
    });
  
    describe('Contract deployment', () => {
      it('Reverts when access controls is zero', async () => {
        await expectRevert(
          NFTAuction.new(
            constants.ZERO_ADDRESS,
            this.token.address,
            platformFeeAddress,
            {from: admin}
          ),
          "NFTAuction: Invalid Access Controls"
        );
      });
  
      it('Reverts when NFT is zero', async () => {
        await expectRevert(
          NFTAuction.new(
            this.accessControls.address,
            constants.ZERO_ADDRESS,
            platformFeeAddress,
            {from: admin}
          ),
          "NFTAuction: Invalid NFT"
        );
      });
  
      it('Reverts when platform fee recipient is zero', async () => {
        await expectRevert(
          NFTAuction.new(
            this.accessControls.address,
            this.token.address,
            constants.ZERO_ADDRESS,
            {from: admin}
          ),
          "NFTAuction: Invalid Platform Fee Recipient"
        );
      });
    });
  
    describe('Admin functions', () => {
      beforeEach(async () => {
        await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
      });
  
      describe('Auction resulting', () => {
        it('Successfully results the auction', async () => {
  
          const {receipt} = await this.auction.resultAuction(instagrmUrl, seller, {from: admin});
  
          await expectEvent(receipt, 'AuctionResulted', {
            tokenId: TOKEN_ONE_ID,
            seller: seller,
            tokenUri: instagrmUrl,
            edition: "1 of 1",
            winner: bidder,
            winningBid: ether('0.2')
          });
  
          const {_bidder, _bid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(_bid).to.be.bignumber.equal('0');
          expect(_bidder).to.equal(constants.ZERO_ADDRESS);
  
        });
      });
  
      describe('updateMinBidIncrement()', () => {
        it('fails when not admin', async () => {
          await expectRevert(
            this.auction.updateMinBidIncrement('1', {from: bidder}),
            'NFTAuction.updateMinBidIncrement: Sender must be admin'
          );
        });
        it('successfully updates min bid', async () => {
          const original = await this.auction.minBidIncrement();
          expect(original).to.be.bignumber.equal(ether('0.1'));
  
          await this.auction.updateMinBidIncrement(ether('0.2'), {from: admin});
  
          const updated = await this.auction.minBidIncrement();
          expect(updated).to.be.bignumber.equal(ether('0.2'));
        });
      });
  
  
      describe('updateAccessControls()', () => {
        it('fails when not admin', async () => {
          await expectRevert(
            this.auction.updateAccessControls(this.accessControls.address, {from: bidder}),
            'NFTAuction.updateAccessControls: Sender must be admin'
          );
        });
  
        it('reverts when trying to set recipient as ZERO address', async () => {
          await expectRevert(
            this.auction.updateAccessControls(constants.ZERO_ADDRESS, {from: admin}),
            'NFTAuction.updateAccessControls: Zero Address'
          );
        });
  
        it('successfully updates access controls', async () => {
          const accessControlsV2 = await MarketTradingAccessControls.new({from: admin});
  
          const original = await this.auction.accessControls();
          expect(original).to.be.equal(this.accessControls.address);
  
          await this.auction.updateAccessControls(accessControlsV2.address, {from: admin});
  
          const updated = await this.auction.accessControls();
          expect(updated).to.be.equal(accessControlsV2.address);
        });
      });
  
      describe('updatePlatformFee()', () => {
        it('fails when not admin', async () => {
          await expectRevert(
            this.auction.updatePlatformFee('123', {from: bidder}),
            'NFTAuction.updatePlatformFee: Sender must be admin'
          );
        });
        it('successfully updates access controls', async () => {
          const original = await this.auction.platformFee();
          expect(original).to.be.bignumber.equal('20');
  
          await this.auction.updatePlatformFee('999', {from: admin});
  
          const updated = await this.auction.platformFee();
          expect(updated).to.be.bignumber.equal('999');
        });
      });
  
      describe('updatePlatformFeeRecipient()', () => {
        it('reverts when not admin', async () => {
          await expectRevert(
            this.auction.updatePlatformFeeRecipient(owner, {from: bidder}),
            'NFTAuction.updatePlatformFeeRecipient: Sender must be admin'
          );
        });
  
        it('reverts when trying to set recipient as ZERO address', async () => {
          await expectRevert(
            this.auction.updatePlatformFeeRecipient(constants.ZERO_ADDRESS, {from: admin}),
            'NFTAuction.updatePlatformFeeRecipient: Zero address'
          );
        });
  
        it('successfully updates platform fee recipient', async () => {
          const original = await this.auction.platformFeeRecipient();
          expect(original).to.be.equal(platformFeeAddress);
  
          await this.auction.updatePlatformFeeRecipient(bidder2, {from: admin});
  
          const updated = await this.auction.platformFeeRecipient();
          expect(updated).to.be.equal(bidder2);
        });
      });
  
      describe('toggleIsPaused()', () => {
        it('can successfully toggle as admin', async () => {
          expect(await this.auction.isPaused()).to.be.false;
  
          const {receipt} = await this.auction.toggleIsPaused({from: admin});
          await expectEvent(receipt, 'PauseToggled', {
            isPaused: true
          });
  
          expect(await this.auction.isPaused()).to.be.true;
        })
  
        it('reverts when not admin', async () => {
          await expectRevert(
            this.auction.toggleIsPaused({from: bidder}),
            "NFTAuction.toggleIsPaused: Sender must be admin"
          );
        })
      });
    });
  
    
    describe('placeBid()', async () => {
  
      describe('validation', () => {
  
        // it('will revert if sender is smart contract', async () => {
        //   this.biddingContract = await BiddingContractMock.new(this.auction.address);
        //   await expectRevert(
        //     this.biddingContract.bid(instagrmUrl, {from: bidder, value: ether('0.2')}),
        //     "NFTAuction.placeBid: No contracts permitted"
        //   );
        // });
  
        it('will fail when contract is paused', async () => {
          await this.auction.toggleIsPaused({from: admin});
          await expectRevert(
            this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('1.0')}),
            "Function is currently paused"
          );
        });
  
        it('will fail when outbidding someone by less than the increment', async () => {
          await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
  
          await expectRevert(
            this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')}),
            'NFTAuction.placeBid: Failed to outbid highest bidder'
          );
        });
      });
  
      describe('successfully places bid', () => {
  
        it('places bid and you are the top owner', async () => {
          await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
  
          const {_bidder, _bid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(_bid).to.be.bignumber.equal(ether('0.2'));
          expect(_bidder).to.equal(bidder);
        });
  
        it('will refund the top bidder if found', async () => {
          await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
  
          const {_bidder: originalBidder, _bid: originalBid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(originalBid).to.be.bignumber.equal(ether('0.2'));
          expect(originalBidder).to.equal(bidder);
  
          const bidderTracker = await balance.tracker(bidder);
  
          // make a new bid, out bidding the previous bidder
          await this.auction.placeBid(instagrmUrl, {from: bidder2, value: ether('0.4')});
  
          // Funds sent back to original bidder
          const changes = await bidderTracker.delta('wei');
          expect(changes).to.be.bignumber.equal(ether('0.2'));
  
          const {_bidder, _bid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(_bid).to.be.bignumber.equal(ether('0.4'));
          expect(_bidder).to.equal(bidder2);
        });
  
        it('successfully increases bid', async () => {
  
          const bidderTracker = await balance.tracker(bidder);
          const receipt = await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
  
          expect(await bidderTracker.delta()).to.be.bignumber.equal(ether('0.2').add(await getGasCosts(receipt)).mul(new BN('-1')));
  
          const {_bidder, _bid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(_bid).to.be.bignumber.equal(ether('0.2'));
          expect(_bidder).to.equal(bidder);
  
          const receipt2 = await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('1')});
  
          // check that the bidder has only really spent 0.8 ETH plus gas due to 0.2 ETH refund
          expect(await bidderTracker.delta()).to.be.bignumber.equal((ether('1').sub(ether('0.2'))).add(await getGasCosts(receipt2)).mul(new BN('-1')));
  
          const {_bidder: newBidder, _bid: newBid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(newBid).to.be.bignumber.equal(ether('1'));
          expect(newBidder).to.equal(bidder);
        })
  
        it('successfully outbid bidder', async () => {
  
          const bidderTracker = await balance.tracker(bidder);
          const bidder2Tracker = await balance.tracker(bidder2);
  
          // Bidder 1 makes first bid
          const receipt = await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
          expect(await bidderTracker.delta()).to.be.bignumber.equal(ether('0.2').add(await getGasCosts(receipt)).mul(new BN('-1')));
          const {_bidder, _bid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(_bid).to.be.bignumber.equal(ether('0.2'));
          expect(_bidder).to.equal(bidder);
  
          // Bidder 2 outbids bidder 1
          const receipt2 = await this.auction.placeBid(instagrmUrl, {from: bidder2, value: ether('1')});
  
          // check that the bidder has only really spent 0.8 ETH plus gas due to 0.2 ETH refund
          expect(await bidder2Tracker.delta()).to.be.bignumber.equal(ether('1').add(await getGasCosts(receipt2)).mul(new BN('-1')));
          expect(await bidderTracker.delta()).to.be.bignumber.equal(ether('0.2'));
  
          const {_bidder: newBidder, _bid: newBid} = await this.auction.getHighestBidder(instagrmUrl);
          expect(newBid).to.be.bignumber.equal(ether('1'));
          expect(newBidder).to.equal(bidder2);
        })
      });
    });
  
    describe('withdrawBid()', async () => {
  
      beforeEach(async () => {
        await this.auction.placeBid(instagrmUrl, {from: bidder, value: ether('0.2')});
      });
  
      it('fails with withdrawing a bid which does not exist', async () => {
        await expectRevert(
          this.auction.withdrawBid(instagrmUrl, {from: bidder2}),
          'NFTAuction.withdrawBid: You are not the highest bidder'
        );
  
      it('fails when withdrawing after auction end', async () => {
        await expectRevert(
          this.auction.withdrawBid(instagrmUrl, {from: bidder}),
          "NFTAuction.withdrawBid: Can't withdraw before locktime passed"
        );
      });
  
      it('fails when the contract is paused', async () => {
        const {_bidder: originalBidder, _bid: originalBid} = await this.auction.getHighestBidder(instagrmUrl);
        expect(originalBid).to.be.bignumber.equal(ether('0.2'));
        expect(originalBidder).to.equal(bidder);
  
        const bidderTracker = await balance.tracker(bidder);
  
  
        await this.auction.toggleIsPaused({from: admin});
        await expectRevert(
          this.auction.withdrawBid(instagrmUrl, {from: bidder}),
          "Function is currently paused"
        );
      });
  
      it('successfully withdraw the bid', async () => {
        const {_bidder: originalBidder, _bid: originalBid} = await this.auction.getHighestBidder(instagrmUrl);
        expect(originalBid).to.be.bignumber.equal(ether('0.2'));
        expect(originalBidder).to.equal(bidder);
  
        const bidderTracker = await balance.tracker(bidder);
  
        const receipt = await this.auction.withdrawBid(instagrmUrl, {from: bidder});
  
        // Funds sent back to original bidder, minus GAS costs
        const changes = await bidderTracker.delta('wei');
        expect(changes).to.be.bignumber.equal(
          ether('0.2').sub(await getGasCosts(receipt))
        );
  
        const {_bidder, _bid} = await this.auction.getHighestBidder(TOKEN_ONE_ID);
        expect(_bid).to.be.bignumber.equal('0');
        expect(_bidder).to.equal(constants.ZERO_ADDRESS);
      });
    });
    
  
    async function getGasCosts(receipt) {
      const tx = await web3.eth.getTransaction(receipt.tx);
      const gasPrice = new BN(tx.gasPrice);
      return gasPrice.mul(new BN(receipt.receipt.gasUsed));
    }
  });