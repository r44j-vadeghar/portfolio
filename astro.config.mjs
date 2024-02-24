import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { sanityIntegration } from "@sanity/astro";
import astroMetaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://r44j.dev",
  integrations: [
    sanityIntegration({
      projectId: "31c9dokz",
      dataset: "production",
      apiVersion: "2023-02-08",
      useCdn: false
    }),
    tailwind(),
    astroMetaTags(),
    sitemap({
      filter: (page) => page !== "https://r44j.dev/xerox/"
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ]
});
