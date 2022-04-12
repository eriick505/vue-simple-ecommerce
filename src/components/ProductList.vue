<script setup lang="ts">
import { onMounted } from "vue";

import { useProductStore } from "@/stores/products";
import ProductListItem from "@/components/ProductListItem.vue";

const productStore = useProductStore();

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

    <ul
      v-if="!productStore.isLoading.getProductList"
      class="grid md:grid-cols-3 gap-6"
    >
      <li v-for="product in productStore.productList" :key="product.id_product">
        <ProductListItem :product="product" />
      </li>
    </ul>
  </div>
</template>
