<template>
  <div class="absolute top-0 z-10" :class="[`${align}-full`]">
    <ul
      ref="elContextMenuDesktopView"
      class="context__menu-list context__menu-list--submenu w-[121px]"
    >
      <el-context-menu-item>Name</el-context-menu-item>
      <el-context-menu-item>Size</el-context-menu-item>
      <el-context-menu-item>Item type</el-context-menu-item>
      <el-context-menu-item>Date modified</el-context-menu-item>
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
