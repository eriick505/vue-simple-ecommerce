<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useStore } from "@/stores";

import ProductListItem from "@/components/ProductListItem.vue";

const store = useStore();

const haveProducts = computed(() => {
  if (store.state.product.productQuantity)
    return store.state.product.productQuantity > 0;
  else return false;
});

onMounted(() => {
  store.dispatch("getProductList", undefined);
});
</script>

<template>
  <div>
    <h2
      v-if="store.state.product.isLoading.getProductList"
      class="text-3xl text-white"
    >
      Loading...
    </h2>

    <span
      v-if="!haveProducts && !store.state.product.isLoading.getProductList"
      class="text-2xl text-white"
    >
      No products registered
    </span>

    <TransitionGroup
      v-if="haveProducts && !store.state.product.isLoading.getProductList"
      tag="ul"
      name="fade"
      class="relative p-0 grid md:grid-cols-3 gap-6"
    >
      <li
        v-for="product in store.state.product.productList"
        :key="product.id_product"
      >
        <ProductListItem :product="product" />
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
