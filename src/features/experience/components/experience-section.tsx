import { Section, SectionHeading } from '@/shared/components/ui';
import { EXPERIENCES } from '../data/experience.data';
import { ExperienceItem } from './experience-item';

export function ExperienceSection() {
  return (
    <Section id="experiencia" titleId="experiencia-title">
      <SectionHeading id="experiencia-title" eyebrow="Experiência" title="De júnior a pleno." />
      <div className="mt-16 space-y-24">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.company} experience={experience} />
        ))}
      </div>
    </Section>
  );
}
