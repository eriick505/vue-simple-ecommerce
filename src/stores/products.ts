import { defineStore } from "pinia";

import { verifyHttpError } from "@/services";
import { GET_PRODUCT_LIST } from "@/services/products";

import type { HttpErrorResponse, IProduct } from "@/types";

interface InitialState {
  loading: boolean;
  error: string;
  productList?: IProduct[];
  productQuantity?: number;
}

export const useProductStore = defineStore({
  id: "products",

  state: (): InitialState => ({
    loading: false,
    error: "",
    productList: undefined,
    productQuantity: undefined,
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
  },
});
