import type { ActionContext } from "vuex";
import type { RootState } from "@/stores/types";
import type { Mutations } from "./mutation-types";
import type { IProductDeleteResponse } from "@/types";

export const PRODUCT_GET_LIST_ACTION = "product/getProductList";
export const PRODUCT_TOGGLE_PRODUCT_TO_WISHLIST_ACTION =
  "product/toggleProductToWishList";
export const PRODUCT_ADD_PRODUCT_TO_WISHLIST_ACTION =
  "product/addProductToWishList";
export const PRODUCT_REMOVE_PRODUCT_TO_WISHLIST_ACTION =
  "product/removeProductToWishList";
export const PRODUCT_IS_PRODUCT_ON_WISHLIST_ACTION =
  "product/isProductIsOnTheWishList";
export const PRODUCT_GET_CATEGORY_ACTION = "product/getCategoryList";
export const PRODUCT_CREATE_ACTION = "product/postProductCreate";
export const PRODUCT_DELETE_ACTION = "product/deleteProduct";
export const PRODUCT_REMOVE_PRODUCT_ACTION = "product/removeProductFromList";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState["product"], RootState>, "commit">;

export interface Actions {
  getProductList(args: AugmentedActionContext): Promise<void>;
  toggleProductToWishList(args: AugmentedActionContext, payload: string): void;
  addProductToWishList(args: AugmentedActionContext, payload: string): void;
  removeProductToWishList(args: AugmentedActionContext, payload: string): void;
  // isProductIsOnTheWishList(args: AugmentedActionContext, payload: string): void;
  getCategoryList(args: AugmentedActionContext): Promise<void>;
  postProductCreate(
    args: AugmentedActionContext,
    body: FormData
  ): Promise<string | void>;
  deleteProduct(
    args: AugmentedActionContext,
    payload: string
  ): Promise<IProductDeleteResponse | void>;
  removeProductFromList(args: AugmentedActionContext, payload: string): void;
}
