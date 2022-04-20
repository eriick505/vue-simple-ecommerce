import type { GetterTree } from "vuex";

import type { RootState } from "@/stores/types";
import type { IProduct } from "@/types";

export type Getters = {
  isProductIsOnTheWishList: (
    state: RootState["product"]
  ) => (v: string) => boolean;

  getterProductList: (state: RootState["product"]) => IProduct[] | undefined;
  getterWishListQuantity: (state: RootState["product"]) => number;
};

export const getters: GetterTree<RootState["product"], RootState> & Getters = {
  isProductIsOnTheWishList: (state) => (productId: string) => {
    const productFound = state.wishList.find(
      (productDesiredId) => productDesiredId === productId
    );

    if (productFound) return true;
    else return false;
  },

  getterProductList: (state) => state.productList,

  getterWishListQuantity: (state) => state.wishList.length,
};
