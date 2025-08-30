'use client'

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <html lang="en">
      <head>
        <title>MedChron AI - Medical AI Assistant</title>
        <meta name="description" content="AI-powered legal research & chronology" />
      </head>
      <body className={theme === 'dark' ? 'min-h-screen bg-slate-950 text-slate-200' : 'min-h-screen bg-gray-50 text-gray-900'}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Header />
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
