<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import IconClose from "../components/icons/IconClose.vue";

const router = useRouter();

const showModal = ref(true);

onBeforeRouteLeave(() => {
  showModal.value = false;
});

const closeModal = () => router.push("/");

const handleOutsideClick = (e: Event) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      @click="handleOutsideClick"
      class="fixed top-0 left-0 w-full h-full bg-slate-900/40 flex justify-center items-center z-50"
    >
      <Transition
        appear
        enter-active-class="animation animate_fadeInDown"
        leave-active-class="animation animate_fadeOutUp"
        mode="out-in"
      >
        <div v-if="showModal" class="contentModalWrapper">
          <button @click="closeModal" class="closeModalButton">
            <IconClose />
          </button>

          <div
            class="mt-6 md:mt-0 overflow-y-auto max-h-[90vh] md:max-h-[80vh]"
          >
            <slot name="modalContent"></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="postcss">
.contentModalWrapper {
  @apply relative py-5 p-3 min-w-full md:min-w-[600px] md:max-w-[600px] min-h-full md:min-h-[600px] md:rounded-lg md:shadow-2xl md:shadow-blue-700/25 bg-slate-100;
}

.closeModalButton {
  @apply absolute top-3 md:-top-3 right-3 md:-right-3 w-7 h-7 rounded-full flex justify-center items-center z-50 text-white bg-rose-500 shadow-lg shadow-rose-500/30;
}
.animate_fadeInDown {
  animation-name: fadeInDown;
}

.animate_fadeOutUp {
  animation-name: fadeOutUp;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

@keyframes fadeOutUp {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}
</style>
