<template>
  <footer
    class="h-[48px] pl-[8px] pr-[12px] bg-[var(--el-footer-bg-color)] backdrop-blur-[100px] relative z-40 border-t-[1px] border-white border-opacity-[0.15]"
    @contextmenu.self.prevent="contextMenu.open($event, ContextMenuEnum.footer)"
  >
    <div class="flex justify-between items-center h-full pointer-events-none">
      <div>
        <el-button
          v-if="weather.data"
          :tooltip="`${weather.data?.weather?.temperature ?? 0}&deg;C ${name}`"
          class="gap-0.5 w-36 py-0.5 px-2 whitespace-nowrap"
          justify="start"
          @click="log().onAlert('Coming soon')"
        >
          <template #icon>
            <el-image
              class="block w-[32px] h-[32px]"
              :src="`/images/weather/${icon}.png`"
              :alt="icon"
              :lazy="false"
            />
          </template>
          <template #name
            ><span class="flex flex-col gap-0.5 text-left text-xs">
              <span>{{ weather.data?.weather?.temperature ?? 0 }}&deg;C</span>
              <span
                class="text-[var(--el-footer-weather-text-color)]"
                v-text="name"
              /> </span></template
        ></el-button>
        <el-button
          v-else-if="!loading"
          :tooltip="
            notSupported
              ? `Geolocation is not supported by this browser`
              : `Please enable location on your browser to get weather information and then refresh browser`
          "
          class="gap-2 w-36 py-0.5 px-2"
          justify="start"
          tooltip-position="right"
        >
          <template #icon>
            <Icon size="24" name="fluent-emoji-flat:warning" />
          </template>
          <template #name
            ><span class="flex flex-col gap-0.5 text-left text-xs">
              <span>Warning</span>
              Hover to read</span
            ></template
          ></el-button
        >
      </div>
      <div class="-ml-[65px] flex items-center">
        <ul class="flex items-center gap-[1px]">
          <li class="menu__link">
            <el-button
              tooltip="Start"
              class="w-10 h-10 px-2"
              :class="{ '!pointer-events-none': showMenu }"
              :hover-scale="true"
              :focused="showMenu"
              @click="showMenu = !showMenu"
            >
              <template #icon>
                <icon-start />
              </template>
            </el-button>
          </li>
          <li class="mx-1">
            <div
              class="relative overflow-hidden pointer-events-auto bg-[var(--el-footer-input-bg-color)] border border-[var(--el-footer-input-border-color)] hover:bg-[var(--el-footer-input-bg-color-hover)] text-[var(--el-footer-input-text-color)] rounded-full px-[7px] py-[6px] w-[220px] flex items-center gap-[9px] transition duration-200"
            >
              <span
                class="pointer-events-none flex items-center justify-center"
              >
                <Icon size="20" name="radix-icons:magnifying-glass" />
              </span>
              <input
                class="absolute top-0 right-0 bottom-0 left-0 h-full text-sm tracking-wide bg-transparent pl-[36px] focus:outline-none"
                type="text"
                placeholder="Search"
                @keydown.enter="log().onAlert('Coming soon')"
              />
              <el-image
                class="pointer-events-none block absolute -right-[3px] -bottom-[1px]"
                src="/images/search-icons/1.png"
                alt="Search dolphin"
                :lazy="false"
              />
            </div>
          </li>
        </ul>
        <ul class="flex items-center gap-[4px]">
          <li class="menu__link">
            <el-button
              tooltip="File Explorer"
              :class="['w-10 h-10 px-2']"
              :hover-scale="true"
              @click="log().onAlert('Coming soon')"
            >
              <template #icon>
                <icon-multi-desktop class="w-6 h-6" />
              </template>
              <template #custom="{ active, focused }">
                <el-button-active v-show="active" :focused="focused" />
              </template>
            </el-button>
          </li>
          <li class="menu__link">
            <el-button
              tooltip="File Explorer"
              :class="['w-10 h-10 px-2']"
              :hover-scale="true"
              :active="dockStore.isActiveApp(AppEnum.fileExplorer)"
              :focused="dockStore.isFocused(AppEnum.fileExplorer)"
              @click="
                dockStore.isActiveApp(AppEnum.fileExplorer)
                  ? dockStore.setFocusedWindow(AppEnum.fileExplorer)
                  : dockStore.onActivateApp(AppEnum.fileExplorer)
              "
            >
              <template #icon>
                <icon-file-explorer class="w-6 h-6" />
              </template>
              <template #custom="{ active, focused }">
                <el-button-active v-show="active" :focused="focused" />
              </template>
            </el-button>
          </li>
          <li class="menu__link">
            <client-only>
              <el-button
                tooltip="Microsoft Edge"
                :class="['w-10 h-10 px-2']"
                :hover-scale="true"
                :active="dockStore.isActiveApp(AppEnum.microsoftEdge)"
                :focused="dockStore.isFocused(AppEnum.microsoftEdge)"
                @click="
                  dockStore.isActiveApp(AppEnum.microsoftEdge)
                    ? dockStore.setFocusedWindow(AppEnum.microsoftEdge)
                    : dockStore.onActivateApp(AppEnum.microsoftEdge)
                "
              >
                <template #icon>
                  <icon-microsoft-edge class="w-7 h-7" />
                </template>
                <template #custom="{ active, focused }">
                  <el-button-active v-show="active" :focused="focused" />
                </template>
              </el-button>
            </client-only>
          </li>
        </ul>
      </div>
      <div>
        <el-button
          :tooltip="`${currentDateFull?.value} <br/> <br/> ${currentDateShort?.value} (Local time) <br/> ${alternativeDateShort} (London time)`"
          tooltip-position-y-custom="bottom-[calc(100%+15px)]"
          tooltip-class="text-left"
          class="gap-0.5 py-0.5 px-2 text-xs flex-col text-right"
          align="end"
          @click="log().onAlert('Coming soon')"
        >
          <template #name>
            <div class="flex items-center gap-[5px]">
              <div>
                <span
                  v-if="currentTime"
                  class="block"
                  v-text="currentTime.value"
                />
                <span v-if="currentDate" v-text="currentDate.value" />
              </div>
              <div
                class="text-xxs bg-[var(--global-icons-color)] text-[var(--el-footer-time-badge-color)] py-[0px] px-[4px] rounded-full flex items-center justify-center"
              >
                20
              </div>
            </div>
          </template></el-button
        >
      </div>
    </div>
  </footer>
  <teleport to="body">
    <transition-expand no-opacity>
      <div
        v-if="showMenu"
        class="fixed z-40 left-0 bottom-[59px] right-0 flex justify-center"
      >
        <div
          ref="elStartMenu"
          class="bg-[var(--el-footer-start-menu-bg-color)] border border-[var(--el-footer-start-menu-border-color)] backdrop-blur-[100px] w-[642px] h-[726px] flex flex-col rounded-lg overflow-hidden shadow-lg"
        >
          <div class="flex-1 h-full flex items-center justify-center">
            Coming soon!
          </div>
          <div
            class="h-[65px] bg-[var(--el-footer-start-menu-bg-bottom-color)] border-t border-[var(--el-footer-start-menu-border-bottom-color)] bg-opacity-30"
          ></div>
        </div>
      </div>
    </transition-expand>
  </teleport>
  <lazy-el-context-menu :type="ContextMenuEnum.footer">
    <ul class="whitespace-nowrap">
      <li>Test 1</li>
      <li>Test 2</li>
      <li>Test 3</li>
    </ul>
  </lazy-el-context-menu>
