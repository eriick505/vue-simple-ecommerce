<script setup lang="ts">
interface ITheLoginContentProps {
  title: string;
}

defineProps<ITheLoginContentProps>();
</script>

<template>
  <section class="bg-gray-900 h-full py-4 px-6 flex flex-col justify-center">
    <header class="mb-5">
      <h2 class="text-4xl md:text-5xl font-bold text-white">
        {{ title }}<span class="text-blue-500">.</span>
      </h2>
    </header>
    <div class="md:max-w-[40%]">
      <slot name="form"></slot>
    </div>
  </section>
</template>

<style scoped></style>
