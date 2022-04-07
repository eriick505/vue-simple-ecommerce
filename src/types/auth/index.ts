export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  message: string;
  token: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: number;
}

export interface AuthUserInfoResponse {
  user: AuthUser;
}

export interface AuthRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthRegisterResponse {
  message: string;
  user: AuthUser;
  token: string;
}
