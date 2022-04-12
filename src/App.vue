<script setup lang="ts">
import { RouterView } from "vue-router";

import { isShowToast } from "@/hooks/useToast";

import TheHeader from "@/layouts/TheHeader.vue";
import TheToast from "@/components/TheToast.vue";
</script>

<template>
  <TheHeader />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="animation animation_fadeInLeft"
        leave-active-class="animation animation_fadeOutLeft"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <TheToast v-if="isShowToast" />
</template>

<style scoped>
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
