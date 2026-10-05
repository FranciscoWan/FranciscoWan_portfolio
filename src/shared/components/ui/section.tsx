import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Container } from './container';

interface SectionProps {
  id: string;
  titleId: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, titleId, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('border-t border-border py-section', className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
