import { useStorage } from "@vueuse/core";
export default function useDesktop() {
  const items = useStorage("desktop--item", {
    data: [
      { position: 1, name: "This PC", icon: true, iconName: "icon-my-pc" },
      {
        position: 2,
        name: "File Explorer",
        icon: true,
        iconName: "icon-file-explorer",
      },
      {
        position: 3,
        name: "Microsoft Edge",
        icon: true,
        iconName: "icon-microsoft-edge",
      },
      {
        position: 4,
        name: "Recycle Bin",
        iconName: "/images/icons/bin-empty.png",
      },
    ],
  });

  return { items };
}
