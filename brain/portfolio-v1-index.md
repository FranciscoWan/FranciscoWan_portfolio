---
title: Portfolio v1 — Índice do Vault
category: product
status: stable
updated: 2026-10-05
tags:
  - product
  - index
  - stable
---

# Portfolio v1 — Índice do Vault

## Contexto
Portfólio pessoal em Next.js publicado como site estático, sem servidor Node em produção. Hoje tem só a seção hero, com um orb animado da biblioteca `thinking-orbs` como avatar. Os textos ainda são placeholders em `src/core/config/site.config.ts`. As regras de código estão em `.claude/CLAUDE.md`.

## Stack
| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.3.8 (App Router, Turbopack, React Compiler) |
| UI | React 19.2.8 |
| Estilos | Tailwind CSS v4, tokens em `src/styles/globals.css` |
| Linguagem | TypeScript strict |
| Build | export estático (`output: 'export'`) gerando `out/` |
| Qualidade | ESLint 9 (flat config) + Prettier com `prettier-plugin-tailwindcss` |
| Animação | `thinking-orbs` 0.3.2 |

## Seções do vault
- [[orbs-docs/orbs-docs_index]] — orb animado do hero: biblioteca, integração e tamanho customizado

## Relacionados
- (raiz — sem pai)
