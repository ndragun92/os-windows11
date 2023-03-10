<template>
  <NuxtLayout>
    <Html
      lang="en"
      :data-route-path="$route?.path"
      :data-theme="usePersonalization.theme"
      :data-app-version="nuxtApp?.$app_version || '0.0.0'"
      :data-app-current-version="nuxtApp?.$app_current_version || '0.0.0'"
    >
      <Head>
        <Title>Windows 11 ❤️ | by Nemanja Dragun</Title>
        <Meta name="url" :content="`${nuxtApp?.$app_origin}${$route?.path}`" />
        <Meta
          name="og:url"
          :content="`${nuxtApp?.$app_origin}${$route?.path}`"
        />
      </Head>
    </Html>
    <client-only>
      <NuxtPage />
    </client-only>
  </NuxtLayout>
  <transition-expand appear>
    <div
      v-if="$route.name === 'index' && showAboutModal"
      data-test="about-modal"
      class="fixed top-0 right-0 bottom-0 left-0 p-20 bg-black bg-opacity-50 backdrop-blur-[5px] z-[9999999] flex justify-center items-center"
    >
      <div
        class="bg-black bg-opacity-70 w-full max-w-[642px] border border-white border-opacity-5 rounded-lg overflow-hidden shadow-lg flex flex-col"
      >
        <div class="flex-1 h-full flex flex-col gap-3 p-8 pb-4">
          <h1 class="text-3xl font-bold">About project</h1>
          <p class="mt-4">
            <strong>os-windows11</strong> is an open source project made in the
            hope to replicate the Windows 11 desktop experience on webm using
            standard web technologies like Nuxt.js, SCSS, Tailwind CSS.
          </p>
          <p>
            This project is licensed under
            <a
              class="text-blue-400 hover:underline"
              href="https://github.com/ndragun92/os-windows11/blob/main/LICENSE"
              target="_blank"
              >Creative Commons Zero v1.0 Universal</a
            >.
          </p>
          <p>
            This project is not in any way affiliated with Microsoft and should
            not be confused with Microsoft's Operating System or Products.
          </p>
          <p>
            This is also not
            <a
              class="text-blue-400 hover:underline"
              target="_blank"
              href="https://www.microsoft.com/en-in/windows-365"
              rel="noreferrer"
              >Windows 365 cloud PC</a
            >.
          </p>
          <p>
            Microsoft, Windows and Other demonstrated Products in this project
            are trademarks of the Microsoft group of companies
          </p>
          <hr class="opacity-10" />
          <div class="flex items-center flex-wrap gap-4 justify-between">
            <a
              class="flex items-center gap-2 hover:underline"
              href="https://github.com/ndragun92/os-windows11"
              target="_blank"
            >
              <Icon size="32" name="mdi:github" /><span
                >GitHub Repository</span
              ></a
            >
            <a
              class="flex items-center gap-2 hover:underline"
              href="https://github.com/ndragun92/os-windows11/blob/main/CONTRIBUTING.md"
              target="_blank"
            >
              <Icon size="32" name="icon-park:love-and-help" /><span
                >Contribute</span
              ></a
            >
          </div>
        </div>
        <div
          class="h-[65px] bg-black bg-opacity-90 border-t border-white border-opacity-5 flex items-center justify-between px-8"
        >
          <a
            class="py-2 px-4 rounded-md font-medium hover:underline flex items-center gap-2"
            href="mailto:nemanjadragun@gmail.com?subject=os-windows11"
            ><Icon size="24" name="material-symbols:mail" />Contact me</a
          >
          <button
            data-test="about-modal-understand1"
            class="bg-blue-400 hover:bg-blue-500 py-2 px-4 rounded-md text-black font-medium"
            type="button"
            @click="showAboutModal = false"
          >
            Ok, I understand
          </button>
        </div>
      </div>
    </div>
  </transition-expand>
</template>

<script lang="ts" setup>
import { usePersonalizationStore } from "~/store/personalizationStore";

const usePersonalization = usePersonalizationStore();
const nuxtApp = useNuxtApp();

const showAboutModal = useCookie("showAboutModal", {
  default: () => true,
  watch: "shallow",
  maxAge: 259200, // Show about modal every 3 days
});
</script>

<style lang="scss">
@media only screen and (max-width: 799px) {
  body {
    @apply hidden;
  }
  html {
    &:after {
      content: "Minimum required resolution/size has to be 800x600. Mobile devices are not supported.";
      @apply fixed top-0 right-0 bottom-0 left-0 bg-white text-black flex items-center justify-center text-center p-4 font-medium text-lg;
    }
  }
}
@media only screen and (max-height: 599px) {
  body {
    @apply hidden;
  }
  html {
    &:after {
      content: "Minimum required resolution/size has to be 800x600. Mobile devices are not supported.";
      @apply fixed top-0 right-0 bottom-0 left-0 bg-white text-black flex items-center justify-center text-center p-4 font-medium text-lg;
    }
  }
}
</style>
