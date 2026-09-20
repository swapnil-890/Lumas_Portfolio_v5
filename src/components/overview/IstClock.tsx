'use client';

import { useEffect, useState } from 'react';

export function IstClock() {
  const [timeString, setTimeString] = useState<string>('--:--:--');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const updateTime = () => {
      setTimeString(formatter.format(new Date()));
    };

    updateTime();

    // Pause timer if tab is hidden or user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const interval = setInterval(() => {
      if (!document.hidden) {
        updateTime();
      }
    }, 1000);

    const handleVisibility = () => {
      if (!document.hidden) {
        updateTime();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 font-mono text-sm text-fg"
      aria-label="Lumas local time: Indian Standard Time"
    >
      <span className="text-cyan font-medium">{mounted ? timeString : '12:00:00'}</span>
      <span className="text-[11px] text-fg-muted font-normal">IST</span>
    </div>
  );
}
