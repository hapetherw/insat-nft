import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Storage from "utils/storage";
import axios from "axios";

import { PostOnlyItem, Posts, TopHomeSection } from "components";
import { getOffersByPagination, getPosts } from "actions/web3";
import { Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import Helpers from "utils/helper";
import Loading from "components/Common/Loading";

const BASE_URL = process.env.API_ENDPOINT;

const HomepageContainer = ({
  getOffersByPagination,
  getPosts,
  trendData,
  totalRows,
}) => {

  const [isOfferLoading, setOfferLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [loadOfferMoreVisible, setLoadOfferMoreVisible] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  
  const [trends, setTrends] = useState(trendData);
  const [perPage, setPerPage] = useState(24);
  const [totalTrends, setTotalTrends] = useState(totalRows);
  const [isTrendLoading, setIsTrendLoading] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [currentTrendIndex, setCurrentTrendIndex] = useState(1);

  const [dollarPrice, setDollarPrice] = useState(0);
  const [tabKey, setTabKey] = useState("trends");

  useEffect(() => {
    const getOffers = async (page = 0, size = 24) => {
      let results = [];
      try {
        setOfferLoading(true);
        const ethResponse = await Helpers.fetchEthToUsd();
        if (ethResponse) setDollarPrice(ethResponse.price);
        results = await getOffersByPagination({
          page,
          size,
          isSold: 'all',
        });
        if(results) {
          setOffers(results);
        }        
        setOfferLoading(false);
      } catch (err) {}
      setOfferLoading(false);
    };
    if (tabKey == "offers" && offers.length<1) getOffers(currentOfferIndex,perPage);
  }, [tabKey]);

  useEffect(() => {
    Storage.setRedirectUrl("");
  }, []);

  useEffect(() => {
    if (perPage * (currentTrendIndex - 1) <= totalTrends) {
      setLoadMoreVisible(true);
    } else {
      setLoadMoreVisible(false);
    }
  }, [currentTrendIndex]);

  const loadTrendMore = async () => {
    try {
      setCurrentTrendIndex(currentTrendIndex + 1);
      setIsTrendLoading(true);
      const response = await getPosts({
        isTrend: true,
        page: currentTrendIndex + 1,
        size: perPage,
      });
      setIsTrendLoading(false);
      if (response && response.rows) {
        setTrends(trends.concat(response.rows));
        setTotalTrends(response.totalRows);
      }
    } catch (err) {
      setIsTrendLoading(false);
    }
  };

  const loadOfferMore = async() => {
    // try {
    //   setCurrentOfferIndex(currentOfferIndex + 1);
    //   setOfferLoading(true);
    //   const response = await getPosts({
    //     isSold: false,
    //     page: currentOfferIndex + 1,
    //     size: perPage,
    //   });
    //   setOfferLoading(false);
    //   if (response) {
    //     setTrends(trends.concat(response));
    //     setTotalTrends(response.totalRows);
    //   }
    // } catch (err) {
    //   setOfferLoading(false);
    // }
  }
  
  return (
    <Layout>
      <TopHomeSection></TopHomeSection>
      <div className="homepage-content">
        <Tabs
          activeKey={tabKey}
          onSelect={(k) => setTabKey(k)}
          className="custom-tabs"
        >
          <Tab eventKey="trends" title="TRENDS">
            {trends && trends.length > 0 ? (
              <>
                <Row>
                  {trends.map(function (trend, index) {
                    return (
                      <Col xl="3" lg="4" key={index}>
                        <PostOnlyItem key={index} item={trend}>
                          {" "}
                        </PostOnlyItem>
                      </Col>
                    );
                  })}
                </Row>
                <div className="p-relative mt-3 mb-3">
                  {isTrendLoading ? (
                    <Loading />
                  ) : (
                    loadMoreVisible && (
                      <div className="text-center">
                        <Button
                          className="pink-outline-button"
                          onClick={loadTrendMore}
                        >
                          Load More...
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              <h5>There is no trends available</h5>
            )}
          </Tab>
          <Tab eventKey="offers" title="OFFERS">
            {offers.length > 0 ? (
              <Posts offers={offers} dollarPrice={dollarPrice}></Posts>
            ) : (
              !isOfferLoading && <h5>There is no offers available</h5>
            )}
            <div className="p-relative mt-3 mb-3">
              {isOfferLoading ? (
                <Loading />
              ) : (
                loadOfferMoreVisible && (
                  <div className="text-center">
                    <Button
                      className="pink-outline-button"
                      onClick={loadOfferMore}
                    >
                      Load More...
                    </Button>
                  </div>
                )
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {};
}

const dispatcher = {
  getOffersByPagination,
  getPosts,
};

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get(`${BASE_URL}/posts?trending=true&page=1`);
    if (data.success && data.data) {
      return {
        props: {
          trendData: data.data.rows || [],
          totalRows: data.data.totalRows,
        },
      };
    }
    return {
      props: {
        trendData: [],
      },
    };
  } catch (err) {
    return {
      props: {
        trendData: [],
        totalRows: 0,
      },
    };
  }
}

export { HomepageContainer };
export default connect(mapStateToProps, dispatcher)(HomepageContainer);
