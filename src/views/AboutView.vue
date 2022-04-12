<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container mx-auto py-5 text-white">
    <nav>
      <RouterLink to="/" class="hover:text-blue-500 text-rose-500">
        Go To Home
      </RouterLink>
    </nav>
    <h2 class="mt-5">This is an about page...</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, eum sequi
      atque magnam quasi expedita error aspernatur temporibus minus aliquid
      officia voluptatibus itaque voluptas ratione? Quis suscipit ut quam
      doloribus labore iste consequatur vero obcaecati recusandae hic, sapiente
      illum. Voluptatibus ipsum vel officia? Natus, porro eius deserunt ducimus
      velit commodi.
    </p>
  </div>
</template>
