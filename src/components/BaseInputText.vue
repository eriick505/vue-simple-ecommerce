<script setup lang="ts">
import {
  useAttrs,
  type ComponentPublicInstance,
  type InputHTMLAttributes,
} from "vue";

interface IBaseInputTextProps extends InputHTMLAttributes {
  modelValue: string;
  icon: ComponentPublicInstance;
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
    <component
      :is="icon"
      class="absolute top-[50%] right-3 text-xl z-50 -translate-y-[50%] text-gray-200"
    />

    <input
      :value="modelValue"
      @input="onInputChange"
      v-bind="attrs"
      class="CustomBaseInputText"
    />
  </div>
</template>

<style scoped lang="postcss">
.CustomBaseInputText {
  @apply pt-4 pr-9 pb-4 pl-4 py-2 bg-gray-800 text-white outline-1 
  focus:outline-double outline-blue-500 focus:shadow-md 
focus:shadow-blue-500/50 transition-all duration-500 border-none 
  rounded-lg w-full;
}
</style>
