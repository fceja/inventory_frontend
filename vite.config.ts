import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@components": path.resolve(__dirname, "./src/frontend/components"),
      "@common": path.resolve(__dirname, "./src/frontend/common"),
      "@hooks": path.resolve(__dirname, "./src/frontend/hooks"),
      "@pages": path.resolve(__dirname, "./src/frontend/pages"),
      "@scss": path.resolve(__dirname, "./src/scss"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
