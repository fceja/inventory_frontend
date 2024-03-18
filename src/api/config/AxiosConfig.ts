import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// leaving empty, since we don't want axios errors logged
api.interceptors.response.use(undefined, () => {});
