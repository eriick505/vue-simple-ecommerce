<script setup lang="ts">
import { getServerImage } from "@/utils/getServerImage";
import { formatterPrice } from "@/utils/formatterPriceBRL";
import type { IProduct } from "@/types";

interface IProductListItemProps {
  product: IProduct;
}

const props = defineProps<IProductListItemProps>();

const productImage = getServerImage(props.product.image_product.path);
const productPrice = formatterPrice(Number(props.product.price));
</script>

<template>
  <article
    class="bg-gray-900 shadow-lg shadow-indigo-500/10 rounded-md overflow-hidden"
  >
    <header class="flex justify-center items-center">
      <img :src="productImage" :alt="product.name" />
    </header>
    <section class="p-5">
      <header class="pb-2">
        <h2>{{ product.name }}</h2>
      </header>
      <footer
        class="flex justify-between items-center pt-3 border-t-[1px] border-slate-800"
      >
        <div>
          <span class="font-bold">{{ productPrice }}</span>
        </div>
        <div>
          <button class="mr-3">EDIT</button>
          <button>CART</button>
        </div>
      </footer>
    </section>
  </article>
</template>
