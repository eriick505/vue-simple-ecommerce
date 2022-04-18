import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_LIST,
} from "@/services/product";

import { verifyHttpError } from "@/services";
import { GET_CATEGORY_LIST } from "@/services/category";

import { WISHLIST_KEY } from "@/utils/localStorage";

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
  LOADING_PRODUCTCREATE_MUTATION,
  LOADING_PRODUCTDELETE_MUTATION,
  REMOVE_FROM_PRODUCTLIST,
} from "./mutation-types";

import type { ActionTree } from "vuex";
import type { HttpErrorResponse } from "@/types";
import type { RootState } from "@/stores/types";

export const actions: ActionTree<RootState["product"], RootState> = {
  async getProductList({ commit }) {
    try {
      commit(LOADING_GETPRODUCT_MUTATION, true);
      commit(ERROR_MUTATION, "");

      const { data, status } = await GET_PRODUCT_LIST();

      if (status !== 200) throw new Error("Fail to get product list");

      commit(PRODUCTLIST_MUTATION, data.products);
      commit(PRODUCTQUANTITY_MUTATION, data.quantity);
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;

        return commit(ERROR_MUTATION, errorData.error);
      }

      commit(ERROR_MUTATION, result.message);
    } finally {
      commit(LOADING_GETPRODUCT_MUTATION, false);
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
    commit(ADD_TO_WISHLIST_MUTATION, productId);

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishList));
  },

  removeProductToWishList({ commit, state }, productId: string) {
    const wishListWithoutIdParam = state.wishList.filter(
      (productDesiredId) => productDesiredId !== productId
    );

    commit(WISHLIST_MUTATION, wishListWithoutIdParam);

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishList));
  },

  isProductIsOnTheWishList({ state }, productId: string) {
    const productFound = state.wishList.find(
      (productDesiredId) => productDesiredId === productId
    );

    if (productFound) return true;
    else return false;
  },

  async getCategoryList({ commit }) {
    try {
      commit(LOADING_GETCATEGORY_MUTATION, true);
      commit(ERROR_MUTATION, "");

      const { data, status } = await GET_CATEGORY_LIST();

      if (status !== 200) throw new Error("Fail to get category list");

      commit(CATEGORYLIST_MUTATION, data.categories);
      commit(CATEGORYQUANTITY_MUTATION, data.quantity);
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;
        return commit(ERROR_MUTATION, errorData.error);
      }
      commit(ERROR_MUTATION, result.message);
    } finally {
      commit(LOADING_GETCATEGORY_MUTATION, false);
    }
  },

  async postProductCreate({ commit }, body: FormData) {
    try {
      commit(ERROR_MUTATION, "");
      commit(LOADING_PRODUCTCREATE_MUTATION, true);

      const { data, status } = await CREATE_PRODUCT(body);

      if (status !== 201) throw new Error("Fail to create a new product");

      return data.message;
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;
        return commit(ERROR_MUTATION, errorData.error);
      }

      commit(ERROR_MUTATION, result.message);
    } finally {
      commit(LOADING_PRODUCTCREATE_MUTATION, false);
    }
  },

  async deleteProduct({ commit }, productId: string) {
    try {
      commit(ERROR_MUTATION, "");
      commit(LOADING_PRODUCTDELETE_MUTATION, true);

      const { data, status } = await DELETE_PRODUCT(productId);

      if (status !== 202) throw new Error("Fail to delete product");

      return data;
    } catch (error) {
      const { isHttpError, result } = verifyHttpError(error);

      if (isHttpError) {
        const errorData = result.response?.data as HttpErrorResponse;
        return commit(ERROR_MUTATION, errorData.error);
      }

      commit(ERROR_MUTATION, result.message);
    } finally {
      commit(LOADING_PRODUCTDELETE_MUTATION, false);
    }
  },

  removeProductFromList({ commit, state }, productId: string) {
    const productIndexFound = state.productList?.findIndex(
      (product) => product.id_product === productId
    );

    if (productIndexFound !== undefined && productIndexFound !== -1) {
      commit(REMOVE_FROM_PRODUCTLIST, productIndexFound);
    }
  },
};
