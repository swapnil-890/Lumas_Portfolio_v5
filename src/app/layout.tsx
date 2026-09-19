import type { Metadata } from 'next';
import '@/styles/globals.css';
import { NeuralBackground } from '@/components/NeuralBackground';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Swapnil Roy — AI & Systems Engineer',
    template: '%s | Swapnil Roy',
  },
  description:
    'I engineer intelligent systems and physical architectures. Currently focused on AI security (VOVERA), retrieval-augmented systems (Core-7), and biomimetic robotics (Steel Raven).',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://swapnilroy.dev'
  ),
  openGraph: {
    title: 'Swapnil Roy — AI & Systems Engineer',
    description:
      'Engineering intelligent systems and physical architectures.',
    type: 'website',
  },
};

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
    <html lang="en" className="bg-deep-tech">
      <body className="min-h-screen bg-deep-tech text-slate-100 antialiased font-sans relative selection:bg-violet selection:text-white">
        {/* Global Native Canvas 2D Neural Background with reduced-motion support */}
        <NeuralBackground />
        {/* Explicit stacking context ensuring all page content renders above background */}
        <div className="relative z-10">{children}</div>
        {/* CommandPalette is rendered client-side and imported dynamically */}
        <CommandPaletteWrapper />
      </body>
    </html>
  );
}
