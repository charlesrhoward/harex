"use client";

import React from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "./useCopyToClipboard";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const { copyStatus, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(text);
  };

  return (
    <button
      className={`p-1.5 rounded-md hover:bg-zinc-700 transition-colors ${className}`}
      onClick={handleCopy}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copyStatus === "copied" ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
}
