<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useProductStore } from "@/stores/products";
import ProductListItem from "@/components/ProductListItem.vue";

const productStore = useProductStore();

const haveProducts = computed(() => {
  if (productStore.productQuantity) return productStore.productQuantity > 0;
  else return false;
});

onMounted(() => {
  productStore.getProductList();
});
</script>

<template>
  <div>
    <h2
      v-if="productStore.isLoading.getProductList"
      class="text-3xl text-white"
    >
      Loading...
    </h2>

    <span
      v-if="!haveProducts && !productStore.isLoading.getProductList"
      class="text-2xl text-white"
    >
      No products registered
    </span>

    <TransitionGroup
      v-if="haveProducts && !productStore.isLoading.getProductList"
      tag="ul"
      name="fade"
      class="relative p-0 grid md:grid-cols-3 gap-6"
    >
      <li
        v-for="product in productStore.getterProductList"
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
