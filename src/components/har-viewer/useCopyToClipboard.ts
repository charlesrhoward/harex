"use client";

import { useState, useCallback } from "react";

type CopyStatus = "idle" | "copied" | "failed";

export function useCopyToClipboard(resetDelay = 2000) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) {
        setCopyStatus("failed");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopyStatus("copied");
        
        // Reset the status after a delay
        setTimeout(() => {
          setCopyStatus("idle");
        }, resetDelay);
        
        return true;
      } catch (error) {
        console.error("Failed to copy:", error);
        setCopyStatus("failed");
        return false;
      }
    },
    [resetDelay]
  );

  return { copyStatus, copyToClipboard };
}
