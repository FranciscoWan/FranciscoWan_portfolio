'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { scaleCounts } from 'thinking-orbs';
import {
  MODE_FRAMES,
  paintFrame,
  resolvePreset,
  type OrbSize,
  type OrbState,
  type Resolved,
} from 'thinking-orbs/engine';
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion';

const MAX_PIXEL_RATIO = 2;
const STATIC_FRAME_TIME = 0.6;
const LARGEST_PRESET = 64;
const DENSITY_GROWTH = 0.6;

function nearestPreset(size: number): OrbSize {
  if (size < 26) return 20;
  if (size < 45) return 32;
  return LARGEST_PRESET;
}

function resolveOrb(state: OrbState, size: number): Resolved {
  const preset = resolvePreset(state, nearestPreset(size));
  if (size <= LARGEST_PRESET) return preset;

  const density = (size / LARGEST_PRESET) ** DENSITY_GROWTH;
  return { ...preset, opts: scaleCounts(preset.opts, density) };
}

interface UseThinkingOrbOptions {
  state: OrbState;
  speed: number;
  dark: boolean;
}

export function useThinkingOrb({
  state,
  speed,
  dark,
}: UseThinkingOrbOptions): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const pixelRatio = Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1);
    let size = 0;
    let orb = resolveOrb(state, size);
    let frameId = 0;
    let onScreen = false;

    const draw = () => {
      if (!size) return;
      const time = reducedMotion
        ? STATIC_FRAME_TIME
        : (performance.now() / 1000) * orb.speed * speed;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, size, size);
      paintFrame(ctx, MODE_FRAMES[orb.mode](size, time, orb.opts), dark);
    };

    const loop = () => {
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const syncLoop = () => {
      cancelAnimationFrame(frameId);
      if (!reducedMotion && onScreen && !document.hidden) {
        frameId = requestAnimationFrame(loop);
      }
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;
      size = Math.min(entry.contentRect.width, entry.contentRect.height);
      canvas.width = Math.round(size * pixelRatio);
      canvas.height = Math.round(size * pixelRatio);
      orb = resolveOrb(state, size);
      draw();
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      onScreen = entry.isIntersecting;
      syncLoop();
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    document.addEventListener('visibilitychange', syncLoop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', syncLoop);
    };
  }, [state, speed, dark, reducedMotion]);

  return canvasRef;
}
