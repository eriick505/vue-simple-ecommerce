<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

interface ITheLoginContentProps {
  title: string;
  type: "signin" | "signup";
  linkTakes: "login" | "register";
}

const props = defineProps<ITheLoginContentProps>();

const changeCTA =
  props.type === "signin"
    ? "Don't have an account yet?"
    : "Already an account?";
</script>

<template>
  <section class="mt-4 md:mt-0 md:h-screen flex justify-center items-center">
    <div class="hero_container">
      <section class="h-full flex flex-col justify-center">
        <header class="mb-5">
          <span class="block mb-4 text-blue-500 font-medium">
            START FOR FREE
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            {{ title }}<span class="text-blue-500">.</span>
          </h2>
          <p class="text-white mt-6 mb-3">
            {{ changeCTA }}
            <RouterLink :to="linkTakes" class="text-blue-500 capitalize">
              {{ linkTakes }}
            </RouterLink>
          </p>
        </header>
        <div class="md:max-w-[45%]">
          <slot name="form"></slot>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.hero_container {
  @apply bg-gray-900 max-w-[1000px] w-full md:h-[80vh] rounded-[16px] shadow-2xl m-1 md:m-4 py-10 md:py-5 px-6 md:px-14;

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
