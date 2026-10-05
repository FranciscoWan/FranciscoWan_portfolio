'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { NavItem } from '@/core/config/site.types';
import { ButtonLink } from '@/shared/components/ui';
import { useActiveSection } from '@/shared/hooks/use-active-section';
import { cn } from '@/shared/lib/cn';

interface HeaderNavProps {
  items: readonly NavItem[];
}

const MOBILE_MENU_ID = 'menu-principal';

export function HeaderNav({ items }: HeaderNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(items.map((item) => item.id));

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <nav aria-label="Seções" className="hidden md:block">
        <ul className="flex items-center gap-8">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'location' : undefined}
                className={cn(
                  'relative py-2 text-sm text-muted transition-colors hover:text-foreground',
                  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform',
                  activeId === item.id && 'text-foreground after:scale-x-100',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <ButtonLink href="#contato" className="hidden h-11 sm:inline-flex">
          Fale comigo
        </ButtonLink>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-border md:hidden"
        >
          <span className="sr-only">{isOpen ? 'Fechar menu' : 'Abrir menu'}</span>
          <span
            aria-hidden
            className={cn(
              'h-0.5 w-5 bg-foreground transition-transform',
              isOpen && 'translate-y-1 rotate-45',
            )}
          />
          <span
            aria-hidden
            className={cn(
              'h-0.5 w-5 bg-foreground transition-transform',
              isOpen && '-translate-y-1 -rotate-45',
            )}
          />
        </button>
      </div>

      <nav
        id={MOBILE_MENU_ID}
        aria-label="Seções"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
      >
        <ul className="flex flex-col px-5 py-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="block border-b border-border py-4 font-display text-title font-extrabold uppercase last:border-b-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
