import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import { Button, Form, Col } from "react-bootstrap";
import ErrorDialog from "components/Common/Dialog/ErrorDialog";
import Progress from "components/Common/Progress";
import Link from "next/link";
import { loginRequest, loginWithInstagram } from "actions/user";

import { Formik } from "formik";
import * as Yup from "yup";
import instagramClient from "utils/instagramClient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Incorrect Email"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have at least 6 letters"),
});

const LoginForm = ({ loginRequest, loginWithInstagram }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLogging, setIsLogging] = useState(false);
  const [loggingText, setLoggingText] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorText, setErrorText] = useState("");

  const submitLoginForm = async (values) => {
    setForm(values);
    setIsLogging(true);
    setLoggingText("Logging in...");
    try{
      const response = await loginRequest(values);
      setIsLogging(false);
      if (response) {
        if (!response.success) {
          if (response.error) setErrorText(response.error);
          setShowErrorDialog(true);
        }
      } else {
        setErrorText("Oops! Something get wrong");
        setShowErrorDialog(true);
      }
    }catch(err) {
      setErrorText("Oops! Something get wrong");
      setShowErrorDialog(true);
    }
    
  };

  const signInWithInstagram = () => {
    instagramClient.login('login');
  }

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
    setErrorText("");
  };

  useEffect(() => {
    const getAccessToken = async (code) => {
      setIsLogging(true);
      setLoggingText("Logging in with Instagram...");
      const response = await loginWithInstagram({
        code,
        redirect_uri: window.location.origin + "/login",
      });
      setIsLogging(false);
      if (response) {
        if (response.success) return;
        if (response.error) setErrorText(response.error || response.error.message);
        setShowErrorDialog(true);
      } else {
        setErrorText("Oops! Something get wrong");
        setShowErrorDialog(true);
      }
    };
    if (router.query && router.query.code) {
      getAccessToken(router.query.code);
    }
  }, []);

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={submitLoginForm}
        initialValues={form}
      >
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <Form className="login-form" noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label
                  className={touched.email && !!errors.email ? "danger" : ""}
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  isInvalid={touched.email && !!errors.email}
                  value={values.email}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label
                  className={
                    touched.password && !!errors.password ? "danger" : ""
                  }
                >
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  isInvalid={touched.password && !!errors.password}
                  value={values.password}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <div className="text-center mt-3">
              <Button className="pink-button" type="submit">
                LOGIN
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button className="pink-button" onClick={signInWithInstagram}>
                LOGIN WITH INSTAGRAM
              </Button>
            </div>

            <p className="mt-4 text-center">
              Don’t have an account? <Link href="/signup">Sign up</Link>
            </p>
          </Form>
        )}
      </Formik>
      <ErrorDialog
        show={showErrorDialog}
        text={errorText}
        handleClose={closeErrorDialog}
      ></ErrorDialog>
      <Progress show={isLogging} text={loggingText}></Progress>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const dispatchers = {
  loginRequest,
  loginWithInstagram
};

export default connect(mapStateToProps, dispatchers)(LoginForm);
