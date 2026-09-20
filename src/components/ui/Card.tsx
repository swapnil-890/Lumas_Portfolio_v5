// src/components/ui/Card.tsx
// Unified card primitive and composable sub-parts (§15.5)
import React from 'react';
import type { Status } from '@/data/types';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export function Card({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: CardProps) {
  return (
    <Component
      className={`rounded-card border border-border bg-surface p-5 sm:p-6 transition-colors duration-200 hover:border-border-strong focus-within:border-border-strong ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

interface CardMetaProps {
  id?: string;
  status?: Status | string;
  className?: string;
}

export function CardMeta({ id, status, className = '' }: CardMetaProps) {
  return (
    <div
      className={`flex items-center justify-between gap-2 font-mono text-xs text-fg-dim mb-3 select-none ${className}`}
    >
      {id && <span className="tracking-wider text-fg-muted font-medium">{id}</span>}
      {status && (
        <span className="px-2 py-0.5 rounded border border-border bg-bg/80 text-[11px] uppercase tracking-wider text-fg-dim">
          {status}
        </span>
      )}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({
  children,
  className = '',
  as: Heading = 'h3',
}: CardTitleProps) {
  return (
    <Heading className={`text-base sm:text-lg font-semibold text-fg tracking-tight ${className}`}>
      {children}
    </Heading>
  );
}

export function ChipRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap gap-1.5 mt-3 ${className}`}>{children}</div>;
}

export function Chip({
  label,
  href,
  className = '',
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  const baseClasses =
    'inline-flex items-center px-2 py-0.5 rounded font-mono text-[11px] border border-border bg-bg/60 text-fg-dim transition-colors hover:text-fg hover:border-border-strong';
  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {label}
      </a>
    );
  }
  return <span className={`${baseClasses} ${className}`}>{label}</span>;
}
