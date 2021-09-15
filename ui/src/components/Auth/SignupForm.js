import React, { useState } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import { signupRequest } from "actions/user";
import { Row, Col, Form, Button } from "react-bootstrap";
import ErrorDialog from "components/Common/Dialog/ErrorDialog";
import Progress from "components/Common/Progress";
import { Formik } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const schema = Yup.object().shape({
  username: Yup.string().required("User Name is required"),
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Incorrect Email"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      "^(?=.*[\\d])(?=.*[A-Z])[\\w!@#$%^&*-:;<>.,]{6,}$",
      "Password must be at least 8 characters and include 1 upper case letter (A-Z) and 1 number (0-9)."
    )
    .when("passwordConfirmation", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("passwordConfirmation")],
        "Password do not match"
      ),
    }),
  passwordConfirmation: Yup.string().required("Confirm Password is required"),
});

const SignupForm = ({ signupRequest }) => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorText, setErrorText] = useState("");

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
    setErrorText("");
  };

  const submitSignUpForm = async (values) => {
    setForm(values);
    setIsRegistering(true);
    try {
      const response = await signupRequest(values);
      setIsRegistering(false);
      if (response) {
        if (!response.success) {
          if (response.error) setErrorText(response.error);
          setShowErrorDialog(true);
        }
      } else {
        setErrorText("Oops! Something get wrong");
        setShowErrorDialog(true);
      }
    } catch (err) {
      setErrorText("Oops! Something get wrong");
      setShowErrorDialog(true);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={submitSignUpForm}
        initialValues={form}
      >
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <Form className="signup-form" noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} lg="6" className="pr-lg-2">
                <Form.Label
                  className={
                    touched.username && !!errors.username ? "danger" : ""
                  }
                >
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  isInvalid={touched.username && !!errors.username}
                  value={values.username}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} lg="6" className="pl-lg-2">
                <Form.Label
                  className={
                    touched.fullName && !!errors.fullName ? "danger" : ""
                  }
                >
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  isInvalid={touched.fullName && !!errors.fullName}
                  value={values.fullName}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12">
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
              <Form.Group as={Col} lg="6" className="pr-lg-2">
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
              <Form.Group as={Col} lg="6" className="pl-lg-2">
                <Form.Label
                  className={
                    touched.passwordConfirmation &&
                    !!errors.passwordConfirmation
                      ? "danger"
                      : ""
                  }
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  isInvalid={
                    touched.passwordConfirmation &&
                    !!errors.passwordConfirmation
                  }
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <div className="text-center">
              <Button className="mt-3 pink-button" type="submit">
                Sign up
              </Button>
            </div>

            <p className="mt-3 text-center">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </Form>
        )}
      </Formik>
      <ErrorDialog
        show={showErrorDialog}
        text={errorText}
        handleClose={closeErrorDialog}
      ></ErrorDialog>
      <Progress show={isRegistering} text={"Please Wait..."}></Progress>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const dispatchers = {
  signupRequest,
};

export default connect(mapStateToProps, dispatchers)(SignupForm);
