import { SITE_CONFIG } from '@/core/config/site.config';
import { Eyebrow, Section } from '@/shared/components/ui';
import { CONTACT_CHANNELS, COPY_FEEDBACK_DURATION_MS } from '../data/contact.data';
import { CopyEmailButton } from './copy-email-button';

export function ContactSection() {
  const { email } = SITE_CONFIG.contact;

  return (
    <Section id="contato" titleId="contato-title">
      <Eyebrow>Contato</Eyebrow>
      <h2 id="contato-title" className="mt-8 font-display text-display font-black uppercase">
        Vamos conversar?
      </h2>
      <p className="mt-8 max-w-prose text-lg leading-relaxed text-muted">
        Para vagas, projetos ou uma conversa técnica sobre integrações e APIs, me chame por um
        destes canais.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <a
            href={`mailto:${email}`}
            className="font-display text-title font-extrabold break-all text-foreground underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-4xl"
          >
            {email}
          </a>
          <div className="mt-6">
            <CopyEmailButton email={email} feedbackDurationMs={COPY_FEEDBACK_DURATION_MS} />
          </div>
        </div>

        <ul className="border-t border-border">
          {CONTACT_CHANNELS.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 border-b border-border py-5"
              >
                <span className="text-sm text-muted">{channel.label}</span>
                <span className="font-mono text-sm transition-colors group-hover:text-primary">
                  {channel.value} <span aria-hidden>↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
