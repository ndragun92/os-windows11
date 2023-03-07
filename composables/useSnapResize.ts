export default function useSnapResize({
  mouseY,
  mouseX,
  width,
  height,
  x,
  y,
  draggableInitialValues,
  wrapperStyle,
  toggleMaxMin,
}) {
  const validate = async () => {
    if (isSnapTop.value) {
      // Snap top to max
      toggleMaxMin();
    } else if (isSnapRight.value) {
      // Snap right half
      await snapX(width.value / 2);
    } else if (isSnapLeft.value) {
      // Snap left half
      await snapX(0);
    }
  };

  const snapX = async (_x: number) => {
    await nextTick(() => {
      x.value = _x;
      y.value = 0;
      draggableInitialValues.value.data.x = x.value;
      draggableInitialValues.value.data.y = y.value;
      wrapperStyle.value.data.width = `${width.value / 2}px`;
      wrapperStyle.value.data.height = `${height.value - 46}px`;
    });
  };

  const isSnapTop = computed(() => mouseY.value < 25);
  const isSnapRight = computed(
    () => width.value - mouseX.value + 100 < 200 && mouseY.value > 100
  );
  const isSnapLeft = computed(() => mouseX.value < 100 && mouseY.value > 100);

  return { validate, isSnapTop, isSnapRight, isSnapLeft };
}
