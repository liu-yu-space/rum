import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "rum-request-upload-manager": path.resolve(
        __dirname,
        "../rum-request-upload-manager/src"
      ),
    },
  },
  server: {
    open: "/test/index.html",
  },
});
