<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { useProductStore } from "@/stores/products";

import TheModal from "@/layouts/TheModal.vue";

import BaseInputText from "@/components/BaseInputText.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInputSelect from "@/components/BaseInputSelect.vue";
import IconEmail from "@/components/icons/IconEmail.vue";

const productStore = useProductStore();

onMounted(() => {
  productStore.getCategoryList();
});

const productFields = ref({
  name: "",
  price: "",
  categoryId: "",
  product_image: "",
});

const optionList = ref<{ id: string; description: string }[] | undefined>(
  undefined
);

watch(productFields.value, () => {
  console.log(productFields.value, "productFieldsproductFields");
});

watch(
  () => productStore.categoryList,
  () => {
    optionList.value = productStore.categoryList?.map((cat) => ({
      id: cat.categoryId,
      description: cat.name,
    }));
  }
);

const handleSubmit = () => {
  console.log("send product");
};
</script>

<template>
  <TheModal>
    <template #modalContent>
      <h2>Create Product</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <BaseInputText
            v-model="productFields.name"
            :icon="IconEmail"
            required
            placeholder="Product Name"
            type="text"
          />
        </div>
        <div class="mb-4">
          <BaseInputText
            v-model="productFields.price"
            :icon="IconEmail"
            required
            placeholder="Price"
            type="text"
          />
        </div>
        <div class="mb-4" v-show="!productStore.loading">
          <BaseInputSelect
            v-model="productFields.categoryId"
            :option-list="optionList"
          />
        </div>
        <div class="mb-4">
          <BaseInputText
            v-model="productFields.product_image"
            :icon="IconEmail"
            required
            placeholder="Product Image"
            type="file"
          />
        </div>

        <div
          class="w-full h-52 mb-4 flex justify-center items-center border-dotted border-4 border-blue-900"
        >
          <span>Product Image</span>
        </div>

        <div>
          <BaseButton text="Create Product" />
        </div>
      </form>
    </template>
  </TheModal>
</template>

<style scoped></style>
