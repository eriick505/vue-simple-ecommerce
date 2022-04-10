<script setup lang="ts">
import { RouterView } from "vue-router";
import ProductList from "@/components/ProductList.vue";
</script>

<template>
  <main class="text-white">
    <RouterView />
    <ProductList />
  </main>
</template>
