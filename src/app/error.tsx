'use client';

import { useEffect } from 'react';
import { logError } from '@/core/logger/logger';
import { Container } from '@/shared/components/ui';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError('ErrorPage', 'renderizar segmento', error);
  }, [error]);

  return (
    <Container className="flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <h1 className="font-display text-heading font-black uppercase">Algo deu errado.</h1>
      <p className="mt-6 max-w-prose text-lg text-muted">
        Esta parte da página não carregou. Tente de novo.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-bold hover:bg-primary-hover"
      >
        Tentar de novo
      </button>
    </Container>
  );
}
