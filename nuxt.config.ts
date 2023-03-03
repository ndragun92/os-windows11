// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/_nuxt/**": { headers: { "cache-control": "max-age=31536000" } }, // Set generated files cache to 1 year
    },
  },
  runtimeConfig: {
    public: {
      baseURL: "",
    },
  },
  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/css/utils/global.scss";`,
        },
      },
    },
  },
  css: ["~/assets/css/main.scss"],
  // alias: {
  //   pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  // },
  modules: [
    // https://pinia.vuejs.org/ssr/nuxt.html
    "@pinia/nuxt",
    // https://tailwindcss.nuxt.dev/
    "@nuxtjs/tailwindcss",
    // https://v1.image.nuxtjs.org/get-started/
    "@nuxt/image-edge",
    // https://github.com/nuxt-modules/icon
    // https://icones.js.org/collection/all?s=github
    "nuxt-icon",
    // https://vueuse.org/guide/#nuxt
    "@vueuse/nuxt",
    // https://github.com/MorevM/vue-transitions
    "@morev/vue-transitions/nuxt",
  ],
});
