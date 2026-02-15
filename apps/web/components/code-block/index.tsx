"use client";

import { useCallback, useState } from "react";
import styles from "./styles.module.css";

interface CodeBlockProps {
  children: string;
  copyable?: boolean;
}

export function CodeBlock({ children, copyable }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [children]);

  return (
    <div className={copyable ? styles.root : styles.rootFull}>
      <code className={styles.code}>{children}</code>
      {copyable && (
        <button
          type="button"
          className={styles.copy}
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5.5" y="5.5" width="7" height="7" rx="1.5" />
              <path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
