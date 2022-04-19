import type { RootState } from "@/stores/types";
import type { ICategory, IProduct } from "@/types";

export enum ProductMutationTypes {
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
  [ProductMutationTypes.LOADING_GETPRODUCT](state: S, payload: boolean): void;
  [ProductMutationTypes.ERROR](state: S, payload: string): void;
  [ProductMutationTypes.PRODUCT_LIST](state: S, payload: IProduct[]): void;
  [ProductMutationTypes.PRODUCT_QUANTITY](state: S, payload: number): void;

  [ProductMutationTypes.ADD_TO_WISHLIST](state: S, payload: string): void;
  [ProductMutationTypes.WISHLIST](state: S, payload: string[]): void;
  [ProductMutationTypes.LOADING_GETCATEGORY](state: S, payload: boolean): void;
  [ProductMutationTypes.LOADING_PRODUCTCREATE](
    state: S,
    payload: boolean
  ): void;

  [ProductMutationTypes.CATEGORY_LIST](state: S, payload: ICategory[]): void;
  [ProductMutationTypes.CATEGORY_QUANTITY](state: S, payload: number): void;
  [ProductMutationTypes.LOADING_PRODUCTDELETE](
    state: S,
    payload: boolean
  ): void;
  [ProductMutationTypes.REMOVE_FROM_PRODUCTLIST](
    state: S,
    payload: number
  ): void;
};
