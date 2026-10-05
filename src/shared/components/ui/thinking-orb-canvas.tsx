'use client';

import type { OrbState } from 'thinking-orbs/engine';
import { useThinkingOrb } from '@/shared/hooks/use-thinking-orb';

export interface ThinkingOrbCanvasProps {
  state?: OrbState;
  speed?: number;
  theme?: 'dark' | 'light';
  'aria-label'?: string;
}

export function ThinkingOrbCanvas({
  state = 'working',
  speed = 1,
  theme = 'dark',
  'aria-label': label,
}: ThinkingOrbCanvasProps) {
  const canvasRef = useThinkingOrb({ state, speed, dark: theme === 'dark' });

  return (
    <canvas
      ref={canvasRef}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label}
      className="block size-full"
    />
  );
}
