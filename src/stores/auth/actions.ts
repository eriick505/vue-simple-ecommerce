import router from "@/router";

import { verifyHttpError } from "@/services";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_USER_INFO } from "@/services/auth";

import { TOKEN_KEY } from "@/utils/localStorage";

import {
  AUTHENTICATED_MUTATION,
  ERROR_MUTATION,
  LOADING_MUTATION,
  RESET_MUTATION,
  USER_MUTATION,
} from "./mutation-types";

import type { ActionTree } from "vuex";
import type { RootState } from "@/stores/types";
import type {
  AuthLoginRequest,
  HttpErrorResponse,
  AuthRegisterRequest,
} from "@/types";

export const actions: ActionTree<RootState["auth"], RootState> = {
  async authLogin({ dispatch, commit, state }, body: AuthLoginRequest) {
    try {
      commit(LOADING_MUTATION, true);

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

        if (!errorData) return commit(ERROR_MUTATION, errorMessage);

        return commit(ERROR_MUTATION, errorData.error);
      }

      commit(ERROR_MUTATION, result.message);
    } finally {
      commit(LOADING_MUTATION, false);
    }
  },

  async authGetUserInfo({ commit }): Promise<boolean> {
    try {
      commit(ERROR_MUTATION, "");
      commit(LOADING_MUTATION, true);

      const { data, status } = await AUTH_USER_INFO();

      if (status !== 200) throw new Error("Fail to authenticate");

      commit(USER_MUTATION, data.user);
      commit(AUTHENTICATED_MUTATION, true);

      return true;
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      window.localStorage.removeItem(TOKEN_KEY);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;

        if (!errorData) {
          commit(ERROR_MUTATION, (error as Error).message);
          return false;
        }

        commit(ERROR_MUTATION, errorData.error);
        return false;
      }

      commit(ERROR_MUTATION, result.message);
      return false;
    } finally {
      commit(LOADING_MUTATION, false);
    }
  },

  async authAutoLogin({ dispatch, commit, state }) {
    try {
      await dispatch("authGetUserInfo");

      if (!state.authenticated) throw new Error("Session Expired");

      return Promise.resolve();
    } catch (err) {
      commit(AUTHENTICATED_MUTATION, false);
      commit(ERROR_MUTATION, (err as Error).message);
    }
  },

  async authRegisterUser(
    { commit, dispatch, state },
    body: AuthRegisterRequest
  ) {
    try {
      commit(ERROR_MUTATION, "");
      commit(LOADING_MUTATION, true);

      const { data, status } = await AUTH_REGISTER(body);

      if (status !== 201) throw new Error("Fail to register");

      window.localStorage.setItem(TOKEN_KEY, data.token);

      await dispatch("authGetUserInfo");

      if (!state.authenticated) throw new Error("Session Expired");

      router.push("/");
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;

        if (!errorData) return commit(ERROR_MUTATION, (error as Error).message);

        return commit(ERROR_MUTATION, errorData.error);
      }

      commit(ERROR_MUTATION, result.message);
    } finally {
      commit(LOADING_MUTATION, false);
    }
  },

  logout({ commit }) {
    commit(RESET_MUTATION);

    router.push("/login");

    window.localStorage.removeItem(TOKEN_KEY);
  },
};
