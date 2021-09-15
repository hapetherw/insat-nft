import API from "utils/api";
import Crypto from "utils/crypto";
import Helpers from "../utils/helper";
import configs from "../config";

export const LOGIN_REQUEST = Symbol("LOGIN_REQUEST");
export const LOGIN_SUCCESS = Symbol("LOGIN_SUCCESS");
export const LOGIN_FAILURE = Symbol("LOGIN_FAILURE");

export const SIGNUP_REQUEST = Symbol("SIGNUP_REQUEST");
export const SIGNUP_SUCCESS = Symbol("SIGNUP_SUCCESS");
export const SIGNUP_FAILURE = Symbol("SIGNUP_FAILURE");

export const LOGOUT_REQUEST = Symbol("LOGOUT_REQUEST");

export const GET_PROFILE_REQUEST = Symbol("GET_PROFILE_REQUEST");
export const GET_PROFILE_SUCCESS = Symbol("GET_PROFILE_SUCCESS");
export const GET_PROFILE_FAILURE = Symbol("GET_PROFILE_FAILURE");

export const CONNECT_INSTAGRAM_REQUEST = Symbol("CONNECT_INSTAGRAM_REQUEST");
export const CONNECT_INSTAGRAM_SUCCESS = Symbol("CONNECT_INSTAGRAM_SUCCESS");
export const CONNECT_INSTAGRAM_FAILURE = Symbol("CONNECT_INSTAGRAM_FAILURE");

export const GET_OFFERS_BY_USER_REQUEST = Symbol("GET_OFFERS_BY_USER_REQUEST");
export const GET_OFFERS_BY_USER_SUCCESS = Symbol("GET_OFFERS_BY_USER_SUCCESS");
export const GET_OFFERS_BY_USER_FAILURE = Symbol("GET_OFFERS_BY_USER_FAILURE");

export const GET_AUCTIONS_BY_USER_REQUEST = Symbol(
  "GET_AUCTIONS_BY_USER_REQUEST"
);
export const GET_AUCTIONS_BY_USER_SUCCESS = Symbol(
  "GET_AUCTIONS_BY_USER_SUCCESS"
);
export const GET_AUCTIONS_BY_USER_FAILURE = Symbol(
  "GET_AUCTIONS_BY_USER_FAILURE"
);

export const GET_NFTS_BY_USER_REQUEST = Symbol("GET_NFTS_BY_USER_REQUEST");
export const GET_NFTS_BY_USER_SUCCESS = Symbol("GET_NFTS_BY_USER_SUCCESS");
export const GET_NFTS_BY_USER_FAILURE = Symbol("GET_NFTS_BY_USER_FAILURE");

export const CHANGE_USER_PASSWORD = Symbol("CHANGE_USER_PASSWORD");
export const CHANGE_USER_PASSWORD_SUCCESS = Symbol("CHANGE_USER_PASSWORD_SUCCESS");
export const CHANGE_USER_PASSWORD_FAILURE = Symbol("CHANGE_USER_PASSWORD_FAILURE");

export const UPDATE_USER_PROFILE = Symbol("UPDATE_USER_PROFILE");
export const UPDATE_USER_PROFILE_SUCCESS = Symbol("UPDATE_USER_PROFILE_SUCCESS");
export const UPDATE_USER_PROFILE_FAILURE = Symbol("UPDATE_USER_PROFILE_FAILURE");

export const GET_POSTS_REQUEST = Symbol("GET_POSTS_REQUEST");
export const GET_POSTS_SUCCESS = Symbol("GET_POSTS_SUCCESS");
export const GET_POSTS_FAILURE = Symbol("GET_POSTS_FAILURE");

export const LOGIN_INSTAGRAM_REQUEST = Symbol("LOGIN_INSTAGRAM_REQUEST");
export const LOGIN_INSTAGRAM_SUCCESS = Symbol("LOGIN_INSTAGRAM_SUCCESS");
export const LOGIN_INSTAGRAM_FAILURE = Symbol("LOGIN_INSTAGRAM_FAILURE");

export const FETCH_ETH_PRICE_SUCCESS = Symbol("FETCH_ETH_PRICE_SUCCESS");

export const CONTACT_REQUEST = Symbol("CONTACT_REQUEST");
export const CONTACT_DONE = Symbol("CONTACT_DONE");

export function loginRequest(payload) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload,
    });
    const { email, password } = payload;

    try {
      const response = await API.post(configs.logInUrl, {
        email,
        password: Crypto.encrypt(password),
      });
      console.log(response);
      if (response.success && response.data) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload,
        });
        console.log(response.error);
      }
      return response;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload,
      });
      console.log(error);
      return false;
    }
  };
}

export function signupRequest(payload) {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP_REQUEST,
      payload,
    });

    const {
      username,
      fullName,
      email,
      password,
      passwordConfirmation,
      accessToken,
    } = payload;

    try {
      const response = await API.post(configs.signUpUrl, {
        username,
        fullName,
        email,
        password: Crypto.encrypt(password),
        passwordConfirmation: Crypto.encrypt(passwordConfirmation),
        accessToken,
      });

      if (response.success && response.data) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: SIGNUP_FAILURE,
          payload,
        });
        console.log("error on signup", response.error);
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNUP_FAILURE,
        payload,
      });
      return false;
    }
  };
}

