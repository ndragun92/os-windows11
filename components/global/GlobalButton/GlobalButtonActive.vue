<template>
  <div
    class="absolute top-[calc(100%-4px)] h-[3px] rounded-full transition-all duration-200"
    :class="
      props.focused
        ? 'w-[16px] bg-[var(--global-accent-color)]'
        : 'w-[6px] bg-neutral-400'
    "
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  focused: boolean;
}>();
</script>
