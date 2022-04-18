import {
  AUTHENTICATED_MUTATION,
  ERROR_MUTATION,
  LOADING_MUTATION,
  RESET_MUTATION,
  USER_MUTATION,
} from "./mutation-types";

import type { MutationTree } from "vuex";
import type { RootState } from "@/stores/types";
import type { AuthUser } from "@/types";

export const mutations: MutationTree<RootState["auth"]> = {
  [LOADING_MUTATION]: (state, loading: boolean) => {
    state.loading = loading;
  },

  [ERROR_MUTATION]: (state, message: string) => {
    state.error = message;
  },

  [AUTHENTICATED_MUTATION]: (state, authtenticated: boolean) => {
    state.authenticated = authtenticated;
  },

  [USER_MUTATION]: (state, user: AuthUser) => {
    state.user = user;
  },

  [RESET_MUTATION]: (state) => {
    state.user = undefined;
    state.authenticated = false;
  },
};
