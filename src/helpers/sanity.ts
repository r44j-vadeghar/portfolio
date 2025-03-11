import { BlockContent } from "../../sanity.types";

const filter = (
  blocks: BlockContent,
  match: (block: BlockContent[0]) => boolean
) =>
  blocks.reduce((acc, block) => {
    if (match(block)) acc.push(block);
    return acc;
  }, [] as BlockContent);

const get = (object: Record<string, unknown>, path: string[]) =>
  path.reduce((prev, curr) => prev[curr] as Record<string, unknown>, object);

const getObjectPath = (path: string[]) =>
  path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));

const findHeadings = (blocks: BlockContent) =>
  filter(
    blocks,
    (block) =>
      "style" in block && block.style !== undefined && /h\d/.test(block.style)
  );

export const parseOutline = (blocks: BlockContent) => {
  const outline = { subheadings: [] as BlockContent };
  const headings = findHeadings(blocks);
  const path: string[] = [];
  let lastLevel = 0;

  headings.forEach((heading) => {
    if (!("style" in heading) || typeof heading.style !== "string") return;
    const level = Number(heading.style.slice(1));
    // @ts-ignore
    heading.subheadings = [] as BlockContent;

    if (level < lastLevel) {
      for (let i = lastLevel; i >= level; i--) path.pop();
    } else if (level === lastLevel) {
      path.pop();
    }

    const prop = get(outline, getObjectPath(path)) as {
      subheadings: BlockContent;
    };
    prop.subheadings.push(heading);
    path.push((prop.subheadings.length - 1).toString());
    lastLevel = level;
  });

  return outline.subheadings;
};
