import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_LIST,
} from "@/services/product";

import { verifyHttpError } from "@/services";
import { GET_CATEGORY_LIST } from "@/services/category";

import { WISHLIST_KEY } from "@/utils/localStorage";

import { MutationTypes } from "./mutation-types";

import type { Actions } from "./action-types";
import type { ActionTree } from "vuex";
import type { HttpErrorResponse } from "@/types";
import type { RootState } from "@/stores/types";

export const actions: ActionTree<RootState["product"], RootState> & Actions = {
  async getProductList({ commit }) {
    try {
      commit(MutationTypes.LOADING_GETPRODUCT, true);
      commit(MutationTypes.ERROR, "");

      const { data, status } = await GET_PRODUCT_LIST();

      if (status !== 200) throw new Error("Fail to get product list");

      commit(MutationTypes.PRODUCT_LIST, data.products);
      commit(MutationTypes.PRODUCT_QUANTITY, data.quantity);
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;

        return commit(MutationTypes.ERROR, errorData.error);
      }

      commit(MutationTypes.ERROR, result.message);
    } finally {
      commit(MutationTypes.LOADING_GETPRODUCT, false);
    }
  },

  toggleProductToWishList({ dispatch, state }, productId: string) {
    const foundProductIdInWishList = state.wishList.find(
      (productDesiredId) => productDesiredId === productId
    );

    if (!foundProductIdInWishList) {
      dispatch("addProductToWishList", productId);
    } else {
      dispatch("removeProductToWishList", productId);
    }
  },

  addProductToWishList({ commit, state }, productId: string) {
    commit(MutationTypes.ADD_TO_WISHLIST, productId);

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishList));
  },

  removeProductToWishList({ commit, state }, productId: string) {
    const wishListWithoutIdParam = state.wishList.filter(
      (productDesiredId) => productDesiredId !== productId
    );

    commit(MutationTypes.WISHLIST, wishListWithoutIdParam);

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishList));
  },

  // isProductIsOnTheWishList({ state }, productId: string) {
  //   const productFound = state.wishList.find(
  //     (productDesiredId) => productDesiredId === productId
  //   );

  //   if (productFound) return true;
  //   else return false;
  // },

  async getCategoryList({ commit }) {
    try {
      commit(MutationTypes.LOADING_GETCATEGORY, true);
      commit(MutationTypes.ERROR, "");

      const { data, status } = await GET_CATEGORY_LIST();

      if (status !== 200) throw new Error("Fail to get category list");

      commit(MutationTypes.CATEGORY_LIST, data.categories);
      commit(MutationTypes.CATEGORY_QUANTITY, data.quantity);
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;
        return commit(MutationTypes.ERROR, errorData.error);
      }

      commit(MutationTypes.ERROR, result.message);
    } finally {
      commit(MutationTypes.LOADING_GETCATEGORY, false);
    }
  },

  async postProductCreate({ commit }, body: FormData) {
    try {
      commit(MutationTypes.ERROR, "");
      commit(MutationTypes.LOADING_PRODUCTCREATE, true);

      const { data, status } = await CREATE_PRODUCT(body);

      if (status !== 201) throw new Error("Fail to create a new product");

      return data.message;
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;
        return commit(MutationTypes.ERROR, errorData.error);
      }

      commit(MutationTypes.ERROR, result.message);
    } finally {
      commit(MutationTypes.LOADING_PRODUCTCREATE, false);
    }
  },

  async deleteProduct({ commit }, productId: string) {
    try {
      commit(MutationTypes.ERROR, "");
      commit(MutationTypes.LOADING_PRODUCTDELETE, true);

      const { data, status } = await DELETE_PRODUCT(productId);

      if (status !== 202) throw new Error("Fail to delete product");

      return data;
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;
        return commit(MutationTypes.ERROR, errorData.error);
      }

      commit(MutationTypes.ERROR, result.message);
    } finally {
      commit(MutationTypes.LOADING_PRODUCTDELETE, false);
    }
  },

  removeProductFromList({ commit, state }, productId: string) {
    const productIndexFound = state.productList?.findIndex(
      (product) => product.id_product === productId
    );

    if (productIndexFound !== undefined && productIndexFound !== -1) {
      commit(MutationTypes.REMOVE_FROM_PRODUCTLIST, productIndexFound);
    }
  },
};
