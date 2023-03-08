<template>
  <teleport to="body">
    <lazy-transition-expand v-if="props.animationExpand" no-opacity>
      <div
        v-if="contextMenu.visible && contextMenu.type === props.type"
        class="fixed z-[9999]"
        :style="{
          [contextMenu.startPositionX]: contextMenu.returnStartPositionX,
          [contextMenu.startPositionY]: contextMenu.returnStartPositionY,
        }"
        @contextmenu.capture.prevent
      >
        <div ref="elContextMenu" class="inline-block">
          <slot></slot>
        </div>
      </div>
    </lazy-transition-expand>
    <lazy-transition-scale v-else no-opacity>
      <div
        v-if="contextMenu.visible && contextMenu.type === props.type"
        class="fixed z-[9999]"
        :style="{
          [contextMenu.startPositionX]: contextMenu.returnStartPositionX,
          [contextMenu.startPositionY]: contextMenu.returnStartPositionY,
        }"
        @contextmenu.capture.prevent
      >
        <div ref="elContextMenu" class="inline-block">
          <slot></slot>
        </div>
      </div>
    </lazy-transition-scale>
  </teleport>
</template>

<script lang="ts" setup>
import { ContextMenuEnum, useContextMenuStore } from "~/store/contextMenuStore";

const props = defineProps<{
  type: ContextMenuEnum;
  animationExpand?: boolean;
}>();

const contextMenu = useContextMenuStore();

const elContextMenu = ref<HTMLElement | null>(null);

onClickOutside(elContextMenu, () => contextMenu.setVisibility(false));
</script>
