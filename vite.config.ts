import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/ts/api"),
      "@components": path.resolve(__dirname, "./src/ts/frontend/components"),
      "@common": path.resolve(__dirname, "./src/ts/frontend/common"),
      "@hooks": path.resolve(__dirname, "./src/ts/frontend/hooks"),
      "@pages": path.resolve(__dirname, "./src/ts/frontend/pages"),
      "@scss": path.resolve(__dirname, "./src/scss"),
      "@store": path.resolve(__dirname, "./src/ts/frontend/store"),
      "@utils": path.resolve(__dirname, "./src/ts/frontend/utils"),
      "@validations": path.resolve(__dirname, "./src/ts/frontend/validations"),
    },
  },
});
