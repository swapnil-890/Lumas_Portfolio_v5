import { cn } from '@/lib/utils';

export function Badge({ 
  children, 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'accent' 
}) {
  return (
    <span className={cn(
      "px-2 py-0.5 text-xs font-mono rounded",
      variant === 'default' && "bg-slate-800 text-slate-400",
      variant === 'accent' && "bg-amber-500/10 text-amber-500"
    )}>
      {children}
    </span>
  );
}
