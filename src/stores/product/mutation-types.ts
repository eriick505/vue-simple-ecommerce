import type { RootState } from "@/stores/types";
import type { ICategory, IProduct } from "@/types";

export const LOADING_GETPRODUCT_MUTATION = "LOADING_GETPRODUCT_MUTATION";
export const ERROR_MUTATION = "ERROR_MUTATION";
export const PRODUCTLIST_MUTATION = "PRODUCTLIST_MUTATION";
export const PRODUCTQUANTITY_MUTATION = "PRODUCTQUANTITY_MUTATION";

export const ADD_TO_WISHLIST_MUTATION = "ADD_TO_WISHLIST_MUTATION";
export const WISHLIST_MUTATION = "WISHLIST_MUTATION";

export const LOADING_GETCATEGORY_MUTATION = "LOADING_GETCATEGORY_MUTATION";
export const CATEGORYLIST_MUTATION = "CATEGORYLIST_MUTATION";
export const CATEGORYQUANTITY_MUTATION = "CATEGORYQUANTITY_MUTATION";

export const LOADING_PRODUCTCREATE_MUTATION = "LOADING_PRODUCTCREATE_MUTATION";

export const LOADING_PRODUCTDELETE_MUTATION = "LOADING_PRODUCTDELETE_MUTATION";
export const REMOVE_FROM_PRODUCTLIST = "REMOVE_FROM_PRODUCTLIST";

export enum MutationTypes {
  LOADING_GETPRODUCT = "LOADING_GETPRODUCT",
  ERROR = "ERROR",
  PRODUCT_LIST = "PRODUCT_LIST",
  PRODUCT_QUANTITY = "PRODUCT_QUANTITY",

  ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
  WISHLIST = "WISHLIST",
  LOADING_GETCATEGORY = "LOADING_GETCATEGORY",
  LOADING_PRODUCTCREATE = "PRODUCT_CREATE",

  CATEGORY_LIST = "CATEGORY_LIST",
  CATEGORY_QUANTITY = "CATEGORY_QUANTITY",
  LOADING_PRODUCTDELETE = "LOADING_PRODUCTDELETE",
  REMOVE_FROM_PRODUCTLIST = "REMOVE_FROM_PRODUCTLIST",
}

export type Mutations<S = RootState["product"]> = {
  [MutationTypes.LOADING_GETPRODUCT](state: S, payload: boolean): void;
  [MutationTypes.ERROR](state: S, payload: string): void;
  [MutationTypes.PRODUCT_LIST](state: S, payload: IProduct[]): void;
  [MutationTypes.PRODUCT_QUANTITY](state: S, payload: number): void;

  [MutationTypes.ADD_TO_WISHLIST](state: S, payload: string): void;
  [MutationTypes.WISHLIST](state: S, payload: string[]): void;
  [MutationTypes.LOADING_GETCATEGORY](state: S, payload: boolean): void;
  [MutationTypes.LOADING_PRODUCTCREATE](state: S, payload: boolean): void;

  [MutationTypes.CATEGORY_LIST](state: S, payload: ICategory[]): void;
  [MutationTypes.CATEGORY_QUANTITY](state: S, payload: number): void;
  [MutationTypes.LOADING_PRODUCTDELETE](state: S, payload: boolean): void;
  [MutationTypes.REMOVE_FROM_PRODUCTLIST](state: S, payload: number): void;
};
