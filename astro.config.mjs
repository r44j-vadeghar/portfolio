import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { sanityIntegration } from "@sanity/astro";
import astroMetaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  site: "https://r44j.dev",
  integrations: [
    sanityIntegration({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: SANITY_STUDIO_PROJECT_DATASET,
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
