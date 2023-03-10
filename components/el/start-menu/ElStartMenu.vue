<template>
  <teleport to="body">
    <transition-expand no-opacity>
      <div
        v-if="props.showMenu"
        class="fixed z-40 left-0 bottom-[59px] right-0 flex justify-center"
      >
        <div
          ref="elStartMenu"
          class="bg-[var(--ElStartMenu-bg-color)] border border-[var(--ElStartMenu-border-color)] backdrop-blur-[100px] w-[642px] h-[726px] flex flex-col rounded-lg overflow-hidden shadow-lg"
        >
          <div class="flex-1 px-[33px] py-[32px]">
            <div class="relative">
              <icon-search-input
                class="absolute top-1/2 left-[23px] transform -translate-x-1/2 -translate-y-1/2"
              />
              <input
                class="w-full rounded-[50px] outline-none bg-[var(--ElStartMenu-input-background-color)] py-[4px] text-[14px] px-[44px]"
                type="text"
                placeholder="Search for apps, settings, and documents"
              />
            </div>
            <div class="px-[30px] py-[40px]">
              <!-- HEADER MENU START -->
              <div class="flex items-center justify-between">
                <p class="text-[14px]">Pinned</p>
                <a
                  class="mt-[1px] bg-[var(--ElStartMenu-apps-background-color)] rounded-[5px] text-[12px] flex items-center gap-[15px] px-[9px] py-[3px]"
                  >All apps <icon-chevron-right
                /></a>
              </div>
              <!-- HEADER MENU END -->
              <!-- APPS MENU START -->
              <div class="mt-[20px] -mx-[30px] grid grid-cols-6 gap-y-[20px]">
                <global-button
                  v-for="app in apps.data"
                  :key="app.name"
                  class="py-[5px] flex flex-col items-center"
                >
                  <template #custom>
                    <component
                      :is="app.iconName"
                      v-if="app.icon"
                      class="w-[32px] h-[32px]"
                    />
                    <global-image
                      v-else
                      class="block w-[32px] h-[32px]"
                      :src="app.iconName"
                      :alt="app.iconName"
                    />
                    <p class="mt-[3px] text-[12px]">{{ app.name }}</p>
                  </template>
                </global-button>
              </div>
              <!-- APPS MENU END -->
              <!-- RECOMMENDED MENU START -->
              <div class="mt-[48px]">
                <p class="text-[14px]">Recommended</p>
                <div class="mt-[20px] -mx-[3px]">
                  <global-button
                    v-for="app in recommendedApps.data"
                    :key="app.name"
                    class="p-[5px] gap-[12px] flex items-center"
                  >
                    <template #custom>
                      <component
                        :is="app.iconName"
                        v-if="app.icon"
                        class="w-[32px] h-[32px]"
                      />
                      <global-image
                        v-else
                        class="block w-[32px] h-[32px]"
                        :src="app.iconName"
                        :alt="app.iconName"
                      />
                      <div class="text-left">
                        <p class="text-[12px]">{{ app.name }}</p>
                        <p class="text-[12px]">
                          {{ dateFormat().getAgoTime(app.updatedAt).value }}
                        </p>
                      </div>
                    </template>
                  </global-button>
                </div>
              </div>
              <!-- RECOMMENDED MENU END -->
            </div>
          </div>
          <div
            class="h-[65px] bg-[var(--ElStartMenu-bg-bottom-color)] border-t border-[var(--ElStartMenu-border-bottom-color)] bg-opacity-30"
          ></div>
        </div>
      </div>
    </transition-expand>
  </teleport>
</template>

<script lang="ts" setup>
import { AppEnum } from "~/enums/app.enum";

const props = defineProps<{
  showMenu: boolean;
}>();

const emit = defineEmits(["close"]);

const elStartMenu = ref<HTMLElement | null>(null);

onClickOutside(elStartMenu, () => emit("close"));

const apps = reactive({
  data: [
    {
      name: "Edge",
      icon: true,
      iconName: "icon-microsoft-edge",
      app: AppEnum.microsoftEdge,
    },
    {
      name: "Mail",
      icon: true,
      iconName: "icon-mail",
      app: AppEnum.mail,
    },
    {
      name: "Calendar",
      icon: true,
      iconName: "icon-calendar",
      app: AppEnum.calendar,
    },
    {
      name: "Microsoft Store",
      iconName: "/images/icons/microsoft-store.png",
      app: AppEnum.microsoftStore,
    },
    {
      name: "Photos",
      icon: true,
      iconName: "icon-pictures",
      app: AppEnum.photos,
    },
    {
      name: "Settings",
      iconName: "/images/icons/settings.png",
      app: AppEnum.settings,
    },
    {
      name: "Calculator",
      iconName: "/images/icons/calculator.png",
      app: AppEnum.calculator,
    },
    {
      name: "Clock",
      iconName: "/images/icons/clock.png",
      app: AppEnum.clock,
    },
    {
      name: "Notepad",
      iconName: "/images/icons/notepad.png",
      app: AppEnum.notepad,
    },
    {
      name: "Paint",
      iconName: "/images/icons/paint.png",
      app: AppEnum.paint,
    },
    {
      name: "File Explorer",
      icon: true,
      iconName: "icon-file-explorer",
      app: AppEnum.fileExplorer,
    },
    {
      name: "Movies & TV",
      iconName: "/images/icons/movies-tv.png",
      app: AppEnum.moviesTv,
    },
    {
      name: "Netflix",
      icon: true,
      iconName: "icon-netflix",
      app: AppEnum.netflix,
    },
  ],
});

const recommendedApps = reactive({
  data: [
    {
      name: "Visual Studio Code",
      updatedAt: new Date(),
      icon: true,
      iconName: "icon-visual-studio-code",
    },
  ],
});
</script>

<style lang="scss" scoped></style>

<style>
[data-theme="theme1"] {
  /*START MENU*/
  --ElStartMenu-bg-color: var(--el-footer-bg-color);
  --ElStartMenu-border-color: #3a3f48;
  --ElStartMenu-bg-bottom-color: rgba(0, 0, 0, 0.3);
  --ElStartMenu-border-bottom-color: rgba(0, 0, 0, 0.1);
  --ElStartMenu-input-background-color: rgba(30, 30, 30, 0.7);
  --ElStartMenu-apps-background-color: rgba(255, 255, 255, 0.0605);
}

[data-theme="theme2"] {
  /*START MENU*/
  --ElStartMenu-bg-color: var(--el-footer-bg-color);
  --ElStartMenu-border-color: #3a3f48;
  --ElStartMenu-bg-bottom-color: rgba(0, 0, 0, 0.3);
  --ElStartMenu-border-bottom-color: rgba(0, 0, 0, 0.1);
  --ElStartMenu-input-background-color: rgba(30, 30, 30, 0.7);
  --ElStartMenu-apps-background-color: rgba(255, 255, 255, 0.0605);
}
</style>
