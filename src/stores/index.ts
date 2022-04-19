import { createStore, useStore as baseUseStore, Store } from "vuex";

import { authModule } from "@/stores/auth";
import { productModule, type Getters } from "@/stores/product";

import type { InjectionKey } from "vue";
import type { RootState } from "./types";

export type StoreCustom = Omit<Store<RootState>, "getters"> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
export const key: InjectionKey<StoreCustom> = Symbol();

export const store = createStore<StoreCustom["state"]>({
  modules: {
    auth: authModule,
    product: productModule,
  },
});

export const useStore = () => store as StoreCustom;
// export const useStore = () => baseUseStore<StoreCustom>(key);
