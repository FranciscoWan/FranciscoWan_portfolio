import { SITE_CONFIG } from '@/core/config/site.config';
import { ButtonLink, Container, ThinkingOrb } from '@/shared/components/ui';

export function HeroSection() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="bg-[radial-gradient(60rem_40rem_at_85%_20%,var(--color-primary-soft),transparent_70%)] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <Container className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-x-12 lg:gap-y-0">
        <div className="lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:justify-items-start">
          <p className="mb-10 inline-flex items-center gap-3 rounded-full border border-border py-1.5 pr-4 pl-1.5 text-sm text-muted">
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-foreground">
              Pleno
            </span>
            Desenvolvedor full stack
          </p>

          <h1 id="hero-title" className="font-display text-display font-black uppercase">
            <span className="block">Sistemas que</span>
            <span className="block">movimentam</span>
            <span className="block">dinheiro</span>
            <span className="block text-primary">em tempo real.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Construo <strong className="font-semibold text-foreground">APIs em NestJS</strong> e
            interfaces em <strong className="font-semibold text-foreground">Angular</strong> e{' '}
            <strong className="font-semibold text-foreground">React</strong> para operações
            financeiras: integração com bancos, cobranças PIX e comunicação segura entre sistemas.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projeto">Ver projeto em destaque</ButtonLink>
            <ButtonLink href="#contato" variant="outline">
              Entrar em contato
            </ButtonLink>
          </div>
        </div>

        <ThinkingOrb
          state="composing"
          className="size-37.5 justify-self-center lg:col-start-2 lg:row-start-2 lg:size-100"
        />
      </Container>
    </section>
  );
}
