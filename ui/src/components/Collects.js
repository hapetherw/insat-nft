import React from "react";
import Link from "next/link";
import CollectItem from "./CollectItem";
import { Container, Row, Col } from "react-bootstrap";

const Collects = ({ collects, dollarPrice }) => {
  return (
    <Row>
      {collects.map(function (collect, index) {
        return (
          <Col xl="3" lg="4" key={index}>
            <CollectItem key={index} item={collect} dollarPrice={dollarPrice}>
            </CollectItem>
          </Col>
        );
      })}
    </Row>
  );
};
export default Collects;
