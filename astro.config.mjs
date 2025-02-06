// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import astroMetaTags from "astro-meta-tags";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET } = loadEnv(
  String(process.env.NODE_ENV),
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  site: "https://r44j.dev",

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sanity({
      projectId: SANITY_STUDIO_PROJECT_ID ?? "",
      dataset: SANITY_STUDIO_PROJECT_DATASET ?? "production",
      apiVersion: "2023-02-08",
      useCdn: false
    }),
    icon({
      include: {
        mdi: ["*"],
        tabler: ["arrow-big-left-line", "arrow-big-right-line"]
      }
    }),
    react(),
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
