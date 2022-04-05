import { http, type HttpResponseData } from "@/services";

import {
  SERVICE_AUTH_LOGIN,
  type AuthLoginRequest,
  type AuthLoginResponse,
} from "@/services/auth";

export const AUTH_LOGIN = (
  body: AuthLoginRequest
): Promise<HttpResponseData<AuthLoginResponse>> =>
  http.post(SERVICE_AUTH_LOGIN(), body);
