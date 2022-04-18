import type { Module } from "vuex";

import { actions } from "./actions";
import { mutations } from "./mutations";

import type { RootState } from "@/stores/types";

export const authModule: Module<RootState["auth"], RootState> = {
  namespaced: true,

  state: () => ({
    user: undefined,
    authenticated: false,
    loading: false,
    error: "",
  }),

  mutations,

  actions,
};
