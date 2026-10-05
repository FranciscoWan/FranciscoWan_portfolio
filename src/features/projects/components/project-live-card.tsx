'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/shared/hooks/use-in-view';
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion';
import { cn } from '@/shared/lib/cn';
import type { ProjectLiveStep } from '../types/project.types';

interface ProjectLiveCardProps {
  steps: readonly ProjectLiveStep[];
  stepDelayMs: number;
}

export function ProjectLiveCard({ steps, stepDelayMs }: ProjectLiveCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.4 });
  const [revealedCount, setRevealedCount] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    const timers = steps.map((_, index) =>
      window.setTimeout(() => setRevealedCount(index + 1), stepDelayMs * (index + 1)),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [prefersReducedMotion, isInView, runId, steps, stepDelayMs]);

  const visibleCount = prefersReducedMotion ? steps.length : revealedCount;
  const isComplete = visibleCount === steps.length;

  const replay = () => {
    setRevealedCount(0);
    setRunId((id) => id + 1);
  };

  return (
    <figure
      ref={ref}
      aria-label="Simulação do caminho de uma cobrança PIX pela API"
      className="relative rounded-2xl border border-border bg-surface p-6 shadow-[0_40px_120px_-40px_var(--color-primary-soft)] sm:p-8"
    >
      <figcaption className="flex items-center justify-between gap-4 font-mono text-xs tracking-label uppercase">
        <span className="text-subtle">API PIX / simulação</span>
        <span className="flex items-center gap-2 text-primary">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-blink"
          />
          Ao vivo
        </span>
      </figcaption>

      <dl className="mt-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'flex items-baseline justify-between gap-6 border-b border-dashed border-border py-4 transition-opacity duration-500',
              index < visibleCount ? 'opacity-100' : 'opacity-0',
            )}
          >
            <dt className="text-sm text-muted">{step.label}</dt>
            <dd className="text-right font-mono text-sm text-foreground">{step.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-xl border border-border bg-surface-raised p-5">
        <p className="font-mono text-xs tracking-label text-subtle uppercase">Status da cobrança</p>
        <p
          aria-live="polite"
          className={cn(
            'mt-2 font-display text-5xl leading-none font-black uppercase transition-colors',
            isComplete ? 'text-foreground' : 'text-subtle',
          )}
        >
          {isComplete ? 'Paga' : 'Processando'}
        </p>
        <div aria-hidden className="mt-5 grid grid-cols-5 gap-1.5">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={cn(
                'h-1 rounded-full transition-colors duration-500',
                index < visibleCount ? 'bg-primary' : 'bg-border',
              )}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={replay}
        disabled={!isComplete}
        className="mt-5 font-mono text-xs text-subtle underline-offset-4 transition-opacity hover:text-foreground hover:underline disabled:opacity-0"
      >
        Repetir simulação
      </button>
    </figure>
  );
}