</template>

<script setup lang="ts">
import { useDockStore } from "~/store/dockStore";
import { useDateFormat, useNow } from "@vueuse/core";
import { AppEnum } from "~/enums/app.enum";
import { ContextMenuEnum, useContextMenuStore } from "~/store/contextMenuStore";

const dockStore = useDockStore();
const contextMenu = useContextMenuStore();

const { getLocation, weather, icon, name, loading, notSupported } =
  useWeather();
onMounted(() => getLocation());

const currentTime = ref<any>(null);
const currentDate = ref<any>(null);
const currentDateShort = ref<any>(null);
const alternativeDateShort = ref<any>(null);
const currentDateFull = ref<any>(null);
const showMenu = ref(false);
const elStartMenu = ref<HTMLElement | null>(null);

onClickOutside(elStartMenu, () => (showMenu.value = false));

onMounted(() => {
  currentTime.value = useDateFormat(useNow(), "HH:mm");
  currentDate.value = useDateFormat(useNow(), "DD/MM/YYYY");
  currentDateShort.value = useDateFormat(useNow(), "ddd HH:mm");
  currentDateFull.value = useDateFormat(useNow(), "dddd, DD MMMM YYYY");
  alternativeDateShort.value = dayjs(new Date())
    .tz("Europe/London")
    .format("ddd HH:mm");
});
</script>

