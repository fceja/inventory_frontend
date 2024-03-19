import axios from "axios";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// leaving empty, since we don't want axios errors logged
apiClient.interceptors.response.use(undefined, () => {});
