import type { RouteLocationNormalized } from "vue-router";

import { store } from "@/stores";
import { AUTH_AUTOLOGIN_ACTION } from "@/stores/auth";

import { TOKEN_KEY } from "@/utils/localStorage";

export const authenticateWhenContainsMetaLogin = async (
  to: RouteLocationNormalized
) => {
  if (to.meta.login) {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (token) {
      try {
        await store.dispatch(AUTH_AUTOLOGIN_ACTION);

        if (!store.state.auth.authenticated) return { name: "login" };

        return true;
      } catch (err) {
        window.localStorage.removeItem(TOKEN_KEY);
        return { name: "login" };
      }
    } else {
      return { name: "login" };
    }
  }
};
