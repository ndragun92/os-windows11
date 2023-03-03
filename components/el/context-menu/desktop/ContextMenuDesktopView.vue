<template>
  <div class="absolute top-0 z-10" :class="[`${align}-full`]">
    <ul
      ref="elContextMenuDesktopView"
      class="whitespace-nowrap w-[267px] border border-black border-opacity-20 p-[5px] bg-[var(--global-context-menu-sub-bg-color)] backdrop-blur-[20px] rounded-lg text-sm gap-[5px] flex flex-col font-light"
    >
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        <div class="-ml-[5px] w-[25px] flex items-center justify-center">
          <!--                  <Icon size="20" name="bi:dot" />-->
        </div>
        <div class="flex items-center justify-between flex-1">
          <div class="flex items-center gap-[12px]">
            <Icon size="20" name="fe:text-size" />
            <span>Large icons</span>
          </div>
          <div>
            <small class="text-xxs">Ctrl+Shift+2</small>
          </div>
        </div>
      </li>
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        <div class="-ml-[5px] w-[25px] flex items-center justify-center">
          <Icon size="20" name="bi:dot" />
        </div>
        <div class="flex items-center justify-between flex-1">
          <div class="flex items-center gap-[12px]">
            <div class="w-[20px] h-[20px] flex items-center justify-center">
              <Icon size="16" name="fe:text-size" />
            </div>
            <span>Medium icons</span>
          </div>
          <div>
            <small class="text-xxs">Ctrl+Shift+3</small>
          </div>
        </div>
      </li>
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        <div class="-ml-[5px] w-[25px] flex items-center justify-center">
          <!--                  <Icon size="20" name="bi:dot" />-->
        </div>
        <div class="flex items-center justify-between flex-1">
          <div class="flex items-center gap-[12px]">
            <div class="w-[20px] h-[20px] flex items-center justify-center">
              <Icon size="12" name="fe:text-size" />
            </div>
            <span>Small icons</span>
          </div>
          <div>
            <small class="text-xxs">Ctrl+Shift+4</small>
          </div>
        </div>
      </li>
      <li
        class="h-[1px] w-full bg-[var(--global-context-menu-separator-color)]"
      />
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        <div class="-ml-[5px] w-[25px] flex items-center justify-center">
          <Icon size="20" name="ion:ios-checkmark" />
        </div>
        <div class="flex items-center gap-[12px]">
          <div class="w-[20px] h-[20px] flex items-center justify-center">
            <Icon size="16" name="carbon:automatic" />
          </div>
          <span>Auto arrange icons</span>
        </div>
      </li>
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        <div class="-ml-[5px] w-[25px] flex items-center justify-center">
          <Icon size="20" name="ion:ios-checkmark" />
        </div>
        <div class="flex items-center gap-[12px]">
          <div class="w-[20px] h-[20px] flex items-center justify-center">
            <Icon size="16" name="lucide:align-horizontal-justify-end" />
          </div>
          <span>Align icons to grid</span>
        </div>
      </li>
      <li
        class="h-[1px] w-full bg-[var(--global-context-menu-separator-color)]"
      />
      <li
        class="flex items-center gap-[5px] hover:bg-[var(--global-context-menu-sub-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
      >
        <div class="-ml-[5px] w-[25px] flex items-center justify-center">
          <Icon size="20" name="ion:ios-checkmark" />
        </div>
        <div class="flex items-center gap-[12px]">
          <div class="w-[20px] h-[20px] flex items-center justify-center">
            <Icon size="16" name="mdi:remote-desktop" />
          </div>
          <span>Show desktop icons</span>
        </div>
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
