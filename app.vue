<template>
  <NuxtLayout>
    <Html
      lang="en"
      :data-route-path="$route?.path"
      :data-theme="usePersonalization.theme"
    >
      <Head>
        <Title>Windows 11 ❤️ | by Nemanja Dragun</Title>
        <Meta name="language" content="en" />
        <Meta name="og:title" content="Windows 11 by Nemanja Dragun" />
        <Meta name="twitter:title" content="Windows 11 by Nemanja Dragun" />
        <Meta
          name="description"
          content="Windows 11 made in Nuxt.js and Tailwind CSS"
        />
        <Meta
          name="og:description"
          content="Windows 11 made in Nuxt.js and Tailwind CSS"
        />
        <Meta
          name="twitter:description"
          content="Windows 11 made in Nuxt.js and Tailwind CSS"
        />
        <Meta name="og:image" content="/favicon.png" />
        <Meta name="twitter:image" content="/favicon.png" />
        <Meta name="og:site_name" content="/favicon.png" />
        <Meta name="twitter:site" content="/favicon.png" />
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <Link rel="apple-touch-startup-image" href="/favicon.png" />
      </Head>
    </Html>
    <NuxtPage />
  </NuxtLayout>
  <transition-expand appear>
    <div
      v-if="showAboutModal"
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
            class="block py-2 px-4 rounded-md font-medium hover:underline flex items-center gap-2"
            href="mailto:nemanjadragun@gmail.com?subject=os-windows11"
            ><Icon size="24" name="material-symbols:mail" />Contact me</a
          >
          <button
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

// TODO: Change to cookies with 1 day interval
const showAboutModal = ref(true);
</script>