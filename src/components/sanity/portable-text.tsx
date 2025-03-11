// src/components/sanity/portable-text.tsx
"use client";
import {
  PortableText as PortableTextReact,
  PortableTextReactComponents,
} from "@portabletext/react";
import { BlockContent } from "../../../sanity.types";
import PortableCode from "./portable-code";
import PortableTextImage from "./portable-text-image";
import PortableYtEmbed from "./portable-yt-embed";

export default function PortableText({
  portableText,
}: {
  portableText: BlockContent;
}) {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: PortableTextImage,
      code: PortableCode,
      youtube: PortableYtEmbed,
    },
    block: {
      h1: ({ children, value }) => <h1 id={value._key}>{children}</h1>,
      h2: ({ children, value }) => <h2 id={value._key}>{children}</h2>,
      h3: ({ children, value }) => <h3 id={value._key}>{children}</h3>,
      h4: ({ children, value }) => <h4 id={value._key}>{children}</h4>,
      h5: ({ children, value }) => <h5 id={value._key}>{children}</h5>,
    },
  };

  return <PortableTextReact value={portableText} components={components} />;
}
