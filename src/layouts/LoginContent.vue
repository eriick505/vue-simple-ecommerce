<script setup lang="ts">
import SignInForm from "./SignInForm.vue";
</script>

<template>
  <section class="bg-gray-900 h-full py-4 px-6 flex flex-col justify-center">
    <header class="mb-5">
      <h2 class="text-5xl font-bold text-white">
        Sign in to CRUD<span class="text-blue-500">.</span>
      </h2>
    </header>
    <div class="max-w-[40%]">
      <SignInForm />
    </div>
  </section>
</template>

<style scoped></style>
