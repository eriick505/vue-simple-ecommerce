<script setup lang="ts">
import { RouterLink } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useProductStore } from "@/stores/products";

import IconUserCircle from "@/components/icons/IconUserCircle.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconCart from "@/components/icons/IconCart.vue";

const authStore = useAuthStore();
const productStore = useProductStore();

const getterWishListQuantity = () => productStore.getterWishListQuantity;

const logout = () => authStore.logout();
</script>

<template>
  <header class="bg-slate-900">
    <div
      class="container mx-auto py-2 md:py-4 flex flex-col md:flex-row justify-between items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-white">LOGO</h1>
      </div>

      <nav class="my-4 md:my-0">
        <ul class="flex justify-center items-center">
          <li class="mr-8">
            <RouterLink
              to="/create-product"
              class="text-white text-base hover:text-blue-500"
            >
              CREATE PRODUCT
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="text-white text-base hover:text-blue-500"
            >
              ABOUT
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <ul class="flex justify-center items-center">
          <li
            @click="logout"
            class="mr-8 text-2xl text-white relative cursor-pointer transition-all duration-500 group hover:text-blue-500"
            role="button"
          >
            <IconUserCircle />

            <span
              class="absolute -bottom-[115%] left-2/4 -translate-x-2/4 text-xs flex px-2 py-1 rounded-md text-center bg-blue-500 text-white transition-all duration-500 opacity-0 group-hover:opacity-100"
            >
              Logout?
            </span>
          </li>
          <li class="mr-8 text-2xl relative text-white">
            <IconHeart />

            <span
              class="absolute -top-1 -right-2 rounded-full w-4 h-4 text-center flex justify-center items-center bg-rose-500 text-[10px] text-white"
            >
              {{ getterWishListQuantity() }}
            </span>
          </li>
          <li class="text-2xl text-white hover:text-green-500">
            <IconCart />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
