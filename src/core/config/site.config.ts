import type { NavItem, SiteConfig } from './site.types';

export const SITE_CONFIG = {
  name: 'Francisco Wanderer da Silva',
  shortName: 'Francisco Wanderer',
  role: 'Desenvolvedor Full Stack Pleno',
  description:
    'Desenvolvedor full stack pleno. APIs em NestJS, interfaces em Angular e React e integrações seguras com bancos e órgãos governamentais.',
  url: 'https://franciscowan.vercel.app',
  locale: 'pt_BR',
  repositoryUrl: 'https://github.com/FranciscoWan',
  contact: {
    email: 'franciscowanderer@hotmail.com',
    phoneDisplay: '(41) 98826-0661',
    whatsappUrl: 'https://wa.me/5541988260661',
    linkedinUrl: 'https://www.linkedin.com/in/franciscowan',
    linkedinHandle: 'in/franciscowan',
    githubUrl: 'https://github.com/FranciscoWan',
    githubHandle: 'FranciscoWan',
  },
} as const satisfies SiteConfig;

export const NAV_ITEMS = [
  { id: 'projeto', label: 'Projeto' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'stack', label: 'Stack' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'contato', label: 'Contato' },
] as const satisfies readonly NavItem[];
