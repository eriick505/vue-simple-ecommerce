<script setup lang="ts">
import { RouterLink } from "vue-router";
import TheWelcome from "@/components/TheWelcome.vue";
</script>

<template>
  <main>
    <nav class="my-5 flex gap-10">
      <RouterLink to="/" class="hover:text-blue-500">Go To Home </RouterLink>
      <RouterLink to="/about" class="hover:text-blue-500">
        Go To About
      </RouterLink>
    </nav>
    <TheWelcome />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni veritatis
      harum iste eaque nulla quaerat doloribus iure rerum culpa unde?
      Voluptatem, quibusdam laboriosam, quis mollitia quae expedita inventore
      iusto, reprehenderit tempora earum voluptatibus. Dicta ratione blanditiis
      facere quia placeat ullam fugit commodi facilis, suscipit porro optio
      numquam id? Neque, qui.
    </p>
  </main>
</template>
