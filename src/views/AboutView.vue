<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="about">
    <nav class="my-5 flex gap-10">
      <RouterLink to="/" class="hover:text-blue-500">Go To Home </RouterLink>
      <RouterLink to="/about" class="hover:text-blue-500">
        Go To About
      </RouterLink>
    </nav>
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