export function logoutRequest() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    return true;
  };
}

export function getProfileRequest() {
  return async (dispatch) => {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    try {
      const response = await API.get(configs.getProfileUrl);
      if (response.success && response.data) {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: response.data,
        });
        return true;
      } else {
        console.log("error on signup", response.error);
        return false;
      }
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: SIGNUP_FAILURE,
      //   payload
      // });
      return false;
    }
  };
}

export async function getProfileByUserId(payload) {
  try {
    const response = await API.get(`/user/${payload.username}`);
    if (response.success && response.data) {
      return response.data;
    } else {
      console.log("error on profile", response.error);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function loginWithInstagram(payload) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_INSTAGRAM_REQUEST,
      payload,
    });

    try {
      const response = await API.post(configs.logInWithInstagramUrl, { ...payload });
      if (response.success && response.data) {
        dispatch({
          type: LOGIN_INSTAGRAM_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: LOGIN_INSTAGRAM_FAILURE,
          payload,
        });
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_INSTAGRAM_FAILURE,
        payload,
      });
      return false;
    }
  };
}

export function connectUserToInstagram(payload) {
  return async (dispatch) => {
    dispatch({
      type: CONNECT_INSTAGRAM_REQUEST,
    });

    try {
      const response = await API.post(configs.connectInstagramUrl, payload);

      console.log(response);
      if (response.success && response.data) {
        dispatch({
          type: CONNECT_INSTAGRAM_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        console.log(response.error);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export function updateProfile(payload) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_USER_PROFILE,
    });

    try {
      const response = await API.post(configs.updateUserProflieUrl, payload);

      if (response.success) {
        dispatch({
          type: UPDATE_USER_PROFILE_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: UPDATE_USER_PROFILE_FAILURE,
          payload,
        });
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_USER_PROFILE_FAILURE,
        payload,
      });
      return null;
    }
  };
}

export function changePassword(payload) {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_USER_PASSWORD,
    });

    try {
      const { oldPassword, newPassword, confirmPassword, passwordVisible } = payload;
      let formData = {
        newPassword: Crypto.encrypt(newPassword),
        confirmPassword: Crypto.encrypt(confirmPassword),
        ...(passwordVisible && { oldPassword: Crypto.encrypt(oldPassword) })
      };
      const response = await API.post(configs.changePasswordUrl, formData);

      if (response.success) {
        dispatch({
          type: CHANGE_USER_PASSWORD_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: CHANGE_USER_PASSWORD_FAILURE,
          payload,
        });
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_USER_PASSWORD_FAILURE,
        payload,
      });
      return null;
    }
  };
}

export function fetchETHPrice() {
  return async (dispatch) => {
    try {
      const result = await Helpers.fetchEthToUsd();
      if (result) {
        dispatch({
          type: FETCH_ETH_PRICE_SUCCESS,
          payload: result.price,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ETH_PRICE_SUCCESS,
        payload: 0,
      });
    }
  };
}

export function getOffersByUserId(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_OFFERS_BY_USER_REQUEST,
      payload,
    });

    const { id } = payload;

    try {
      const response = await API.post(`/user/offers/${id}`);
      if (response.success && response.data) {
        let results = response.data;
        dispatch({
          type: GET_OFFERS_BY_USER_SUCCESS,
          payload: results,
        });
        return results;
      } else {
        console.log(response.error);
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export function getAuctionsByUserId(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_AUCTIONS_BY_USER_REQUEST,
      payload,
    });

    const { id } = payload;

    try {
      const response = await API.post(`/user/auctions/${id}`);
      if (response.success && response.data) {
        let results = response.data;
        dispatch({
          type: GET_AUCTIONS_BY_USER_SUCCESS,
          payload: results,
        });
        return results;
      } else {
        console.log(response.error);
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export function getNftsByUserId(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_NFTS_BY_USER_REQUEST,
      payload,
    });

    const { id } = payload;

    try {
      const response = await API.post(`/user/nfts/${id}`);
      if (response.success && response.data) {
        let results = response.data;
        dispatch({
          type: GET_NFTS_BY_USER_SUCCESS,
          payload: results,
        });
        return results;
      } else {
        console.log(response.error);
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export function setContactResult(payload) {
  return async (dispatch) => {
    dispatch({
      type: CONTACT_DONE,
      payload,
    });
  };
}

export function submitContact(payload) {
  return async (dispatch) => {
    dispatch({
      type: CONTACT_REQUEST,
      payload,
    });
    try {
      const response = await API.post(configs.contactUsUrl, payload);
      let results = response.data;
      dispatch({
        type: CONTACT_DONE,
        payload: response,
      });
      return results;
    } catch (err) {
      dispatch({
        type: CONTACT_DONE,
        payload: { success: false },
      });
      return err;
    }
  };
}
