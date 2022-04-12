import { computed, ref } from "vue";

const toastState = ref({
  show: false,
  message: "",
});

const isShowToast = computed(() => toastState.value.show);

const toastMessage = computed(() => toastState.value.message);

const setToastDisplay = (newValue: boolean) =>
  (toastState.value.show = newValue);

const setToastMessage = (message: string) =>
  (toastState.value.message = message);

export { isShowToast, toastMessage, setToastDisplay, setToastMessage };
