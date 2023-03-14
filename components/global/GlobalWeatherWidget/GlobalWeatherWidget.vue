<template>
  <teleport to="body">
    <div
      class="fixed z-[60] left-[12px] top-[12px] bottom-[59px] bg-white bg-opacity-20 backdrop-blur-[50px] w-[760px] rounded-lg p-[23px] pr-[31px] pb-0 -translate-x-[calc(100%+12px)] duration-200 flex flex-col"
      :class="
        props.visible
          ? 'pointer-events-auto translate-x-0'
          : 'pointer-events-none -translate-x-[calc(100%+12px)]'
      "
      @mouseover="emit('focused', $event)"
      @mouseleave="emit('close', $event)"
    >
      <div class="h-[40px]">Coming soon!</div>
      <div
        class="mt-[17px] ml-[51px] mr-[13px] pr-[28px] overflow-y-auto overflow-x-hidden flex-1"
      >
        <div class="gap-[12px] columns-2 columns-gap-4">
          <div
            v-for="n in 50"
            :key="n"
            class="bg-black mb-[12px] rounded-lg flex items-center justify-center"
            :class="n % 3 == 0 ? 'aspect-video' : 'aspect-square'"
          >
            Coming soon!
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits(["close", "focused"]);
</script>

<style lang="scss" scoped>
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #fff rgba(255, 255, 255, 0.05);
}

/* width */
::-webkit-scrollbar {
  @apply w-[2px];
}

*:hover::-webkit-scrollbar {
  @apply rounded-full;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-white;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}
</style>
