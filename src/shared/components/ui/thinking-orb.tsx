'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/shared/lib/cn';
import type { ThinkingOrbCanvasProps } from './thinking-orb-canvas';

const ThinkingOrbCanvas = dynamic(
  () => import('./thinking-orb-canvas').then((mod) => mod.ThinkingOrbCanvas),
  { ssr: false },
);

interface ThinkingOrbProps extends ThinkingOrbCanvasProps {
  className?: string;
}

export function ThinkingOrb({ className, ...canvasProps }: ThinkingOrbProps) {
  return (
    <span className={cn('inline-block size-16 shrink-0', className)}>
      <ThinkingOrbCanvas {...canvasProps} />
    </span>
  );
}
