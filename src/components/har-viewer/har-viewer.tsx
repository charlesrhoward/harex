"use client";

import React, { useState } from "react";
import { HarUploader } from "./har-uploader";
import { HarTable } from "./har-table";
import { HarData } from "./har-types";
import { ThemeToggle } from "../theme-toggle";
import { Github } from "lucide-react";

export function HarViewer() {
  const [harData, setHarData] = useState<HarData | null>(null);

  const handleHarLoaded = (data: HarData) => {
    setHarData(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="p-4 bg-zinc-100 dark:bg-zinc-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="text-emerald-400">HAREX</span>
            <span className="ml-2">- The HAR Examiner</span>
          </h1>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/charlesrhoward/harex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-700 transition-colors text-zinc-300 hover:text-white"
              aria-label="View source on GitHub"
              title="View source on GitHub"
            >
              <Github size={20} />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 flex-1">
        <div className="max-w-4xl mx-auto">
          {!harData ? (
            <HarUploader onHarLoaded={handleHarLoaded} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {harData.log.entries.length} Requests
                </h2>
                <button
                  onClick={() => setHarData(null)}
                  className="px-3 py-1 rounded bg-emerald-400 text-zinc-900 hover:bg-emerald-500 transition-colors text-sm font-medium"
                >
                  Upload Another File
                </button>
              </div>
              <HarTable harData={harData} />
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 bg-zinc-100 dark:bg-zinc-800 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Harex - HAR Examiner | A tool for analyzing HTTP Archive (HAR) files
          </p>
        </div>
      </footer>
    </div>
  );
}
