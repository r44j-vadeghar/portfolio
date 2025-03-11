"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import { BlockContent } from "../../../sanity.types";

// Function to render headings recursively
const renderHeadings = (blocks: BlockContent, level = 0) => {
  return blocks.map((block) => (
    <div key={block._key} style={{ marginLeft: `${level * 12}px` }}>
      <div className="flex items-center py-1">
        <Link
          href={`#${block._key}`}
          id={`toc-${block._key}`}
          className="transition-all text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
        >
          {(block._type === "block" && block.children?.[0]?.text) || ""}
        </Link>
      </div>
      {/* @ts-ignore */}
      {block.subheadings &&
        // @ts-ignore
        block.subheadings.length > 0 &&
        // @ts-ignore
        renderHeadings(block.subheadings, level + 1)}
    </div>
  ));
};

export default function TableOfContent({ blocks }: { blocks: BlockContent }) {
  const { theme } = useTheme();
  useEffect(() => {
    function getAllKeys(headings: BlockContent) {
      const result: string[] = [];

      headings.forEach((heading) => {
        result.push(heading._key);
        // @ts-ignore
        if (heading.subheadings && heading.subheadings.length > 0) {
          // @ts-ignore
          result.push(...getAllKeys(heading.subheadings));
        }
      });

      return result;
    }

    const keys = getAllKeys(blocks);

    function setDefaultColorOnAllKeys(keys: string[]) {
      keys.forEach((key) => {
        const element = document.getElementById(`toc-${key}`);
        if (element) {
          element.style.color =
            theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.id;
          const targetElement = document.getElementById(`toc-${key}`);

          if (entry.isIntersecting && targetElement) {
            setDefaultColorOnAllKeys(keys);
            targetElement.style.color = theme === "dark" ? "white" : "black";
          }
        });
      },
      { threshold: 0.5 }
    );

    keys.forEach((key) => {
      const element = document.getElementById(key);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [blocks, theme]);

  return (
    <div className="hidden md:flex flex-col">{renderHeadings(blocks)}</div>
  );
}
