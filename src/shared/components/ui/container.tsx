import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-content px-5 sm:px-8', className)} {...props} />;
}
