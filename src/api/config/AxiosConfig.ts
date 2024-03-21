import axios from "axios";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.response.use(
  /**
   * parse authorization bearer token from response and
   * apply to subsequent axios client requests
   */
  (response) => {
    const token = response.headers["authorization"];
    if (token) {
      apiClient.defaults.headers.common["authorization"] = `${token}`;
    }

    return response;
  },

  // leaving empty, since we don't want axios errors logged
  (_error) => {
    return;
  },
);
