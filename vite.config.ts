import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@components": path.resolve(__dirname, "./src/ts/components"),
      "@pages": path.resolve(__dirname, "./src/ts/pages"),
      "@scss": path.resolve(__dirname, "./src/scss"),
      "@store": path.resolve(__dirname, "./src/ts/store"),
    },
  },
});
