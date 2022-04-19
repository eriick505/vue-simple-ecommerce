import { createStore } from "vuex";

import { authModule } from "@/stores/auth";
import { productModule, type ProductStore } from "@/stores/product";

import type { InjectionKey } from "vue";
import type { RootState } from "./types";

export type Store = ProductStore<Pick<RootState, "product">>;

export const key: InjectionKey<Store> = Symbol();

export const store = createStore({
  modules: {
    auth: authModule,
    product: productModule,
  },
});

export const useStore = () => store as Store;
