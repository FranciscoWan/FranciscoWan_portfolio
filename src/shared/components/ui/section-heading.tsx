import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Eyebrow } from './eyebrow';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn('max-w-4xl', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-8 font-display text-heading font-extrabold text-balance uppercase">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </header>
  );
}
