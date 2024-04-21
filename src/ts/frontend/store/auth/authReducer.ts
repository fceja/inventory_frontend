import { AuthActionT } from "@store/auth/AuthActions";

interface InitialStateI {
  isAuthd: boolean;
  authToken: string | null;
}

const initialState: InitialStateI = {
  isAuthd: false,
  authToken: null,
};

const authReducer = (state = initialState, action: AuthActionT) => {
  switch (action.type) {
    case "CLEAR_AUTH":
      return {
        ...state,
        authToken: action.payload.authToken,
        isAuthd: action.payload.isAuthd,
      };

    case "SET_AUTHD":
      return {
        ...state,
        isAuthd: action.payload.isAuthd,
      };

    case "SET_AUTH_TOKEN":
      return {
        ...state,
        authToken: action.payload.authToken,
      };

    default:
      return state;
  }
};

export default authReducer;
