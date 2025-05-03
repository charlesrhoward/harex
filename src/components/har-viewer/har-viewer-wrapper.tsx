"use client";

import dynamic from "next/dynamic";

// Dynamically import the HarViewer component on the client side
const DynamicHarViewer = dynamic(
  () => import("./har-viewer").then(mod => ({ default: mod.HarViewer })),
  { ssr: false }
);

export function HarViewerWrapper() {
  return <DynamicHarViewer />;
}
