<script setup lang="ts">
import { ref, useAttrs, type SelectHTMLAttributes } from "vue";
import IconChevron from "./icons/IconChevron.vue";

interface IBaseInputSelectProps extends SelectHTMLAttributes {
  modelValue: string;
}

interface IBaseInputSelectEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<IBaseInputSelectProps>();
const emits = defineEmits<IBaseInputSelectEmits>();
const attrs = useAttrs();

const customArrow = ref(false);
const selected = ref("");

const toggleCustomArrow = () => (customArrow.value = !customArrow.value);

const onSelectChange = (e: Event) => {
  const valueSelected = (e.target as HTMLInputElement).value;
  emits("update:modelValue", valueSelected);
};
</script>

<template>
  <div class="relative">
    {{ selected }}
    <span :class="{ active: customArrow }" class="baseInputSelectCustomArrow">
      <IconChevron />
    </span>
    <select
      @click="toggleCustomArrow"
      @blur="toggleCustomArrow"
      @change="onSelectChange"
      :value="modelValue"
      v-bind="attrs"
      class="p-4 w-full rounded-lg bg-gray-800 text-white appearance-none"
    >
      <option disabled value="">Please select one</option>
      <option value="1">Category 2</option>
      <option value="2">Category 2</option>
      <option value="hfghf">Category 2</option>
      <option value="asd">Category 2</option>
      <option value="2">Category 2</option>
      <option value="43">Category 2</option>
      <option value="2">Category 2</option>
      <option value="nbnb">Category 2</option>
      <option value="sdfs">Category 2</option>
      <option value="334">Category 2</option>
    </select>
  </div>
</template>

<style scoped lang="postcss">
.baseInputSelectCustomArrow {
  @apply absolute top-1/2 -translate-y-1/2 right-2 text-white transition-all text-2xl rotate-0 pointer-events-none;
}
.baseInputSelectCustomArrow.active {
  @apply rotate-180;
}
</style>
