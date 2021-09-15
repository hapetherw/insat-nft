import Immutable from "immutable";
import * as ActionType from "actions/user";
import Storage from "utils/storage";
import Router from "next/router";

export const initialState = Immutable.fromJS({
  isLoading: false,
  isLoggedIn: false,
  user: null,
  contactResult: null,
  instagramPosts: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.GET_PROFILE_REQUEST:
    case ActionType.LOGIN_REQUEST:
    case ActionType.SIGNUP_REQUEST:
    case ActionType.LOGIN_INSTAGRAM_REQUEST:
    case ActionType.CONTACT_REQUEST:
      return state.set("isLoading", true);
    case ActionType.LOGIN_SUCCESS:
    case ActionType.LOGIN_INSTAGRAM_SUCCESS:
    case ActionType.SIGNUP_SUCCESS:
      Storage.saveAccessToken(action.payload.accessToken);
      Storage.setRefreshToken(action.payload.refreshToken);
      let redirect_url = Storage.getRedirectUrl();
      if (redirect_url) {
        Router.push(redirect_url);
        Storage.setRedirectUrl("");
      } else {
        Router.push("/");
      }
      return state.merge(
        Object.assign(
          {},
          {
            isLoading: false,
            isLoggedIn: true,
            user: action.payload,
          }
        )
      );
    case ActionType.GET_PROFILE_SUCCESS:
      return state.merge(
        Object.assign(
          {},
          {
            isLoading: false,
            isLoggedIn: true,
            user: action.payload,
          }
        )
      );
    case ActionType.GET_PROFILE_FAILURE:
    case ActionType.SIGNUP_FAILURE:
    case ActionType.LOGIN_FAILURE:
    case ActionType.LOGIN_INSTAGRAM_FAILURE:
      return state.merge(
        Object.assign(
          {},
          {
            isLoading: false,
            isLoggedIn: false,
          }
        )
      );
    case ActionType.LOGOUT_REQUEST:
      Storage.saveAccessToken("");
      Storage.setRefreshToken("");
      Storage.setRedirectUrl("");
      Router.push("/login");
      return state.merge(
        Object.assign(
          {},
          {
            isLoggedIn: false,
            user: null,
          }
        )
      );
    case ActionType.GET_POSTS_REQUEST:
      return state.set("isLoading", true);
    case ActionType.GET_POSTS_SUCCESS:
      return state.merge(
        Object.assign(
          {},
          {
            instagramPosts: action.payload.edges,
          }
        )
      );
    case ActionType.GET_POSTS_FAILURE:
      return state.set("isLoading", false);
    case ActionType.CONTACT_DONE:
      return state.merge(
        Object.assign(
          {},
          {
            isLoading: false,
            contactResult: action.payload,
          }
        )
      );
    default:
      return state;
  }
}
