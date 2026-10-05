import type { Experience } from '../types/experience.types';

export const EXPERIENCES = [
  {
    company: 'ViaTech',
    period: '2026 – atual',
    position: 'Desenvolvedor Full Stack',
    stages: [
      {
        id: 'junior',
        role: 'Desenvolvedor Júnior',
        description: 'Entrada no time, construindo e sustentando APIs e telas do produto.',
      },
      {
        id: 'pleno',
        role: 'Desenvolvedor Pleno',
        description:
          'Efetivado após reconhecimento da entrega técnica, com mais responsabilidade sobre arquitetura e decisões dos projetos.',
      },
    ],
    responsibilities: [
      'APIs REST em NestJS e TypeScript sobre PostgreSQL',
      'Front-end de gestão em Angular',
      'Integrações com Banco do Brasil e SEFAZ',
      'Comunicação segura entre sistemas com mTLS e certificado A1',
      'Mensageria assíncrona com RabbitMQ',
      'Participação nas decisões de arquitetura',
    ],
  },
  {
    company: 'Infinity School',
    period: '2025',
    position: 'Ensino de programação',
    stages: [
      {
        id: 'monitor',
        role: 'Monitor',
        period: 'jan. – ago. 2025',
        description:
          'Aulas particulares e de reposição para os alunos, além de apoio ao professor em sala de aula.',
      },
      {
        id: 'professor',
        role: 'Professor',
        period: 'ago. – out. 2025',
        description: 'Criação de conteúdo e aulas de programação para os alunos da instituição.',
      },
      {
        id: 'instrutor-lider',
        role: 'Instrutor líder',
        period: 'set. – out. 2025',
        description:
          'Organização da equipe de monitores, treinamentos e apoio à instituição nos desafios do setor acadêmico.',
      },
    ],
  },
] as const satisfies readonly Experience[];
