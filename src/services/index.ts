import axios, { type AxiosResponse } from "axios";

export type HttpResponseData<T> = AxiosResponse<T>;

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export const http = axios.create({
  baseURL: `${baseUrl}`,
});
