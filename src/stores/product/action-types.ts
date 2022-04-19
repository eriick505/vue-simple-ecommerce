import type { ActionContext } from "vuex";
import type { RootState } from "@/stores/types";
import type { Mutations } from "./mutation-types";
import type { IProductDeleteResponse } from "@/types";

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
