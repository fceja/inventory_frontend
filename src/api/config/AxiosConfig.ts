import axios, { AxiosError } from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// custom error handler
const errorHandler = (error: AxiosError) => {
  console.error(error);

  return Promise.reject(error);
};

// register custom error handler
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
