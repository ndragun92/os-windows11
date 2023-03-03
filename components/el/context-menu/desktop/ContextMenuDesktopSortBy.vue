<template>
  <div class="absolute top-0 z-10" :class="[`${align}-full`]">
    <ul
      ref="elContextMenuDesktopView"
      class="whitespace-nowrap w-[121px] border border-black border-opacity-20 p-[5px] bg-[var(--global-context-menu-sub-bg-color)] backdrop-blur-[20px] rounded-lg text-sm gap-[5px] flex flex-col font-light"
    >
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        Name
      </li>
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        Size
      </li>
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        Item type
      </li>
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        Date modified
      </li>
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
