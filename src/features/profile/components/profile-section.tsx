import { Section, SectionHeading } from '@/shared/components/ui';
import { PROFILE_SUMMARY, PROFILE_TRAITS } from '../data/profile.data';

export function ProfileSection() {
  return (
    <Section id="perfil" titleId="perfil-title">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          id="perfil-title"
          eyebrow="Perfil"
          title="Do código à operação."
          description={PROFILE_SUMMARY}
        />
        <ul className="self-end border-t border-border">
          {PROFILE_TRAITS.map((trait) => (
            <li
              key={trait.id}
              className="flex gap-4 border-b border-border py-5 text-lg leading-snug"
            >
              <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 bg-primary" />
              {trait.text}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
