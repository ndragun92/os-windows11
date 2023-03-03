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
</template>

<script lang="ts" setup>
import { usePersonalizationStore } from "~/store/personalizationStore";

const usePersonalization = usePersonalizationStore();
</script>
