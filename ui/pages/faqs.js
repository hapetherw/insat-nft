import React, { Component, useEffect, useState } from "react";

import { Container, Accordion, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Layout } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const FAQsContainer = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const accordionSelected = (index) => {
    setSelectedIndex(index);
  }

  return (
    <Layout>
      <div className="faq">
        <h1 className="text-center">
          Frequently Asked <span className="dark-yellow-color">Questions</span>
        </h1>
        <p className="text-center">LAST UPDATED – MARCH 2021</p>
        <Container>
          <h3 className="dark-yellow-color mb-2">General Information</h3>
          <Accordion onSelect={(e)=> accordionSelected(e)}>
            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "0" ? 'is-selected': ''} eventKey="0">
                What is Pernamint?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Pernamint is a marketplace to discover and collect truly
                  unique digital photos by the world's most talented
                  photographers. We empower photographers with the tools to
                  protect and sell their digital photos to their fans and
                  collectors. Photographers use Pernamint to create and sell
                  their work online through the use of blockchain technology.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "1" ? 'is-selected': ''} eventKey="1">
                What does it mean to purchase a photo from an Instagram post?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  What you are purchasing is a “digital copy & certificate” of
                  the photo from the Instagram post. The certificate is called
                  an NFT, and it is signed by its creator’s @handle on
                  Instagram. Like an autograph on a baseball card, the NFT is
                  the creator’s autograph on a digital file, making it unique
                  and valuable.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "2" ? 'is-selected': ''} eventKey="2">
                What is an NFT?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  NFTs are digital certificates of authenticity issued by their
                  creators. As the owner of an NFT, you control where it is
                  seen, whether it can be transferred, when it is resold, and
                  more. NFTs can fluctuate in value just like any other scarce
                  asset or collectible. <br></br>
                  NFTs “verify” content by minting it on
                  the blockchain. The blockchain is a decentralized system of
                  computers that is open for anyone to participate in. When you
                  mint an NFT on the blockchain, essentially everyone in that
                  system sees the same thing.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "3" ? 'is-selected': ''} eventKey="3">
                What is a blockchain and how can it help creators?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  A blockchain is a publicly accessible online ledger (database)
                  that is not owned by any central authority. Once anything is
                  set in this ledger, it cannot be modified or censored by any
                  single authority. Blockchain technology provides the following
                  benefits to creators: 
                  <br></br>
                  Scarcity: When you upload your creation
                  to the blockchain, you can define the number of editions you
                  want to release. The control and distribution of the editions
                  is automated on the blockchain, so you can tightly manage the
                  scarcity of your creations. No more than the defined number of
                  editions will ever be released. <br></br>
                  <br></br>
                  Authenticity: When you upload
                  your creation to the blockchain, it cannot be changed
                  thereafter. Buyers can trust that the artwork they are
                  purchasing is the original and has not been tampered with
                  because the publicly accessible data on the blockchain is
                  always available to verify it. Even if other people copy it
                  (as many tend to do online with digital content), the value of
                  your artwork will not degrade, as long as the specific
                  editions can be verified on the blockchain. <br></br>
                  <br></br>
                  Ownership: Every
                  transfer/purchase of your creations, is recorded on the
                  blockchain. This means that there is a publicly accessible
                  ownership history for your creations. Provenance is automated
                  and accurate. Having a publicly accessible way to verify
                  ownership will create more value for your creations since
                  it'll be easier to identify infringing use of it. It'll also
                  make it easier for you to support any DMCA takedown requests.
                  <br></br>
                  <br></br>
                  Each of these benefits is inherently available to you just by
                  using the blockchain. Even if Pernamint ceases to exist, your
                  digital creations will forever remain on the blockchain, and
                  forever be transferable and purchasable. Having said that,
                  interacting with the blockchain is still quite complex. What
                  we are offering is a service that makes blockchain technology
                  simple, and provides its benefits to all creators.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "4" ? 'is-selected': ''} eventKey="4">
                What if a creator deletes the photo from Instagram that I
                purchased?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  Not to worry, you will still own that NFT and its metadata!!
                  (The metadata includes who posted it, when it was posted, the
                  contents of the photo, and more) You can track the ownership
                  history of an NFT on a blockchain explorer like this one.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "5" ? 'is-selected': ''} eventKey="5">
                How do I buy a photo using Valuables?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  1. Copy the Instagram url.
                  <br></br>
                  2. Go to www.pernamint.com and paste the url.
                  <br></br>
                  3. Place an offer in USD. The minimum offer is $21*
                  <br></br>
                  4. Go back to the Instagram post that you copied and comment
                  with the link to pernamint. *Note: Your offer money will be
                  held “in escrow” until your offer is accepted or rejected. If
                  you are outbid, you will get a refund automatically. If your
                  offer hasn’t been accepted or outbid after 24 hours, you may
                  cancel it and receive an immediate refund, minus transaction
                  fees. Transaction fees are paid to the ethereum network (not
                  us) and are called “gas.”
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "6" ? 'is-selected': ''} eventKey="6">
                How can I sell my photos using Valuables?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  1. Have an Instagram account. 
                  <br></br>
                  2. Login to www.pernamint.com
                  using your Instagram (verifies your post) 
                  <br></br>
                  3. Add metamask to
                  your browser (this is so you can interact with ethereum). 
                  <br></br>
                  4a.
                  Go to PROFILE on the www.pernamint.com navigation panel and
                  accept any of your offers. 
                  <br></br>
                  4b. Let your followers know your
                  content from the post is for sale by sharing it to your
                  stories.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "7" ? 'is-selected': ''} eventKey="7">
                What is metamask?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  Metamask is a digital wallet for ethereum and it adds on to
                  your desktop’s browser as an extension. On mobile it will be
                  its own standalone browser, and on desktop you can add it to
                  Chrome or Firefox. Go to https://metamask.io to install it.
                  Warning! When you connect an ETH address (from metamask) to
                  your Instagram handle using Valuables, it can not be unlinked.
                  You use this address to autograph photos; it’s uniquely tied
                  to your account.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "8" ? 'is-selected': ''} eventKey="8">
                What is ethereum (ETH)?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  Ethereum (ETH) is a cryptocurrency with real world value. You
                  should definitely do your own research on how cryptocurrency
                  works, but for now all you need to know is that you can
                  convert ETH to traditional currencies like $USD using a
                  service like coinbase. In order to interact with ETH, you’ll
                  have to create a metamask wallet first.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "9" ? 'is-selected': ''} eventKey="9">
                I got a notification on Instagram about an offer on my post.
                What do I do next?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="9">
                <Card.Body>
                  Sign in to www.pernamint.com and go to your PROFILE. You will
                  see all your open offers in the OFFERS tab. Click ACCEPT on an
                  offer and wait for the metamask popup asking for your
                  signature. Then, click SIGN. Congratulations! You’ve earned
                  ETH by selling your photo from Instagram. It should appear in
                  your wallet within one hour.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "10" ? 'is-selected': ''} eventKey="10">
                What can I do with the photos that I own?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="10">
                <Card.Body>
                  You can resell them using www.pernamint.com or display them in
                  your digital gallery.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "11" ? 'is-selected': ''} eventKey="11">
                Where does the money go?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="11">
                <Card.Body>
                  95% of it goes to the original creator. 5% of it goes to
                  Pernamint. On re-sales, 87.5% goes to the seller, 10% goes to
                  the original creator, and 2.5% goes to Cent.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "12" ? 'is-selected': ''} eventKey="12">
                How does the creator receive their money?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="12">
                <Card.Body>
                  The money will be automatically credited to their digital
                  wallet when they accept an offer. It can take up to an hour
                  for the transaction to clear on the ethereum network. If it’s
                  been over a day, please reach out to us at
                  support@pernamint.com
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "13" ? 'is-selected': ''} eventKey="13">
                How long does an auction last?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="13">
                <Card.Body>
                  There is no time deadline to an auction on Pernamint. An
                  auction will last until the owner of the photo decides to
                  accept an offer; or they could choose to never accept!
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "1114" ? 'is-selected': ''} eventKey="1114">
                How do I counter someone else’s offer on a post?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1114">
                <Card.Body>
                  Your counter-offer must be an increase of 10% or $1, whichever
                  is more. Though all offers are shown in $USD, the minimum
                  increase is based on the current offer’s value in ETH (which
                  fluctuates).
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "14" ? 'is-selected': ''} eventKey="14">
                What happens if my offer gets outbid?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="14">
                <Card.Body>
                  Your money is automatically credited back to the balance in
                  your digital wallet. The sender of the refund will be via
                  Cent’s smart contract, which means it won't appear in your
                  normal transaction feed. You can view the transaction on
                  https://etherscan.io by inputting your wallet address, and
                  then clicking the INTERNAL TXNS tab. There you will see a
                  refund transaction for the full amount of your offer. For
                  reference, Cent’s wallet address is:
                  “0xE14ab3Ee81aBe340b45Bb26b1B166a7D2dF22585” And your wallet
                  address will be similar, starting with “0x…” .
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "15" ? 'is-selected': ''} eventKey="15">
                How many times can someone mint the same post?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="15">
                <Card.Body>
                  How many times can someone mint the same post?
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "16" ? 'is-selected': ''} eventKey="16">
                What if the creator doesn’t accept my offer to buy their photo?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="16">
                <Card.Body>
                  If your offer hasn’t been accepted after 24 hours, you can
                  cancel it and receive a refund for the amount offered, minus
                  gas fees.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "17" ? 'is-selected': ''} eventKey="17">
                What if the creator changes their mind after accepting my offer?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="17">
                <Card.Body>
                  Transactions on the blockchain are irreversible. You are now
                  indisputably the owner of that photo NFT. Of course, you can
                  always sell it back to the original creator.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "18" ? 'is-selected': ''} eventKey="18">
                What if I change my mind after my offer is accepted?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="18">
                <Card.Body>Same as above. </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "19" ? 'is-selected': ''} eventKey="19">
                Can I change the Instagram account associated with my ethereum
                address?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="19">
                <Card.Body>
                  Once an ethereum address has been linked with an Instagram
                  account, it cannot be linked to another Instagram account.
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "20" ? 'is-selected': ''} eventKey="20">
                Whose posts can I buy?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="20">
                <Card.Body>
                  Currently, you can make offers on any post authored by an
                  account that does not protect its photos (ie. public accounts
                  only).{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "21" ? 'is-selected': ''} eventKey="21">
                Where do the NFT and metadata live?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="21">
                <Card.Body>All NFT metadata lives on the blockchain.</Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} className={selectedIndex == "22" ? 'is-selected': ''} eventKey="22">
                Still confused?
                <FontAwesomeIcon icon={faChevronRight} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="22">
                <Card.Body>Reach out to hello@pernamint.com</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </div>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {};
}

FAQsContainer.propTypes = {};

export function getServerSideProps(context) {
  return {
    props: {
      meta: {
        title: 'Pernamint Frequently Asked Questions"',
        description: "FAQs around NFTs, how to create them, what they are, how to use them, and how we've setup the Pernamint services"
      }
    }
  }
}

export { FAQsContainer };
export default connect(mapStateToProps, {})(FAQsContainer);
