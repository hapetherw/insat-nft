// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../NFTAuction.sol";

contract BiddingContractMock {
    NFTAuction public auctionContract;

    constructor(NFTAuction _auctionContract) public {
        auctionContract = _auctionContract;
    }

    function bid(string memory _igUrl) external payable {
        auctionContract.placeBid{value: msg.value}(_igUrl);
    }
}
