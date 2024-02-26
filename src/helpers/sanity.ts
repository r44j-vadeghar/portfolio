import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";
import type { Block } from "./server-actions";

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}

const filter = (ast: Block[], match: (node: Block) => boolean) =>
  ast.reduce((acc, node) => {
    if (match(node)) acc.push(node);
    // @ts-ignore
    if (node.children) acc.push(...filter(node.children, match));
    return acc;
  }, [] as Block[]);

// @ts-ignore
const get = (object, path) => path.reduce((prev, curr) => prev[curr], object);

// @ts-ignore
const getObjectPath = (path) =>
  path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));

const findHeadings = (ast: Block[]) =>
  filter(ast, (node: Block) => /h\d/.test(node.style));

export const parseOutline = (ast: Block[]) => {
  const outline = { subheadings: [] };
  const headings = findHeadings(ast);
  const path: unknown[] = [];
  let lastLevel = 0;

  headings.forEach((heading) => {
    const level = Number(heading.style.slice(1));
    // @ts-ignore
    heading.subheadings = [];

    if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop();
    else if (level === lastLevel) path.pop();

    const prop = get(outline, getObjectPath(path));
    prop.subheadings.push(heading);
    path.push(prop.subheadings.length - 1);
    lastLevel = level;
  });

  return outline.subheadings;
};
