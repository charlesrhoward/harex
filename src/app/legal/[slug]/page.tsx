"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LegalPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/${slug}.txt`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${slug}.txt`);
        }
        const text = await response.text();
        setContent(text);
        
        if (slug === 'privacy') {
          setTitle('Privacy Policy');
        } else if (slug === 'terms') {
          setTitle('Terms of Use');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setContent('Content not found');
      }
    }

    if (slug) {
      fetchContent();
    }
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-slate-900/10 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
          <div className="flex items-center px-6">
            <Link className="text-black dark:text-emerald-400 font-medium" href="/">
              ← Back to HAREX
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 flex-1">
        <div className="max-w-2xl mx-auto mt-8">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          
          <style jsx global>{`
            @font-face {
              font-family: 'Atlassian Sans';
              font-style: normal;
              font-weight: 400 653;
              font-display: swap;
              src:
                local('AtlassianSans'),
                local('Atlassian Sans Text');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304,
                U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
          `}</style>
          
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-md">
            <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', fontFamily: "'Atlassian Sans', system-ui, sans-serif" }} className="text-sm">
              {content}
            </pre>
          </div>
        </div>
      </main>

      <footer className="p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Harex - HAR Examiner | A tool for analyzing HTTP Archive (HAR) files
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Created by Webrenew — an open-source project, free for anyone to use and build upon.
          </p>
        </div>
      </footer>
    </div>
  );
}
