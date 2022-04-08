<script setup lang="ts">
import ListProductItem from "@/components/ListProductItem.vue";
import { ref } from "vue";

const list = ref([1, 2, 3]);
</script>

<template>
  <ul class="grid md:grid-cols-3 gap-3">
    <li v-for="item in list" :key="item">
      <ListProductItem />
    </li>
  </ul>
</template>
