import { Section, SectionHeading, Tag } from '@/shared/components/ui';
import { getSkillGroups } from '../services/skills.service';

export function SkillsSection() {
  const groups = getSkillGroups();

  return (
    <Section id="stack" titleId="stack-title">
      <SectionHeading
        id="stack-title"
        eyebrow="Competências"
        title="Ferramentas do dia a dia."
        description="TypeScript de ponta a ponta: do banco de dados à interface, passando pelas integrações que conectam tudo."
      />

      <dl className="mt-16 border-t border-border">
        {groups.map((group) => (
          <div
            key={group.id}
            className="grid gap-4 border-b border-border py-6 md:grid-cols-[16rem_1fr] md:items-center md:gap-10"
          >
            <dt className="font-display text-title font-extrabold uppercase">{group.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
