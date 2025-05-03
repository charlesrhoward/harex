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
      <header className="py-5 px-4 bg-zinc-100 dark:bg-zinc-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <div className="text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="170" height="60" fill="none" viewBox="0 0 68 24">
                <g fill="currentColor">
                  <path d="M10.201 4.188H8.93V4H10.2v.188ZM17.2 4.188h-1.27V4h1.27v.188ZM32.6 4.188h-1.27V4h1.27v.188ZM34 4.188H32.73V4h1.272v.188ZM35.4 4.188H34.13V4h1.272v.188ZM36.8 4.188H35.53V4H36.8v.188ZM38.2 4.188H36.93V4H38.2v.188ZM42.4 4.188H41.13V4H42.4v.188ZM43.8 4.188H42.53V4H43.8v.188ZM45.2 4.188H43.93V4H45.2v.188ZM46.6 4.188H45.33V4H46.6v.188ZM48 4.188H46.73V4H48v.188ZM49.4 4.188H48.13V4H49.4v.188ZM50.8 4.188H49.53V4H50.8v.188ZM52.2 4.188H50.93V4H52.2v.188ZM57.8 4.188h-1.271V4H57.8v.188ZM59.2 4.188h-1.272V4H59.2v.188ZM8 7.495V4.37h.33v3.126H8ZM10.8 7.495V4.37h.33v3.126h-.33ZM15 7.495V4.37h.33v3.126H15ZM17.8 7.495V4.37h.33v3.126h-.33ZM24.15 4.631l-.82 2.151h-.35l.82-2.15h.35ZM24.73 4.631l.82 2.151h-.35l-.82-2.15h.35ZM30.4 7.495V4.37h.33v3.126h-.33ZM35.4 7.314H34.13v-.188h1.272v.188ZM36.8 7.314H35.53v-.188H36.8v.188ZM38.73 4.631l.82 2.151h-.35l-.82-2.15h.35ZM40.2 7.495V4.37h.33v3.126h-.33ZM45.2 7.314H43.93v-.188H45.2v.188ZM46.6 7.314H45.33v-.188H46.6v.188ZM48 7.314H46.73v-.188H48v.188ZM49.4 7.314H48.13v-.188H49.4v.188ZM49.93 4.631l.82 2.151h-.35l-.82-2.15h.35Z" />
                  <path d="M52.73 4.631l.82 2.151h-.35l-.82-2.15h.35ZM56.35 4.631l-.82 2.151h-.35l.82-2.15h.35ZM59.15 4.631l-.821 2.151h-.35l.82-2.15h.35ZM8 10.621V7.495h.33v3.126H8ZM10.8 10.621V7.495h.33v3.126h-.33ZM13 10.44h-1.27v-.188H13v.188ZM14.4 10.44h-1.27v-.188h1.27v.188ZM15 10.621V7.495h.33v3.126H15ZM17.8 10.621V7.495h.33v3.126h-.33ZM22.75 7.758l-.82 2.15h-.35l.82-2.15h.35ZM26.13 7.758l.82 2.15h-.35l-.82-2.15h.35ZM30.4 10.621V7.495h.33v3.126h-.33ZM33.2 10.621V7.495h.33v3.126h-.33ZM35.4 10.44H34.13v-.188h1.272v.188ZM36.8 10.44H35.53v-.188H36.8v.188ZM37.094 10.152c.448-.328.712-.76.712-1.319 0-.56-.264-.99-.712-1.32l.185-.246c.537.381.867.919.867 1.566s-.33 1.185-.867 1.566l-.185-.247Z" />
                  <path d="M40.2 10.621V7.495h.33v3.126h-.33ZM43 10.621V7.495h.33v3.126H43ZM45.2 10.44H43.93v-.188H45.2v.188ZM46.6 10.44H45.33v-.188H46.6v.188ZM51.33 7.758l.82 2.15h-.35l-.82-2.15h.35ZM54.081 9.909l-.314-2.151h.343l.254 1.725.255-1.725h.343l-.315 2.15h-.566ZM57.75 7.758l-.82 2.15h-.35l.82-2.15h.35ZM8 13.748V10.62h.33v3.127H8ZM13 13.566h-1.27v-.187H13v.187ZM14.4 13.566h-1.27v-.187h1.27v.187ZM17.8 13.748V10.62h.33v3.127h-.33ZM21.35 10.884l-.82 2.15h-.35l.82-2.15h.35ZM24.15 10.884l-.82 2.15h-.35l.82-2.15h.35ZM24.73 10.884l.82 2.15h-.35l-.82-2.15h.35ZM27.53 10.884l.82 2.15H28l-.82-2.15h.35Z" />
                  <path d="M30.4 13.748V10.62h.33v3.127h-.33ZM35.4 13.566H34.13v-.187h1.272v.187ZM39.55 10.884l-.82 2.15h-.35l.82-2.15h.35ZM40.2 13.748V10.62h.33v3.127h-.33ZM45.2 13.566H43.93v-.187H45.2v.187ZM46.6 13.566H45.33v-.187H46.6v.187ZM47.2 13.748V10.62h.33v3.127h-.33ZM52.408 11.29l.216-.215.897.884-.897.885-.216-.216.684-.669-.684-.669ZM56.104 11.075l.217.215-.684.67.684.668-.217.216-.896-.885.896-.884ZM8 16.874v-3.126h.33v3.126H8ZM10.8 16.874v-3.126h.33v3.126h-.33ZM15 16.874v-3.126h.33v3.126H15ZM17.8 16.874v-3.126h.33v3.126h-.33Z" />
                  <path d="M19.95 14.01l-.82 2.151h-.35l.82-2.15h.35ZM22.8 16.692h-1.27v-.187h1.27v.188ZM24.2 16.692h-1.27v-.187h1.27v.188ZM25.6 16.692h-1.27v-.187h1.27v.188ZM27 16.692h-1.27v-.187H27v.188ZM28.93 14.01l.82 2.151h-.35l-.82-2.15h.35ZM30.4 16.874v-3.126h.33v3.126h-.33ZM33.2 16.874v-3.126h.33v3.126h-.33ZM35.93 14.01l.82 2.151h-.35l-.82-2.15h.35ZM38.73 14.01l.82 2.151h-.35l-.82-2.15h.35ZM40.2 16.874v-3.126h.33v3.126h-.33ZM43 16.874v-3.126h.33v3.126H43ZM45.2 16.692H43.93v-.187H45.2v.188ZM46.6 16.692H45.33v-.187H46.6v.188ZM48 16.692H46.73v-.187H48v.188ZM49.4 16.692H48.13v-.187H49.4v.188Z" />
                  <path d="M52.15 14.01l-.82 2.151h-.35l.82-2.15h.35ZM54.167 16.161v-.388h.394v.388h-.394ZM56.93 14.01l.82 2.151h-.35l-.82-2.15h.35ZM8 20v-3.126h.33V20H8ZM10.201 19.819H8.93v-.188H10.2v.188ZM10.8 20v-3.126h.33V20h-.33ZM15 20v-3.126h.33V20H15ZM17.2 19.819h-1.27v-.188h1.27v.188ZM18.55 17.136l-.82 2.151h-.35l.82-2.15h.35ZM20 19.819h-1.27v-.188H20v.188ZM21.35 17.136l-.82 2.151h-.35l.82-2.15h.35ZM27.53 17.136l.82 2.151H28l-.82-2.15h.35ZM29.8 19.819h-1.27v-.188h1.27v.188ZM30.33 17.136l.82 2.151h-.35l-.82-2.15h.35Z" />
                  <path d="M32.6 19.819h-1.27v-.188h1.27v.188ZM33.2 20v-3.126h.33V20h-.33ZM37.33 17.136l.82 2.151h-.35l-.82-2.15h.35ZM39.6 19.819H38.33v-.188H39.6v.188ZM40.13 17.136l.82 2.151h-.35l-.82-2.15h.35ZM42.4 19.819H41.13v-.188H42.4v.188ZM43.8 19.819H42.53v-.188H43.8v.188ZM45.2 19.819H43.93v-.188H45.2v.188ZM46.6 19.819H45.33v-.188H46.6v.188ZM48 19.819H46.73v-.188H48v.188ZM49.4 19.819H48.13v-.188H49.4v.188ZM50.75 17.136l-.82 2.151h-.35l.82-2.15h.35ZM52.2 19.819H50.93v-.188H52.2v.188ZM53.55 17.136l-.82 2.151h-.35l.82-2.15h.35ZM55.53 17.136l.82 2.151H56l-.82-2.15h.35ZM57.8 19.819h-1.271v-.188H57.8v.188ZM58.329 17.136l.82 2.151h-.35l-.82-2.15h.35Z" />
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
        <div className="max-w-6xl mx-auto">
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
