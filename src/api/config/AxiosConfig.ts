import axios from "axios";
import { Dispatch } from "redux";

import { loginUser, AuthActionT } from "../../ts/store/auth/authActions";

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
    (error) => {
      return Promise.reject(error);
    },
  );

  // Add interceptor for response
  apiClient.interceptors.response.use(
    (response) => {
      const token: string = response.headers["authorization"];
      if (token) {
        dispatch(loginUser(token) as AuthActionT);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return apiClient;
};

export default useApiClient;
