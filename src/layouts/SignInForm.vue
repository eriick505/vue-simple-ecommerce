<script setup lang="ts">
import { computed, ref } from "vue";

import { useAuthStore } from "@/stores/auth";

import BaseInputText from "@/components/BaseInputText.vue";
import BaseButton from "@/components/BaseButton.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPadlock from "@/components/icons/IconPadlock.vue";

import type { AuthLoginRequest } from "@/types";

const authStore = useAuthStore();

const login = ref<AuthLoginRequest>({
  email: "",
  password: "",
});

const textButtonSubmit = computed(() =>
  authStore.loading ? "CARREGANDO" : "SIGN IN"
);

const handleSubmit = async () => {
  await authStore.loginUser(login.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <BaseInputText
        v-model="login.email"
        required
        placeholder="Email"
        type="email"
      >
        <template #icon>
          <IconEmail
            class="absolute top-[50%] right-3 text-xl z-50 -translate-y-[50%] text-gray-200"
          />
        </template>
      </BaseInputText>
    </div>

    <div class="mb-5">
      <BaseInputText
        v-model="login.password"
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
      <BaseButton :text="textButtonSubmit" />
    </div>

    <p class="text-red-600 text-xl mt-4">{{ authStore.error }}</p>
  </form>
</template>

<style scoped></style>
