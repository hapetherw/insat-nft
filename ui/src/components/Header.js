import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import {
  getProfileRequest,
  fetchETHPrice,
  logoutRequest,
  connectUserToInstagram,
} from "actions/user";
import ExitDialog from "../components/Common/Dialog/ExitDialog";
import ErrorDialog from "components/Common/Dialog/ErrorDialog";
import Progress from "components/Common/Progress";
import Storage from "utils/storage";
import router, { useRouter } from "next/router";
import { injected } from "store/connector";
import Web3 from "web3";
import store from "../contract/web3";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import NotificationManager from "react-notifications/lib/NotificationManager";
import instagramClient from "../utils/instagramClient";

const Header = ({
  user,
  isLoggedIn,
  logoutRequest,
  getProfileRequest,
  connectUserToInstagram,
  fetchETHPrice,
}) => {
  const Router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [searchKey, setSearchKey] = React.useState("");
  const [instagramAvatar, setInstagramAvatar] = React.useState("");
  const [showExitDialog, setShowExitDialog] = React.useState(false);

  const [isLogging, setIsLogging] = useState(false);
  const [loggingText, setLoggingText] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (Router.query.code === null || Router.query.code === undefined) {
      if (Storage.accessToken()) {
        getProfileRequest();
      }
    }
    Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });
  }, []);


  useEffect(() => {
    fetchETHPrice();
  }, [Router.pathname]);

  useEffect(() => {
    if (user) {
      setFullName(user.get("fullName"));
      setUserName(user.get("username"));
      setUserId(user.get("id"));
      let instagramDetails = user.get("instagramUser");
      if (instagramDetails) {
        setInstagramAvatar(user.get("instagramUser").get("avatar"));
      }
    }
  }, [user]);

  const goToSetting = () => {
    router.push("/settings");
  };

  const logIn = () => {
    let path = router.asPath;
    Storage.setRedirectUrl(path);
    router.push("/login");
  };

  const connectInstagram = async () => {
    if (instagramAvatar && instagramAvatar.length > 0) {
      NotificationManager.warning(
        "User already connected instagram accounnt",
        "Warning"
      );
      return;
    }
    let path = router.asPath;
    Storage.setRedirectUrl(path);
    instagramClient.login("");
  };

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
    setErrorText("");
  };

  useEffect(() => {
    const getAccessToken = async (code) => {
      setIsLogging(true);
      setLoggingText("Logging in with Instagram...");
      const response = await connectUserToInstagram({
        code,
        redirect_uri: window.location.origin + "/",
      });
      setIsLogging(false);
      if (response) {
        await getProfileRequest();
        return;
      } else {
        setErrorText("Oops! Something get wrong");
        setShowErrorDialog(true);
      }
    };
    if (router.query && router.query.code) {
      getAccessToken(router.query.code);
    }
  }, []);

  const goToProfile = () => {
    router.push("/user/" + userName);
  };

  const openExitDialog = () => {
    setShowExitDialog(true);
  };

  const logOut = () => {
    logoutRequest();
    setShowExitDialog(false);
  };

  const getHeaderAvatar = () => {
    return (
      <>
        <span className="d-none d-sm-inline-block">{userName}</span>{" "}
        {instagramAvatar ? (
          <img src={instagramAvatar} className="ml-1"></img>
        ) : (
          <FontAwesomeIcon icon={faUser} className="ml-1"></FontAwesomeIcon>
        )}{" "}
      </>
    );
  };

  return (
      <div className="header">
        <Container>
          <Navbar collapseOnSelect>
            <Nav>
              <Link href="/">
                <Navbar.Brand className="minta-post pointer-cursor">
                  <img src="/static/img/mintapost.png" alt="mintapost" />
                  PERNAMINT
                </Navbar.Brand>
              </Link>
            </Nav>

            {/* <div className="header-search">
            <FormControl
              type="text"
              placeholder="Search someone from Instagram"
              value={searchKey}
              onChange={(val)=>setSearchKey(val)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              flip="horizontal"
            ></FontAwesomeIcon>
          </div> */}
            <Nav className="ml-auto">
              {!isLoggedIn && (
                <Button
                  type="button"
                  className="pink-outline-button ml-3"
                  onClick={logIn}
                >
                  Login
                </Button>
              )}
              {isLoggedIn && (
                <>
                  {!instagramAvatar && (
                    <Button
                      type="button"
                      className="pink-button ml-3"
                      onClick={connectInstagram}
                    >
                      Connect Instagram
                    </Button>
                  )}
                  <NavDropdown
                    id="header-dropdown"
                    className="ml-2 ml-sm-3"
                    title={getHeaderAvatar()}
                  >
                    <NavDropdown.Item onClick={goToProfile}>
                      Profile
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item>
                      My Activity
                    </NavDropdown.Item> */}
                    <NavDropdown.Item onClick={goToSetting}>
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={openExitDialog}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar>
        </Container>
        <ExitDialog
          show={showExitDialog}
          handleClose={() => setShowExitDialog(false)}
          logOut={logOut}
        ></ExitDialog>
        <ErrorDialog
          show={showErrorDialog}
          text={errorText}
          handleClose={closeErrorDialog}
        ></ErrorDialog>
        <Progress show={isLogging} text={loggingText}></Progress>
      </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.get("user"),
    isLoggedIn: state.user.get("isLoggedIn"),
  };
}

const dispatchers = {
  getProfileRequest,
  fetchETHPrice,
  logoutRequest,
  connectUserToInstagram,
};

export default connect(mapStateToProps, dispatchers)(Header);
