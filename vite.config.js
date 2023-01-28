/* eslint-disable no-undef */
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/plugin/index.js"),
      name: "VariablePlugin",
      fileName: "variable",
      formats: ["iife", "umd", "esm"],
    },
    rollupOptions: {
      external: ["@wangeditor/editor"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
