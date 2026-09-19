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
      <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-900/50 p-4 rounded-lg border border-slate-800 font-inter">
        <GitCommit className="w-4 h-4" />
        <span>No recent commits</span>
      </div>
    );
  }

  const currentCommit = commits[currentIndex];

  return (
    <div className="flex flex-col bg-slate-900/50 border border-slate-800 rounded-lg p-4 w-full font-inter">
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        <GitCommit className="w-4 h-4 text-amber-500" />
        <span>Latest Activity</span>
      </div>
      
      <div className="flex flex-col mb-4">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-jetbrains text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
            {currentCommit.sha}
          </span>
          <span className="text-xs text-slate-500 font-jetbrains">
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
            className="text-slate-400 hover:text-amber-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-1.5 mt-auto pt-2 border-t border-slate-800/50">
        {commits.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-amber-500' : 'bg-slate-700 hover:bg-slate-600'
            }`}
            aria-label={`Go to commit ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
