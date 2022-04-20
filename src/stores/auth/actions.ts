import router from "@/router";

import { verifyHttpError } from "@/services";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_USER_INFO } from "@/services/auth";

import { TOKEN_KEY } from "@/utils/localStorage";

import { AuthMutationTypes } from "./mutation-types";

import type { Actions } from "./action-types";
import type { ActionTree } from "vuex";
import type { RootState } from "@/stores/types";
import type {
  AuthLoginRequest,
  HttpErrorResponse,
  AuthRegisterRequest,
} from "@/types";

export const actions: ActionTree<RootState["auth"], RootState> & Actions = {
  async authLogin({ dispatch, commit, state }, body: AuthLoginRequest) {
    try {
      commit(AuthMutationTypes.LOADING, true);

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

        if (!errorData) return commit(AuthMutationTypes.ERROR, errorMessage);

        return commit(AuthMutationTypes.ERROR, errorData.error);
      }

      commit(AuthMutationTypes.ERROR, result.message);
    } finally {
      commit(AuthMutationTypes.LOADING, false);
    }
  },

  async authGetUserInfo({ commit }) {
    try {
      commit(AuthMutationTypes.ERROR, "");
      commit(AuthMutationTypes.LOADING, true);

      const { data, status } = await AUTH_USER_INFO();

      if (status !== 200) throw new Error("Fail to authenticate");

      commit(AuthMutationTypes.USER, data.user);
      commit(AuthMutationTypes.AUTHENTICATED, true);

      return true;
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      window.localStorage.removeItem(TOKEN_KEY);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;

        if (!errorData) {
          commit(AuthMutationTypes.ERROR, (error as Error).message);
          return false;
        }

        commit(AuthMutationTypes.ERROR, errorData.error);
        return false;
      }

      commit(AuthMutationTypes.ERROR, result.message);
      return false;
    } finally {
      commit(AuthMutationTypes.LOADING, false);
    }
  },

  async authAutoLogin({ dispatch, commit, state }) {
    try {
      await dispatch("authGetUserInfo");

      if (!state.authenticated) throw new Error("Session Expired");

      return Promise.resolve();
    } catch (err) {
      commit(AuthMutationTypes.AUTHENTICATED, false);
      commit(AuthMutationTypes.ERROR, (err as Error).message);
    }
  },

  async authRegisterUser(
    { commit, dispatch, state },
    body: AuthRegisterRequest
  ) {
    try {
      commit(AuthMutationTypes.ERROR, "");
      commit(AuthMutationTypes.LOADING, true);

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

        if (!errorData)
          return commit(AuthMutationTypes.ERROR, (error as Error).message);

        return commit(AuthMutationTypes.ERROR, errorData.error);
      }

      commit(AuthMutationTypes.ERROR, result.message);
    } finally {
      commit(AuthMutationTypes.LOADING, false);
    }
  },

  logout({ commit }) {
    commit(AuthMutationTypes.RESET, undefined);

    router.push("/login");

    window.localStorage.removeItem(TOKEN_KEY);
  },
};
