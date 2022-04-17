<script setup lang="ts">
import { computed, ref } from "vue";

// import { useAuthStore } from "@/stores/auth";

import BaseInputText from "@/components/BaseInputText.vue";
import BaseButton from "@/components/BaseButton.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconPadlock from "@/components/icons/IconPadlock.vue";

import type { AuthRegisterRequest } from "@/types";

// const authStore = useAuthStore();

const register = ref<AuthRegisterRequest>({
  name: "",
  phone: "",
  email: "",
  password: "",
});

// const textButtonSubmit = computed(() =>
//   authStore.loading ? "LOADING..." : "SIGN UP"
// );
const textButtonSubmit = "SIGN UP";

const handleSubmit = async () => {
  // await authStore.authRegisterUser(register.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4 grid md:grid-cols-[1fr_185px] gap-3">
      <div>
        <BaseInputText
          v-model="register.name"
          :icon="IconUser"
          required
          placeholder="Name"
          type="text"
        />
      </div>
      <div>
        <BaseInputText
          v-model="register.phone"
          :icon="IconPhone"
          required
          placeholder="Phone"
          type="tel"
        />
      </div>
    </div>
    <div class="mb-4">
      <BaseInputText
        v-model="register.email"
        :icon="IconEmail"
        required
        placeholder="Email"
        type="email"
      />
    </div>

    <div class="mb-5">
      <BaseInputText
        v-model="register.password"
        :icon="IconPadlock"
        required
        placeholder="Password"
        type="password"
      />
    </div>

    <div>
      <BaseButton :text="textButtonSubmit" />
    </div>

    <!-- <p class="text-red-600 text-xl mt-4">{{ authStore.error }}</p> -->
  </form>
</template>

<style scoped></style>
