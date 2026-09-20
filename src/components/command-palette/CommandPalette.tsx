'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CornerDownLeft, X } from 'lucide-react';
import { createCommands, type Command } from './commands';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const router = useRouter();
  const allCommands = useMemo(() => createCommands(router), [router]);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return allCommands;
    const term = search.toLowerCase().trim();
    return allCommands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(term) ||
        cmd.description?.toLowerCase().includes(term) ||
        cmd.keywords.some((kw) => kw.includes(term))
    );
  }, [allCommands, search]);

  // Keep selected index within bounds when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  const openPalette = () => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      setIsOpen(true);
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const closePalette = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
    setIsOpen(false);
    setSearch('');
    previouslyFocusedElement.current?.focus();
  };

  const executeCommand = (command: Command) => {
    closePalette();
    // Small timeout to allow dialog closing transition
    setTimeout(() => {
      command.action(router);
    }, 100);
  };

  // Keyboard shortcut listener for Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const dialog = dialogRef.current;
        if (dialog?.open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };

    const handleCustomOpen = () => openPalette();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Keyboard navigation within the palette
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCommands.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) executeCommand(current);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        closePalette();
      }}
      onClick={(e) => {
        // Close on backdrop click (click directly on dialog element)
        if (e.target === dialogRef.current) {
          closePalette();
        }
      }}
      aria-label="Navigation and system command palette"
      className="m-auto fixed inset-0 z-50 p-0 max-w-xl w-[92vw] sm:w-full rounded-xl border border-border bg-surface text-fg shadow-2xl backdrop:bg-bg/80 backdrop:backdrop-blur-sm overflow-hidden outline-none"
    >
      {/* Search Header */}
      <div className="flex items-center px-4 py-3.5 border-b border-border bg-bg/60">
        <Search className="w-4 h-4 text-accent mr-3 shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-controls="cmd-palette-listbox"
          aria-activedescendant={filteredCommands[selectedIndex]?.id}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="Type a section, project, stack tool, or command..."
          className="flex-1 bg-transparent text-sm font-sans text-fg placeholder:text-fg-muted outline-none w-full"
        />
        <div className="flex items-center gap-2 ml-2 shrink-0">
          <kbd className="hidden sm:inline-flex items-center font-mono text-[10px] text-fg-muted bg-surface px-1.5 py-0.5 rounded border border-border">
            ESC
          </kbd>
          <button
            type="button"
            onClick={closePalette}
            className="p-1 text-fg-muted hover:text-fg rounded transition-colors sm:hidden"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results List */}
      <ul
        id="cmd-palette-listbox"
        ref={listRef}
        role="listbox"
        aria-label="Commands"
        className="max-h-80 overflow-y-auto p-2 divide-y divide-border/30 overscroll-contain focus:outline-none"
      >
        {filteredCommands.length === 0 ? (
          <li className="py-8 text-center text-xs font-mono text-fg-muted" role="status">
            No matching system commands or records found.
          </li>
        ) : (
          filteredCommands.map((command, idx) => {
            const Icon = command.icon;
            const isSelected = idx === selectedIndex;

            return (
              <li
                key={command.id}
                id={command.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => executeCommand(command)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors min-h-[44px] ${
                  isSelected
                    ? 'bg-accent/10 text-fg border border-accent/20'
                    : 'text-fg-dim hover:bg-surface border border-transparent'
                }`}
              >
                <div
                  className={`p-1.5 rounded mr-3 shrink-0 ${
                    isSelected ? 'bg-accent text-bg' : 'bg-bg text-fg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>

                <div className="flex flex-col flex-1 min-w-0 mr-2">
                  <span className="font-mono font-medium truncate text-fg">
                    {command.name}
                  </span>
                  {command.description && (
                    <span className="text-[11px] text-fg-muted truncate mt-0.5">
                      {command.description}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-accent shrink-0">
                    <span>Select</span>
                    <CornerDownLeft className="w-3 h-3" aria-hidden="true" />
                  </span>
                )}
              </li>
            );
          })
        )}
      </ul>

      {/* Footer Instructions */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-bg/70 text-[11px] font-mono text-fg-muted">
        <span className="flex items-center gap-1.5">
          <span>Navigate:</span>
          <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border text-[10px]">↑</kbd>
          <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border text-[10px]">↓</kbd>
        </span>
        <span className="flex items-center gap-1.5">
          <span>Execute:</span>
          <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border text-[10px]">↵ Enter</kbd>
        </span>
      </div>
    </dialog>
  );
}
