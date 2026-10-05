import type { Experience } from '../types/experience.types';

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const { company, period, position, stages, responsibilities } = experience;

  return (
    <article className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <header className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-sm text-primary">{period}</p>
        <h3 className="mt-4 font-display text-heading font-black uppercase">{company}</h3>
        <p className="mt-3 text-lg text-muted">{position}</p>
      </header>

      <div>
        <ol aria-label="Evolução no cargo" className="relative border-l border-border">
          {stages.map((stage) => (
            <li key={stage.id} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
              />
              <p className="font-display text-title font-extrabold uppercase">{stage.role}</p>
              {stage.period ? (
                <p className="mt-2 font-mono text-sm text-muted">{stage.period}</p>
              ) : null}
              <p className="mt-2 max-w-prose leading-relaxed text-muted">{stage.description}</p>
            </li>
          ))}
        </ol>

        {responsibilities ? (
          <div className="mt-14 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h4 className="text-sm font-semibold text-muted">No dia a dia</h4>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {responsibilities.map((item) => (
                <li key={item} className="flex gap-3 leading-snug">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
