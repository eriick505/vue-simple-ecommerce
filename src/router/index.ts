import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { TOKEN_KEY } from "@/utils/localStorage";

import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import TheModal from "@/layouts/TheModal.vue";

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
          path: ":create-product",
          name: "createProduct",
          component: TheModal,
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
  const authStore = useAuthStore();

  if (to.meta.login) {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (token) {
      try {
        await authStore.authAutoLogin();

        if (!authStore.authenticated) return { name: "login" };

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
