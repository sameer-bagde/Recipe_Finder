import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "na-uuv",
      project: "recipe-finder",
    }),
  ],

  build: {
    sourcemap: true,
  },
});
