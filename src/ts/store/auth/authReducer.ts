import { AuthActionT } from "./authActions";

interface InitialStateI {
  isLoggedIn: boolean;
  authToken: string | null;
}

const initialState: InitialStateI = {
  isLoggedIn: false,
  authToken: null,
};

const authReducer = (state = initialState, action: AuthActionT) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        authToken: action.payload.token,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedIn: false,
        authToken: null,
      };
    default:
      return state;
  }
};
export default authReducer;
