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
          maximized ? 'h-auto' : 'h-[39px]',
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
            class="pointer-events-auto -mb-[1px] w-[25%] max-w-[240px] rounded-tr-lg rounded-tl-lg h-[30px] flex items-center pl-[8px] pr-[10px] text-xs"
            :class="
              dockStore.isFocused(AppEnum.fileExplorer)
                ? 'bg-[var(--GlobalFileExplorer-tab-color-focused)] border-t border-r border-l border-[var(--GlobalFileExplorer-tab-border-color-focused)]'
                : 'bg-[var(--GlobalFileExplorer-tab-color)] border-t border-r border-l border-[var(--GlobalFileExplorer-tab-border-color)]'
            "
          >
            <div class="w-full flex items-center justify-between gap-2">
              <div class="flex items-center gap-[10px]">
                <global-image
                  class="w-[16px] h-[16px]"
                  src="/images/icons/home.png"
                />
                <span>Home</span>
              </div>
              <div>
                <button type="button">
                  <Icon size="16" name="mdi:close" />
                </button>
              </div>
            </div>
          </li>
          <li class="pointer-events-auto ml-[5px] mb-[2px]">
            <button
              type="button"
              class="h-6 w-8 flex items-center justify-center rounded-md"
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
        class="h-[55px] border-b border-[var(--GlobalFileExplorer-border-color)]"
        :class="
          dockStore.isFocused(AppEnum.fileExplorer)
            ? 'bg-[var(--GlobalFileExplorer-tab-color-focused)]'
            : 'bg-[var(--GlobalFileExplorer-tab-color)]'
        "
      ></div>
      <div
        class="flex-1 max-h-full overflow-hidden bg-[var(--GlobalFileExplorer-container-color)]"
      >
        <div class="w-full h-full">
          <div class="h-[52px] w-full flex items-center">
            <div class="w-full flex items-center gap-[10px] px-[10px]">
              <div>
                <ul class="flex items-center gap-[5px]">
                  <li>
                    <global-button
                      class="w-[28px] h-[28px] rounded-sm"
                      :disable-shadow="true"
                    >
                      <template #icon
                        ><Icon
                          size="20"
                          name="material-symbols:arrow-back-rounded"
                      /></template>
                    </global-button>
                  </li>
                  <li>
                    <global-button
                      class="w-[28px] h-[28px] rounded-sm"
                      :disable-shadow="true"
                    >
                      <template #icon
                        ><Icon
                          size="20"
                          name="material-symbols:arrow-forward-rounded"
                      /></template>
                    </global-button>
                  </li>
                  <li>
                    <global-button
                      class="w-[20px] h-[28px] rounded-sm"
                      :disable-shadow="true"
                    >
                      <template #icon
                        ><Icon
                          size="20"
                          name="material-symbols:keyboard-arrow-down-rounded"
                      /></template>
                    </global-button>
                  </li>
                  <li>
                    <global-button
                      class="w-[28px] h-[28px] rounded-sm"
                      :disable-shadow="true"
                    >
                      <template #icon
                        ><Icon
                          size="20"
                          name="material-symbols:arrow-upward-rounded"
                      /></template>
                    </global-button>
                  </li>
                </ul>
              </div>
              <div class="flex-1 w-full">
                <div
                  class="w-full border border-[var(--GlobalFileExplorer-search-border-color)] h-[34px] pl-[8px] flex items-center"
                >
                  <div class="flex justify-between w-full">
                    <ul class="flex items-center gap-[2px]">
                      <li>
                        <div class="flex items-center justify-center h-[30px]">
                          <global-image
                            class="w-[16px] h-[16px]"
                            src="/images/icons/home.png"
                          />
                        </div>
                      </li>
                      <li>
                        <global-button
                          class="h-[30px] rounded-[0]"
                          :disable-shadow="true"
                        >
                          <template #icon
                            ><Icon
                              size="14"
                              name="material-symbols:chevron-right-rounded"
                          /></template>
                        </global-button>
                      </li>
                      <li>
                        <global-button
                          class="h-[30px] rounded-[0] px-[4px] text-xs"
                          :disable-shadow="true"
                        >
                          <template #name>Home</template>
                        </global-button>
                      </li>
                    </ul>
                    <ul class="mr-[1px] flex items-center gap-[2px]">
                      <li>
                        <global-button
                          class="w-[30px] h-[30px] rounded-[0]"
                          :disable-shadow="true"
                        >
                          <template #icon
                            ><Icon
                              size="20"
                              name="material-symbols:keyboard-arrow-down-rounded"
                          /></template>
                        </global-button>
                      </li>
                      <li>
                        <global-button
                          class="w-[30px] h-[30px] rounded-[0]"
                          :disable-shadow="true"
                        >
                          <template #icon
                            ><Icon
                              size="18"
                              name="material-symbols:refresh-rounded"
                          /></template>
                        </global-button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="w-[340px] border border-[var(--GlobalFileExplorer-search-border-color)] h-[34px] flex items-center relative"
                >
                  <input
                    class="bg-transparent w-full h-full pl-[8px] text-xs focus:outline-none"
                    type="text"
                    placeholder="Search Downloads"
                  />
                  <div
                    class="absolute right-0 top-0 bottom-0 flex items-center justify-center w-[30px] mr-[8px]"
                  >
                    <Icon
                      class="stroke-[var(--GlobalFileExplorer-search-border-color)]"
                      size="16"
                      name="icons8:search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-full p-4">Coming soon!</div>
        </div>
        <!--        <div class="w-full h-full flex items-center justify-center">-->
        <!--          <Icon class="mr-2" size="24" name="fluent-emoji-flat:warning" />-->
        <!--          File Explorer is under construction...-->
        <!--        </div>-->
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
  --GlobalFileExplorer-search-border-color: #535353;
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
  --GlobalFileExplorer-search-border-color: #535353;
}
</style>
