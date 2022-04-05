export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  message: string;
  token: string;
}

export interface AuthUserInfoResponse {
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: number;
}
