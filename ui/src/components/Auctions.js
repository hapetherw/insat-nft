import React from "react";
import Link from "next/link";
import PostItem from "./PostItem";
import { Container, Row, Col } from "react-bootstrap";

const Auctions = ({ auctions, dollarPrice }) => {
    return (
      <>
        <Row>
          {auctions.map(function (auction, index) {
              return (
                  <Col xl="3" lg="4" key={index}>
                      <PostItem key={index} item={auction} dollarPrice={dollarPrice}> </PostItem>
                  </Col>
              );
          })}
        </Row>
        
      </>
    );
};
export default Auctions;
