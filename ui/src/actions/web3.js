import API from "utils/api";
import IPFSSerivce from "../utils/ipfs";
import store from "../contract/web3";
import Helpers from "../utils/helper";
import configs from "../config";
import NotificationManager from "react-notifications/lib/NotificationManager";

export const GET_POSTS_REQUEST = Symbol("GET_POSTS_REQUEST");
export const GET_POSTS_SUCCESS = Symbol("GET_POSTS_SUCCESS");
export const GET_POSTS_FAILURE = Symbol("GET_POSTS_FAILURE");

export const GET_OFFERS_REQUEST = Symbol("GET_OFFERS_REQUEST");
export const GET_OFFERS_SUCCESS = Symbol("GET_OFFERS_SUCCESS");
export const GET_OFFERS_FAILURE = Symbol("GET_OFFERS_FAILURE");

export const GET_OFFER_DETAIL_REQUEST = Symbol("GET_OFFER_DETAIL_REQUEST");
export const GET_OFFER_DETAIL_SUCCESS = Symbol("GET_OFFER_DETAIL_SUCCESS");
export const GET_OFFER_DETAIL_FAILURE = Symbol("GET_OFFER_DETAIL_FAILURE");

export const GET_POST_WITH_URL_REQUEST = Symbol("GET_POST_WITH_URL_REQUEST");
export const GET_POST_WITH_URL_SUCCESS = Symbol("GET_POST_WITH_URL_SUCCESS");
export const GET_POST_WITH_URL_FAILURE = Symbol("GET_POST_WITH_URL_FAILURE");

export const GET_EXTRAPOST_WITH_USERNAME_REQUEST = Symbol("GET_EXTRAPOST_WITH_USERNAME_REQUEST");
export const GET_EXTRAPOST_WITH_USERNAME_SUCCESS = Symbol("GET_EXTRAPOST_WITH_USERNAME_SUCCESS");
export const GET_EXTRAPOST_WITH_USERNAME_FAILURE = Symbol("GET_EXTRAPOST_WITH_USERNAME_FAILURE");

export const CREATE_OFFER_REQUEST = Symbol("CREATE_OFFER_REQUEST");
export const CREATE_OFFER_SUCCESS = Symbol("CREATE_OFFER_SUCCESS");
export const CREATE_OFFER_FAILURE = Symbol("CREATE_OFFER_FAILURE");

export const CANCEL_OFFER_REQUEST = Symbol("CANCEL_OFFER_REQUEST");
export const CANCEL_OFFER_SUCCESS = Symbol("CANCEL_OFFER_SUCCESS");
export const CANCEL_OFFER_FAILURE = Symbol("CANCEL_OFFER_FAILURE");

export const ACCEPT_OFFER_REQUEST = Symbol("ACCEPT_OFFER_REQUEST");
export const ACCEPT_OFFER_SUCCESS = Symbol("ACCEPT_OFFER_REQUEST");
export const ACCEPT_OFFER_FAILURE = Symbol("ACCEPT_OFFER_FAILURE");

const ipfsService = new IPFSSerivce();

export function getOffersByPagination(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_OFFERS_REQUEST,
      payload,
    });

    const { size, page, isSold } = payload;
    
    try {
      const response = await API.get(
        `${configs.offerListUrl}/${page}/${size}/${isSold.toString()}`
      );
      if (response.success && response.data) {
        let results = response.data;
        dispatch({
          type: GET_OFFERS_SUCCESS,
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

export function getPosts(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_POSTS_REQUEST,
      payload,
    });

    const { isTrend, page, size } = payload;
    
    try {
      const response = await API.get(
        `${configs.postListUrl}/?trending=${isTrend.toString()}&page=${page.toString()}&size=${size}`
      );
      if (response.success && response.data) {
        let results = response.data;
        dispatch({
          type: GET_POSTS_SUCCESS,
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
export function getOfferById(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_OFFER_DETAIL_REQUEST,
      payload,
    });

    const { id } = payload;

    try {
      const response = await API.get(`${configs.offerUrl}/${id}`);
      if (response.success && response.data) {
        let results = response.data;
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

export function getPostWithUrl(payload) {
  return async (dispatch) => {
    dispatch({
      type: GET_POST_WITH_URL_REQUEST,
      payload,
    });

    const { url } = payload;

    try {
      const response = await API.get(`${configs.getPostUrl}/${url}`);
      if (response.success && response.data) {
        let results = response.data;
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

export function createOffer(payload) {
  return async (dispatch) => {
    dispatch({
      type: CREATE_OFFER_REQUEST,
      payload,
    });

    try {
      const { url, price } = payload;
      const auctionCreationResponse = await store.createOffer(url, price);
      console.log(auctionCreationResponse);
      if(auctionCreationResponse.success) {
        const response = await API.post(configs.offerUrl, {...payload, transactionHash: auctionCreationResponse.transactionHash });
        return response;
      } else {
        return auctionCreationResponse;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export function acceptOffer(payload) {
  return async (dispatch) => {
    dispatch({
      type: ACCEPT_OFFER_REQUEST
    });

    try {
      const { url, isFirstMint } = payload;
      const seller = store.getStore('account');

      console.log(seller);
      if(seller) {
        if(!isFirstMint) {
          await store.grantPermissionResell(url);
        }
        const response = await API.post(configs.acceptOfferUrl, { url, seller });
        if(response.success) {
          return response.data;
        } else {
          console.log(response);
          return null;
        }
      } else {
        NotificationManager.warning('You need to connect Metamask to accept this offer', 'Warning');
        return null;
      }
    } catch(err) {
      console.log(err);
      return null;
    }
  }
}

export function cancelOffer(payload) {
  return async (dispatch) => {
    dispatch({
      type: CANCEL_OFFER_REQUEST
    });

    try {
      const { url } = payload;
      const auctionCreationResponse = await store.cancelOffer(url);
      console.log(auctionCreationResponse);
      if(auctionCreationResponse.success) {
        const response = await API.post(configs.cancelOfferUrl, {...payload, transactionHash: auctionCreationResponse.transactionHash });
        if (response.success) {
          return response.data;
        } else {
          console.log(response);
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export function getInstagramExtraContentsWithUserName(payload) 
{
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_EXTRAPOST_WITH_USERNAME_REQUEST,
        payload,
      });
      try {
        const response = await API.post(configs.instagramExtraContentsUrl,payload);

        if (response.success && response.data) {
          return response.data;
        } else {
          return null;
        }
      } catch (err) {
        console.log(err);
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
}