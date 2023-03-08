import { useStorage } from "@vueuse/core";
import { AppEnum } from "~/enums/app.enum";
export default function useDesktop() {
  const items = useStorage("desktop--item", {
    data: [
      { position: 1, name: "This PC", icon: true, iconName: "icon-my-pc" },
      {
        position: 2,
        name: "File Explorer",
        icon: true,
        iconName: "icon-file-explorer",
        app: AppEnum.fileExplorer,
      },
      {
        position: 3,
        name: "Microsoft Edge",
        icon: true,
        iconName: "icon-microsoft-edge",
        app: AppEnum.microsoftEdge,
      },
      {
        position: 4,
        name: "Recycle Bin",
        iconName: "/images/icons/bin-empty.png",
      },
    ],
  });

  const getItemByIndex = (slotIndex) => {
    return items?.value?.data?.find((obj) => obj.position === slotIndex);
  };

  const getItemIndexByIndex = (slotIndex) => {
    return items?.value?.data?.findIndex((obj) => obj.position === slotIndex);
  };

  return { items, getItemByIndex, getItemIndexByIndex };
}
