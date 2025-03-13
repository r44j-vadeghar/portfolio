// src/components/sanity/portable-code.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Check, Clipboard } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yLight,
  vs2015,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

type PortableCodeProps = {
  value: {
    _key: string;
    _type: "code";
    code: string;
    language: string;
  };
};

export default function PortableCode({ value }: PortableCodeProps) {
  const { code, language, _key } = value;
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const isDarkTheme = theme === "dark";

  return (
    <div id={`code-${_key}-block`} className="relative w-full my-4">
      <button
        onClick={handleCopy}
        className={`absolute disabled:opacity-60 right-2 top-3 z-10 rounded-lg dark:bg-zinc-800 bg-zinc-200 dark:text-white/40 text-black/40 p-3 transition-all dark:hover:bg-zinc-700 hover:bg-zinc-300 ${
          copied ? "" : "cursor-pointer"
        }`}
        disabled={copied}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </button>
      <Card className="overflow-hidden p-0 rounded-lg border-none">
        <SyntaxHighlighter
          language={language || "text"}
          style={isDarkTheme ? vs2015 : a11yLight}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            fontSize: "0.9rem",
            // backdropFilter: "blur(12px)",
            backgroundColor: isDarkTheme
              ? "#0f172b"
              : "rgb(231, 231, 231, 0.3)",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Card>
    </div>
  );
}
