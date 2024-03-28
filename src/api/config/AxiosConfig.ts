import axios from "axios";
import { Dispatch } from "redux";

import { authUser, AuthActionT } from "@store/auth/authActions";

const useApiClient = (dispatch: Dispatch<AuthActionT>, authState?: any) => {
  const apiClient = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // Add interceptor for request
  apiClient.interceptors.request.use(
    (request) => {
      if (authState) {
        request.headers["authorization"] = authState.authToken;
      }

      return request;
    },
    (_error) => {
      // leaving empty, since we don't want anything logged in console
    },
  );

  // Add interceptor for response
  apiClient.interceptors.response.use(
    (response) => {
      const token: string = response.headers["authorization"];
      if (token) {
        dispatch(authUser(token) as AuthActionT);
      }
      return response;
    },
    (_error) => {
      // leaving empty, since we don't want anything logged in console
    },
  );

  return apiClient;
};

export default useApiClient;
