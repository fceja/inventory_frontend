import axios from "axios";

import { setAuthd, setAuthToken } from "@store/auth/AuthActions";
import store from "@store/ConfigureStore";
import { setIsLoginModalOpen } from "@store/modal/ModalActions";

const useApiClient = () => {
  const apiClient = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // Add interceptor for request
  apiClient.interceptors.request.use(
    (request) => {
      const authState = store.getState().authState

      if (authState && authState.isAuthd) {
        request.headers["authorization"] = authState.authToken;
      } else {
        request.headers["authorization"] = null;
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
        store.dispatch(setAuthd(token))
        store.dispatch(setAuthToken(token));
        store.dispatch(setIsLoginModalOpen(false))
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
