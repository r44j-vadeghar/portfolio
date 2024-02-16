import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroMetaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://r44j.dev",
  integrations: [
    tailwind(),
    astroMetaTags(),
    sitemap({
      filter: (page) => page !== "https://r44j.dev/xerox/"
    })
  ]
});
