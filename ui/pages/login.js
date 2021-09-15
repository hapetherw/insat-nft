import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import { LoginForm } from "components";
import { Row, Col, Button } from "react-bootstrap";

import Link from "next/link";

const LoginContainer = ({}) => {
  return (
    <div className="auth-container">
      <Link href={"/"}>
        <div className="go-home pointer-cursor">
          Go to Home
          <img src={"/static/img/go-forward.png"} className="ml-2" />
        </div>
      </Link>
      <div className="auth-card login-card">
        <Row>
          <Col className="input-area">
            <Link href={"/"}>
              <div className="auth-logo pointer-cursor bold">
                <img src="/static/img/mintapost.png" alt="mintapost" />
                PERNAMINT
              </div>
            </Link>
            <h3>Welcome back</h3>
            <LoginForm />
          </Col>
        </Row>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

const dispatchers = {};

export default connect(mapStateToProps, dispatchers)(LoginContainer);