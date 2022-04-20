import {
  AuthMutationTypes as MutationTypes,
  type Mutations,
} from "./mutation-types";

import type { MutationTree } from "vuex";
import type { RootState } from "@/stores/types";

export const mutations: MutationTree<RootState["auth"]> & Mutations = {
  [MutationTypes.LOADING]: (state, loading) => {
    state.loading = loading;
  },

  [MutationTypes.ERROR]: (state, message) => {
    state.error = message;
  },

  [MutationTypes.AUTHENTICATED]: (state, authtenticated) => {
    state.authenticated = authtenticated;
  },

  [MutationTypes.USER]: (state, user) => {
    state.user = user;
  },

  [MutationTypes.RESET]: (state) => {
    state.user = undefined;
    state.authenticated = false;
  },
};
