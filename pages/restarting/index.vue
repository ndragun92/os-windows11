<template>
  <div
    class="h-screen w-screen flex items-center justify-center text-center overflow-hidden"
  >
    <div>
      <div class="loader">
        <div v-for="n in 5" :key="n" class="circle" />
      </div>
      <h1 class="mt-32 text-2xl font-medium letter tracking-wide">
        Restarting
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageRestarting",
};
</script>

<script lang="ts" setup>
import { definePageMeta } from "#imports";
import { promiseTimeout } from "@vueuse/core";

definePageMeta({
  layout: false,
});

const router = useRouter();

onMounted(async () => {
  await promiseTimeout(5000);
  await router.push("/");
});
</script>

<style lang="scss" scoped>
.loader {
  @apply absolute top-[50%] left-[50%] w-[75px] h-[75px] m-auto;
  transform: translateX(-50%) translateY(-50%);
  .circle {
    @apply absolute w-[75px] h-[75px] opacity-0;
    transform: rotate(225deg);
    animation-iteration-count: infinite;
    animation-name: orbit;
    animation-duration: 5.5s;
    @apply duration-[5.5s];
    &:after {
      content: "";
      @apply absolute w-[6px] h-[6px] rounded-[5px] bg-white;
    }
    &:nth-child(2) {
      animation-delay: 240ms;
    }
    &:nth-child(3) {
      animation-delay: 480ms;
    }
    &:nth-child(4) {
      animation-delay: 720ms;
    }
    &:nth-child(5) {
      animation-delay: 960ms;
    }
  }
}
@keyframes orbit {
  0% {
    @apply opacity-100;
    transform: rotate(225deg);
    animation-timing-function: ease-out;
  }
  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }
  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }
  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }
  70% {
    @apply opacity-100;
    transform: rotate(815deg);
    animation-timing-function: ease-out;
  }
  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }
  76% {
    @apply opacity-0;
    transform: rotate(945deg);
  }
  100% {
    @apply opacity-0;
    transform: rotate(945deg);
  }
}
</style>
