'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface NavSection {
  id: string;
  label: string;
}

const NAV_SECTIONS: readonly NavSection[] = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'systems', label: 'SYSTEMS' },
  { id: 'lab', label: 'LAB' },
  { id: 'stack', label: 'STACK' },
  { id: 'dispatch', label: 'DISPATCH' },
];

export function NavigationDock() {
  const [activeId, setActiveId] = useState<string>('overview');
  const [isApple, setIsApple] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Detect Apple platform client-side to prevent hydration mismatch (§16.1)
    if (typeof window !== 'undefined' && navigator.platform) {
      setIsApple(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }

    // Set up single IntersectionObserver over sections
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by top offset to pick highest visible
          intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0.1, 0.5],
      }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
  };

  return (
    <>
      {/* Skip to content accessibility link (§16.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent text-bg font-mono text-xs font-semibold rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>

      {/* Floating Navigation Dock for Desktop & Tablet */}
      <header
        role="banner"
        className="sticky top-4 z-40 max-w-5xl mx-auto px-4 sm:px-6 w-full transition-all"
      >
        <nav
          role="navigation"
          aria-label="Main systems navigation"
          className="rounded-card border border-border bg-surface/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between shadow-2xl"
        >
          {/* Brand & Status Indicator */}
          <div className="flex items-center gap-3">
            <Link
              href="#overview"
              className="font-mono text-xs font-semibold text-fg tracking-wider hover:text-accent transition-colors select-none"
            >
              SYS // LUMAS
            </Link>

            <span className="hidden sm:inline-block h-3 w-[1px] bg-border" aria-hidden="true" />

            <div
              className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-fg-muted"
              aria-label="System status: Nominal"
            >
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              <span>STATUS: NOMINAL</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 font-mono text-xs">
            {NAV_SECTIONS.map(({ id, label }, idx) => {
              const isActive = activeId === id;
              const formattedIdx = String(idx + 1).padStart(2, '0');
              return (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`px-2.5 py-1 rounded transition-colors duration-150 inline-flex items-center gap-1 ${
                      isActive
                        ? 'text-accent bg-bg/80 font-medium'
                        : 'text-fg-dim hover:text-fg hover:bg-bg/40'
                    }`}
                  >
                    <span className="text-fg-muted text-[10px]" aria-hidden="true">
                      {formattedIdx}
                    </span>
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action Tools: Palette Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 min-h-[36px] rounded border border-border bg-bg/60 text-fg-dim hover:text-fg hover:border-border-strong text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <span className="hidden sm:inline">Commands</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] text-accent">
                {isApple ? '⌘ K' : 'Ctrl K'}
              </kbd>
            </button>

            {/* Mobile Menu Trigger Button (WCAG >= 44px touch target) */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden flex items-center justify-center h-11 w-11 rounded border border-border bg-bg/80 text-fg-dim hover:text-fg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <span className="font-mono text-sm" aria-hidden="true">
                {mobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Disclosure Menu (§16.1) */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden mt-2 rounded-card border border-border bg-surface p-3 shadow-2xl animate-fade-in"
          >
            <ul className="space-y-1 font-mono text-sm">
              {NAV_SECTIONS.map(({ id, label }, idx) => {
                const isActive = activeId === id;
                const formattedIdx = String(idx + 1).padStart(2, '0');
                return (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center justify-between px-3 py-3 rounded min-h-[44px] transition-colors ${
                        isActive
                          ? 'bg-bg text-accent font-medium'
                          : 'text-fg-dim hover:text-fg hover:bg-bg/40'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-fg-muted text-xs" aria-hidden="true">
                          {`${formattedIdx} //`}
                        </span>
                        <span>{label}</span>
                      </span>
                      {isActive && <span className="text-accent text-xs">●</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
