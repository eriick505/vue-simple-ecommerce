import { actions } from "./actions";
import { mutations } from "./mutations";

import type { Module } from "vuex";
import type { RootState } from "@/stores/types";

export const authModule: Module<RootState["auth"], RootState> = {
  state: () => ({
    user: undefined,
    authenticated: false,
    loading: false,
    error: "",
  }),

  mutations,

  actions,
};
