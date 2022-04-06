import { defineStore } from "pinia";

import { verifyHttpError } from "@/services";
import { AUTH_LOGIN, AUTH_USER_INFO } from "@/services/auth";
import { TOKEN_KEY } from "@/utils/localStorage";

import type {
  HttpErrorMessageResponse,
  AuthLoginRequest,
  AuthUser,
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
    async loginUser(body: AuthLoginRequest) {
      try {
        this.error = "";
        this.loading = true;

        const { data } = await AUTH_LOGIN(body);

        window.localStorage.setItem(TOKEN_KEY, data.token);

        const isAuthenticated = await this.userInfo();

        if (!isAuthenticated) return;

        this.authenticated = true;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorMessageResponse;
          this.error = errorData.message;
          return;
        }

        this.error = result.message;
      } finally {
        this.loading = false;
      }
    },

    async userInfo() {
      try {
        this.error = "";
        this.loading = true;

        const { data, status } = await AUTH_USER_INFO();

        if (status !== 200) throw new Error("Fail to authenticate");

        this.user = data.user;

        return true;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorMessageResponse;
          this.error = errorData.message;
          return false;
        }

        this.error = result.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
