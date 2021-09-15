import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import { PostOffer, Loading, Layout } from "components";
import {
  getPostWithUrl,
  getOfferById,
  getInstagramExtraContentsWithUserName,
} from "../actions/web3";
import Helpers from "../utils/helper";

const PostOfferContainer = ({
  serverData,
  getPostWithUrl,
  getOfferById,
  getInstagramExtraContentsWithUserName,
}) => {
  const router = useRouter();
  const [postDetail, setPostDetail] = useState(null);
  const [extraPosts, setExtraPosts] = useState([]);
  const [extraLoading, setExtraLoading] = useState(false);
  const [auctionDetail, setAuctionDetail] = useState(null);
  const [bidHistory, setHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [ethPrice, setETHPrice] = useState(0);

  useEffect(() => {
    async function getEthPrice() {
      const ethResponse = await Helpers.fetchEthToUsd();
      if (ethResponse) setETHPrice(ethResponse.price);
    }
    if(serverData) setInitialData(serverData);
    getEthPrice();
  }, [serverData]);

  useEffect(() => {
    async function getExtraPost() {
      if (postDetail && postDetail.instagramUser) {
        try {
          setExtraLoading(true);
          const extraPostRes = await getInstagramExtraContentsWithUserName({
            username: postDetail.instagramUser.username,
          });
          setExtraPosts(extraPostRes);
          setExtraLoading(false);
        } catch (err) {
          setExtraLoading(false);
        }
      }
    }
    getExtraPost();
  }, [postDetail]);

  const getAuctionDetail = async () => {
    const { slug, id } = router.query;
    try {
      const response = slug
        ? await getPostWithUrl({
            url: encodeURIComponent("https://www.instagram.com/p/" + slug),
          })
        : await getOfferById({ id });

      if (response) {
        setInitialData(response);
      }
    } catch (err) {}

    const ethResponse = await Helpers.fetchEthToUsd();
    if (ethResponse) setETHPrice(ethResponse.price);

    setLoading(false);
  };

  const setInitialData = (response) => {
    if (response.post) {
      setPostDetail(response.post);
    } else {
      setAuctionDetail(response.auction);
      if(response.auction) setPostDetail(response.auction.post);
    }

    if (response.offers) {
      let offers = response.offers.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      setHistory(offers);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="top-buy-post">
        <Container>
          { (postDetail && ethPrice>0) && (
            <NoSSR>
              <PostOffer
                postDetail={postDetail}
                ethPrice={ethPrice}
                bidHistory={bidHistory}
                auction={auctionDetail}
                extraPosts={extraPosts}
                extraLoading={extraLoading}
                reloadOffer={() => getAuctionDetail()}
              />
            </NoSSR>
          )}
        </Container>
      </div>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {};
}

const dispatchers = {
  getPostWithUrl,
  getOfferById,
  getInstagramExtraContentsWithUserName,
};

PostOfferContainer.propTypes = {};

export { PostOfferContainer };
export default connect(mapStateToProps, dispatchers)(PostOfferContainer);
