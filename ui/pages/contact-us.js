import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { submitContact, setContactResult } from "actions/user";
import { Layout, Progress, NotifyDialog } from "components";

const ContactUsContainer = () => {
  const user = useSelector((state) => state.user.get("user"));
  const contactResult = useSelector((state) => state.user.get("contactResult"));
  // const isLoading = useSelector((state) => state.user.get("isLoading"));
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .required("Email is required")
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Incorrect Email"
        ),
      msg: Yup.string().required("Message is required"),
    }),
    initialValues: {
      fullName: "",
      email: "",
      msg: "",
    },
    onSubmit: async ({ fullName, email, msg }) => {
      await formik.setSubmitting(true);
      try {
        await dispatch(
          submitContact({
            fullName,
            email,
            message: msg,
          })
        );
        await formik.setTouched({});
        await formik.setValues({
          fullName: "",
          email: "",
          msg: "",
        });
      } catch (error) {}
      await formik.setSubmitting(false);
    },
  });

  useEffect(() => {
    formik.setValues({
      email: user && user.get("email") ? user.get("email") : "",
      fullName: user && user.get("fullName") ? user.get("fullName") : "",
      msg: "",
    });
  }, [user]);

  useEffect(() => {
    console.log(contactResult);
  }, [contactResult])

  const closeNotifyDialog = () => {
    dispatch(setContactResult(null));
  };

  return (
    <Layout>
      <div className="contact-us">
        <Container>
          <p className="section-title about-us-title mt-5">Contact Us</p>
          <p className="normal-header-title text-uppercase">
            WE'RE SERIOUS ABOUT SERVICE! WE'RE HERE TO HELP.
          </p>
          <div className="pb-5">
            <Row>
              <Col lg="8" md="7" className="pr-4">
                <p>
                  <strong>
                    If you have any questions or comments please complete the
                    form below.
                  </strong>
                </p>
                <p>
                  We'd love to hear from you! Our Service team responds within
                  24 hours, please check all folders if you don't receive a
                  reply.
                </p>
                <Form
                  className="contact-form"
                  noValidate
                  onSubmit={formik.handleSubmit}
                >
                  <Form.Row>
                    <Form.Group as={Col} lg={5}>
                      <Form.Label
                        htmlFor="contactFullName"
                        className={
                          formik.touched.fullName && !!formik.errors.fullName
                            ? "danger"
                            : ""
                        }
                      >
                        Full Name*
                      </Form.Label>
                      <Form.Control
                        id="contactFullName"
                        type="text"
                        name="fullName"
                        isInvalid={
                          formik.touched.fullName && !!formik.errors.fullName
                        }
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                      />

                      <Form.Control.Feedback type="invalid">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {formik.errors.fullName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label
                        htmlFor="contactEmail"
                        className={
                          formik.touched.email && !!formik.errors.email
                            ? "danger"
                            : ""
                        }
                      >
                        Email*
                      </Form.Label>
                      <Form.Control
                        id="contactEmail"
                        type="text"
                        name="email"
                        isInvalid={
                          formik.touched.email && !!formik.errors.email
                        }
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                      <Form.Label
                        htmlFor="contactMessage"
                        className={
                          formik.touched.msg && !!formik.errors.msg
                            ? "danger"
                            : ""
                        }
                      >
                        Message*
                      </Form.Label>
                      <Form.Control
                        id="contactMessage"
                        as="textarea"
                        name="msg"
                        isInvalid={formik.touched.msg && !!formik.errors.msg}
                        value={formik.values.msg}
                        onChange={formik.handleChange}
                        rows={5}
                      />
                      <Form.Control.Feedback type="invalid">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {formik.errors.msg}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Button className="mt-4 pink-button" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
              <Col lg="4" md="5" className="pl-4 text-right">
                <div className="contact-image"></div>
              </Col>
            </Row>
          </div>
          <NotifyDialog
            notify={
              contactResult && contactResult.get("success") ? "success" : "error"
            }
            show={!!contactResult}
            text={
              contactResult && contactResult.get("success")
                ? "Your message sent successfully."
                : "Your message sent failure."
            }
            handleClose={closeNotifyDialog}
          />
          <Progress show={formik.isSubmitting} text={"Please Wait..."} />
        </Container>
      </div>
    </Layout>
  );
};

export default ContactUsContainer;
