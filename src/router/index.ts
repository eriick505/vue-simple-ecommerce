import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { TOKEN_KEY } from "@/utils/localStorage";

import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/SignInView.vue";

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
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (to.meta.login) {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (token) {
      try {
        await authStore.autoLogin();
        return true;
      } catch (err) {
        return { name: "login" };
      }
    } else {
      return { name: "login" };
    }
  }
});

router.beforeResolve((to) => {
  const authStore = useAuthStore();

  if (to.meta.login && !authStore.authenticated) return { name: "login" };
});

export default router;
