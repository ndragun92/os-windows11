<template>
  <teleport to="body">
    <div
      class="fixed z-[60] left-[12px] top-[12px] bottom-[59px] bg-white bg-opacity-20 backdrop-blur-[50px] w-[760px] rounded-lg p-[23px] -translate-x-[calc(100%+12px)] duration-200"
      :class="
        props.visible
          ? 'pointer-events-auto translate-x-0'
          : 'pointer-events-none -translate-x-[calc(100%+12px)]'
      "
    >
      Coming soon!
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  visible: boolean;
}>();
</script>
