<script setup lang="ts">
import { ref } from "vue";
import BaseInputText from "@/components/BaseInputText.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPadlock from "@/components/icons/IconPadlock.vue";

const email = ref("");
const password = ref("");
</script>

<template>
  <form>
    <div class="mb-4">
      <BaseInputText v-model="email" required placeholder="Email" type="text">
        <template #icon>
          <IconEmail
            class="absolute top-[50%] right-3 text-xl z-50 -translate-y-[50%] text-gray-200"
          />
        </template>
      </BaseInputText>
    </div>

    <div class="mb-5">
      <BaseInputText
        v-model="password"
        required
        placeholder="Password"
        type="password"
      >
        <template #icon>
          <IconPadlock
            class="absolute top-[50%] right-3 text-xl z-50 -translate-y-[50%] text-gray-200"
          />
        </template>
      </BaseInputText>
    </div>

    <div>
      <button
        class="bg-blue-500 text-white px-16 py-3 rounded-full hover:bg-blue-800 transition-all"
      >
        SIGN IN
      </button>
    </div>
  </form>
</template>

<style scoped></style>
