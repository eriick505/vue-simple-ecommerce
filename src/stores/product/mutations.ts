import {
  LOADING_GETPRODUCT_MUTATION,
  ERROR_MUTATION,
  PRODUCTLIST_MUTATION,
  PRODUCTQUANTITY_MUTATION,
  ADD_TO_WISHLIST_MUTATION,
  WISHLIST_MUTATION,
  LOADING_GETCATEGORY_MUTATION,
  CATEGORYLIST_MUTATION,
  CATEGORYQUANTITY_MUTATION,
  LOADING_PRODUCTDELETE_MUTATION,
  REMOVE_FROM_PRODUCTLIST,
} from "./mutation-types";

import type { MutationTree } from "vuex";
import type { RootState } from "@/stores/types";
import type { ICategory, IProduct } from "@/types";

export const mutations: MutationTree<RootState["product"]> = {
  [LOADING_GETPRODUCT_MUTATION]: (state, loading: boolean) => {
    state.isLoading.getProductList = loading;
  },

  [ERROR_MUTATION]: (state, message: string) => {
    state.error = message;
  },

  [PRODUCTLIST_MUTATION]: (state, productList: IProduct[]) => {
    state.productList = productList;
  },

  [PRODUCTQUANTITY_MUTATION]: (state, quantity: number) => {
    state.productQuantity = quantity;
  },

  [ADD_TO_WISHLIST_MUTATION]: (state, productId: string) => {
    state.wishList.push(productId);
  },

  [WISHLIST_MUTATION]: (state, list: string[]) => {
    state.wishList = list;
  },

  [LOADING_GETCATEGORY_MUTATION]: (state, loading: boolean) => {
    state.isLoading.getCategoryList = loading;
  },

  [CATEGORYLIST_MUTATION]: (state, list: ICategory[]) => {
    state.categoryList = list;
  },

  [CATEGORYQUANTITY_MUTATION]: (state, quantity: number) => {
    state.categoryQuantity = quantity;
  },

  [LOADING_PRODUCTDELETE_MUTATION]: (state, loading: boolean) => {
    state.isLoading.deleteProduct = loading;
  },

  [REMOVE_FROM_PRODUCTLIST]: (state, productIndex: number) => {
    state.productList?.splice(productIndex, 1);
  },
};
