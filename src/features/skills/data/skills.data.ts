import type { SkillGroup } from '../types/skills.types';

export const SKILL_GROUPS = [
  { id: 'languages', label: 'Linguagens', items: ['TypeScript', 'JavaScript'] },
  { id: 'backend', label: 'Back-end', items: ['Node.js', 'NestJS', 'APIs REST', 'SOAP'] },
  {
    id: 'frontend',
    label: 'Front-end',
    items: ['Angular', 'React', 'Lazy loading', 'Scroll infinito', 'Paginação'],
  },
  {
    id: 'database',
    label: 'Banco de dados',
    items: ['PostgreSQL', 'MySQL', 'Modelagem relacional', 'SQL'],
  },
  {
    id: 'security',
    label: 'Integração e segurança',
    items: ['Webhooks', 'mTLS', 'Certificado A1', 'Keycloak'],
  },
  { id: 'infra', label: 'Infra e ferramentas', items: ['Docker', 'RabbitMQ', 'MobaXterm', 'Git'] },
  {
    id: 'architecture',
    label: 'Arquitetura',
    items: ['SOLID', 'Inversão de dependência', 'Design de APIs', 'Testes'],
  },
  {
    id: 'domain',
    label: 'Domínio',
    items: ['Fintech', 'Meios de pagamento', 'PIX', 'Sistemas transacionais'],
  },
] as const satisfies readonly SkillGroup[];

export const MARQUEE_GROUP_IDS = [
  'languages',
  'backend',
  'frontend',
  'database',
  'security',
  'infra',
] as const satisfies readonly SkillGroup['id'][];

export const MARQUEE_EXCLUDED_ITEMS = [
  'Lazy loading',
  'Scroll infinito',
  'Paginação',
  'Modelagem relacional',
  'SQL',
  'MobaXterm',
] as const;
