<template>
  <div
    class="fixed bottom-[52px] bg-[#717171] bg-opacity-50 rounded-lg backdrop-blur-[5px] border border-black border-opacity-10 shadow-[0_0_50px_10px_rgba(0,0,0,0.33)] z-50"
    :class="returnPosition"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  position?: "top" | "right" | "left";
}>();

const returnPosition = computed(() => {
  switch (props.position) {
    case "top":
      return "right-[4px] left-[4px] top-[4px] w-[calc(100%-8px)]";
    case "left":
      return "left-[4px] top-[4px] w-[50vw]";
    case "right":
      return "right-[4px] top-[4px] w-[50vw]";
  }
});
</script>
