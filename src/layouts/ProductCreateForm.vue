<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useProductStore } from "@/stores/products";

import TheModal from "@/layouts/TheModal.vue";

import BaseInputText from "@/components/BaseInputText.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInputSelect from "@/components/BaseInputSelect.vue";
import IconCurrency from "@/components/icons/IconCurrency.vue";
import IconFolderInfo from "@/components/icons/IconFolderInfo.vue";
import IconPicture from "@/components/icons/IconPicture.vue";

interface IProductFields {
  name: string;
  price: string;
  categoryId: string;
  product_image: {
    preview?: string;
    raw?: File;
  };
}

const productStore = useProductStore();

onMounted(() => {
  productStore.getCategoryList();
});

const formFields = ref<IProductFields>({
  name: "",
  price: "",
  categoryId: "",
  product_image: {
    preview: undefined,
    raw: undefined,
  },
});

const optionList = ref<{ id: string; description: string }[] | undefined>(
  undefined
);

const successMessage = ref("");

const textButtonSubmit = computed(() =>
  productStore.isLoading.postProductCreate ? "CREATING..." : "CREATE PRODUCT"
);

watch(formFields.value, () => {
  console.log(formFields.value, "productFieldsproductFields");
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

const onInputUploadChange = (file: File | undefined) => {
  if (file) {
    formFields.value.product_image.preview = window.URL.createObjectURL(file);
    formFields.value.product_image.raw = file;
  }
};

const handleSubmit = async () => {
  const formData = new FormData();

  if (!formFields.value.product_image.raw) return;

  formData.append("name", formFields.value.name);
  formData.append("price", formFields.value.price);
  formData.append("categoryId", formFields.value.categoryId);
  formData.append("product_image", formFields.value.product_image.raw);

  const message = await productStore.postProductCreate(formData);

  if (message) {
    successMessage.value = message;
  }
};
</script>

<template>
  <TheModal>
    <template #modalContent>
      <h2 class="text-2xl font-bold mb-4">Create Product</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <BaseInputText
            v-model="formFields.name"
            :icon="IconFolderInfo"
            required
            placeholder="Product Name"
            type="text"
          />
        </div>

        <div class="mb-0 md:mb-4 grid md:grid-cols-[180px_1fr] md:gap-2">
          <div class="mb-4 md:mb-0">
            <BaseInputText
              v-model="formFields.price"
              :icon="IconCurrency"
              required
              placeholder="Price"
              type="text"
            />
          </div>

          <div
            v-if="!productStore.isLoading.getCategoryList"
            class="mb-4 md:mb-0"
          >
            <BaseInputSelect
              v-model="formFields.categoryId"
              :option-list="optionList"
              required
            />
            <p v-if="productStore.isLoading.getCategoryList">Loading...</p>
          </div>
        </div>

        <div class="mb-4">
          <BaseInputText
            @update:fileValue="onInputUploadChange"
            :icon="IconPicture"
            required
            placeholder="Product Image"
            type="file"
          />
        </div>

        <div
          class="w-full h-52 mb-4 flex justify-center items-center border-dotted border-4 border-blue-900"
        >
          <span
            v-if="formFields.product_image.preview"
            :style="{
              backgroundImage: formFields.product_image.preview
                ? `url('${formFields.product_image.preview}')`
                : 'none',
            }"
            class="block w-full h-full bg-contain bg-no-repeat bg-center"
          >
          </span>
          <span v-else>No product image selected</span>
        </div>

        <div>
          <BaseButton :text="textButtonSubmit" />
        </div>
      </form>

      <p v-if="successMessage" class="text-2x1 mt-3 text-green-600">
        {{ successMessage }}
      </p>
    </template>
  </TheModal>
</template>

<style scoped></style>
