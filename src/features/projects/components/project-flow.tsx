import type { ProjectFlowStep } from '../types/project.types';

interface ProjectFlowProps {
  steps: readonly ProjectFlowStep[];
}

function formatStepNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function ProjectFlow({ steps }: ProjectFlowProps) {
  return (
    <ol className="grid gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
      {steps.map((step, index) => (
        <li key={step.id}>
          <div className="flex items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-display text-3xl font-black text-primary transition duration-300 hover:border-primary/60 hover:shadow-neon">
              {formatStepNumber(index)}
            </span>
            <span
              aria-hidden
              className="ml-4 h-px flex-1 bg-linear-to-r from-primary/60 to-transparent"
            />
          </div>
          <h3 className="mt-8 font-display text-title font-extrabold uppercase">{step.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
