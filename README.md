# Portfólio — Francisco Wanderer

Landing page institucional em Next.js 16 (App Router, export estático) e Tailwind CSS v4.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera o site estático em out/
```

## Decisões

- **Server Components por padrão.** Apenas três componentes rodam no navegador: a navegação (seção ativa e menu mobile), a simulação do hero e o botão de copiar e-mail.
- **Conteúdo como dado tipado.** Cada feature guarda seu conteúdo em `data/`, com tipos em `types/`. Trocar um texto não exige mexer em componente.
- **Features isoladas.** Uma feature só importa de `shared/` e `core/`, nunca de outra feature, e expõe apenas o que está no seu `index.ts`.
- **Tema com tokens semânticos.** Cores, fontes e escalas ficam no `@theme` de `src/styles/globals.css`. Componentes usam `bg-primary`, `text-muted` etc., nunca a paleta padrão.
- **Movimento contido.** Uma única sequência animada (a simulação PIX no hero) e o letreiro de tecnologias, ambos desligados com `prefers-reduced-motion`.

## Estrutura

```
src/
├── app/          # Rotas, layout, metadata, erros
├── features/     # hero, projects, experience, skills, profile, contact
├── shared/       # UI reutilizável, hooks e utilitários
├── core/         # Configuração do site e logger
├── layout/       # Header e footer
└── styles/       # Tema
```

As diretrizes completas do projeto estão em `CLAUDE.md`.
