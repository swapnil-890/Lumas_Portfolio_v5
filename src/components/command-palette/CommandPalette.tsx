'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search } from 'lucide-react';
import { createCommands, Command as CmdType } from './commands';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  const commands = createCommands(router);

  const handleSelect = (command: CmdType) => {
    command.action(router);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] font-inter">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" 
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      
      <Command 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        label="Global Command Menu"
        shouldFilter={false}
      >
        <div className="flex items-center border-b border-slate-800 px-4 py-3">
          <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
          <Command.Input 
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-slate-200 placeholder:text-slate-500 outline-none w-full"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 font-jetbrains text-[10px] font-medium text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 ml-2">
            ESC
          </kbd>
        </div>
        
        <Command.List className="max-h-80 overflow-y-auto p-2 overscroll-contain">
          <Command.Empty className="py-6 text-center text-sm text-slate-400">
            No results found.
          </Command.Empty>
          
          {commands
            .filter(c => {
              if (!search) return true;
              const term = search.toLowerCase();
              return (
                c.name.toLowerCase().includes(term) ||
                c.keywords.some(k => k.includes(term))
              );
            })
            .map((command) => {
              const Icon = command.icon;
              return (
                <Command.Item
                  key={command.id}
                  value={command.name}
                  onSelect={() => handleSelect(command)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100 cursor-pointer aria-selected:bg-slate-800 aria-selected:text-slate-100 group"
                >
                  <Icon className="w-4 h-4 mr-3 text-slate-400 group-aria-selected:text-amber-500 group-hover:text-amber-500 shrink-0" />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">{command.name}</span>
                    {command.description && (
                      <span className="text-xs text-slate-500 mt-0.5">{command.description}</span>
                    )}
                  </div>
                </Command.Item>
              );
            })}
        </Command.List>
        
        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-2 bg-slate-900/50">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            Navigate with <kbd className="font-jetbrains text-[10px] bg-slate-800 px-1 rounded border border-slate-700">↑</kbd> <kbd className="font-jetbrains text-[10px] bg-slate-800 px-1 rounded border border-slate-700">↓</kbd>
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            Select with <kbd className="font-jetbrains text-[10px] bg-slate-800 px-1 rounded border border-slate-700">↵</kbd>
          </span>
        </div>
      </Command>
    </div>
  );
}
