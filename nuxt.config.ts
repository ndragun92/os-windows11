// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  // ssr: false,
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        // { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "apple-touch-startup-image", href: "/apple-touch-icon.png" },
      ],
      meta: [
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "language", content: "en" },
        {
          name: "description",
          content: "Windows 11 made in Nuxt.js and Tailwind CSS",
        },
        // open graph social image
        { property: "og:title", content: "Windows 11 by Nemanja Dragun" },
        { property: "twitter:title", content: "Windows 11 by Nemanja Dragun" },
        {
          property: "og:description",
          content: "Windows 11 made in Nuxt.js and Tailwind CSS",
        },
        {
          property: "twitter:description",
          content: "Windows 11 made in Nuxt.js and Tailwind CSS",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/favicon.png" },
        { property: "twitter:image", content: "/favicon.png" },
        // { property: "og:image:width", content: "3800" },
        // { property: "og:image:height", content: "1900" },
        { property: "og:site_name", content: "Windows 11 by Nemanja Dragun" },
        // { property: 'twitter:site', content: '' },
        // { property: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/_nuxt/**": { headers: { "cache-control": "max-age=31536000" } }, // Set generated files cache to 1 year
    },
    esbuild: {
      options: {
        target: "esnext",
      },
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
    build: {
      target: "esnext",
    },
  },
  css: ["~/assets/css/main.scss"],
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
    // https://v1.image.nuxtjs.org/get-started/
    "@nuxt/image-edge",
    // https://nuxt.com/modules/robots
    "@nuxtjs/robots",
    // https://nuxt.com/modules/simple-sitemap
    "nuxt-simple-sitemap",
  ],
  sitemap: {
    hostname: "https://os-windows11.vercel.app",
  },
});
