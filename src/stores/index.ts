import { createStore } from "vuex";

import { authModule, type AuthStore } from "@/stores/auth";
import { productModule, type ProductStore } from "@/stores/product";

import type { InjectionKey } from "vue";
import type { RootState } from "./types";

export type Store = ProductStore<Pick<RootState, "product">> &
  AuthStore<Pick<RootState, "auth">>;

export const key: InjectionKey<Store> = Symbol();

export const store = createStore({
  modules: {
    auth: authModule,
    product: productModule,
  },
});

export const useStore = () => store as Store;
