'use client';

import { useEffect } from 'react';
import { logError } from '@/core/logger/logger';
import '@/styles/globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logError('GlobalError', 'renderizar aplicação', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-start justify-center gap-6 px-5 sm:px-8">
        <h1 className="text-3xl font-bold">O site não carregou.</h1>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-primary px-6 py-3 text-sm font-bold hover:bg-primary-hover"
        >
          Tentar de novo
        </button>
      </body>
    </html>
  );
}
