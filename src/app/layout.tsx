import type { Metadata } from "next";
import { Fira_Code, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: "HAREX - HAR Examiner",
  description: "A tool for analyzing HTTP Archive (HAR) files",
  openGraph: {
    title: "HAREX - HAR Examiner",
    description: "A powerful tool for analyzing HTTP Archive (HAR) files",
    images: [{
      url: "/open-graph.png",
      width: 1200,
      height: 630,
      alt: "HAREX - HAR Examiner",
    }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAREX - HAR Examiner",
    description: "A powerful tool for analyzing HTTP Archive (HAR) files",
    images: ["/open-graph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
