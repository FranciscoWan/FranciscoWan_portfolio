import Link from 'next/link';
import { NAV_ITEMS, SITE_CONFIG } from '@/core/config/site.config';
import { Container } from '@/shared/components/ui';
import { HeaderNav } from './header-nav';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="#inicio" className="flex items-baseline gap-3" aria-label="Voltar ao início">
          <span className="font-display text-3xl leading-none font-black tracking-tight">
            FW<span className="text-primary">.</span>
          </span>
          <span className="hidden text-sm text-muted sm:inline">{SITE_CONFIG.shortName}</span>
        </Link>
        <HeaderNav items={NAV_ITEMS} />
      </Container>
    </header>
  );
}
