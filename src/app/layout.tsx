import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'OilGas Nanobot Swarm — Pro',
  description: 'AI-powered hierarchical agent swarm for oil and gas engineering.',
  keywords: 'oil gas engineering AI, reservoir analysis, drilling engineering, production optimization',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
