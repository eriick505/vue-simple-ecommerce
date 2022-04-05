<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="bg-gray-700 h-screen flex justify-center items-center">
    <div
      class="max-w-[1000px] w-full h-[75vh] rounded-[16px] overflow-hidden shadow-2xl m-1 md:m-4"
    >
      <RouterView />
    </div>
  </main>
</template>
