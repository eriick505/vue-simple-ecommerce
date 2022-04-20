<script setup lang="ts">
import { computed, ref } from "vue";

import { useStore } from "@/stores";

import BaseInputText from "@/components/BaseInputText.vue";
import BaseButton from "@/components/BaseButton.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPadlock from "@/components/icons/IconPadlock.vue";

import type { AuthLoginRequest } from "@/types";

const store = useStore();

const login = ref<AuthLoginRequest>({
  email: "",
  password: "",
});

const textButtonSubmit = computed(() =>
  store.state.auth.loading ? "LOADING..." : "SIGN IN"
);

const handleSubmit = async () => {
  await store.dispatch("authLogin", login.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <BaseInputText
        v-model="login.email"
        :icon="IconEmail"
        required
        placeholder="Email"
        type="email"
      />
    </div>

    <div class="mb-5">
      <BaseInputText
        v-model="login.password"
        :icon="IconPadlock"
        required
        placeholder="Password"
        type="password"
      />
    </div>

    <div>
      <BaseButton :text="textButtonSubmit" />
    </div>

    <p class="text-red-600 text-xl mt-4">{{ store.state.auth.error }}</p>
  </form>
</template>

<style scoped></style>
