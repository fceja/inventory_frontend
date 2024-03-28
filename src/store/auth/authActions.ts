import { Action } from "redux";

interface AuthAction extends Action {
  type: "AUTH_USER";
  payload: { token: string };
}

interface LoginAction extends Action {
  type: "LOGIN_USER";
  payload: { token: string };
}

interface LogoutAction extends Action {
  type: "LOGOUT_USER";
}

export type AuthActionT = AuthAction | LoginAction | LogoutAction;

const LOGIN_USER = "LOGIN_USER";
const AUTH_USER = "AUTH_USER";

export const authUser = (token: string) => ({
  type: AUTH_USER,
  payload: { token },
});

export const loginUser = (token: string) => ({
  type: LOGIN_USER,
  payload: { token },
});
