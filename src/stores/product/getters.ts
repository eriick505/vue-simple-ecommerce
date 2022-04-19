import type { GetterTree } from "vuex";

import type { RootState } from "@/stores/types";

export type Getters = {
  isProductIsOnTheWishList: (
    state: RootState["product"]
  ) => (v: string) => boolean;
  getError(state: RootState["product"]): string;
};

export const getters: GetterTree<RootState["product"], RootState> & Getters = {
  isProductIsOnTheWishList: (state) => (productId: string) => {
    const productFound = state.wishList.find(
      (productDesiredId) => productDesiredId === productId
    );

    if (productFound) return true;
    else return false;
  },

  getError: (state) => {
    return state.error;
  },
};
