<script setup lang="ts">
import { RouterLink } from "vue-router";
import SignInForm from "./SignInForm.vue";
</script>

<template>
  <section class="bg-gray-900 h-full py-4 px-6 flex flex-col justify-center">
    <header class="mb-5">
      <h2 class="text-4xl md:text-5xl font-bold text-white">
        Sign in to CRUD<span class="text-blue-500">.</span>
      </h2>

      <nav class="my-5 flex gap-10">
        <RouterLink to="/" class="hover:text-blue-500">Go To Home </RouterLink>
        <RouterLink to="/about" class="hover:text-blue-500">
          Go To About
        </RouterLink>
      </nav>
    </header>
    <div class="md:max-w-[40%]">
      <SignInForm />
    </div>
  </section>
</template>

<style scoped></style>
