import type { FeaturedProject } from '../types/project.types';

export const FEATURED_PROJECT = {
  title: 'API de orquestração de PIX.',
  summary:
    'Uma plataforma que centraliza a geração de cobranças PIX de vários bancos em uma interface única. Uma operação que movimenta dinheiro em tempo real, onde confiabilidade e segurança vêm antes de tudo.',
  stack: ['NestJS', 'TypeScript', 'Angular', 'PostgreSQL', 'Keycloak', 'Docker'],
  liveFlow: [
    { id: 'request', label: 'Requisição', value: 'POST /cobrancas' },
    { id: 'provider', label: 'Banco escolhido', value: 'Banco do Brasil' },
    { id: 'channel', label: 'Canal seguro', value: 'mTLS + certificado A1' },
    { id: 'queue', label: 'Exibição', value: 'QR code gerado' },
    { id: 'webhook', label: 'Webhook', value: 'Pagamento recebido' },
  ],
  flow: [
    {
      id: 'request',
      title: 'Requisição',
      description:
        'O cliente pede uma cobrança por uma API REST única, escrita em NestJS, com documentação disponível em Swagger.',
    },
    {
      id: 'orchestration',
      title: 'Orquestração',
      description:
        'O núcleo escolhe o banco. Cada banco implementa o mesmo contrato, então adicionar ou trocar um não muda o fluxo.',
    },
    {
      id: 'integration',
      title: 'Integração',
      description:
        'A chamada ao banco sai por mTLS com certificado A1, e as respostas de provedores diferentes voltam padronizadas.',
    },
    {
      id: 'confirmation',
      title: 'Confirmação',
      description:
        'O banco confirma o pagamento por webhook, e o processamento apenas é propagado para o cliente, informando que o pagamento foi efetuado.',
    },
  ],
  decisions: [
    {
      id: 'access',
      title: 'Acesso por perfil',
      description:
        'Keycloak com permissões granulares: a mesma página mostra informações diferentes conforme o nível de acesso.',
    },
    {
      id: 'volume',
      title: 'Telas com muito volume',
      description:
        'Lazy loading de módulos e scroll infinito no Angular, alinhados à paginação do back-end.',
    },
    {
      id: 'errors',
      title: 'Erros previsíveis',
      description:
        'Tratamento de erros e respostas padronizadas entre provedores, para o cliente lidar com um formato só.',
    },
    {
      id: 'deploy',
      title: 'Deploy em containers',
      description: 'Aplicações hospedadas com Docker e containers administrados no servidor.',
    },
  ],
} as const satisfies FeaturedProject;

export const LIVE_FLOW_STEP_DELAY_MS = 700;
