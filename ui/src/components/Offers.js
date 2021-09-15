import React from "react";
import Link from "next/link";
import OfferItem from "./OfferItem";
import { Container, Row, Col } from "react-bootstrap";

const Offers = ({ offers, dollarPrice }) => {
  let sortedOffers = offers.sort(function(a,b){ 
    if(b.createdAt > a.createdAt) return 1;
    return -1;
  })
  return (
      <Row>
        {sortedOffers.map(function (offer, index) {
            return (
                <Col xl="3" lg="4" key={index}>
                    <OfferItem key={index} offer={offer} dollarPrice={dollarPrice}> </OfferItem>
                </Col>
            );
        })}
      </Row>
      
  );
};
export default Offers;
