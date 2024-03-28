import { Action } from "redux";
import { validateToken } from "@store/auth/authUtils";

const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
const SET_AUTHD = "SET_AUTHD";

interface SetAuthdAction extends Action {
  type: "SET_AUTHD";
  payload: { isAuthd: boolean };
}

interface SetAuthTokenAction extends Action {
  type: "SET_AUTH_TOKEN";
  payload: { authToken: string };
}

export type AuthActionT = SetAuthdAction | SetAuthTokenAction;

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
