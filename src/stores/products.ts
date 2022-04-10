import { defineStore } from "pinia";

import { verifyHttpError } from "@/services";
import { GET_PRODUCT_LIST } from "@/services/products";

import { WISHLIST_KEY } from "@/utils/localStorage";

import type { HttpErrorResponse, IProduct } from "@/types";

interface InitialState {
  loading: boolean;
  error: string;
  productList?: IProduct[];
  productQuantity?: number;
  wishList: string[];
}

const wishListInitialState: string[] = JSON.parse(
  window.localStorage.getItem(WISHLIST_KEY) || "[]"
);

export const useProductStore = defineStore({
  id: "products",

  state: (): InitialState => ({
    loading: false,
    error: "",
    productList: undefined,
    productQuantity: undefined,
    wishList: wishListInitialState,
  }),

  getters: {},

  actions: {
    async getProductList() {
      try {
        this.error = "";
        this.loading = true;

        const { data, status } = await GET_PRODUCT_LIST();

        if (status !== 200) throw new Error("Fail to get product list");

        this.productList = data.products;
        this.productQuantity = data.quantity;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;
          this.error = errorData.error;
          return;
        }

        this.error = result.message;
      } finally {
        this.loading = false;
      }
    },

    toggleProductToWishList(productId: string) {
      const foundProductIdInWishList = this.wishList.find(
        (productDesiredId) => productDesiredId === productId
      );

      if (!foundProductIdInWishList) {
        this.addProductToWishList(productId);
      } else {
        this.removeProductToWishList(productId);
      }
    },

    addProductToWishList(productId: string) {
      this.wishList.push(productId);

      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(this.wishList));
    },

    removeProductToWishList(productId: string) {
      const wishListWithoutIdParam = this.wishList.filter(
        (productDesiredId) => productDesiredId !== productId
      );

      this.wishList = wishListWithoutIdParam;
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(this.wishList));
    },

    isProductIsOnTheWishList(productId: string) {
      const productFound = this.wishList.find(
        (productDesiredId) => productDesiredId === productId
      );

      if (productFound) return true;
      else return false;
    },
  },
});
