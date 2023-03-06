<template>
  <div
    class="w-screen h-screen flex flex-col"
    style="
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    "
    :style="backgroundStyles"
  >
    <div id="desktop-container" class="w-full flex-1 h-full overflow-hidden">
      <slot />
    </div>
    <el-footer />
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>

<script lang="ts" setup>
import { usePersonalizationStore } from "~/store/personalizationStore";
import ElFooter from "~/components/el/layout/ElFooter.vue";

const usePersonalization = usePersonalizationStore();
const $img = useImage();
const backgroundStyles = computed(() => {
  const imgUrl = $img(`/images/gallery/${bgImage.value}.jpg`);
  return { backgroundImage: `url('${imgUrl}')` };
});

const bgImage = computed(() => {
  switch (usePersonalization.theme) {
    case "theme1":
      return "/theme1/1";
    case "theme2":
      return "/theme2/1";
    case "theme5":
      return "/theme5/1";
    default:
      return "0";
  }
});
</script>
