import type { GetterTree } from "vuex";

import type { RootState } from "@/stores/types";
import type { AuthUser } from "@/types";

export type Getters = {
  getterUser: (state: RootState["auth"]) => AuthUser | undefined;
};

export const getters: GetterTree<RootState["auth"], RootState> & Getters = {
  getterUser: (state) => state.user,
};
