<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

import { useProductStore } from "@/stores/products";
import ProductListItem from "@/components/ProductListItem.vue";

const productStore = useProductStore();

onMounted(() => {
  productStore.getProductList();
});
</script>

<template>
  <section>
    <RouterLink to="/create-product" class="text-white text-2xl">
      ADICIONAR PRODUTO
    </RouterLink>
    <h2 class="text-3xl text-white text-center font-bold mb-7">PRODUCT LIST</h2>

    <h2 class="text-3xl text-white" v-show="productStore.loading">
      Loading...
    </h2>

    <ul class="grid md:grid-cols-3 gap-4" v-show="!productStore.loading">
      <li v-for="product in productStore.productList" :key="product.id_product">
        <ProductListItem :product="product" />
      </li>
    </ul>
  </section>
</template>
