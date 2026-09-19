import type { Metadata } from 'next';
import '@/styles/globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
        {/* CommandPalette is rendered client-side and imported dynamically */}
        <CommandPaletteWrapper />
      </body>
    </html>
  );
}

// Dynamic import to avoid SSR issues with cmdk
import dynamic from 'next/dynamic';

const CommandPaletteWrapper = dynamic(
  () =>
    import('@/components/command-palette/CommandPalette').then(
      (mod) => mod.CommandPalette
    ),
  { ssr: false }
);
