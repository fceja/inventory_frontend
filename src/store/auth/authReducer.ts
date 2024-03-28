import { AuthActionT } from "@store/auth/authActions";

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
