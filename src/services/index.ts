import axios, { type AxiosResponse } from "axios";
import { TOKEN_KEY } from "@/utils/localStorage";

export type HttpResponseData<T> = AxiosResponse<T>;

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export const http = axios.create({
  baseURL: `${baseUrl}`,
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(TOKEN_KEY);

  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!["Authorization"] = `bearer ${token}`;
  }

  return config;
});

export const verifyHttpError = (error: unknown) => {
  const isHttpError = axios.isAxiosError(error);

  if (isHttpError) {
    return {
      isHttpError,
      result: error,
    };
  }

  return {
    isHttpError,
    result: error as Error,
  };
};
