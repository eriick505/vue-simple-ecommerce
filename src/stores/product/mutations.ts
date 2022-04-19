import type { MutationTree } from "vuex";
import type { RootState } from "@/stores/types";

import {
  ProductMutationTypes as MutationTypes,
  type Mutations,
} from "./mutation-types";

export const mutations: MutationTree<RootState["product"]> & Mutations = {
  [MutationTypes.LOADING_GETPRODUCT]: (state, loading) => {
    state.isLoading.getProductList = loading;
  },

  [MutationTypes.ERROR]: (state, message) => {
    state.error = message;
  },

  [MutationTypes.PRODUCT_LIST]: (state, productList) => {
    state.productList = productList;
  },

  [MutationTypes.PRODUCT_QUANTITY]: (state, quantity) => {
    state.productQuantity = quantity;
  },

  [MutationTypes.ADD_TO_WISHLIST]: (state, productId) => {
    state.wishList.push(productId);
  },

  [MutationTypes.WISHLIST]: (state, list) => {
    state.wishList = list;
  },

  [MutationTypes.LOADING_GETCATEGORY]: (state, loading) => {
    state.isLoading.getCategoryList = loading;
  },

  [MutationTypes.LOADING_PRODUCTCREATE]: (state, loading) => {
    state.isLoading.getProductList = loading;
  },

  [MutationTypes.CATEGORY_LIST]: (state, list) => {
    state.categoryList = list;
  },

  [MutationTypes.CATEGORY_QUANTITY]: (state, quantity) => {
    state.categoryQuantity = quantity;
  },

  [MutationTypes.LOADING_PRODUCTDELETE]: (state, loading) => {
    state.isLoading.deleteProduct = loading;
  },

  [MutationTypes.REMOVE_FROM_PRODUCTLIST]: (state, productIndex) => {
    state.productList?.splice(productIndex, 1);
  },
};
