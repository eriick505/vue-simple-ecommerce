<script setup lang="ts">
import { useAttrs, type InputHTMLAttributes } from "vue";

interface IBaseInputTextProps extends InputHTMLAttributes {
  modelValue: string;
}

interface IBaseInputTextEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<IBaseInputTextProps>();
const emits = defineEmits<IBaseInputTextEmits>();
const attrs = useAttrs();

const onInputChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emits("update:modelValue", value);
};
</script>

<template>
  <div class="relative">
    <slot name="icon"></slot>
    <input
      :value="modelValue"
      @input="onInputChange"
      v-bind="attrs"
      class="pt-4 pr-4 pb-4 pl-9 py-2 text-black border-none rounded-md w-full"
    />
  </div>
</template>

<style scoped></style>
