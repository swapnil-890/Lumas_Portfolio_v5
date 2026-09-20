'use client';

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, ArrowUpRight } from 'lucide-react';
import { makeAnswer, type AskResponse } from '@/lib/ask/answer';

const STARTER_QUERIES = [
  'who is lumas',
  'what is vovera',
  'show stack',
  'what is steel raven',
  'contact channels',
  'help',
] as const;

export default function AskLumas() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<AskResponse[]>([
    makeAnswer('help'),
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  const handleQuery = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const response = makeAnswer(trimmed);
    setHistory((prev) => [...prev, response]);
    setQuery('');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleQuery(query);
  };

  const clearHistory = () => {
    setHistory([]);
    inputRef.current?.focus();
  };

  // Auto-scroll to the bottom of the log when new messages arrive
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      id="ask-lumas"
      className="rounded-lg border border-border bg-surface/90 backdrop-blur-md overflow-hidden transition-all duration-200 hover:border-border-strong shadow-lg"
    >
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg/70 select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-accent" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
            SYS // ASK LUMAS
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-fg-muted uppercase tracking-widest px-1.5 py-0.5 rounded border border-border bg-surface">
            OFFLINE ENGINE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            READY
          </span>
          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="p-1.5 text-fg-muted hover:text-fg rounded hover:bg-surface transition-colors"
              aria-label="Clear query history"
              title="Clear transcript"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Starter Query Chips */}
      <div className="px-4 py-2.5 border-b border-border/60 bg-bg/40 flex items-center gap-2 overflow-x-auto text-xs font-mono scrollbar-thin">
        <span className="text-fg-muted text-[11px] uppercase tracking-wider shrink-0 select-none">
          Quick Vectors:
        </span>
        {STARTER_QUERIES.map((sq) => (
          <button
            key={sq}
            type="button"
            onClick={() => handleQuery(sq)}
            className="px-2.5 py-1 rounded border border-border bg-surface hover:border-accent hover:text-accent text-fg-dim text-[11px] transition-colors whitespace-nowrap shrink-0"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Query Transcript Log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-atomic="false"
        className="p-4 sm:p-5 max-h-96 overflow-y-auto space-y-4 font-mono text-xs"
      >
        {history.length === 0 ? (
          <div className="py-8 text-center text-fg-muted">
            <p>Interactive deterministic query terminal is ready.</p>
            <p className="text-[11px] mt-1 text-fg-dim">
              Type a question below or choose one of the quick vectors above.
            </p>
          </div>
        ) : (
          history.map((item, idx) => (
            <div
              key={`${item.intentId}-${idx}`}
              className="space-y-2 p-3.5 rounded bg-bg/60 border border-border/80"
            >
              {/* User Query Echo */}
              <div className="flex items-center gap-2 text-fg-muted text-[11px] pb-2 border-b border-border/40">
                <span className="text-accent font-semibold">QUERY &gt;</span>
                <span className="text-fg font-medium">{item.query}</span>
              </div>

              {/* Engine Response Header */}
              <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-cyan">
                <span>{item.title}</span>
              </div>

              {/* Response Text */}
              <div className="text-fg-dim leading-relaxed whitespace-pre-line text-xs">
                {item.text}
              </div>

              {/* Deep Link Action Chips */}
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 mt-2 border-t border-border/40">
                  {item.links.map((link) => {
                    const isInternal = link.href.startsWith('/') || link.href.startsWith('#');
                    return isInternal ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface border border-border hover:border-accent hover:text-accent text-[11px] text-fg transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-accent" aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface border border-border hover:border-accent hover:text-accent text-[11px] text-fg transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-accent" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Follow-up Suggestions */}
              {item.suggestions && item.suggestions.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[10px] text-fg-muted">
                  <span className="select-none">Suggested:</span>
                  {item.suggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleQuery(sug)}
                      className="text-fg-dim hover:text-accent underline underline-offset-2 transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 p-3 border-t border-border bg-bg/80"
      >
        <label htmlFor="ask-lumas-input" className="sr-only">
          Query profile graph
        </label>
        <span className="font-mono text-xs text-accent font-semibold pl-1 select-none" aria-hidden="true">
          &gt;
        </span>
        <input
          id="ask-lumas-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query profile graph (e.g. 'what is vovera', 'show stack', 'contact', 'help')..."
          maxLength={200}
          className="flex-1 bg-transparent text-xs font-mono text-fg placeholder:text-fg-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-accent/10 border border-accent/30 text-accent font-mono text-xs hover:bg-accent hover:text-bg transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[36px] min-w-[36px]"
          aria-label="Submit query"
        >
          <span className="hidden sm:inline">Execute</span>
          <CornerDownLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
