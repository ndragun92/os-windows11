<template>
  <div
    id="el-microsoft-edge"
    ref="el"
    class="el__manipulate-window fixed border border-[var(--window-border-color)] bg-[var(--window-wrapper-color)] overflow-hidden"
    :class="[
      dockStore.isFocused(AppEnum.microsoftEdge) ? 'z-40' : 'z-30',
      {
        'rounded-lg': !maximized,
        'el__manipulate-window--maximized': maximized,
      },
    ]"
    :style="style"
    @click="dockStore.setFocusedWindow(AppEnum.microsoftEdge)"
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
            @click.stop="dockStore.onCloseApp(AppEnum.microsoftEdge)"
          >
            <Icon size="20" name="mdi:close" />
          </button>
        </div>
      </div>
      <div
        class="relative transition duration-200 border-b border-[var(--window-header-border-bottom-color)]"
        :class="[
          dockStore.isFocused(AppEnum.microsoftEdge)
            ? 'bg-[var(--app-microsoft-edge-header-color-focused)]'
            : 'bg-[var(--app-microsoft-edge-header-color)]',
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
              dockStore.isFocused(AppEnum.microsoftEdge)
                ? 'bg-[var(--app-microsoft-edge-tab-color-focused)]'
                : 'bg-[var(--app-microsoft-edge-tab-color-focused)]'
            "
          >
            <div class="w-full flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <Icon size="18" name="fluent:tab-desktop-new-page-20-regular" />
                <span>Nemanja Dragun</span>
              </div>
              <div>
                <button type="button">
                  <Icon size="16" name="mdi:close" />
                </button>
              </div>
            </div>
          </li>
          <li class="pointer-events-auto ml-0.5 mb-0.5">
            <button
              type="button"
              class="h-7 w-7 flex items-center justify-center rounded-md transition duration-200"
              :class="
                dockStore.isFocused(AppEnum.microsoftEdge)
                  ? 'hover:bg-[var(--app-microsoft-edge-tab-color-button-hover)]'
                  : 'hover:bg-[var(--app-microsoft-edge-tab-color-button-hover)]'
              "
            >
              <Icon size="20" name="fluent:add-16-regular" />
            </button>
          </li>
        </ul>
      </div>
      <div
        class="h-[39px] border-b border-[var(--window-border-color)]"
        :class="
          dockStore.isFocused(AppEnum.microsoftEdge)
            ? 'bg-[var(--app-microsoft-edge-tab-color-focused)]'
            : 'bg-[var(--app-microsoft-edge-tab-color-focused)]'
        "
      >
        <div class="flex items-center gap-1 h-full px-2">
          <div>
            <button
              class="w-10 h-8 rounded-sm transition duration-200 hover:bg-[var(--app-microsoft-edge-tab-button-hover)]"
              type="button"
            >
              <Icon size="24" name="bx:arrow-back" />
            </button>
          </div>
          <div>
            <button
              class="w-10 h-8 rounded-sm transition duration-200 hover:bg-[var(--app-microsoft-edge-tab-button-hover)]"
              type="button"
            >
              <Icon size="24" name="ep:refresh-right" />
            </button>
          </div>
          <div ref="searchEL" class="relative w-full">
            <input
              v-model="url"
              class="bg-[var(--app-microsoft-edge-search-bar)] w-full text-sm pl-12 font-light focus:outline-none"
              type="text"
              :class="
                inputFocused
                  ? 'rounded-tl-md rounded-tr-md h-9 border-t border-r border-l border-neutral-900'
                  : 'rounded-full h-[30px]'
              "
              @keydown.enter="onSearch"
              @focus="inputFocused = true"
            />
            <div class="absolute top-0 bottom-0 left-5 flex items-center">
              <Icon name="ic:outline-https" />
            </div>
            <div
              v-if="inputFocused"
              class="absolute z-10 top-9 left-0 right-0 bg-[var(--app-microsoft-edge-search-bar)] rounded-bl-md rounded-br-md border-r border-l border-b border-neutral-900 overflow-hidden"
            >
              <ul>
                <li
                  v-for="n in 10"
                  :key="n"
                  class="relative w-full text-sm h-[34px] border-l-4 pl-12 font-light flex items-center"
                  :class="
                    n === 1
                      ? 'bg-[var(--app-microsoft-edge-search-bar-dropdown-item-hover)] border-blue-400'
                      : 'border-transparent'
                  "
                >
                  {{ n }}. Tab
                  <div
                    class="absolute top-0 bottom-0 left-3.5 flex items-center"
                  >
                    <Icon name="ic:outline-https" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button
              class="w-10 h-8 rounded-sm transition duration-200 hover:bg-[var(--app-microsoft-edge-tab-button-hover)]"
              type="button"
            >
              <Icon size="20" name="fluent-mdl2:favorite-list" />
            </button>
          </div>
          <div>
            <button
              class="w-10 h-8 rounded-sm transition duration-200 hover:bg-[var(--app-microsoft-edge-tab-button-hover)]"
              type="button"
            >
              <Icon size="20" name="fluent:collections-add-20-regular" />
            </button>
          </div>
          <div>
            <button
              class="w-10 h-8 rounded-sm transition duration-200 hover:bg-[var(--app-microsoft-edge-tab-button-hover)]"
              type="button"
            >
              <Icon size="24" name="mdi:dots-horizontal" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex-1 max-h-full overflow-hidden bg-[var(--window-container-color)]"
      >
        <iframe
          class="w-full h-full border-0"
          :src="searchUrl || 'https://ndragun92.github.io/portfolio'"
          frameborder="0"
          >Browser not compatible.</iframe
        >
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
} = useManipulateWindow(AppEnum.microsoftEdge, { x: 150, y: 150 });

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

const searchEL = ref(null);
const url = ref("https://ndragun92.github.io/portfolio");
const searchUrl = ref("");
const inputFocused = ref(false);
const onSearch = () => {
  searchUrl.value = url.value;
};

onClickOutside(searchEL, () => (inputFocused.value = false));

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
  --app-microsoft-edge-search-bar: #2b2b2b;
  --app-microsoft-edge-search-bar-dropdown-item-hover: #383838;
  --app-microsoft-edge-header-color: #2e2e2e;
  --app-microsoft-edge-header-color-focused: #202020;
  --app-microsoft-edge-tab-color-focused: #3b3b3b;
  --app-microsoft-edge-tab-color-button-hover: #4f4f4f;
  --app-microsoft-edge-tab-button-hover: #4a4a4a;
  --theme-primary-color: #22d3ee;
}
</style>
