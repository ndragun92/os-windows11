<template>
  <div class="absolute top-0 z-10" :class="[`${align}-full`]">
    <ul
      ref="elContextMenuDesktopNew"
      class="context__menu-list context__menu-list--submenu w-[267px]"
    >
      <global-context-menu-item>
        <template #icon>
          <global-image
            class="block w-[20px] h-[20px]"
            src="/images/icons/folder-closed.png"
            alt="New folder"
          />
        </template>
        Folder
      </global-context-menu-item>
      <global-context-menu-item>
        <template #icon>
          <Icon size="20" name="noto-v1:soon-arrow" />
        </template>
        Coming soon...
      </global-context-menu-item>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import useElementValidation from "~/composables/useElementValidation";
const elContextMenuDesktopNew = ref<HTMLElement | null>(null);

const { isOutOfViewport } = useElementValidation();

const align = ref("left");
onMounted(async () => {
  await nextTick(async () => {
    const data = isOutOfViewport(elContextMenuDesktopNew.value);
    if (data) {
      const { right } = data;
      if (right) {
        align.value = "right";
      }
    }
  });
});
</script>
