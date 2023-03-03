import { defineStore } from "pinia";
export const useDesktopStore = defineStore("desktop", () => {
  const exampleBoolean = ref(false);

  const setExampleBoolean = (value: boolean) => {
    exampleBoolean.value = value;
  };

  return { exampleBoolean, setExampleBoolean };
});
