import type { Module } from "vuex";

import { verifyHttpError } from "@/services";
import { AUTH_LOGIN, AUTH_USER_INFO } from "@/services/auth";
import { TOKEN_KEY } from "@/utils/localStorage";

import router from "@/router";

import type { RootState } from "@/stores/types";
import type { AuthLoginRequest, HttpErrorResponse, AuthUser } from "@/types";

const authModule: Module<RootState["auth"], RootState> = {
  namespaced: true,

  state: () => ({
    user: undefined,
    authenticated: false,
    loading: false,
    error: "",
  }),

  mutations: {
    setLoading: (state, loading: boolean) => (state.loading = loading),

    setError: (state, message: string) => (state.error = message),

    setAuthenticated: (state, authtenticated: boolean) =>
      (state.authenticated = authtenticated),

    setUser: (state, user: AuthUser) => (state.user = user),
  },

  actions: {
    async authLogin({ dispatch, commit, state }, body: AuthLoginRequest) {
      try {
        commit("setLoading", true);

        const { data, status } = await AUTH_LOGIN(body);

        if (status !== 200) throw new Error("Fail to login");

        window.localStorage.setItem(TOKEN_KEY, data.token);

        await dispatch("authGetUserInfo");

        if (!state.authenticated) return;

        router.push("/");
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;
          const errorMessage = (error as Error).message;

          if (!errorData) return commit("setError", errorMessage);

          return commit("setError", errorData.error);
        }

        commit("setError", result.message);
      } finally {
        commit("setLoading", false);
      }
    },

    async authGetUserInfo({ commit }): Promise<boolean> {
      try {
        commit("setError", "");
        commit("setLoading", true);

        const { data, status } = await AUTH_USER_INFO();

        if (status !== 200) throw new Error("Fail to authenticate");

        commit("setUser", data.user);
        commit("setAuthenticated", true);

        return true;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        window.localStorage.removeItem(TOKEN_KEY);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;

          if (!errorData) {
            commit("setError", (error as Error).message);
            return false;
          }

          commit("setError", errorData.error);
          return false;
        }

        commit("setError", result.message);
        return false;
      } finally {
        commit("setLoading", false);
      }
    },

    async authAutoLogin({ dispatch, commit, state }) {
      try {
        await dispatch("authGetUserInfo");

        if (!state.authenticated) throw new Error("Session Expired");

        return Promise.resolve();
      } catch (err) {
        commit("setAuthenticated", false);
        commit("setError", (err as Error).message);
      }
    },
  },
};

export default authModule;
