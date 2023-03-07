import type { Ref } from "vue";
import { promiseTimeout, useStorage } from "@vueuse/core";
import type { AppEnum } from "~/enums/app.enum";

export default function useManipulateWindow(
  app: AppEnum,
  position: { x: number; y: number }
) {
  const el = ref<HTMLElement | null>(null);
  const handle = ref<HTMLElement | null>(null);
  const transition = ref(false);
  const maximized = useStorage(`${app}--maximized`, false);
  const draggableInitialValues = useStorage(`${app}--draggableInitialValues`, {
    data: {
      x: position.x,
      y: position.y,
    },
  });
  const wrapperStyle = useStorage(`${app}--wrapperStyle`, {
    data: {
      width: "1024px",
      height: "768px",
    },
  });

  const minimizedSize = useStorage(`${app}--minimizedSize`, {
    data: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    },
  });

  const resizeObserver = (entries) => {
    if (transition.value) return;
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    wrapperStyle.value.data.width = `${width}px`;
    wrapperStyle.value.data.height = `${height}px`;
  };

  const onMaxMin = async (x: Ref<number>, y: Ref<number>) => {
    if (maximized.value) {
      await onMinimize(x, y);
    } else {
      await onMaximize(x, y);
    }
  };

  const onMinimize = async (x: Ref<number>, y: Ref<number>) => {
    const element = document.getElementById("desktop-container");
    if (element) {
      transition.value = true;
      x.value = minimizedSize.value.data.x;
      y.value = minimizedSize.value.data.y;
      draggableInitialValues.value.data.x = x.value;
      draggableInitialValues.value.data.y = y.value;
      wrapperStyle.value.data.width = `${minimizedSize.value.data.width}px`;
      wrapperStyle.value.data.height = `${minimizedSize.value.data.height}px`;
      maximized.value = false;
      await promiseTimeout(300);
      transition.value = false;
    }
  };

  const onMaximize = async (x: Ref<number>, y: Ref<number>) => {
    const element = document.getElementById("desktop-container");
    if (element) {
      transition.value = true;
      minimizedSize.value.data.width = el.value?.offsetWidth || 150;
      minimizedSize.value.data.height = el.value?.offsetHeight || 150;
      minimizedSize.value.data.x = x.value;
      minimizedSize.value.data.y = y.value;
      const { offsetWidth: width, offsetHeight: height } = element;
      x.value = 0;
      y.value = 0;
      draggableInitialValues.value.data.x = x.value;
      draggableInitialValues.value.data.y = y.value;
      wrapperStyle.value.data.width = `${width}px`;
      wrapperStyle.value.data.height = `${height}px`;
      maximized.value = true;
      await promiseTimeout(300);
      transition.value = false;
    }
  };

  const initResizeObserver = () =>
    useResizeObserver(el, (entries) => {
      resizeObserver(entries);
    });

  const { width, height } = useWindowSize();
  const { windowDragOutsideScope } = useElementValidation();
  const resetWindowPosition = ref(false);

  const windowOffscreenValidation = async () => {
    if (windowDragOutsideScope(el.value)?.any) {
      draggableInitialValues.value.data.x = position.x;
      draggableInitialValues.value.data.y = position.y;
      resetWindowPosition.value = true;
      await nextTick(() => (resetWindowPosition.value = false));
    }
  };

  onMounted(async () => {
    await nextTick(async () => await windowOffscreenValidation());
  });

  watch(
    () => width.value,
    async () => {
      await windowOffscreenValidation();
      if (maximized.value) {
        wrapperStyle.value.data.width = `${width.value}px`;
      }
    }
  );

  watch(
    () => height.value,
    async () => {
      await windowOffscreenValidation();
      if (maximized.value) {
        wrapperStyle.value.data.height = `${height.value}px`;
      }
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resizeWindowOptions = (_: any) => {
    return {
      margin: 5,
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move: function (event: any) {
          let { x, y } = event.target.dataset;
          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
        },
      },
    };
  };

  return {
    el,
    handle,
    transition,
    maximized,
    draggableInitialValues,
    wrapperStyle,
    resetWindowPosition,
    width,
    height,
    windowOffscreenValidation,
    onMaxMin,
    initResizeObserver,
    resizeWindowOptions,
  };
}
