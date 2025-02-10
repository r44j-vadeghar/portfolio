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
import vercel from "@astrojs/vercel";

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET } = loadEnv(
  String(process.env.NODE_ENV),
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  site: "https://r44j.dev",

  output: "server",
  adapter: vercel(),

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
        tabler: ["arrow-big-left-line", "arrow-big-right-line"],
        ph: [
          "code-bold",
          "database-bold",
          "paint-brush-bold",
          "arrow-right-bold",
          "laptop-bold",
          "headphones-bold",
          "microphone-bold",
          "watch-bold",
          "printer-bold",
          "fan-bold",
          "globe-bold",
          "rocket-bold",
          "lightning-bold",
          "youtube-logo-bold",
          "youtube-logo",
          "arrow-up-right-bold",
          "caret-up-bold",
          "play-circle"
        ]
      }
    }),
    react(),
    astroMetaTags(),
    sitemap({
      filter: (page) =>
        !page.includes("/xerox/") &&
        !page.includes("/privacy-policy/") &&
        !page.includes("/uniconnect/"),
      customPages: ["https://r44j.dev/blog/"],
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      // @ts-ignore
      serialize: (item) => {
        if (item.url.includes("/blog/")) {
          return {
            ...item,
            changefreq: "weekly",
            priority: item.url.includes("?page=") ? 0.6 : 0.9,
            lastmod: new Date()
          };
        }
        return item;
      }
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ]
});
