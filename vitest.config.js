import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "./tests/**"],
  },
});
