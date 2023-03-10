<template>
  <div
    id="el-explorer"
    ref="el"
    class="el__manipulate-window fixed border border-[var(--GlobalFileExplorer-border-color)] bg-[var(--GlobalFileExplorer-wrapper-color)] overflow-hidden"
    :class="[
      dockStore.isFocused(AppEnum.fileExplorer)
        ? 'z-40 drop-shadow-[var(--GlobalFileExplorer-container-shadow-color-focused)]'
        : 'z-30 drop-shadow-[var(--GlobalFileExplorer-container-shadow-color)]',
      {
        'rounded-lg': !maximized,
        'el__manipulate-window--maximized': maximized,
        '!z-[51]': isDragging,
      },
    ]"
    :style="style"
    @click="dockStore.setFocusedWindow(AppEnum.fileExplorer, true)"
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
            @click.stop="dockStore.minimize(AppEnum.fileExplorer)"
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
            @click.stop="dockStore.close(AppEnum.fileExplorer)"
          >
            <Icon size="20" name="mdi:close" />
          </button>
        </div>
      </div>
      <div
        class="relative transition duration-200 border-b border-[var(--GlobalFileExplorer-header-border-bottom-color)]"
        :class="[
          dockStore.isFocused(AppEnum.fileExplorer)
            ? 'bg-[var(--GlobalFileExplorer-header-color-focused)] border-[var(--GlobalFileExplorer-header-border-bottom-color-focused)]'
            : 'bg-[var(--GlobalFileExplorer-header-color)] border-[var(--GlobalFileExplorer-header-border-bottom-color)]',
          maximized ? 'h-auto' : 'h-11',
        ]"
      >
        <div
          ref="handle"
          class="el__manipulate-window--handle"
          :class="{ 'pointer-events-none': maximized }"
        />
        <ul
          class="relative h-full flex items-end gap-0.5 px-2 pointer-events-none"
        >
          <li
            class="pointer-events-auto -mb-[1px] w-[25%] max-w-[240px] rounded-tr-md rounded-tl-md h-9 flex items-center px-3 text-xs"
            :class="
              dockStore.isFocused(AppEnum.fileExplorer)
                ? 'bg-[var(--GlobalFileExplorer-tab-color-focused)] border-t border-r border-l border-[var(--GlobalFileExplorer-tab-border-color-focused)]'
                : 'bg-[var(--GlobalFileExplorer-tab-color)] border-t border-r border-l border-[var(--GlobalFileExplorer-tab-border-color)]'
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
                  ? 'hover:bg-[var(--GlobalFileExplorer-tab-color-focused)]'
                  : 'hover:bg-[var(--GlobalFileExplorer-tab-color)]'
              "
            >
              <Icon size="16" name="fluent:add-16-regular" />
            </button>
          </li>
        </ul>
      </div>
      <div
        class="h-[54px] border-b border-[var(--GlobalFileExplorer-border-color)]"
        :class="
          dockStore.isFocused(AppEnum.fileExplorer)
            ? 'bg-[var(--GlobalFileExplorer-tab-color-focused)]'
            : 'bg-[var(--GlobalFileExplorer-tab-color)]'
        "
      ></div>
      <div
        class="flex-1 max-h-full overflow-hidden bg-[var(--GlobalFileExplorer-container-color)] p-2"
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
    <teleport to="body">
      <transition-scale no-opacity>
        <global-snap-overlay v-if="isSnapLeft && isDragging" position="left" />
      </transition-scale>
      <transition-scale no-opacity>
        <global-snap-overlay
          v-if="isSnapRight && isDragging"
          position="right"
        />
      </transition-scale>
      <transition-scale no-opacity>
        <global-snap-overlay v-if="isSnapTop && isDragging" position="top" />
      </transition-scale>
    </teleport>
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
  resetWindowPosition,
  width,
  height,
  windowOffscreenValidation,
  onMaxMin,
  initResizeObserver,
  resizeWindowOptions,
} = useManipulateWindow(AppEnum.fileExplorer, { x: 100, y: 100 });

onClickOutside(el, () =>
  nextTick(() => setTimeout(() => dockStore.setFocusedWindow(""), 50))
);
let { x, y, style, isDragging } = useDraggable(el, {
  initialValue: {
    x: draggableInitialValues.value.data.x,
    y: draggableInitialValues.value.data.y,
  },
  handle: handle,
  onEnd: async () => {
    await nextTick(async () => {
      await windowOffscreenValidation();
    });
  },
});

const { x: mouseX, y: mouseY } = useMouse();

const toggleMaxMin = () => onMaxMin(x, y);

const {
  validate: validateSnapResize,
  isSnapTop,
  isSnapRight,
  isSnapLeft,
} = useSnapResize({
  mouseY,
  mouseX,
  width,
  height,
  x,
  y,
  draggableInitialValues,
  wrapperStyle,
  toggleMaxMin,
});

watch(
  () => isDragging.value,
  (val: boolean) => {
    draggableInitialValues.value.data.x = x.value;
    draggableInitialValues.value.data.y = y.value;
    if (!val) {
      validateSnapResize();
    }
  }
);

watch(
  () => resetWindowPosition.value,
  () => {
    x.value = draggableInitialValues.value.data.x;
    y.value = draggableInitialValues.value.data.y;
  }
);

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
[data-theme="theme1"] {
  --GlobalFileExplorer-container-shadow-color: 0 0 20px rgba(0, 0, 0, 0.15);
  --GlobalFileExplorer-container-shadow-color-focused: 0 0 20px
    rgba(0, 0, 0, 0.3);
  --GlobalFileExplorer-header-color: #e8e8e8;
  --GlobalFileExplorer-header-color-focused: #ccdeec;
  --GlobalFileExplorer-header-border-bottom-color: #dadada;
  --GlobalFileExplorer-header-border-bottom-color-focused: #bccdd9;
  --GlobalFileExplorer-tab-border-color: #dadada;
  --GlobalFileExplorer-tab-border-color-focused: #bccdd9;
  --GlobalFileExplorer-tab-color: #f8f8f8;
  --GlobalFileExplorer-tab-color-focused: #f0f5f8;
  --GlobalFileExplorer-wrapper-color: #ffffff;
  --GlobalFileExplorer-container-color: #ffffff;
  --GlobalFileExplorer-border-color: #bccdd9;
}

[data-theme="theme2"] {
  --GlobalFileExplorer-header-color: #202020;
  --GlobalFileExplorer-header-color-focused: #000b22;
  --GlobalFileExplorer-header-border-bottom-color: #1d1d1d;
  --GlobalFileExplorer-header-border-bottom-color-focused: transparent;
  --GlobalFileExplorer-tab-border-color: #1d1d1d;
  --GlobalFileExplorer-tab-border-color-focused: transparent;
  --GlobalFileExplorer-tab-color: #2c2c2c;
  --GlobalFileExplorer-tab-color-focused: #1a1f2e;
  --GlobalFileExplorer-wrapper-color: #1c1c1c;
  --GlobalFileExplorer-container-color: #191919;
  --GlobalFileExplorer-border-color: #3a3a3a;
}
</style>
