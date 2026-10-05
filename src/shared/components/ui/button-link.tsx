import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'outline';

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-foreground hover:bg-primary-hover',
  outline: 'border border-border text-foreground hover:border-muted',
};

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex h-12 items-center justify-center gap-3 rounded-md px-6 text-sm font-bold transition-colors',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
