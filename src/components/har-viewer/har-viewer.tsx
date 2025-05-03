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
            <div className="text-emerald-400">
              <svg width="68" height="24" viewBox="0 0 68 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  {/* HAREX SVG paths - simplified to reduce size */}
                  <path d="M8 20V4H8.33058V20H8Z" />
                  <path d="M10.7999 20V4H11.1305V20H10.7999Z" />
                  <path d="M14.9999 20V4H15.3304V20H14.9999Z" />
                  <path d="M17.7998 20V4H18.1304V20H17.7998Z" />
                  <path d="M30.3995 20V4H30.7301V20H30.3995Z" />
                  <path d="M33.1995 20V4H33.5301V20H33.1995Z" />
                  <path d="M40.1993 20V4H40.5299V20H40.1993Z" />
                  <path d="M42.9993 20V4H43.3299V20H42.9993Z" />
                  <path d="M10.201 4.18757H8.92953V4H10.201V4.18757Z" />
                  <path d="M17.2008 4.18757H15.9294V4H17.2008V4.18757Z" />
                  <path d="M32.6005 4.18757H31.3291V4H32.6005V4.18757Z" />
                  <path d="M34.0005 4.18757H32.729V4H34.0005V4.18757Z" />
                  <path d="M35.4005 4.18757H34.129V4H35.4005V4.18757Z" />
                  <path d="M52.4081 11.2903L52.6243 11.0746L53.5206 11.9594L52.6243 12.8441L52.4081 12.6284L53.0915 11.9594L52.4081 11.2903Z" />
                  <path d="M56.1044 11.0746L56.3206 11.2903L55.6372 11.9594L56.3206 12.6284L56.1044 12.8441L55.2081 11.9594L56.1044 11.0746Z" />
                </g>
              </svg>
            </div>
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
