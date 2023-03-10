import { defineStore } from "pinia";
import useElementValidation from "~/composables/useElementValidation";

export enum ContextMenuEnum {
  "desktop" = "desktop",
  "footer" = "footer",
}
export const useContextMenuStore = defineStore("contextMenu", () => {
  const visible = ref(false);
  const type = ref<ContextMenuEnum | "">("");

  const setVisibility = (value: boolean) => {
    visible.value = value;
    if (!visible.value) {
      type.value = "";
    }
  };

  const position = reactive({
    data: { x: 0, y: 0 },
  });
  const setPosition = (value: { x: number; y: number }) => {
    position.data.x = value.x;
    position.data.y = value.y;
    setVisibility(true);
  };

  const open = (
    e: MouseEvent,
    value: ContextMenuEnum,
    x: undefined | number = undefined,
    y: undefined | number = undefined
  ) => {
    type.value = value;
    switch (type.value) {
      case ContextMenuEnum.footer:
        setStartPositionY("bottom");
        break;
      default:
        setStartPositionY("top");
    }
    if (!e) return;
    e.preventDefault();
    setPosition({ x: x || e.x, y: y || e.y });
  };

  const startPositionX = ref<"left" | "right">("left");
  const startPositionY = ref<"top" | "bottom">("top");

  const setStartPositionY = (value: "top" | "bottom") => {
    startPositionY.value = value;
  };
  const validatePosition = async (el: HTMLElement | null) => {
    startPositionX.value = "left";
    startPositionY.value = "top";
    if (!el) return;
    await nextTick(() => {
      const { isOutOfViewport } = useElementValidation();
      const data = isOutOfViewport(el);
      if (data) {
        const { bottom, right } = data;
        if (right) {
          startPositionX.value = "right";
        }

        if (bottom) {
          startPositionY.value = "bottom";
        }
      }
    });
  };

  const returnStartPositionX = computed(() => {
    switch (startPositionX.value) {
      case "right":
        return `calc(100% - ${position.data.x}px)`;
      default:
        return `${position.data.x}px`;
    }
  });

  const returnStartPositionY = computed(() => {
    switch (startPositionY.value) {
      case "bottom":
        return `calc(100% - ${position.data.y}px)`;
      default:
        return `${position.data.y}px`;
    }
  });

  return {
    visible,
    type,
    setVisibility,
    position,
    open,
    startPositionX,
    returnStartPositionX,
    startPositionY,
    setStartPositionY,
    returnStartPositionY,
    validatePosition,
  };
});
