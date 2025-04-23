"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlockContent } from "../../../sanity.types";

export default function TableOfContent({ blocks }: { blocks: BlockContent }) {
  const { resolvedTheme } = useTheme();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [headingKeys, setHeadingKeys] = useState<string[]>([]);

  useEffect(() => {
    function getAllKeys(headings: BlockContent): string[] {
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

    setHeadingKeys(getAllKeys(blocks));
  }, [blocks]);

  useEffect(() => {
    if (headingKeys.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveKey(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    headingKeys.forEach((key) => {
      const element = document.getElementById(key);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headingKeys, resolvedTheme]);

  const renderHeadings = (blocks: BlockContent, level = 0) => {
    return blocks.map((block) => (
      <div key={block._key} style={{ marginLeft: `${level * 12}px` }}>
        <div className="flex items-center py-1">
          <Link
            href={`#${block._key}`}
            id={`toc-${block._key}`}
            className={`transition-all ${
              activeKey === block._key
                ? "text-black dark:text-white"
                : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
            }`}
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

  return (
    <div className="hidden md:flex flex-col">{renderHeadings(blocks)}</div>
  );
}
