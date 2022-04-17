import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

import authModule from "@/stores/auth";
import type { RootState } from "./types";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    auth: authModule,
  },
});

export const useStore = () => baseUseStore(key);
