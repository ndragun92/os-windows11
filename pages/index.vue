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
          v-if="items?.data?.find((obj) => obj.position === slotIndex)"
          :id="`item--${slotIndex}`"
          :key="`item--${slotIndex}`"
          :class="['relative w-full h-full py-1 flex-col']"
          draggable="true"
          @dragstart="
            onDragStart(
              $event,
              items?.data?.findIndex((obj) => obj.position === slotIndex)
            )
          "
          @dragend="onDragEnd"
          @dblclick="
            items?.data?.find((obj) => obj.position === slotIndex).app
              ? dockStore.isActiveApp(
                  items?.data?.find((obj) => obj.position === slotIndex).app
                )
                ? dockStore.setFocusedWindow(
                    items?.data?.find((obj) => obj.position === slotIndex).app
                  )
                : dockStore.onActivateApp(
                    items?.data?.find((obj) => obj.position === slotIndex).app
                  )
              : log().onAlert('Coming soon')
          "
        >
          <template #icon>
            <component
              :is="
                items?.data?.find((obj) => obj.position === slotIndex)?.iconName
              "
              v-if="
                items?.data?.find((obj) => obj.position === slotIndex)?.icon
              "
              class="w-[50px] h-[50px] -mt-[25px] p-[5px]"
            />
            <img
              v-else
              class="block w-[50px] h-[50px] -mt-[25px] p-[5px]"
              :src="
                items?.data?.find((obj) => obj.position === slotIndex)?.iconName
              "
              :alt="
                items?.data?.find((obj) => obj.position === slotIndex)?.iconName
              "
            />
          </template>
          <template #name>
            <div class="absolute top-[calc(100%-27px)]">
              <span
                class="text-xxs line-clamp-2 w-full px-0.5 text-[var(--desktop-item-text-color)] leading-3"
                v-text="
                  items?.data?.find((obj) => obj.position === slotIndex)?.name
                "
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
      <ul
        class="whitespace-nowrap w-[267px] border border-white border-opacity-5 p-[5px] bg-[var(--global-context-menu-bg-color)] backdrop-blur-[20px] rounded-lg text-sm gap-[5px] flex flex-col font-light"
      >
        <li
          class="relative flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
          @mouseenter="contextMenuDesktopShowSub.data.view = true"
          @mouseleave="contextMenuDesktopShowSub.data.view = false"
        >
          <div class="flex items-center gap-[12px]">
            <Icon size="20" name="prime:th-large" />
            <span>View</span>
          </div>
          <Icon size="16" name="ic:round-keyboard-arrow-right" />
          <transition-expand>
            <context-menu-desktop-view
              v-if="contextMenuDesktopShowSub.data.view"
            />
          </transition-expand>
        </li>
        <li
          class="relative flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
          @mouseenter="contextMenuDesktopShowSub.data.sortBy = true"
          @mouseleave="contextMenuDesktopShowSub.data.sortBy = false"
        >
          <div class="flex items-center gap-[12px]">
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
            <span>Sort by</span>
          </div>
          <Icon size="16" name="ic:round-keyboard-arrow-right" />
          <transition-expand>
            <context-menu-desktop-sort-by
              v-if="contextMenuDesktopShowSub.data.sortBy"
            />
          </transition-expand>
        </li>
        <li
          class="flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
        >
          <div class="flex items-center gap-[12px]">
            <Icon size="20" name="material-symbols:refresh-rounded" />
            <span>Refresh</span>
          </div>
        </li>
        <li
          class="h-[1px] w-full bg-[var(--global-context-menu-separator-color)]"
        />
        <li
          class="flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
        >
          <div class="flex items-center gap-[12px]">
            <div
              class="border border-[var(--global-context-menu-item-icon-border-color)] rounded-full flex items-center justify-center w-[20px] h-[20px]"
            >
              <Icon
                class="text-[var(--global-icons-color)]"
                size="16"
                name="ic:baseline-add"
              />
            </div>
            <span>New</span>
          </div>
          <Icon size="16" name="ic:round-keyboard-arrow-right" />
        </li>
        <li
          class="h-[1px] w-full bg-[var(--global-context-menu-separator-color)]"
        />
        <li
          class="flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
        >
          <div class="flex items-center gap-[12px]">
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
            <span>Display settings</span>
          </div>
        </li>
        <li
          class="flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
        >
          <div class="flex items-center gap-[12px]">
            <icon-personalize class="w-[20px] h-[20px]" />
            <span>Personalize</span>
          </div>
        </li>
        <li
          class="h-[1px] w-full bg-[var(--global-context-menu-separator-color)]"
        />
        <li
          class="flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
        >
          <div class="flex items-center gap-[12px]">
            <icon-terminal class="w-[20px] h-[20px]" />
            <span>Open in Terminal</span>
          </div>
        </li>
        <li
          class="h-[1px] w-full bg-[var(--global-context-menu-separator-color)]"
        />
        <li
          class="flex items-center justify-between hover:bg-[var(--global-context-menu-item-bg-color--hover)] cursor-pointer duration-200 rounded px-[10px] py-[6px]"
        >
          <div class="flex items-center gap-[12px]">
            <Icon size="20" name="iconoir:scale-frame-enlarge" />
            <span>Show more options</span>
          </div>
          <div>
            <small class="text-xxs">Shift+F10</small>
          </div>
        </li>
      </ul>
    </lazy-el-context-menu>
    <lazy-transition-scale>
      <lazy-el-file-explorer
        v-if="dockStore.isActiveApp(AppEnum.fileExplorer)"
      />
    </lazy-transition-scale>
    <lazy-transition-scale>
      <lazy-el-microsoft-edge
        v-if="dockStore.isActiveApp(AppEnum.microsoftEdge)"
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
const ContextMenuDesktopView = defineAsyncComponent(
  () =>
    import("~/components/el/context-menu/desktop/ContextMenuDesktopView.vue")
);

const dockStore = useDockStore();
const contextMenu = useContextMenuStore();

const { items } = useDesktop();

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
  console.log("onDragEnd");
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
const onMouseDown = (e) => {
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

const onMouseUp = (e) => {
  onMouseDownActive.value = false;
  document.removeEventListener("mousemove", onMouseMoveEvent);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMoveEvent = (e) => {
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
