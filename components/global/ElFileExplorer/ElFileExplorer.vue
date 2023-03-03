<template>
  <div
    id="el-explorer"
    ref="el"
    class="el__manipulate-window fixed border border-[var(--window-border-color)] bg-[var(--window-wrapper-color)] overflow-hidden"
    :class="[
      dockStore.isFocused(AppEnum.fileExplorer)
        ? 'z-40 drop-shadow-[var(--window-container-shadow-color-focused)]'
        : 'z-30 drop-shadow-[var(--window-container-shadow-color)]',
      {
        'rounded-lg': !maximized,
        'el__manipulate-window--maximized': maximized,
      },
    ]"
    :style="style"
    @click="dockStore.setFocusedWindow(AppEnum.fileExplorer)"
  >
    <div
      class="overflow-hidden flex flex-col"
      :style="wrapperStyle.data"
      :class="[
        {
          'el__manipulate-window--transition': transition,
        },
      ]"
    >
      <div class="absolute z-10 top-0 right-0 h-8">
        <div class="h-full flex items-center">
          <button
            class="w-12 text-neutral-500 h-full flex items-center justify-center transition duration-200"
            :class="['hover:text-white hover:bg-white hover:bg-opacity-5']"
            type="button"
          >
            <Icon name="codicon:chrome-minimize" />
          </button>
          <button
            class="w-12 text-neutral-500 h-full flex items-center justify-center transition duration-200"
            :class="['hover:text-white hover:bg-white hover:bg-opacity-5']"
            type="button"
            @click="toggleMaxMin"
          >
            <!--          Original: fluent:maximize-16-regular-->
            <Icon
              :name="
                maximized ? 'prime:window-minimize' : 'prime:window-maximize'
              "
            />
          </button>
          <button
            class="w-12 text-neutral-500 h-full flex items-center justify-center transition duration-200"
            :class="['hover:text-white hover:bg-red-600']"
            type="button"
            @click.stop="dockStore.onCloseApp(AppEnum.fileExplorer)"
          >
            <Icon size="20" name="mdi:close" />
          </button>
        </div>
      </div>
      <div
        class="relative transition duration-200 border-b border-[var(--window-header-border-bottom-color)]"
        :class="[
          dockStore.isFocused(AppEnum.fileExplorer)
            ? 'bg-[var(--window-header-color-focused)] border-[var(--window-header-border-bottom-color-focused)]'
            : 'bg-[var(--window-header-color)] border-[var(--window-header-border-bottom-color)]',
          maximized ? 'h-auto' : 'h-11',
        ]"
      >
        <div ref="handle" class="el__manipulate-window--handle" />
        <ul
          class="relative h-full flex items-end gap-0.5 px-2 pointer-events-none"
        >
          <li
            class="pointer-events-auto -mb-[1px] w-[25%] max-w-[240px] rounded-tr-md rounded-tl-md h-9 flex items-center px-3 text-xs"
            :class="
              dockStore.isFocused(AppEnum.fileExplorer)
                ? 'bg-[var(--window-tab-color-focused)] border-t border-r border-l border-[var(--window-tab-border-color-focused)]'
                : 'bg-[var(--window-tab-color)] border-t border-r border-l border-[var(--window-tab-border-color)]'
            "
          >
            <div class="w-full flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <Icon size="18" name="fluent-emoji:derelict-house" />
                <span>Home</span>
              </div>
              <div>
                <button type="button">
                  <Icon size="16" name="mdi:close" />
                </button>
              </div>
            </div>
          </li>
          <li class="pointer-events-auto ml-2 mb-1">
            <button
              type="button"
              class="h-7 w-10 flex items-center justify-center rounded-md"
              :class="
                dockStore.isFocused(AppEnum.fileExplorer)
                  ? 'hover:bg-[var(--window-tab-color-focused)]'
                  : 'hover:bg-[var(--window-tab-color)]'
              "
            >
              <Icon size="16" name="fluent:add-16-regular" />
            </button>
          </li>
        </ul>
      </div>
      <div
        class="h-[54px] border-b border-[var(--window-border-color)]"
        :class="
          dockStore.isFocused(AppEnum.fileExplorer)
            ? 'bg-[var(--window-tab-color-focused)]'
            : 'bg-[var(--window-tab-color)]'
        "
      ></div>
      <div
        class="flex-1 max-h-full overflow-hidden bg-[var(--window-container-color)] p-2"
      >
        <div class="w-full h-full flex items-center justify-center">
          <Icon class="mr-2" size="24" name="fluent-emoji-flat:warning" />
          File Explorer is under construction...
        </div>
      </div>
      <div class="flex items-center justify-between h-8 pl-4">
        <div>
          <span class="font-light text-xs">13 items | 1 item selected |</span>
        </div>
        <div class="flex items-center">
          <button
            type="button"
            class="flex items-center justify-center h-8 w-8 text-neutral-400"
          >
            <Icon size="24" name="mdi:list-box" />
          </button>
          <button
            type="button"
            class="flex items-center justify-center h-8 w-8 text-neutral-400"
          >
            <Icon size="24" name="mdi:view-gallery" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { useDockStore } from "~/store/dockStore";
