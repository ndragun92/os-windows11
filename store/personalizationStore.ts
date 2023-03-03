import { defineStore } from "pinia";
import { ThemesEnum } from "~/enums/themes.enum";
export const usePersonalizationStore = defineStore("personalization", () => {
  const theme = ref<ThemesEnum>(ThemesEnum.theme2);

  const setTheme = (value: ThemesEnum) => {
    theme.value = value;
  };

  return { theme, setTheme };
});
