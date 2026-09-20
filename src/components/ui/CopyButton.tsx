'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  readonly value: string;
  readonly label: string;
  readonly className?: string;
}

export function CopyButton({ value, label, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback if clipboard API unavailable
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label} to clipboard`}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded border font-mono text-xs transition-colors min-h-[44px] min-w-[44px] select-none ${
          copied
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
            : 'border-border bg-surface hover:border-border-strong hover:text-fg text-fg-dim'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider">COPIED</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-fg-muted" aria-hidden="true" />
            <span className="text-[11px]">Copy</span>
          </>
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </div>
  );
}
