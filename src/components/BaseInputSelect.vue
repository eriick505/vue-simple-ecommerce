<script setup lang="ts">
import { ref } from "vue";
import IconChevron from "./icons/IconChevron.vue";

const customArrow = ref(false);

const toggleCustomArrow = () => {
  customArrow.value = !customArrow.value;
};
</script>

<template>
  <div class="relative">
    <span
      :class="{ 'rotate-180': customArrow }"
      class="absolute top-1/2 -translate-y-1/2 right-2 text-white transition-all text-2xl rotate-0 pointer-events-none"
    >
      <IconChevron />
    </span>
    <select
      @click="toggleCustomArrow"
      @blur="toggleCustomArrow"
      class="p-4 w-full rounded-lg bg-gray-800 text-white appearance-none"
    >
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
      <option value="2">Category 2</option>
    </select>
  </div>
</template>
