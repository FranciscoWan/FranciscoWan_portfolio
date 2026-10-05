'use client';

import { useEffect, useState } from 'react';
import { logError } from '@/core/logger/logger';

type CopyStatus = 'idle' | 'copied' | 'failed';

interface CopyEmailButtonProps {
  email: string;
  feedbackDurationMs: number;
}

const STATUS_LABEL: Record<CopyStatus, string> = {
  idle: 'Copiar e-mail',
  copied: 'E-mail copiado',
  failed: 'Não foi possível copiar. Selecione o endereço acima.',
};

export function CopyEmailButton({ email, feedbackDurationMs }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus('idle'), feedbackDurationMs);
    return () => window.clearTimeout(timer);
  }, [status, feedbackDurationMs]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch (error) {
      logError('CopyEmailButton', 'copiar e-mail para a área de transferência', error);
      setStatus('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-semibold transition-colors hover:border-muted"
    >
      {STATUS_LABEL[status]}
    </button>
  );
}
