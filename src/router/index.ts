import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";

import { store } from "@/stores";
import { AUTH_AUTOLOGIN_ACTION } from "@/stores/auth";

import { TOKEN_KEY } from "@/utils/localStorage";

import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import ProductCreateView from "@/views/ProductCreateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        login: true,
      },
      children: [
        {
          path: "create-product",
          name: "createProduct",
          component: ProductCreateView,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        login: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: SignInView,
    },
    {
      path: "/register",
      name: "register",
      component: SignUpView,
    },
  ],
});

const authenticateWhenContainsMetaLogin = async (
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

router.beforeEach(authenticateWhenContainsMetaLogin);

export default router;
