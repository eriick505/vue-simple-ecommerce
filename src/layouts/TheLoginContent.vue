<script setup lang="ts">
import { RouterLink } from "vue-router";

interface ITheLoginContentProps {
  title: string;
  type: "signin" | "signup";
  linkTakes: "login" | "register";
}

const props = defineProps<ITheLoginContentProps>();

const changeCTA =
  props.type === "signin"
    ? "Don't have an account yet?"
    : "Already an account?";
</script>

<template>
  <section class="h-full flex flex-col justify-center">
    <header class="mb-5">
      <span class="block mb-4 text-blue-500 font-medium">START FOR FREE</span>
      <h2 class="text-4xl md:text-5xl font-bold text-white">
        {{ title }}<span class="text-blue-500">.</span>
      </h2>
      <p class="text-white mt-6 mb-3">
        {{ changeCTA }}
        <RouterLink :to="linkTakes" class="text-blue-500 capitalize">
          {{ linkTakes }}
        </RouterLink>
      </p>
    </header>
    <div class="md:max-w-[45%]">
      <slot name="form"></slot>
    </div>
  </section>
</template>

<style scoped></style>
