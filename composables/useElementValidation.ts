export default function useElementValidation() {
  const isOutOfViewport = (elem) => {
    if (!elem) return;
    // Get element's bounding
    const bounding = elem.getBoundingClientRect();
    // Check if it's out of the viewport on each side
    const out: {
      top: boolean;
      left: boolean;
      bottom: boolean;
      right: boolean;
      any: boolean;
      all: boolean;
    } = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      any: false,
      all: false,
    };
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
      bounding.bottom >
      (window.innerHeight || document.documentElement.clientHeight);
    out.right =
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;
    return out;
  };

  const windowDragOutsideScope = (elem) => {
    if (!elem) return;
    // Get element's bounding
    const bounding = elem.getBoundingClientRect();
    const { width: windowWidth, top: windowTop, left: windowLeft } = bounding;
    const { width: screenWidth, height: screenHeight } =
      document?.body?.getBoundingClientRect();
    const offscreen = {
      right: false,
      bottom: false,
      left: false,
      top: false,
      any: false,
    };
    if (windowLeft > screenWidth - 100) {
      console.info("window is offscreen on right side");
      offscreen.right = true;
    }
    if (windowTop > screenHeight - 100) {
      console.log("window is offscreen on bottom side");
      offscreen.bottom = true;
    }
    if (windowWidth + 100 + windowLeft < 200) {
      console.log("window is offscreen on left side");
      offscreen.left = true;
    }
    if (windowTop - 50 < 0) {
      console.log("window is offscreen on top side");
      offscreen.bottom = true;
    }
    offscreen.any =
      offscreen.right || offscreen.bottom || offscreen.left || offscreen.top;
    return offscreen;
  };

  return { isOutOfViewport, windowDragOutsideScope };
}
