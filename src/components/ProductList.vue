<script setup lang="ts">
import ProductListItem from "@/components/ProductListItem.vue";
import { ref } from "vue";

const list = ref([1, 2, 3]);
</script>

<template>
  <ul class="grid md:grid-cols-3 gap-3">
    <li v-for="item in list" :key="item">
      <ProductListItem />
    </li>
  </ul>
</template>
