import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      rum: path.resolve(__dirname, "../rum/src"),
    },
  },
  server: {
    open: "/test/index.html",
  },
});
