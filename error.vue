<template>
  <div
    class="bg-[#0078d7] text-white w-screen h-screen flex items-center pl-[130px] pt-[10rem]"
  >
    <div class="relative max-w-[1200px]">
      <div class="absolute bottom-full left-0 text-[20rem] font-light">:(</div>
      <h1 class="text-5xl leading-[4rem]">
        Your PC ran into a problem and needs to restart. We're just collecting
        some error info, and then we'll restart for you.
      </h1>
      <div class="mt-10 text-5xl">{{ progress }}% complete</div>
      <p class="mt-16 text-lg">
        For more information about this issue and possible fixes, visit our
        website.
      </p>
      <p class="mt-10 text-lg">
        If you call a support person, gibe them this info:
      </p>
      <p class="mt-2 text-lg">
        Stop code:
        <client-only
          ><span class="pointer-events-auto select-all">
            0x{{ returnStatusCode }}
          </span></client-only
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ErrorPage",
};
</script>

<script setup lang="ts">
import { promiseTimeout } from "@vueuse/core";

const props = defineProps<{
  error?: any;
}>();

const handleError = () => clearError({ redirect: "/restarting" });
const progress = ref(0);

const returnStatusCode = computed(() =>
  window.btoa(props?.error?.message || "unknown")
);

onMounted(async () => {
  await promiseTimeout(250);
  progress.value = 5;
  await promiseTimeout(500);
  progress.value = 10;
  await promiseTimeout(500);
  progress.value = 15;
  await promiseTimeout(750);
  progress.value = 30;
  await promiseTimeout(1250);
  progress.value = 65;
  await promiseTimeout(2000);
  progress.value = 80;
  await promiseTimeout(2000);
  progress.value = 90;
  await promiseTimeout(1000);
  progress.value = 95;
  await promiseTimeout(500);
  progress.value = 99;
  await promiseTimeout(500);
  progress.value = 100;
  await promiseTimeout(100);
  handleError();
});
</script>
