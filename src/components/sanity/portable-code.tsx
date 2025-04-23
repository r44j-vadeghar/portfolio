"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneLight,
  nightOwl,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const LANGUAGE_MAP: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  jsx: "React JSX",
  tsx: "React TSX",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  py: "Python",
  rb: "Ruby",
  php: "PHP",
  java: "Java",
  c: "C",
  cpp: "C++",
  cs: "C#",
  go: "Go",
  rust: "Rust",
  swift: "Swift",
  kotlin: "Kotlin",
  sh: "Shell",
  bash: "Bash",
  ps1: "PowerShell",
  sql: "SQL",
  json: "JSON",
  yml: "YAML",
  yaml: "YAML",
  md: "Markdown",
  graphql: "GraphQL",
};

type PortableCodeProps = {
  value: {
    _key: string;
    _type: "code";
    code: string;
    language: string;
    filename?: string;
  };
  className?: string;
};

const lightThemeStyle = {
  ...atomOneLight,
  hljs: {
    ...atomOneLight.hljs,
    background: "#f8fafc",
  },
};

const darkThemeStyle = {
  ...nightOwl,
  hljs: {
    ...nightOwl.hljs,
    background: "#0f172a",
  },
};

function PortableCode({ value, className = "" }: PortableCodeProps) {
  const { code, language = "text", _key, filename } = value;
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [code]);

  const languageLabel =
    LANGUAGE_MAP[language] ||
    (language
      ? language.charAt(0).toUpperCase() + language.slice(1)
      : "Plain Text");

  if (!mounted) {
    return (
      <div className="w-full h-24 rounded-lg bg-muted animate-pulse my-4"></div>
    );
  }

  const isDarkMode = resolvedTheme === "dark";

  return (
    <div
      id={`code-${_key}`}
      className={`relative w-full my-8 group code-block ${className}`}
      data-language={language}
    >
      <div className="overflow-hidden rounded-xl shadow-md transition-all border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-700/50 text-sm">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="flex space-x-2 mr-3 flex-shrink-0">
              <div className="h-3 w-3 rounded-full bg-rose-500"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            </div>

            <span className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 flex-shrink-0">
              {languageLabel}
            </span>

            {filename && (
              <span className="ml-2 text-zinc-600 dark:text-zinc-400 truncate text-xs">
                {filename}
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center h-8 w-8 rounded-md transition-all bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-700 shadow-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label={copied ? "Code copied" : "Copy code"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        <div
          className="relative overflow-auto max-h-[80vh]"
          role="region"
          aria-label={`Code snippet in ${languageLabel}`}
        >
          <SyntaxHighlighter
            language={language}
            style={isDarkMode ? darkThemeStyle : lightThemeStyle}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: "1.25rem 1rem 1.25rem 0",
              fontSize: "0.875rem",
              borderRadius: 0,
              fontFamily:
                "'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace",
            }}
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              marginRight: "1em",
              textAlign: "right",
              color: isDarkMode
                ? "rgba(145, 155, 175, 0.4)"
                : "rgba(100, 116, 139, 0.4)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: 300,
              borderRight: isDarkMode
                ? "1px solid rgba(100, 116, 139, 0.2)"
                : "1px solid rgba(100, 116, 139, 0.2)",
            }}
            wrapLines={true}
            wrapLongLines={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default memo(PortableCode);
