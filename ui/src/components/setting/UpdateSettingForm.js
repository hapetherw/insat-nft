import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Col } from "react-bootstrap";
import Progress from "components/Common/Progress";
import { useFormik } from "formik";
import { useSelector,useDispatch } from "react-redux";
import { updateProfile,getProfileRequest } from "actions/user";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import NotificationManager from "react-notifications/lib/NotificationManager";
import config from '../../contract/config';

const UpdateSettingForm = ({ }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.get("user"));
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      username: Yup.string().required("User Name is required"),
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .required("Email is required")
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Incorrect Email"
        ),
    }),
    initialValues: {
      username: "",
      fullName: "",
      email: ""
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log(config.marketAuctionAddress, config.marketPlaceAddress);
      await formik.setSubmitting(true);
      try {
        const response = await dispatch(
          updateProfile(values)
        );
        await formik.setTouched({});
        setIsLoading(false);
        if(response.success) {
          NotificationManager.success("Profile is updated Successfully","Success")
          await dispatch(getProfileRequest())
        }else {
          NotificationManager.error(
            response.error || "Update Profile failed!",
            "Error"
          );
        }
      } catch (error) {}
        await formik.setSubmitting(false);
        setIsLoading(false);
    },
  });

  useEffect(() => {
    if(user) {
      formik.setValues({
        email: user && user.get("email") ? user.get("email") : "",
        fullName: user && user.get("fullName") ? user.get("fullName") : "",
        username: user && user.get("username") ? user.get("username") : "",
      });
    }
  }, [user]);

  return (
    <>
      <p className="normal-header-title mt-3">User Information</p>

          <Form
            className="update-setting-form"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Form.Row>
              <Form.Group as={Col} lg="6" className="pr-lg-3">
                <Form.Label
                  className={
                    formik.touched.username && !!formik.errors.username ? "danger" : ""
                  }
                >
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  isInvalid={formik.touched.username && !!formik.errors.username}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} lg="6" className="pl-lg-3">
                <Form.Label
                  className={
                    formik.touched.fullName && !!formik.errors.fullName ? "danger" : ""
                  }
                >
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  isInvalid={formik.touched.fullName && !!formik.errors.fullName}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {formik.errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12">
                <Form.Label
                  className={formik.touched.email && !!formik.errors.email ? "danger" : ""}
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  isInvalid={formik.touched.email && !!formik.errors.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            {/* <p className="normal-header-title mt-4">Notifications</p>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Lorem ipsum dolor sit amet, consectetur adipiscing"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Lorem ipsum dolor sit amet, consectetur adipiscing"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Lorem dolor sit consectetur adipiscing"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Lorem ipsum dolor sit amet, consectetur adipiscing"
              />
            </Form.Group> */}
            <div className="text-center">
              <button
                className="mt-4 bold save-changes pointer-cursor"
                type="submit"
              >
                <img className="mr-2" src={"/static/img/download.png"} />
                Save Changes
              </button>
            </div>
          </Form>
      <Progress show={isLoading} text={"Update User Information..."}></Progress>
    </>
  );
};

export default UpdateSettingForm;
