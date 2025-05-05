import Link from 'next/link';

export function Footer() {
  return (
    <footer className="p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Harex - HAR Examiner | A tool for analyzing HTTP Archive (HAR) files
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Created by <a href="https://webrenew.com" target="_blank" rel="noopener noreferrer" className="underline">Webrenew</a> — an open-source project, free for anyone to use and build upon.
        </p>
        <div className="flex justify-center mt-3 space-x-4">
          <Link 
            href="/legal/privacy"
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/legal/terms"
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
