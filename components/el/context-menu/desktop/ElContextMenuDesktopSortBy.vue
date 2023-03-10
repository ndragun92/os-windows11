<template>
  <div class="absolute top-0 z-10" :class="[`${align}-full`]">
    <ul
      ref="elContextMenuDesktopView"
      class="context__menu-list context__menu-list--submenu w-[121px]"
    >
      <global-context-menu-item>Name</global-context-menu-item>
      <global-context-menu-item>Size</global-context-menu-item>
      <global-context-menu-item>Item type</global-context-menu-item>
      <global-context-menu-item>Date modified</global-context-menu-item>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import useElementValidation from "~/composables/useElementValidation";
const elContextMenuDesktopView = ref<HTMLElement | null>(null);

const { isOutOfViewport } = useElementValidation();

const align = ref("left");
onMounted(async () => {
  await nextTick(async () => {
    const data = isOutOfViewport(elContextMenuDesktopView.value);
    if (data) {
      const { right } = data;
      if (right) {
        align.value = "right";
      }
    }
  });
});
</script>
