import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import PostHistoryItem from "../components/PostHistoryItem";
import UserMark from "./Common/UserMark";
import Link from "next/link";
import Progress from "./Common/Progress";
import { useRouter } from "next/router";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../utils/paymentValidation";

const BuyPostOffer = ({ auction }) => {
  const router = useRouter();

  const [approval, setApproval] = useState(false);
  const [otherAmount, setOtherAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
      setCvc(target.value);
    } else if (target.name === "otherAmount") {
      setOtherAmount(target.value);
    } else if (target.name === "name") {
      setName(target.value);
    }
  };

  const handleInputFocus = () => {};

  const handleSubmit = () => {};

  const renderEtherView = () => {
    if(approval==true) 
      return (
          <>
            <p className="bold grey-transparent-color mt-5">
              We will use your digital wallet to submit your offer. You’ll be
              asked to confirm your offer amount with your digital wallet.
            </p>
            <Form>
              <Form.Group>
                <Form.Control
                  name="offerAmount"
                  placeholder="Offer amount in Ether"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="email"
                  placeholder="Email address"
                  required
                />
              </Form.Group>
              <p className="grey-transparent-color mt-1">
                * If you want to recieve an email confirmation.
              </p>
              <Button className="place-bid pink-button mt-4 mb-3" type="submit">
                Make an Offer
              </Button>
              <div className="grey-transparent-text bold pointer-cursor ml-5">
                What are you purchasing?
              </div>
            </Form>
          </>
      );  
    return (
        <>
          <p className="bold grey-transparent-color approve-markersplace">
            You need to first approve your MakersPlace for access to MetaMask
            to complete your purchase.
          </p>
          <Button
            className="place-bid pink-button mt-4 mb-3"
            onClick={()=> setApproval(true)}
          >
            Give Approval
          </Button>
        </>
    )
  };

  return (
    <Tabs defaultActiveKey={"credit_card"} className="custom-tabs">
      <Tab eventKey="credit_card" title="CREDIT CARD">
        <p className="bold grey-transparent-color mt-5">
          There is currently a pending offer.
        </p>
        <p className="bold grey-transparent-color">
          You must bid at least 7.1 ETH.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <div className="icon">$</div>
            <Form.Control
              name="otherAmount"
              value={otherAmount}
              placeholder="Offer amount"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Form.Group>
          <Form.Group>
            <div className="icon">
              <img src={"/static/img/union.png"} />
            </div>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Full Name"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Form.Group>
          <Form.Group>
            <div className="icon">
              <img src={"/static/img/creditCard.png"} />
            </div>
            <Form.Control
              type="tel"
              name="number"
              value={cardNumber}
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} lg="6">
              <Form.Control
                type="tel"
                name="expiry"
                value={expiry}
                placeholder="MM/YY"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Control
                type="tel"
                name="cvc"
                value={cvc}
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Form.Group>
          </Form.Row>
        </Form>
        <Button className="place-bid pink-button mt-4 mb-3" type="submit">
          Make an Offer
        </Button>
        <div className="grey-transparent-text bold pointer-cursor ml-5">
          What are you purchasing?
        </div>
      </Tab>
      <Tab eventKey="ether" title="ETHER">
        {renderEtherView()}
      </Tab>
    </Tabs>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const dispatchers = {};

export default connect(mapStateToProps, dispatchers)(BuyPostOffer);
