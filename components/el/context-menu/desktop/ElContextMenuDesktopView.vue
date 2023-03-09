<template>
  <div class="absolute top-0 z-10" :class="[`${align}-full`]">
    <ul
      ref="elContextMenuDesktopView"
      class="context__menu-list context__menu-list--submenu w-[267px]"
    >
      <global-context-menu-item>
        <template #custom>
          <div class="-ml-[5px] w-[25px] flex items-center justify-center">
            <Icon size="20" name="bi:dot" />
          </div>
          <div class="flex items-center justify-between flex-1">
            <div class="flex items-center gap-[12px]">
              <div class="w-[20px] h-[20px] flex items-center justify-center">
                <Icon size="20" name="fe:text-size" />
              </div>
              <span>Large icons</span>
            </div>
            <div>
              <small class="text-xxs">Ctrl+Shift+2</small>
            </div>
          </div>
        </template>
      </global-context-menu-item>
      <global-context-menu-item>
        <template #custom>
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
        </template>
      </global-context-menu-item>
      <global-context-menu-item>
        <template #custom>
          <div class="-ml-[5px] w-[25px] flex items-center justify-center">
            <Icon size="20" name="bi:dot" />
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
        </template>
      </global-context-menu-item>
      <global-context-menu-divider />
      <global-context-menu-item>
        <template #custom>
          <div class="-ml-[5px] w-[25px] flex items-center justify-center">
            <Icon size="20" name="ion:ios-checkmark" />
          </div>
          <div class="flex items-center justify-between flex-1">
            <div class="flex items-center gap-[12px]">
              <div class="w-[20px] h-[20px] flex items-center justify-center">
                <Icon size="16" name="carbon:automatic" />
              </div>
              <span>Auto arrange icons</span>
            </div>
          </div>
        </template>
      </global-context-menu-item>
      <global-context-menu-item>
        <template #custom>
          <div class="-ml-[5px] w-[25px] flex items-center justify-center">
            <Icon size="20" name="ion:ios-checkmark" />
          </div>
          <div class="flex items-center justify-between flex-1">
            <div class="flex items-center gap-[12px]">
              <div class="w-[20px] h-[20px] flex items-center justify-center">
                <Icon size="16" name="lucide:align-horizontal-justify-end" />
              </div>
              <span>Align icons to grid</span>
            </div>
          </div>
        </template>
      </global-context-menu-item>
      <global-context-menu-divider />
      <global-context-menu-item>
        <template #custom>
          <div class="-ml-[5px] w-[25px] flex items-center justify-center">
            <Icon size="20" name="ion:ios-checkmark" />
          </div>
          <div class="flex items-center justify-between flex-1">
            <div class="flex items-center gap-[12px]">
              <div class="w-[20px] h-[20px] flex items-center justify-center">
                <Icon size="16" name="mdi:remote-desktop" />
              </div>
              <span>Show desktop icons</span>
            </div>
          </div>
        </template>
      </global-context-menu-item>
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
