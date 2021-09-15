import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faClone } from "@fortawesome/free-solid-svg-icons";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { MetamaskStateProvider, useMetamask } from "use-metamask";
import { connect } from "react-redux";

import store from "../contract/web3";
import Web3 from "web3";

const ProfileInfo = ({ user, profile }) => {
  const getHiddenStringFromAddress = (str) => {
    if (!str || str.length < 18) return "";
    return (
      str.substring(0, 10) + "..." + str.substring(str.length - 6, str.length)
    );
  };

  const [profileInfo, setProfileInfo] = React.useState({ ...profile });
  const [walletAddress, setWalletAddress] = React.useState("");
  const { connect, metaState, getAccounts } = useMetamask();

  const connectMetamask = async () => {
    try {
      await connect(Web3);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    async function setWalletInfo() {
      if (!metaState.isAvailable) {
        NotificationManager.warning(
          "Please install metamask to continue",
          "Warning"
        );
        return;
      }
      if (store.getStore("account")) {
        const connection = await connectMetamask();
        if (!connection) {
          NotificationManager.warning(
            "You rejected to connect metamask, please refresh page and try again",
            "Warning"
          );
          return;
        }
      }

      let accounts = await getAccounts();
      store.setStore({
        account: accounts[0],
      });

      if (accounts[0] && typeof accounts[0] === "string")
        setWalletAddress(accounts[0]);
    }

    if(profileInfo && profileInfo.walletAddress) {
      setWalletAddress(profileInfo.walletAddress)
    } else if (user) {
      let loggedInUserName = user.get("username");
      if (loggedInUserName == profileInfo.username) {
        setWalletInfo();
      }
    }
  }, [user,profileInfo]);

  const handleChange = (props, e) => {};
  const handleSubmit = () => {};

  const copyWalletAddressToClipBoard = () => {
    if (process.browser && walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      NotificationManager.success(
        "Wallet Address is copied to ClipBoard.",
        "Success"
      );
    }
  };

  const goToInstagramProfile = () => {
    if (profileInfo.instagramUser) {
      window.open(
        "https://www.instagram.com/" + profileInfo.instagramUser.username,
        "_blank"
      );
    } else {
      NotificationManager.warning(
        "You did not connect Instagram yet!",
        "Warning"
      );
    }
  };

  return (
    <Row>
      <Col lg="2">
        <div className="user-profile-avatar mt-lg-5">
          <div className="edit-avatar">
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <img
            className={profileInfo.instagramUser ? "" : "upload-profile-img"}
            src={
              profileInfo.instagramUser
                ? profileInfo.instagramUser.avatar
                : "/static/img/upload.png"
            }
          />
        </div>
      </Col>
      <Col lg="10" className="pl-4">
        <Form noValidate onSubmit={handleSubmit} className="user-profile-form">
          <Form.Row>
            <Form.Group as={Col} lg="6" className="pr-lg-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={profileInfo.fullName}
                onChange={(e) => handleChange("fullName", e)}
              />
            </Form.Group>
            <Form.Group as={Col} lg="6" className="pl-lg-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileInfo.username}
                onChange={(e) => handleChange("username", e)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} lg="6" className="pr-lg-3">
              <div className="flex justify-content-between align-items-center">
                <Form.Label>Instagram</Form.Label>
                <img
                  className="user-instaram mr-2 pointer-cursor"
                  src={"/static/img/instagram.png"}
                  onClick={goToInstagramProfile}
                />
              </div>

              <Form.Control
                type="text"
                name="instagramUsername"
                value={
                  profileInfo.instagramUser
                    ? "https://www.instagram.com/" +
                      profileInfo.instagramUser.username
                    : ""
                }
                onChange={(e) => handleChange("instagramUsername", e)}
              />
            </Form.Group>
            <Form.Group as={Col} lg="6" className="pl-lg-3">
              <div className="flex justify-content-between align-items-center">
                <Form.Label>Wallet</Form.Label>
                <FontAwesomeIcon
                  icon={faClone}
                  className="mr-2 clone-icon pointer-cursor"
                  onClick={copyWalletAddressToClipBoard}
                ></FontAwesomeIcon>
              </div>

              <Form.Control
                type="text"
                name="wallet"
                id="walletAddress"
                value={getHiddenStringFromAddress(walletAddress)}
                onChange={(e) => handleChange("wallet", e)}
                disabled
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.get("user"),
  };
}

const dispatchers = {};

export default connect(mapStateToProps, dispatchers)(ProfileInfo);
