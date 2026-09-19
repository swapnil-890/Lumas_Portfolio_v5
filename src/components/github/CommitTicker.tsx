'use client';

import React, { useState, useEffect } from 'react';
import { GitCommit, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Commit } from '@/lib/github';

export function CommitTicker({ commits }: { commits: Commit[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!commits || commits.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % commits.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [commits]);

  if (!commits || commits.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-sm text-slate-400 bg-glass p-4 rounded-lg border border-border-soft backdrop-blur-xl font-inter">
        <GitCommit className="w-4 h-4 text-cyan" />
        <span>No recent commits</span>
      </div>
    );
  }

  const currentCommit = commits[currentIndex];

  return (
    <div className="flex flex-col bg-glass border border-border-soft hover:border-border-strong hover:shadow-cyan-glow backdrop-blur-xl rounded-lg p-5 w-full font-inter transition-all duration-300">
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        <GitCommit className="w-4 h-4 text-cyan" />
        <span>Latest Activity</span>
      </div>
      
      <div className="flex flex-col mb-4">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-mono text-xs text-cyan bg-cyan/10 border border-cyan/20 px-2 py-0.5 rounded">
            {currentCommit.sha}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {currentCommit.repo}
          </span>
        </div>
        
        <p className="text-sm text-slate-200 truncate pr-4">
          {currentCommit.message}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-500">
            {formatDistanceToNow(new Date(currentCommit.date), { addSuffix: true })}
          </span>
          <a
            href={currentCommit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-1.5 mt-auto pt-2 border-t border-border-soft">
        {commits.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-cyan' : 'bg-slate-700 hover:bg-slate-600'
            }`}
            aria-label={`Go to commit ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
