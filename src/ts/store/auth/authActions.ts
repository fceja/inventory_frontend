import { Action } from "redux";

interface LoginAction extends Action {
  type: "LOGIN_USER";
  payload: { token: string };
}

interface LogoutAction extends Action {
  type: "LOGOUT_USER";
}

export type AuthActionT = LoginAction | LogoutAction;

const LOGIN_USER = "LOGIN_USER";

export const loginUser = (token: string) => ({
  type: LOGIN_USER,
  payload: { token },
});