<style lang="scss" scoped>
footer {
  &:before {
    content: "";
    @apply absolute top-0 right-0 bottom-0 left-0 bg-[var(--el-footer-bg-color-overlay)];
  }
}
.weather {
  &__tooltip {
    @apply opacity-0 transition duration-200;
  }
  &__button {
    @apply transition duration-200;
    &:hover {
      .weather__tooltip {
        @apply opacity-100;
      }
    }
  }
}
.menu {
  &__link {
    &-tooltip {
      @apply opacity-0 transition duration-200;
    }
    &:hover {
      .menu__link-tooltip {
        @apply opacity-100;
      }
    }
  }
}
</style>

<style>
[data-theme="theme1"] {
  /*FOOTER*/
  --el-footer-bg-color: rgba(252, 252, 252, 0.85);
  --el-footer-bg-color-overlay: rgba(36, 110, 193, 0.2);
  /*SEARCH INPUT*/
  --el-footer-input-bg-color: rgba(243, 246, 253, 1);
  --el-footer-input-text-color: rgba(0, 0, 0, 1);
  --el-footer-input-bg-color-hover: rgba(243, 246, 253, 0.7);
  --el-footer-input-border-color: rgba(0, 0, 0, 0.12);
  /*WEATHER*/
  --el-footer-weather-text-color: #3e3e3e;
  /*TIME*/
  --el-footer-time-badge-color: #ffffff;
  /*START MENU*/
  --el-footer-start-menu-bg-color: var(--el-footer-bg-color);
  --el-footer-start-menu-border-color: #3a3f48;
  --el-footer-start-menu-bg-bottom-color: rgba(0, 0, 0, 0.3);
  --el-footer-start-menu-border-bottom-color: rgba(0, 0, 0, 0.1);
}

[data-theme="theme2"] {
  /*FOOTER*/
  --el-footer-bg-color: rgba(68, 68, 68, 0.4);
  --el-footer-bg-color-overlay: rgba(27, 31, 47, 0.5);
  /*SEARCH INPUT*/
  --el-footer-input-bg-color: rgba(65, 84, 107, 0.5);
  --el-footer-input-bg-color-hover: rgba(65, 84, 107, 0.6);
  --el-footer-input-text-color: rgba(255, 255, 255, 1);
  --el-footer-input-border-color: rgba(41, 61, 88, 0.2);
  /*WEATHER*/
  --el-footer-weather-text-color: #a7a7a7;
  /*TIME*/
  --el-footer-time-badge-color: #000000;
  /*START MENU*/
  --el-footer-start-menu-bg-color: var(--el-footer-bg-color);
  --el-footer-start-menu-border-color: #3a3f48;
  --el-footer-start-menu-bg-bottom-color: rgba(0, 0, 0, 0.3);
  --el-footer-start-menu-border-bottom-color: rgba(0, 0, 0, 0.1);
}
</style>
