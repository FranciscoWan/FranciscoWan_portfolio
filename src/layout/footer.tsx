import { SITE_CONFIG } from '@/core/config/site.config';
import { Container } from '@/shared/components/ui';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-4 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {CURRENT_YEAR} {SITE_CONFIG.name}
        </p>
        <p>
          Feito com Next.js e Tailwind.{' '}
          <a
            href={SITE_CONFIG.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted underline underline-offset-4 hover:text-foreground"
          >
            Ver o código no GitHub
          </a>
        </p>
      </Container>
    </footer>
  );
}
