import { defineStore } from "pinia";

import { AUTH_LOGIN, AUTH_USER_INFO } from "@/services/auth";
import { TOKEN_KEY } from "@/utils/localStorage";

import type {
  HttpErrorMessageResponse,
  HttpErrorResponse,
  AuthLoginRequest,
  AuthUser,
} from "@/types";

interface InitialState {
  user?: AuthUser;
  loading: boolean;
  error: string;
}

export const useAuthStore = defineStore({
  id: "auth",

  state: (): InitialState => ({
    user: undefined,
    loading: false,
    error: "",
  }),

  getters: {},

  actions: {
    async loginUser(body: AuthLoginRequest) {
      try {
        this.loading = true;
        const { data } = await AUTH_LOGIN(body);
        window.localStorage.setItem(TOKEN_KEY, data.token);
        await this.userInfo();
        this.loading = false;
      } catch (error) {
        this.error = (error as HttpErrorMessageResponse).message;
      }
    },

    async userInfo() {
      try {
        this.loading = true;
        const { data } = await AUTH_USER_INFO();
        this.user = data.user;
        this.loading = false;
      } catch (error) {
        this.error = (error as HttpErrorResponse).error;
      }
    },
  },
});
