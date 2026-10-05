import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

export function Eyebrow({ className, children, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'flex items-center gap-4 font-mono text-xs tracking-label text-primary uppercase',
        className,
      )}
      {...props}
    >
      <span aria-hidden className="h-px w-8 bg-subtle" />
      {children}
    </p>
  );
}
