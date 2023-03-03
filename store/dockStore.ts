import { defineStore } from "pinia";
import type { AppEnum } from "~/enums/app.enum";

export const useDockStore = defineStore("dock", () => {
  const focusedWindow = ref<AppEnum | "">("");
  const activeApps = reactive<{ data: AppEnum[] }>({
    data: [],
  });

  const setFocusedWindow = (value: AppEnum | "") => {
    console.log("setFocusedWindow", value);
    focusedWindow.value = value;
  };

  const isFocused = (value: AppEnum) => value === focusedWindow.value;

  const isActiveApp = (app: AppEnum) => {
    return activeApps.data.includes(app);
  };

  const onActivateApp = (app: AppEnum) => {
    if (!isActiveApp(app)) {
      activeApps.data.push(app);
      setFocusedWindow(app);
    }
  };

  const onCloseApp = (app: AppEnum) => {
    activeApps.data = activeApps.data.filter((activeApp) => activeApp !== app);
    setFocusedWindow("");
  };

  return {
    focusedWindow,
    setFocusedWindow,
    isFocused,
    activeApps,
    isActiveApp,
    onActivateApp,
    onCloseApp,
  };
});
