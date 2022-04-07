<script setup lang="ts">
import TheLoginContent from "@/layouts/TheLoginContent.vue";
import SignUpForm from "@/layouts/SignUpForm.vue";
</script>

<template>
  <TheLoginContent title="Create a new account" type="signup" linkTakes="login">
    <template #form>
      <SignUpForm />
    </template>
  </TheLoginContent>
</template>

<style scoped></style>
