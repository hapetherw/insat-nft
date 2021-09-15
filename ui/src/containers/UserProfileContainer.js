import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Loading } from "../components";
import { connect } from "react-redux";
import NoSSR from "react-no-ssr";
import store from "../contract/web3";

import {
  Container,
  Tabs,
  Tab,
  FormControl,
  Row,
  Col,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  Offers,
  Auctions,
  ProfileInfo,
  Collects,
  Progress,
} from "../components";
import {
  getProfileByUserId,
  getOffersByUserId,
  getAuctionsByUserId,
  getNftsByUserId,
} from "../actions/user";
import NotificationManager from "react-notifications/lib/NotificationManager";
import Helpers from "../utils/helper";

const UserProfileContainer = ({
  getOffersByUserId,
  getAuctionsByUserId,
  getNftsByUserId,
}) => {
  const router = useRouter();
  const [key, setKey] = React.useState("collected");
  const [isLoading, setLoading] = React.useState(true);
  const [isContentLoading, setisContentLoading] = React.useState(false);
  const [offers, setOffers] = React.useState([]);
  const [mints, setMints] = React.useState([]);
  const [collects, setCollects] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [dollarPrice, setDollarPrice] = React.useState(0);
  const [nfts, setNFT] = React.useState([]);

  const getUserInfo = async () => {
    const { id } = router.query;
    const result = await getProfileByUserId({ username: id });
    if (result) {
      const ethPrice = await Helpers.fetchEthToUsd();
      setDollarPrice(ethPrice.price);
      setUser(result.user);
    } else {
      NotificationManager.error("There is no such user", "Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (user) {
        let results = [];
        setisContentLoading(true);
        if (user.id) {
          switch (key) {
            case "collected":
              results = await getNftsByUserId({ id: user.id });
              setCollects(results);
              break;
            case "minted":
              results = await getAuctionsByUserId({ id: user.id });
              setMints(results);
              break;
            case "offers":
              results = await getOffersByUserId({ id: user.id });
              setOffers(results);
              break;
          }
        }
        setisContentLoading(false);
      }
    }
    fetchData();
  }, [key, user]);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="user-profile">
        <Container className="profile-section">
          <Row>
            <Col xl={{ span: 10, offset: 1 }} lg="12">
              {user && <NoSSR><ProfileInfo profile={user}></ProfileInfo></NoSSR>}
            </Col>
          </Row>
        </Container>
        <div className="profile-post-content">
          <Tabs
            defaultActiveKey={"collected"}
            onSelect={(k) => setKey(k)}
            className="custom-tabs"
          >
            <Tab eventKey="collected" title="COLLECTED">
              {isContentLoading ? (
                <Loading />
              ) : (
                (collects && collects.length > 0) ? (
                  <Collects
                    collects={collects}
                    dollarPrice={dollarPrice}
                  ></Collects>
                ):(
                  <div className="text-center no-profile-post mt-5">
                    <img src={'/static/img/buy_instagram.png'} />
                    <p className="text-center">Buy a new photo/video from instagram</p>
                  </div>
                )
              )}
            </Tab>
            <Tab eventKey="minted" title="MINTED">
              {isContentLoading ? (
                <Loading />
              ) : (
                (mints && mints.length > 0) ? (
                  <Auctions
                    auctions={mints}
                    dollarPrice={dollarPrice}
                  ></Auctions>
                ):(
                  <div className="text-center no-profile-post mt-5">
                    <img src={'/static/img/buy_instagram.png'} />
                    <p className="text-center">No mints yet..</p>
                  </div>
                )
              )}
            </Tab>
            <Tab eventKey="offers" title="OFFERS">
              {isContentLoading ? (
                <Loading />
              ) : (
                (offers && offers.length > 0) ? (
                  <Offers offers={offers} dollarPrice={dollarPrice}></Offers>
                ):(
                  <div className="text-center no-profile-post mt-5">
                    <img src={'/static/img/buy_instagram.png'} />
                    <p className="text-center">Buy a new photo/video from instagram</p>
                  </div>
                )
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {};
}

const dispatchers = {
  getOffersByUserId,
  getAuctionsByUserId,
  getNftsByUserId,
};

export default connect(mapStateToProps, dispatchers)(UserProfileContainer);
