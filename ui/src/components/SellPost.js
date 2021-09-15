import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import UserCard from "./UserCard";

import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";

const SellPost = ({ item }) => {
  const [instagramLoggedIn, setInstagramLoggedIn] = React.useState(false);

  return (
    <Row className="sell-post-detail">
      <Col md="7">
        <img
          className="sell-post-img"
          src={item.imageUrl ? item.imageUrl : ""}
        />
      </Col>
      <Col md="5" className="pl-5 pt-5">
        <p className="mb-3 section-title">
          {instagramLoggedIn
            ? "Want to sell your photo?"
            : "Is this your photo?"}
        </p>
        <UserCard item={item}></UserCard>
        <Button className="pink-button mb-3 pl-4 pr-4">
          {instagramLoggedIn ? "Make an Offer" : "Connect your Account"}
        </Button>
        {!instagramLoggedIn && (
          <p className="small-header-title grey-transparent-text pl-5">
            How does it works?
          </p>
        )}
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {};
}

const dispatchers = {};

export default connect(mapStateToProps, dispatchers)(SellPost);
