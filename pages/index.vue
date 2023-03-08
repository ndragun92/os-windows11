<template>
  <div
    :class="onMouseDownActive ? 'pointer-events-auto' : 'pointer-events-none'"
  >
    <div
      id="desktop-items"
      class="pointer-events-auto"
      @contextmenu.self.prevent="
        contextMenu.open($event, ContextMenuEnum.desktop)
      "
      @mousedown.self="onMouseDown"
    >
      <div
        v-for="slotIndex in 420"
        :id="`target--${slotIndex}`"
        :key="slotIndex"
        class="relative w-full h-[88.5px] pointer-events-all flex items-center justify-center p-1"
        :class="dragging ? 'pointer-events-auto' : 'pointer-events-none'"
        :data-position="slotIndex"
        @drop="onDrop"
        @dragover="onDragover"
      >
        <el-button
          v-if="getItemByIndex(slotIndex)"
          :id="`item--${slotIndex}`"
          :key="`item--${slotIndex}`"
          :class="['relative w-full h-full py-1 flex-col']"
          draggable="true"
          @dragstart="onDragStart($event, getItemIndexByIndex(slotIndex))"
          @dragend="onDragEnd"
          @dblclick="
            getItemByIndex(slotIndex)?.app
              ? dockStore.open(getItemByIndex(slotIndex)?.app)
              : log().onAlert('Coming soon')
          "
        >
          <template #icon>
            <component
              :is="getItemByIndex(slotIndex)?.iconName"
              v-if="getItemByIndex(slotIndex)?.icon"
              class="w-[50px] h-[50px] -mt-[25px] p-[5px]"
            />
            <el-image
              v-else
              class="block w-[50px] h-[50px] -mt-[25px] p-[5px]"
              :src="getItemByIndex(slotIndex)?.iconName"
              :alt="getItemByIndex(slotIndex)?.iconName"
            />
          </template>
          <template #name>
            <div class="absolute top-[calc(100%-27px)]">
              <span
                class="text-xxs line-clamp-2 w-full px-0.5 text-[var(--desktop-item-text-color)] leading-3"
                v-text="getItemByIndex(slotIndex)?.name"
              />
            </div>
          </template>
        </el-button>
      </div>
    </div>
    <lazy-el-context-menu
      :key="ContextMenuEnum.desktop"
      :type="ContextMenuEnum.desktop"
    >
      <ul class="context__menu-list context__menu-list--menu w-[267px]">
        <lazy-el-context-menu-item
          @mouseenter="contextMenuDesktopShowSub.data.view = true"
          @mouseleave="contextMenuDesktopShowSub.data.view = false"
        >
          <template #icon>
            <Icon size="20" name="prime:th-large" />
          </template>
          View
          <template #submenu>
            <transition-expand>
              <context-menu-desktop-view
                v-if="contextMenuDesktopShowSub.data.view"
              />
            </transition-expand>
          </template>
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-item
          @mouseenter="contextMenuDesktopShowSub.data.sortBy = true"
          @mouseleave="contextMenuDesktopShowSub.data.sortBy = false"
        >
          <template #icon>
            <div class="relative">
              <Icon
                class="opacity-0"
                size="20"
                name="fluent:arrow-sort-up-24-regular"
              />
              <Icon
                class="absolute top-0 -left-1"
                size="20"
                name="fluent:arrow-sort-up-24-regular"
              />
              <Icon
                class="absolute top-0 left-1 text-[var(--global-icons-color)]"
                size="20"
                name="fluent:arrow-sort-down-24-regular"
              />
            </div>
          </template>
          Sort by
          <template #submenu>
            <transition-expand>
              <context-menu-desktop-sort-by
                v-if="contextMenuDesktopShowSub.data.sortBy"
              />
            </transition-expand>
          </template>
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-item>
          <template #icon>
            <Icon size="20" name="material-symbols:refresh-rounded" />
          </template>
          Refresh
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-divider />
        <lazy-el-context-menu-item
          @mouseenter="contextMenuDesktopShowSub.data.new = true"
          @mouseleave="contextMenuDesktopShowSub.data.new = false"
        >
          <template #icon>
            <div
              class="border border-[var(--global-context-menu-item-icon-border-color)] rounded-full flex items-center justify-center w-[20px] h-[20px]"
            >
              <Icon
                class="text-[var(--global-icons-color)]"
                size="16"
                name="ic:baseline-add"
              />
            </div>
          </template>
          New
          <template #submenu>
            <transition-expand>
              <context-menu-desktop-new
                v-if="contextMenuDesktopShowSub.data.new"
              />
            </transition-expand>
          </template>
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-divider />
        <lazy-el-context-menu-item>
          <template #icon>
            <div class="relative flex items-center justify-center">
              <Icon
                size="20"
                name="material-symbols:desktop-windows-outline-rounded"
              />
              <Icon
                class="text-[var(--global-icons-color)] absolute -right-1 -bottom-0.5"
                size="16"
                name="typcn:cog"
              />
            </div>
          </template>
          Display settings
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-item>
          <template #icon>
            <icon-personalize class="w-[20px] h-[20px]" />
          </template>
          Personalize
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-divider />
        <lazy-el-context-menu-item>
          <template #icon>
            <icon-terminal class="w-[20px] h-[20px]" />
          </template>
          Open in Terminal
        </lazy-el-context-menu-item>
        <lazy-el-context-menu-divider />
        <lazy-el-context-menu-item>
          <template #icon>
            <Icon size="20" name="iconoir:scale-frame-enlarge" />
          </template>
          Show more options
          <template #extra>
            <div>
              <small class="text-xxs">Shift+F10</small>
            </div>
          </template>
        </lazy-el-context-menu-item>
      </ul>
    </lazy-el-context-menu>
    <lazy-transition-scale>
      <lazy-el-file-explorer v-if="dockStore.isVisible(AppEnum.fileExplorer)" />
    </lazy-transition-scale>
    <lazy-transition-scale>
      <lazy-el-microsoft-edge
        v-if="dockStore.isVisible(AppEnum.microsoftEdge)"
      />
    </lazy-transition-scale>
    <teleport to="body">
      <div
        v-if="onMouseDownActive"
        class="fixed bg-[#0078d7] bg-opacity-40 border border-[#0078d7] top-0 left-0 z-[999]"
        :style="{
          left: `${
            mouseCoordinates.data.dynamic.x ?? mouseCoordinates.data.start.x
          }px`,
          top: `${
            mouseCoordinates.data.dynamic.y ?? mouseCoordinates.data.start.y
          }px`,
          width: `${mouseCoordinates.data.width}px`,
          height: `${mouseCoordinates.data.height}px`,
        }"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageHomepage",
};
</script>

