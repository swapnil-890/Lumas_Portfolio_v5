import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import dynamic from 'next/dynamic';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Swapnil Roy — AI & Systems Engineer',
    template: '%s | Swapnil Roy',
  },
  description:
    'EXPLORING AI/ML, ROBOTICS, AND PHYSICAL COMPUTING AT FIRST PRINCIPLES.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://swapnilroy.dev'
  ),
  openGraph: {
    title: 'Swapnil Roy — AI & Systems Engineer',
    description:
      'Exploring AI/ML, robotics, and physical computing at first principles.',
    type: 'website',
  },
};

import { NavigationDock } from '@/components/layout/NavigationDock';

const CommandPaletteWrapper = dynamic(
  () =>
    import('@/components/command-palette/CommandPalette').then(
      (mod) => mod.CommandPalette
    ),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} bg-bg font-sans`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased font-sans relative selection:bg-accent/20 selection:text-accent">
        <NavigationDock />
        {/* Explicit stacking context ensuring all page content renders above dot-grid background */}
        <div className="relative z-10">{children}</div>
        {/* CommandPalette is rendered client-side and imported dynamically */}
        <CommandPaletteWrapper />
      </body>
    </html>
  );
}
