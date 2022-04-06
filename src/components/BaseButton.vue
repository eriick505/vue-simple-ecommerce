<script setup lang="ts">
interface ITheBaseButton {
  text: string;
}

defineProps<ITheBaseButton>();
</script>

<template>
  <button
    class="bg-blue-500 text-white px-16 py-3 rounded-full hover:bg-blue-800 transition-all"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
