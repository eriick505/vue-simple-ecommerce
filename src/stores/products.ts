import { defineStore } from "pinia";

import { verifyHttpError } from "@/services";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_LIST,
} from "@/services/product";
import { GET_CATEGORY_LIST } from "@/services/category";

import { WISHLIST_KEY } from "@/utils/localStorage";

import type { HttpErrorResponse, ICategory, IProduct } from "@/types";

interface InitialState {
  isLoading: {
    getProductList: boolean;
    getCategoryList: boolean;
    postProductCreate: boolean;
    deleteProduct: boolean;
  };
  error: string;
  productList?: IProduct[];
  productQuantity?: number;
  categoryList?: ICategory[];
  categoryQuantity?: number;
  wishList: string[];
}

const wishListInitialState: string[] = JSON.parse(
  window.localStorage.getItem(WISHLIST_KEY) || "[]"
);

export const useProductStore = defineStore({
  id: "products",

  state: (): InitialState => ({
    isLoading: {
      getProductList: false,
      getCategoryList: false,
      postProductCreate: false,
      deleteProduct: false,
    },
    error: "",
    productList: undefined,
    productQuantity: undefined,
    categoryList: undefined,
    categoryQuantity: undefined,
    wishList: wishListInitialState,
  }),

  getters: {
    getterProductList: (state) => state.productList,
    getterWishListQuantity: (state) => state.wishList.length,
  },

  actions: {
    async getProductList() {
      try {
        this.error = "";
        this.isLoading.getProductList = true;

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
        this.isLoading.getProductList = false;
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

    async getCategoryList() {
      try {
        this.error = "";
        this.isLoading.getCategoryList = true;

        const { data, status } = await GET_CATEGORY_LIST();

        if (status !== 200) throw new Error("Fail to get category list");

        this.categoryList = data.categories;
        this.categoryQuantity = data.quantity;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;
          this.error = errorData.error;
          return;
        }

        this.error = result.message;
      } finally {
        this.isLoading.getCategoryList = false;
      }
    },

    async postProductCreate(body: FormData) {
      try {
        this.error = "";
        this.isLoading.postProductCreate = true;

        const { data, status } = await CREATE_PRODUCT(body);

        if (status !== 201) throw new Error("Fail to create a new product");

        return data.message;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;
          this.error = errorData.error;
          return;
        }

        this.error = result.message;
      } finally {
        this.isLoading.postProductCreate = false;
      }
    },

    async deleteProduct(productId: string) {
      try {
        this.error = "";
        this.isLoading.deleteProduct = true;

        const { data, status } = await DELETE_PRODUCT(productId);

        if (status !== 202) throw new Error("Fail to delete product");

        return data;
      } catch (error) {
        const { isHttpError, result } = verifyHttpError(error);

        if (isHttpError) {
          const errorData = result.response?.data as HttpErrorResponse;
          this.error = errorData.error;
          return;
        }

        this.error = result.message;
      } finally {
        this.isLoading.deleteProduct = false;
      }
    },

    removeProductFromList(productId: string) {
      const productIndexFound = this.productList?.findIndex(
        (product) => product.id_product === productId
      );

      if (productIndexFound !== undefined && productIndexFound !== -1) {
        console.log("some productIndexFound");
        this.productList?.splice(productIndexFound, 1);
      }
    },
  },
});
