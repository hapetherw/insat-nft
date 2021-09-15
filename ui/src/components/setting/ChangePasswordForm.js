import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import Router from "next/router";
import { Button, Form, Col } from "react-bootstrap";
import Progress from "components/Common/Progress";
import Link from "next/link";
import { changePassword } from "actions/user";
import { Formik } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import NotificationManager from "react-notifications/lib/NotificationManager";

const ChangePasswordForm = ({}) => {
  const defaultShape = {
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        "^(?=.*[\\d])(?=.*[A-Z])[\\w!@#$%^&*-:;<>.,]{6,}$",
        "New Password must be at least 8 characters and include 1 upper case letter (A-Z) and 1 number (0-9)."
      )
      .when("confirmPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("confirmPassword")],
          "Password do not match"
        ),
      }),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  };
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.get("user"));
  const [validationShape, setValidationShape] = useState(defaultShape);
  const schema = Yup.object().shape(validationShape);

  const submitChangePasswordForm = async (values, { resetForm }) => {
    setForm(values);
    try {
      setIsLoading(true);
      let response = await dispatch(
        changePassword({ ...values, passwordVisible })
      );
      setIsLoading(false);
      if (response.success) {
        NotificationManager.success("Password Changed Successfully", "Success");
        if (!passwordVisible) setPasswordVisible(true);
        resetForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        NotificationManager.error(
          response.error || "Oops! Something get wrong when change password",
          "Error"
        );
      }
    } catch (err) {
      NotificationManager.error(
        "Oops! Something get wrong when change password",
        "Error"
      );
    }
  };

  useEffect(() => {
    if (user) {
      let hasPassword = user.get("hasPassword");
      setPasswordVisible(hasPassword);
    }
  }, [user]);

  useEffect(() => {
    if (passwordVisible) {
      setValidationShape({
        ...defaultShape,
        oldPassword: Yup.string()
          .required("Old Password is required")
          .matches(
            "^(?=.*[\\d])(?=.*[A-Z])[\\w!@#$%^&*-:;<>.,]{6,}$",
            "Old Password must be at least 8 characters and include 1 upper case letter (A-Z) and 1 number (0-9)."
          ),
      });
    } else {
      setValidationShape({
        ...defaultShape,
      });
    }
  }, [passwordVisible]);

  return (
    <>
      <p className="normal-header-title">
        {passwordVisible ? "Change password" : "Set Password"}
      </p>
      <Formik
        validationSchema={schema}
        onSubmit={submitChangePasswordForm}
        initialValues={form}
      >
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <Form
            className="change-password-form"
            noValidate
            onSubmit={handleSubmit}
          >
            {passwordVisible && (
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    placeholder="Input current password"
                    isInvalid={touched.oldPassword && !!errors.oldPassword}
                    value={values.oldPassword}
                    onChange={handleChange}
                  />

                  <Form.Control.Feedback type="invalid">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {errors.oldPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            )}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="Input new password"
                  isInvalid={touched.newPassword && !!errors.newPassword}
                  value={values.newPassword}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.newPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat new password"
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                  value={values.confirmPassword}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <div className="text-right">
              <Button className="mt-4 pink-button" type="submit">
                Change Password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Progress show={isLoading} text={"Changing Password..."}></Progress>
    </>
  );
};

export default ChangePasswordForm;
