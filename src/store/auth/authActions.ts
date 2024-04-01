import { Action } from "redux";

import { validateToken } from "@store/auth/authUtils";

const CLEAR_AUTH = "CLEAR_AUTH";
const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
const SET_AUTHD = "SET_AUTHD";

interface CheckTokenExpiryAction extends Action {
  type: "CHECK_TOKEN_EXPIRY";
  payload: null;
}

interface ClearAuthAction extends Action {
  type: "CLEAR_AUTH";
  payload: { isAuthd: boolean; authToken: null };
}

interface SetAuthdAction extends Action {
  type: "SET_AUTHD";
  payload: { isAuthd: boolean };
}

interface SetAuthTokenAction extends Action {
  type: "SET_AUTH_TOKEN";
  payload: { authToken: string };
}

export type AuthActionT =
  | CheckTokenExpiryAction
  | ClearAuthAction
  | SetAuthdAction
  | SetAuthTokenAction;

export const setAuthd = (token: string): AuthActionT => {
  const isValid = validateToken(token);

  return {
    type: SET_AUTHD,
    payload: { isAuthd: isValid },
  };
};

export const setAuthToken = (token: string): AuthActionT => {
  return {
    type: SET_AUTH_TOKEN,
    payload: { authToken: token },
  };
};

export const clearAuth = (): AuthActionT => {
  return {
    type: CLEAR_AUTH,
    payload: { isAuthd: false, authToken: null },
  };
};
