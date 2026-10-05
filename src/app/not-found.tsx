import { ButtonLink, Container } from '@/shared/components/ui';

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 font-display text-heading font-black uppercase">
        Página não encontrada.
      </h1>
      <p className="mt-6 max-w-prose text-lg text-muted">
        O endereço não existe ou foi movido. Volte para o início para ver o portfólio.
      </p>
      <ButtonLink href="/" className="mt-10">
        Voltar ao início
      </ButtonLink>
    </Container>
  );
}
