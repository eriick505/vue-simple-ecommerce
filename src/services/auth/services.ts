import { http, type HttpResponseData } from "@/services";
import {
  SERVICE_AUTH_LOGIN,
  SERVICE_AUTH_USER_INFO,
  SERVICE_AUTH_REGISTER,
} from "@/services/auth";

import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthUserInfoResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "@/types";

export const AUTH_LOGIN = (
  body: AuthLoginRequest
): Promise<HttpResponseData<AuthLoginResponse>> =>
  http.post(SERVICE_AUTH_LOGIN(), body);

export const AUTH_USER_INFO = (): Promise<
  HttpResponseData<AuthUserInfoResponse>
> => http.post(SERVICE_AUTH_USER_INFO(), {});

export const AUTH_REGISTER = (
  body: AuthRegisterRequest
): Promise<HttpResponseData<AuthRegisterResponse>> =>
  http.post(SERVICE_AUTH_REGISTER(), body);
