import React, { Component } from "react";
import { SignupForm } from "components";
import instagramClient from "utils/instagramClient";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

class SignupContainer extends Component {
  instagramSignup() {
    instagramClient.signup();
  }
  render() {
    return (
      <div className="auth-container">
        <Link href={"/"}>
          <div className="go-home pointer-cursor">
            Go to Home
            <img src={"/static/img/go-forward.png"} className="ml-2" />
          </div>
        </Link>
        <div className="auth-card signup-card">
          <Row>
            <Col className="input-area">
              <Link href={"/"}>
                <div className="auth-logo pointer-cursor bold">
                  <img src="/static/img/mintapost.png" alt="mintapost" />
                  PERNAMINT
                </div>
              </Link>
              <h3>Sign Up</h3>
              <SignupForm />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default SignupContainer;
