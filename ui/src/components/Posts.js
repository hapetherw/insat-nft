import React from "react";
import Link from "next/link";
import PostItem from "./PostItem";
import { Container, Row, Col } from "react-bootstrap";

const Posts = ({ offers, dollarPrice }) => {
  return (
    <>
      <Row>
        {offers.map(function (offer, index) {
            return (
                <Col xl="3" lg="4" key={index}>
                    <PostItem key={index} item={offer} dollarPrice={dollarPrice}> </PostItem>
                </Col>
            );
        })}
      </Row>
      
    </>
  );
};
export default Posts;
