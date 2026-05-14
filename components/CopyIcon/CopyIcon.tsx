"use client";

import { useState } from "react";
import copy from "copy-to-clipboard";
import type { CopyIconProps } from "./CopyIcon.types";
import styles from "./CopyIcon.module.css";

export default function CopyIcon({ value }: CopyIconProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copy(value);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={handleCopy}
      aria-label={`Copy ${value}`}
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? (
        <svg
          className={styles.icon}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8l3.5 3.5L13 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className={styles.icon}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="5"
            width="8"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
