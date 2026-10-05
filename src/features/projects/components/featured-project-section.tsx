import { Section, SectionHeading, Tag } from '@/shared/components/ui';
import { FEATURED_PROJECT, LIVE_FLOW_STEP_DELAY_MS } from '../data/featured-project.data';
import { ProjectFlow } from './project-flow';
import { ProjectLiveCard } from './project-live-card';

export function FeaturedProjectSection() {
  const { title, summary, stack, liveFlow, flow, decisions } = FEATURED_PROJECT;

  return (
    <Section id="projeto" titleId="projeto-title">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <SectionHeading
            id="projeto-title"
            eyebrow="Projeto em destaque"
            title={title}
            description={summary}
          />

          <ul aria-label="Tecnologias do projeto" className="mt-8 flex flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <ProjectLiveCard steps={liveFlow} stepDelayMs={LIVE_FLOW_STEP_DELAY_MS} />
      </div>

      <div className="mt-20">
        <h3 className="mb-10 text-sm font-semibold text-muted">
          Como uma cobrança atravessa o sistema
        </h3>
        <ProjectFlow steps={flow} />
      </div>

      <div className="mt-24 grid gap-10 border-t border-border pt-16 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h3 className="font-display text-title font-extrabold uppercase">Decisões técnicas</h3>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {decisions.map((decision) => (
            <div key={decision.id} className="border-l-2 border-primary pl-5">
              <dt className="font-semibold">{decision.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{decision.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
