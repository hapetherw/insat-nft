import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import UserCard from "./UserCard";
import { Progress, PostOnlyItem, Loading, EnlargerDialog } from "components";

import { MetamaskStateProvider, useMetamask } from "use-metamask";
import { NotificationManager } from "react-notifications";
import store from "../contract/web3";
import Storage from "utils/storage";
import Helpers from "../utils/helper";
import { objectToGetParams } from "../utils/api";
import { createOffer, cancelOffer, acceptOffer } from "../actions/web3";
import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const PostOffer = ({
  postDetail,
  auction,
  bidHistory,
  ethPrice,
  createOffer,
  cancelOffer,
  acceptOffer,
  reloadOffer,
  isLoggedIn,
  user,
  extraPosts,
  extraLoading,
}) => {
  const router = useRouter();
  const isPostVideo =  (postDetail && (postDetail.thumbnail || postDetail.source.includes(".mp4")))  ? true : false;
  const [userId, setUserId] = useState(null);
  const [instagramUserId, setInstagramUserId] = useState(null);

  const [lastBid, setLastBid] = useState(null);
  const [highestPrice, setHighestPrice] = useState(0);
  const [suggestedPrice, setSuggestedPrice] = useState(
    Number.parseFloat(highestPrice + 0.01).toFixed(5)
  );
  const [suggestedDollarPrice, setSuggestedDollarPrice] = useState(
    (suggestedPrice * ethPrice).toFixed(2)
  );
  const { connect, metaState, getAccounts } = useMetamask();

  const [lastOfferUserName, setLastOfferUserName] = useState("");
  const [bidEthPrice, setEthPrice] = useState(suggestedPrice);
  const [bidPrice, setPrice] = useState(suggestedDollarPrice);
  const [isLoading, setLoading] = useState(false);
  const [winnerPriceInDollar, setWinnerPriceInDollar] = useState(0);
  const [loadingText, setLoadingText] = useState("");

  const [enlargerZoomed, setEnlargerZoomed] = useState(false);
  const [enlargerRatio, setEnlargerRatio] = useState(1);

  useEffect(() => {
    if (metaState.web3) {
      console.log("here");
      store.setStore({
        web3Context: metaState.web3,
      });
    }
  }, [metaState]);

  useEffect(() => {
    if (bidHistory && bidHistory.length > 0) {
      let filteredBidHistory = bidHistory.filter(
        (elm) => elm.status != "cancel"
      );
      if (filteredBidHistory.length) {
        let bid = filteredBidHistory[0];
        let suggestedPrice = Number.parseFloat(bid.price + 0.01).toFixed(5);
        setLastBid(bid);
        setHighestPrice(bid.price);
        setLastOfferUserName(bid.buyer.username);
        setSuggestedPrice(suggestedPrice);
        setEthPrice(suggestedPrice);
        setSuggestedDollarPrice((suggestedPrice * ethPrice).toFixed(2));
        setPrice((suggestedPrice * ethPrice).toFixed(2));
      }
    }
  }, [bidHistory]);

  useEffect(() => {
    if (auction) {
      setWinnerPriceInDollar((auction.winnerPrice * ethPrice).toFixed(2));
    }
  }, [auction]);

  useEffect(() => {
    if (ethPrice) {
      const bidEthPrice = Number.parseFloat(bidPrice / ethPrice).toFixed(5);
      setEthPrice(bidEthPrice);
    }
  }, [bidPrice]);

  useEffect(() => {
    if (user) {
      setUserId(user.get("id"));
      let instagramDetails = user.get("instagramUser");
      if (instagramDetails) {
        setInstagramUserId(user.get("instagramUser").get("id"));
      }
    }
  }, [user]);

  const connectMetamask = async () => {
    try {
      await connect(Web3);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const makePostOffer = async () => {
    if (isLoggedIn) {
      const metaMaskAccount = await validateMetaMaskAccount();
      if (!metaMaskAccount) return;

      try {
        if (1 * bidPrice < 1 * suggestedDollarPrice) {
          NotificationManager.warning(
            "Offer price should be over $" + suggestedDollarPrice,
            "Warning"
          );
          return;
        }
        setLoading(true);
        setLoadingText("Make Offer now...");
        const response = await createOffer({
          ...postDetail,
          price: bidEthPrice,
          walletAddress: metaMaskAccount,
        });
        if (response && response.success) {
          NotificationManager.success("Offer created successfully", "Success");
          reloadOffer();
        } else {
          if(!(response.error && response.error.code == 4001)) {
            NotificationManager.error(
              "There is an error on creating offer",
              "Error"
            );
          }
        }
        setLoading(false);
      } catch (err) {
        NotificationManager.error(
          "There is an error on creating offer",
          "Error"
        );
        setLoading(false);
      }
    } else {
      let path = router.asPath;
      Storage.setRedirectUrl(path);
      router.push("/login");
    }
  };

  const acceptPostOffer = async () => {
    try {
      const metaMaskAccount = await validateMetaMaskAccount();
      if (!metaMaskAccount) return;
      setLoading(true);
      setLoadingText("Accepting Offer now...");
      const isFirstMint = auction && auction.winnerId ? false : true;
      const response = await acceptOffer({
        url: postDetail.url,
        isFirstMint,
      });
      if (response) {
        NotificationManager.success("Offer accepted successfully", "Success");
        reloadOffer();
      } else {
        NotificationManager.error(
          "There is an error on accepting offer",
          "Error"
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        "There is an error on accepting offer",
        "Error"
      );
      setLoading(false);
    }
  };

  const cancelPostOffer = async () => {
    try {
      let activeOffer = bidHistory.find(
        (elm) => elm.buyer.id == userId && elm.status == "create"
      );
      if (activeOffer) {
        let offerTimestamp = new Date(activeOffer.createdAt).getTime();
        let currentTimestamp = new Date().getTime();
        let diff = Number((currentTimestamp - offerTimestamp) / 1000);
        if (diff < 24 * 3600) {
          NotificationManager.error(
            "You can not cancel offer within 1day!",
            "Error"
          );
          return;
        }
      }
      const metaMaskAccount = await validateMetaMaskAccount();
      if (!metaMaskAccount) return;
      setLoading(true);
      setLoadingText("Cancel Offer now...");
      const response = await cancelOffer({
        url: postDetail.url,
      });
      if (response) {
        NotificationManager.success("Offer cancelled successfully", "Success");
        reloadOffer();
      } else {
        NotificationManager.error(
          "There is an error on cancelling offer",
          "Error"
        );
      }
      setLoading(false);
    } catch (err) {
      NotificationManager.error(
        "There is an error on cancelling offer",
        "Error"
      );
      setLoading(false);
    }
  };

  const validateMetaMaskAccount = async () => {
    if (!metaState.isAvailable) {
      NotificationManager.warning(
        "Please install metamask to continue",
        "Warning"
      );
      return null;
    }
    if (store.getStore("account")) {
      const connection = await connectMetamask();
      if (!connection) {
        NotificationManager.warning(
          "You rejected to connect metamask, please refresh page and try again",
          "Warning"
        );
        return null;
      }
    }

    let accounts = await getAccounts();
    store.setStore({
      account: accounts[0],
    });

    if (metaState.web3) {
      store.setStore({
        web3Context: metaState.web3,
      });
    }

    return accounts[0];
  };

  const bidPriceChanged = (e) => {
    setPrice(e.currentTarget.value);
  };

  const calcEthPrice = (eth) => {
    return (eth * ethPrice).toFixed(2);
  };

  const getPassedTime = (time) => {
    return Helpers.getPassedTime(time);
  };

  const isPostOwner = () => {
    if (auction) {
      if (auction.winnerId) {
        if (auction.winnerId === userId) return true;
      } else {
        if (instagramUserId == postDetail.instagramUser.id) return true;
        return false;
      }
    } else {
      if (!postDetail || !instagramUserId) return false;
      if (instagramUserId == postDetail.instagramUser.id) return true;
    }
    return false;
  };

  const hasActiveOffer = () => {
    if (userId && bidHistory.length > 0) {
      let activeOffer = bidHistory.find(
        (elm) => elm.buyer.id == userId && elm.status == "create"
      );
      if (activeOffer) return true;
    }
    return false;
  };

  const hasPendingOffer = () => {
    if (userId && bidHistory.length > 0) {
      let activeOffer = bidHistory.find((elm) => elm.status == "create");
      if (activeOffer) return true;
    }
    return false;
  };

  const hasLastestActiveOffer = () => {
    if (userId && lastBid && userId == lastBid.buyer.id) return true;
    return false;
  };

  const goToBlockChainDetail = (transactionHash) => {
    window.open(`https://rinkeby.etherscan.io/tx/${transactionHash}`, "_blank");
  };

  const shareWithFacebook = (e) => {
    e.preventDefault();
    let url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php${objectToGetParams({
        u: url,
        quote: postDetail.title,
      })}`,
      "",
      "width=600,height=500"
    );
  };

  const shareWithTwitter = (e) => {
    e.preventDefault();
    let url = window.location.href;
    window.open(
      `https://twitter.com/share${objectToGetParams({
        url,
        text: postDetail.title,
      })}`,
      "",
      "width=600,height=500"
    );
  };

  const openEnlarger = (e) => {
    let target = e.target;
    setEnlargerZoomed(true);
    if (isPostVideo) {
      let height = target.videoHeight;
      let width = target.videoWidth;
      if (width > 0) setEnlargerRatio(Math.round((height / width) * 100) / 100);
    } else {
      let height = target.height;
      let width = target.width;
      if (width > 0) setEnlargerRatio(Math.round((height / width) * 100) / 100);
    }
  };

  const closeEnlargerZoom = (e) => {
    setEnlargerZoomed(false);
  };

  return (
    <>
      {isLoading && <Progress text={loadingText} show={isLoading} />}
      <div className="buypost">
        <Row>
          <Col lg="7" md="12" className="p-relative">
            {isPostVideo ? (
              <video
                className="auction-bg"
                onClick={(e) => openEnlarger(e)}
                autoPlay
                muted
                controls
              >
                <source
                  src={postDetail.source ? postDetail.source : ""}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                className="auction-bg"
                src={postDetail.source ? postDetail.source : ""}
                onClick={(e) => openEnlarger(e)}
              />
            )}
            <div className="share-icons">
              <FontAwesomeIcon
                icon={faFacebook}
                className="mr-3 pointer-cursor"
                onClick={(e) => shareWithFacebook(e)}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTwitter}
                className="mr-3 pointer-cursor"
                onClick={(e) => shareWithTwitter(e)}
              ></FontAwesomeIcon>
            </div>
          </Col>
          <Col lg="5" md="12">
            <div className="mt-5 mt-lg-0">
              <UserCard item={postDetail}></UserCard>
              <p className="mt-4 mb-3 section-title">
                Want to own this content?
              </p>
              {bidHistory.length > 0 && (
                <div className="mt-4">
                  {bidHistory.map(function (history, index) {
                    return (
                      <div
                        className="mb-3 pointer-cursor"
                        key={index}
                        onClick={() =>
                          goToBlockChainDetail(history.transactionHash)
                        }
                      >
                        <span className="bold mr-2">
                          @{history.buyer.username}
                        </span>
                        offered ${calcEthPrice(history.price)} ({history.price}){" "}
                        <span className="grey-transparent-color ml-4">
                          {getPassedTime(history.createdAt)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {bidHistory.length > 0 && (
                <div>
                  <p className="mt-4 mb-2 bold">
                    The highest offer is ${calcEthPrice(highestPrice)} by @
                    {lastOfferUserName}
                  </p>
                  <p className="small-header-text bold grey-transparent-color">
                    Offer must be a minimum increase of ${calcEthPrice(0.01)},
                    whichever is more.
                  </p>
                </div>
              )}
              {!isPostOwner() && !hasLastestActiveOffer() && (
                <div className="mr-5">
                  <div className="eth-input-field mt-4">
                    <span className="dollarMark">$</span>
                    <input
                      type="number"
                      value={bidPrice}
                      onChange={(e) => bidPriceChanged(e)}
                    />
                    <span className="ethPrice">({bidEthPrice})</span>
                  </div>
                </div>
              )}

              {!isPostOwner() && !hasLastestActiveOffer() && (
                <Button
                  className="place-bid pink-button mt-4 mb-3"
                  onClick={makePostOffer}
                >
                  Make an Offer
                </Button>
              )}
              {hasPendingOffer() && isPostOwner() && (
                <Button
                  className="place-bid pink-button mt-4 mb-3"
                  onClick={acceptPostOffer}
                >
                  Accept an Offer
                </Button>
              )}
              {!isPostOwner() && hasActiveOffer() && (
                <Button
                  className="place-bid pink-button mt-4 mb-3"
                  onClick={cancelPostOffer}
                >
                  Cancel an Offer
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <EnlargerDialog
          show={enlargerZoomed}
          src={postDetail.source}
          ratio={enlargerRatio}
          type={isPostVideo ? "video" : "image"}
          handleClose={() => closeEnlargerZoom()}
        ></EnlargerDialog>
      </div>
      <div className="mt-5">
        <p className="small-header-title mb-5">
          Other Posts from @{postDetail.instagramUser.username}
        </p>
        <div className="p-relative">
          {extraLoading ? (
            <Loading />
          ) : extraPosts && extraPosts.length > 0 ? (
            <Row>
              {extraPosts.map(function (extraPost, index) {
                return (
                  <Col xl="4" key={index}>
                    <PostOnlyItem key={index} item={extraPost}>
                      {" "}
                    </PostOnlyItem>
                  </Col>
                );
              })}
            </Row>
          ) : (
            "No Other Posts."
          )}
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.get("isLoggedIn"),
    user: state.user.get("user"),
  };
}

const dispatchers = {
  createOffer,
  cancelOffer,
  acceptOffer,
};

export default connect(mapStateToProps, dispatchers)(PostOffer);
