// src/components/sanity/portable-text.tsx
"use client";
import { cn } from "@/lib/utils";
import {
  PortableText as PortableTextReact,
  PortableTextReactComponents,
} from "@portabletext/react";
import Link from "next/link";
import { BlockContent } from "../../../sanity.types";
import PortableCode from "./portable-code";
import PortableCollapsible from "./portable-collapsible";
import PortableCta from "./portable-cta";
import PortableEmbed from "./portable-embed";
import PortableFile from "./portable-file";
import { ProductReference } from "./portable-product-showcase";
import PortableTable from "./portable-table";
import PortableTextImage from "./portable-text-image";
import PortableYtEmbed from "./portable-yt-embed";

export default function PortableText({
  portableText,
  className,
}: {
  portableText: BlockContent;
  className?: string;
}) {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: PortableTextImage,
      code: PortableCode,
      youtube: PortableYtEmbed,
      table: PortableTable,
      embed: PortableEmbed,
      file: PortableFile,
      cta: PortableCta,
      collapsible: PortableCollapsible,
      productReference: ProductReference, // Use the new component instead of direct function
    },
    block: {
      h1: ({ children, value }) => (
        <h1
          id={value._key}
          className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl my-6"
        >
          {children}
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2
          id={value._key}
          className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 my-6"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3
          id={value._key}
          className="scroll-m-20 text-2xl font-semibold tracking-tight my-6"
        >
          {children}
        </h3>
      ),
      h4: ({ children, value }) => (
        <h4
          id={value._key}
          className="scroll-m-20 text-xl font-semibold tracking-tight my-4"
        >
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-2 border-border pl-6 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
      callout: ({ children }) => (
        <div className="my-6 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          {children}
        </div>
      ),
      lead: ({ children }) => (
        <p className="text-xl text-muted-foreground my-4">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
      ),
      checkList: ({ children }) => (
        <ul className="my-6 ml-6 list-none [&>li]:mt-2">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
      checkList: ({ children }) => (
        <li className="flex items-start">
          <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
            <svg
              className="h-3 w-3 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const target = value?.blank === true ? "_blank" : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            className="font-medium text-primary underline underline-offset-4"
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
      internalLink: ({ children, value }) => {
        return (
          <Link
            href={`/posts/${value?.reference?._ref}`}
            className="font-medium text-primary underline underline-offset-4"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => (
        <span className="underline underline-offset-4">{children}</span>
      ),
      "strike-through": ({ children }) => (
        <span className="line-through">{children}</span>
      ),
      highlight: ({ children }) => {
        // Create a function to get a random highlight color that works in both modes
        const getRandomHighlightColor = () => {
          // Array of color pairs - each with light and dark mode versions
          const colorPairs = [
            {
              light: "rgba(255, 255, 136, 0.5)",
              dark: "rgba(255, 255, 0, 0.2)",
            }, // yellow
            {
              light: "rgba(175, 248, 216, 0.5)",
              dark: "rgba(0, 200, 150, 0.2)",
            }, // mint
            {
              light: "rgba(255, 210, 232, 0.5)",
              dark: "rgba(255, 105, 180, 0.2)",
            }, // pink
            {
              light: "rgba(212, 165, 255, 0.5)",
              dark: "rgba(138, 43, 226, 0.2)",
            }, // lavender
            {
              light: "rgba(165, 223, 255, 0.5)",
              dark: "rgba(30, 144, 255, 0.2)",
            }, // light blue
            {
              light: "rgba(255, 190, 125, 0.5)",
              dark: "rgba(255, 140, 0, 0.2)",
            }, // orange
          ];

          // Select a random color pair
          return colorPairs[Math.floor(Math.random() * colorPairs.length)];
        };

        // Get a random color for this highlight instance
        const highlightColor = getRandomHighlightColor();

        return (
          <span className="relative px-1 py-0.5 rounded highlight-span">
            {children}
            <style jsx>{`
              .highlight-span {
                position: relative;
                background-color: ${highlightColor.light};
                border-radius: 0.25rem;
              }

              :global(.dark) .highlight-span {
                background-color: ${highlightColor.dark};
              }
            `}</style>
          </span>
        );
      },
      code: ({ children }) => (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {children}
        </code>
      ),
    },
  };

  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <PortableTextReact value={portableText} components={components} />
    </div>
  );
}
