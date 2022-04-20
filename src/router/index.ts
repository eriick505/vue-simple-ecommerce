import { createRouter, createWebHistory } from "vue-router";
import { authenticateWhenContainsMetaLogin } from "@/router/authenticateWhenContainsMetaLogin";

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

router.beforeEach(authenticateWhenContainsMetaLogin);

export default router;
