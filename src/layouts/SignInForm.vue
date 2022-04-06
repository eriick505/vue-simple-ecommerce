<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import BaseInputText from "@/components/BaseInputText.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPadlock from "@/components/icons/IconPadlock.vue";

import type { AuthLoginRequest } from "@/types";

const authStore = useAuthStore();
const route = useRouter();

const login = ref<AuthLoginRequest>({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await authStore.loginUser(login.value);
  route.push("/");
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
      <button
        class="bg-blue-500 text-white px-16 py-3 rounded-full hover:bg-blue-800 transition-all"
      >
        {{ authStore.loading ? "CARREGANDO" : "SIGN IN" }}
      </button>
    </div>

    <p class="text-red-600 text-xl">{{ authStore.error }}</p>
  </form>
</template>

<style scoped></style>