import { AppEnum } from "~/enums/app.enum";
import interact from "interactjs";

const dockStore = useDockStore();

const {
  el,
  handle,
  transition,
  maximized,
  draggableInitialValues,
  wrapperStyle,
  onMaxMin,
  initResizeObserver,
  resizeWindowOptions,
} = useManipulateWindow(AppEnum.fileExplorer, { x: 100, y: 100 });

onClickOutside(el, () => dockStore.setFocusedWindow(""));
let { x, y, style, isDragging } = useDraggable(el, {
  initialValue: {
    x: draggableInitialValues.value.data.x,
    y: draggableInitialValues.value.data.y,
  },
  handle: handle,
});

watch(
  () => isDragging.value,
  () => {
    draggableInitialValues.value.data.x = x.value;
    draggableInitialValues.value.data.y = y.value;
  }
);

const toggleMaxMin = () => onMaxMin(x, y);

initResizeObserver();

watch(
  () => maximized.value,
  (val) => {
    if (el.value) {
      interact(el.value).resizable(!val);
    }
  }
);

watch(
  () => el.value,
  (e) => {
    if (e) {
      interact(e).resizable(resizeWindowOptions(e));
    }
  }
);
</script>

<style>
:root {
  /*--window-header-color: #202020;*/
  /*--window-header-color-focused: #000b22;*/
  /*--window-header-border-bottom-color: #1d1d1d;*/
  /*--window-header-border-bottom-color-focused: transparent;*/
  /*--window-tab-color: #2c2c2c;*/
  /*--window-tab-color-focused: #1a1f2e;*/
  /*--window-wrapper-color: #1c1c1c;*/
  /*--window-container-color: #191919;*/
  /*--window-border-color: #3a3a3a;*/
}

[data-theme="theme1"] {
  --window-container-shadow-color: 0 0 20px rgba(0, 0, 0, 0.15);
  --window-container-shadow-color-focused: 0 0 20px rgba(0, 0, 0, 0.3);
  --window-header-color: #e8e8e8;
  --window-header-color-focused: #ccdeec;
  --window-header-border-bottom-color: #dadada;
  --window-header-border-bottom-color-focused: #bccdd9;
  --window-tab-border-color: #dadada;
  --window-tab-border-color-focused: #bccdd9;
  --window-tab-color: #f8f8f8;
  --window-tab-color-focused: #f0f5f8;
  --window-wrapper-color: #ffffff;
  --window-container-color: #ffffff;
  --window-border-color: #bccdd9;
}

[data-theme="theme2"] {
  --window-header-color: #202020;
  --window-header-color-focused: #000b22;
  --window-header-border-bottom-color: #1d1d1d;
  --window-header-border-bottom-color-focused: transparent;
  --window-tab-border-color: #1d1d1d;
  --window-tab-border-color-focused: transparent;
  --window-tab-color: #2c2c2c;
  --window-tab-color-focused: #1a1f2e;
  --window-wrapper-color: #1c1c1c;
  --window-container-color: #191919;
  --window-border-color: #3a3a3a;
}
</style>
