import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";
import type { Block } from "./server-actions";

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}

const filter = (blocks: Block[], match: (block: Block) => boolean) =>
  blocks.reduce((acc, block) => {
    if (match(block)) acc.push(block);
    return acc;
  }, [] as Block[]);

const get = (object: Record<string, unknown>, path: string[]) =>
  path.reduce((prev, curr) => prev[curr] as Record<string, unknown>, object);

const getObjectPath = (path: string[]) =>
  path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));

const findHeadings = (blocks: Block[]) =>
  filter(blocks, (block: Block) => /h\d/.test(block.style));

export const parseOutline = (blocks: Block[]) => {
  const outline = { subheadings: [] as Block[] };
  const headings = findHeadings(blocks);
  const path: string[] = [];
  let lastLevel = 0;

  headings.forEach((heading) => {
    const level = Number(heading.style.slice(1));
    heading.subheadings = [];

    if (level < lastLevel) {
      for (let i = lastLevel; i >= level; i--) path.pop();
    } else if (level === lastLevel) {
      path.pop();
    }

    const prop = get(outline, getObjectPath(path)) as {
      subheadings: Block[];
    };
    prop.subheadings.push(heading);
    path.push((prop.subheadings.length - 1).toString());
    lastLevel = level;
  });

  return outline.subheadings;
};
