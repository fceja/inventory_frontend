import { AuthActionT } from "@store/auth/authActions";
import { validateToken } from "@store/auth/authUtils";

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
    case "AUTH_USER":
      const isValid = validateToken(action.payload.token);

      return {
        ...state,
        isAuthd: isValid,
        authToken: action.payload.token,
      };

    case "LOGIN_USER":
      return {
        ...state,
        authToken: action.payload.token,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        authToken: null,
      };

    default:
      return state;
  }
};
export default authReducer;
