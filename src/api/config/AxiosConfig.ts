import axios from "axios";
import { Dispatch } from "redux";

import { loginUser, AuthActionT } from "../../ts/store/auth/authActions";

const useApiClient = (dispatch: Dispatch<AuthActionT>) => {
  const apiClient = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // Add interceptor for responses
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
