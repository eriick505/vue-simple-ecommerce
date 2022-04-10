<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="bg-gray-700 md:h-screen flex justify-center items-center">
    <div class="hero_container">
      <!-- <RouterView /> -->
      <RouterView v-slot="{ Component }">
        <Transition
          enter-active-class="animation animation_fadeInLeft"
          leave-active-class="animation animation_fadeOutLeft"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </main>
</template>

<style scoped lang="postcss">
.hero_container {
  @apply bg-gray-900 max-w-[1000px] w-full md:h-[80vh] rounded-[16px] overflow-x-hidden overflow-y-scroll shadow-2xl m-1 md:m-4 py-10 md:py-5 px-6 md:px-14;

  background: linear-gradient(
      90deg,
      #0f1626 25%,
      rgb(17 24 39 / 77%) 65%,
      rgb(17 24 39 / 67%) 97%
    ),
    url(https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&w=1000&q=80);
  background-size: cover;
}

.animation_fadeInLeft {
  animation-name: fadeInLeft;
}

.animation_fadeOutLeft {
  animation-name: fadeOutLeft;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
    -webkit-transform: translate3d(-50%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
}

@keyframes fadeOutLeft {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
    -webkit-transform: translate3d(-50%, 0, 0);
  }
}
</style>
