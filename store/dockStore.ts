import { defineStore } from "pinia";
import type { AppEnum } from "~/enums/app.enum";

export const useDockStore = defineStore("dock", () => {
  const focusedWindow = ref<AppEnum | "">("");
  const activeApps = reactive<{ data: AppEnum[] }>({
    data: [],
  });
  const minimizedApps = reactive<{ data: AppEnum[] }>({
    data: [],
  });

  const setFocusedWindow = async (value: AppEnum | "", delay = false) => {
    if (delay) {
      await nextTick(() =>
        setTimeout(() => (focusedWindow.value = value), 100)
      );
    } else {
      focusedWindow.value = value;
    }
  };

  const isFocused = (value: AppEnum) => value === focusedWindow.value;

  const isVisible = (app: AppEnum) => {
    return activeApps.data.includes(app) && !minimizedApps.data.includes(app);
  };

  const isActive = (app: AppEnum) => {
    return activeApps.data.includes(app);
  };

  const open = async (app: AppEnum, force = false) => {
    if (force) {
      if (!activeApps.data.includes(app)) {
        activeApps.data.push(app);
        focusedWindow.value = app;
      } else if (minimizedApps.data.includes(app)) {
        minimizedApps.data = minimizedApps.data.filter((obj) => obj !== app);
        focusedWindow.value = app;
      }
    } else if (!activeApps.data.includes(app)) {
      activeApps.data.push(app);
      focusedWindow.value = app;
    } else if (isFocused(app)) {
      if (!minimizedApps.data.includes(app)) {
        minimizedApps.data.push(app);
        focusedWindow.value = "";
      } else {
        minimizedApps.data = minimizedApps.data.filter((obj) => obj !== app);
        focusedWindow.value = app;
      }
    } else {
      if (!minimizedApps.data.includes(app) && isFocused(app)) {
        minimizedApps.data.push(app);
        focusedWindow.value = "";
      } else {
        minimizedApps.data = minimizedApps.data.filter((obj) => obj !== app);
        await nextTick(() => setTimeout(() => (focusedWindow.value = app), 75));
      }
    }
  };

  const close = async (app: AppEnum) => {
    activeApps.data = activeApps.data.filter((activeApp) => activeApp !== app);
    await setFocusedWindow("");
  };

  const minimize = async (app: AppEnum) => {
    if (!minimizedApps.data.includes(app)) {
      minimizedApps.data.push(app);
      await setFocusedWindow("");
    }
  };

  return {
    focusedWindow,
    setFocusedWindow,
    isFocused,
    activeApps,
    close,
    open,
    minimize,
    isVisible,
    isActive,
  };
});
