import { defineStore } from "pinia";

import { verifyHttpError } from "@/services";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_USER_INFO } from "@/services/auth";
import { TOKEN_KEY } from "@/utils/localStorage";

import type {
  AuthLoginRequest,
  AuthUser,
  HttpErrorResponse,
  AuthRegisterRequest,
} from "@/types";

interface InitialState {
  user?: AuthUser;
  authenticated: boolean;
  loading: boolean;
  error: string;
}

export const useAuthStore = defineStore({
  id: "auth",

  state: (): InitialState => ({
    user: undefined,
    authenticated: false,
    loading: false,
    error: "",
  }),

  getters: {},

  actions: {
    async authLogin(body: AuthLoginRequest) {
      try {
        this.error = "";
        this.loading = true;

        const { data, status } = await AUTH_LOGIN(body);

        if (status !== 200) throw new Error("Fail to login");

        window.localStorage.setItem(TOKEN_KEY, data.token);

        const isAuthenticated = await this.authGetUserInfo();

        if (!isAuthenticated) return;

        this.authenticated = true;
        this.router.push("/");
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;

          if (!errorData) return (this.error = (error as Error).message);

          return (this.error = errorData.error);
        }

        this.error = result.message;
      } finally {
        this.loading = false;
      }
    },

    async authGetUserInfo() {
      try {
        this.error = "";
        this.loading = true;

        const { data, status } = await AUTH_USER_INFO();

        if (status !== 200) throw new Error("Fail to authenticate");

        this.user = data.user;

        return true;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        window.localStorage.removeItem(TOKEN_KEY);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;

          if (!errorData) {
            this.error = (error as Error).message;
            return false;
          }

          this.error = errorData.error;
          return false;
        }

        this.error = result.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async authAutoLogin() {
      try {
        const isAuthenticated = await this.authGetUserInfo();

        if (!isAuthenticated) throw new Error("Session Expired");

        this.authenticated = true;

        return Promise.resolve();
      } catch (err) {
        this.authenticated = false;
        this.error = (err as Error).message;
      }
    },

    async authRegisterUser(body: AuthRegisterRequest) {
      try {
        this.error = "";
        this.loading = true;

        const { data, status } = await AUTH_REGISTER(body);

        if (status !== 201) throw new Error("Fail to register");

        window.localStorage.setItem(TOKEN_KEY, data.token);

        const isAuthenticated = await this.authGetUserInfo();

        if (!isAuthenticated) throw new Error("Session Expired");

        this.authenticated = true;
        this.router.push("/");
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;

          if (!errorData) return (this.error = (error as Error).message);

          return (this.error = errorData.error);
        }

        this.error = result.message;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = undefined;
      this.authenticated = false;
      this.router.push("/login");

      window.localStorage.removeItem(TOKEN_KEY);
    },
  },
});
