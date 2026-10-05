import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

export function Tag({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted',
        className,
      )}
      {...props}
    />
  );
}
