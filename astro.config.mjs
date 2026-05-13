// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://example.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "tap",
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