<script lang="ts" setup>
import { useDockStore } from "~/store/dockStore";
import { AppEnum } from "~/enums/app.enum";
import { ContextMenuEnum, useContextMenuStore } from "~/store/contextMenuStore";
import ContextMenuDesktopSortBy from "~/components/el/context-menu/desktop/ContextMenuDesktopSortBy.vue";
import ContextMenuDesktopNew from "~/components/el/context-menu/desktop/ContextMenuDesktopNew.vue";
const ContextMenuDesktopView = defineAsyncComponent(
  () =>
    import("~/components/el/context-menu/desktop/ContextMenuDesktopView.vue")
);

const dockStore = useDockStore();
const contextMenu = useContextMenuStore();

const { items, getItemByIndex, getItemIndexByIndex } = useDesktop();

const dragging = ref(false);
const onDragStart = (e, n) => {
  console.info("onDragStart");
  dragging.value = true;
  e?.dataTransfer?.setData(
    "application/my-app",
    JSON.stringify({
      index: n,
    })
  );
  if (e?.dataTransfer?.effectAllowed) {
    e.dataTransfer.effectAllowed = "move";
  }
};

const onDragEnd = () => {
  dragging.value = false;
  console.info("onDragEnd");
};
const onDragover = (e) => {
  e.preventDefault();
  if (e?.dataTransfer?.dropEffect) {
    e.dataTransfer.dropEffect = "move";
  }
};
const onDrop = (e) => {
  e.preventDefault();
  if (!e.target?.id?.startsWith("target--")) return;
  if (!e.target?.children?.length) {
    const data = e?.dataTransfer?.getData("application/my-app");
    if (data) {
      const { index } = JSON.parse(data);
      items.value.data[index].position = +e.target.dataset.position;
    }
  }
};

const onMouseDownActive = ref(false);
const mouseCoordinates = reactive<{
  data: {
    start: { x: number; y: number };
    dynamic: { x: null | number; y: null | number };
    width: number;
    height: number;
  };
}>({
  data: {
    start: {
      x: 0,
      y: 0,
    },
    dynamic: {
      x: null,
      y: null,
    },
    width: 0,
    height: 0,
  },
});
const onMouseDown = (e: MouseEvent) => {
  onMouseDownActive.value = true;
  mouseCoordinates.data.dynamic.x = 0;
  mouseCoordinates.data.dynamic.y = 0;
  mouseCoordinates.data.width = 0;
  mouseCoordinates.data.height = 0;
  mouseCoordinates.data.start.x = e.x;
  mouseCoordinates.data.start.y = e.y;
  document.addEventListener("mousemove", onMouseMoveEvent);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseUp = (e: MouseEvent) => {
  onMouseDownActive.value = false;
  document.removeEventListener("mousemove", onMouseMoveEvent);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMoveEvent = (e: MouseEvent) => {
  const { x, y } = e;
  const calculateWidth = x - mouseCoordinates.data.start.x;
  const calculateHeight = y - mouseCoordinates.data.start.y;
  mouseCoordinates.data.width = Math.abs(calculateWidth);
  mouseCoordinates.data.height = Math.abs(calculateHeight);
  if (calculateWidth < 0) {
    mouseCoordinates.data.dynamic.x =
      mouseCoordinates.data.start.x - Math.abs(calculateWidth);
  } else {
    mouseCoordinates.data.dynamic.x = null;
  }
  if (calculateHeight < 0) {
    mouseCoordinates.data.dynamic.y =
      mouseCoordinates.data.start.y - Math.abs(calculateHeight);
  } else {
    mouseCoordinates.data.dynamic.y = null;
  }
};

const contextMenuDesktopShowSub = reactive({
  data: {
    view: false,
    sortBy: false,
    new: false,
  },
});
</script>

<style>
[data-theme="theme1"] {
  --desktop-item-text-color: #ffffff;
}

[data-theme="theme2"] {
  --el-footer-bg-color: rgba(68, 68, 68, 0.3);
}
</style>

<style lang="scss" scoped>
[data-theme="theme1"] {
  #desktop-items {
    button {
      span {
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
      }
    }
  }
}
#desktop-items {
  @apply grid grid-cols-[repeat(auto-fill,_minmax(112px,_1fr))];
  button {
    --el-button-bg-color--hover: rgba(255, 255, 255, 0.1);
    &:hover {
      span {
        @apply underline;
      }
    }
  }
}
</style>
