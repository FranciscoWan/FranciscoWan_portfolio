import type { ProfileTrait } from '../types/profile.types';

export const PROFILE_SUMMARY =
  'Trabalho com TypeScript, Node.js/NestJS e Angular na construção e sustentação de APIs REST e sistemas transacionais ligados a meios de pagamento. Gosto de entender o negócio por trás do código e de cuidar do que construo até ele estar rodando em produção.';

export const PROFILE_TRAITS = [
  { id: 'ownership', text: 'Senso de dono sobre o que construo, do código à operação.' },
  { id: 'autonomy', text: 'Autonomia para propor soluções e tomar decisões técnicas.' },
  { id: 'hands-on', text: 'Mão na massa, com baixa dependência e alta responsabilidade.' },
  { id: 'complexity', text: 'Gosto de resolver problemas complexos em sistemas críticos.' },
  { id: 'business', text: 'Interesse pelo negócio, não apenas pelo código.' },
  { id: 'growth', text: 'Encaro desafios como oportunidade de crescimento.' },
] as const satisfies readonly ProfileTrait[];
