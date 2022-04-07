<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="bg-gray-700 h-screen flex justify-center items-center">
    <div
      class="bg-gray-900 max-w-[1000px] w-full md:h-[75vh] rounded-[16px] overflow-hidden shadow-2xl m-1 md:m-4 py-10 md:py-5 px-6 md:px-14"
    >
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

<style scoped>
.animation {
  animation-delay: 0;
  animation-duration: 0.4s;
  animation-fill-mode: both;
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
