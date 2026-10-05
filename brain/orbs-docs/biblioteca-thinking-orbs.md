---
title: Biblioteca thinking-orbs
category: service
status: stable
updated: 2026-10-05
parent: "[[orbs-docs/orbs-docs_index]]"
tags:
  - service
  - features
  - thinking-orbs
  - stable
---

# Biblioteca thinking-orbs

## Contexto
Indicador animado de "IA pensando": pontos sobre uma esfera, desenhados em canvas 2D. Adotada em 2026-10-05 como avatar do hero. Tudo abaixo vale para a versão **0.3.2** e foi conferido no código publicado no npm (`node_modules/thinking-orbs/dist`), não só no README.

| Item | Valor |
|---|---|
| Pacote | `thinking-orbs@0.3.2`, licença MIT |
| Autor | Jakub Antalik — `github.com/Jakubantalik/Libraries.dev`, pasta `packages/thinking-orbs` |
| Docs | `https://libraries.dev/orbs` |
| Dependências | nenhuma em runtime; peer `react >= 18` |
| Segurança | sem scripts de instalação; nenhum `fetch`, `eval`, `WebSocket`, `localStorage` ou cookie no `dist` |

## Conteúdo principal

### Pontos de entrada
| Import | O que exporta |
|---|---|
| `thinking-orbs` | componente React `ThinkingOrb` e helpers: `resolvePreset`, `MODE_FRAMES`, `MODE_DRAWS`, `scaleCounts`, `scaleRadii`, `countDots` e a API de gravity |
| `thinking-orbs/engine` | geometria pura e pintor, sem React: `MODE_FRAMES`, `MODE_DRAWS`, `STATE_TO_MODE`, `resolvePreset`, `paintFrame`, `paint`, `paintLines`, `finalizeFrame`, `radiusScale`, `makeProj` e os tipos `OrbState`, `OrbSize`, `Resolved`, `ModeOpts`, `OrbFrame` |

Ficam fora do mapa de `exports` (existem no `dist`, mas não podem ser importados): `BASE_PROFILES`, `PRESETS`, `useResolvedDark`, `useReducedMotion`.

### Props do componente `ThinkingOrb`
| Prop | Padrão | O que faz |
|---|---|---|
| `state` | `'working'` | qual das 9 animações (tabela abaixo) |
| `size` | `64` | tamanho em px CSS; só aceita `64`, `32` ou `20` |
| `theme` | `'auto'` | `'auto'`, `'dark'` (pontos claros, para fundo escuro) ou `'light'` |
| `speed` | `1` | multiplica a velocidade do preset |
| `paused` | `false` | congela no frame atual |
| `color` | — | tinta dos pontos; aceita só `#rgb`, `#rrggbb` ou `rgb()` |
| `dots` | `1` | multiplica a densidade de pontos (mínimo 0,1) |
| `dotSize` | `1` | multiplica o raio dos pontos |
| `opts` | — | parâmetros crus da engine, aplicados por cima do preset |
| `frame` | — | substitui a geometria do estado: `(size, t, opts) => OrbFrame` |
| `gravity` | — | o orb "puxa" o cursor; exige o sprite do cursor (`setGravitySprite`) |

As demais props de `<canvas>` (`className`, `data-*`, `aria-label`) são repassadas. O `style` é mesclado ao `style` inline que a própria biblioteca aplica (`width`, `height`, `display: block`).

### Estados
| Estado | Modo interno | Animação | `aria-label` padrão |
|---|---|---|---|
| `working` | `orbits` | partículas em órbitas inclinadas | Working… |
| `searching` | `globe` | meridiano de varredura sobre um globo pontilhado | Searching… |
| `solving` | `rubik` | faixas embaralham e voltam ao lugar | Solving… |
| `listening` | `wave` | onda percorrendo os anéis | Listening… |
| `connecting` | `web` | constelação que se conecta | Connecting… |
| `weaving` | `braid` | três fios trançados em volta da esfera | Weaving… |
| `composing` | `ribbon` | faixa ondulante com várias bandas | Composing… |
| `breathing` | `ring` | anel de frente, mudando de forma devagar | Thinking… |
| `shaping` | `morph` | contorno pontilhado: círculo → triângulo → quadrado | Shaping… |

### Como funciona por dentro
1. `resolvePreset(state, size)` troca o estado pelo modo (`STATE_TO_MODE`) e lê `PRESETS[mode][size]`, que traz `{ speed, count, size, extra }`. `count` e `size` multiplicam a quantidade e o raio dos pontos do perfil base do modo (`BASE_PROFILES`), ajustado para um quadro de 300px. Os presets pequenos reduzem a densidade: o `ribbon` (composing) em 64px usa 25% dos pontos do perfil base. O resultado fica em cache por `state-size`.
2. `MODE_FRAMES[mode](size, t, opts)` gera a geometria do instante, só com matemática e sem canvas. Tudo é proporcional a `size`: o centro é `size / 2`, o raio da esfera é uma fração de `size` e o raio dos pontos é multiplicado por `(size / 300) ^ 0,6` (`radiusScale`, com `rsPow` padrão 0,6).
3. `paintFrame(ctx, frame, dark, tint?)` pinta as linhas primeiro e depois os pontos, do mais distante ao mais próximo. `dark` inverte a tinta.
4. O componente ajusta o buffer do canvas para `size × DPR`, com DPR limitado a 2. O loop usa `requestAnimationFrame` e pausa fora da tela (`IntersectionObserver`) ou com a aba oculta (`visibilitychange`). Com `prefers-reduced-motion`, desenha um frame fixo em `t = 0,6`.

### Tema
- `auto`: segundo a documentação dos tipos, procura um ancestral com `data-theme="dark|light"` ou classe `dark`/`light` (observado via `MutationObserver`); se não houver, usa `prefers-color-scheme`.
- A tinta é monocromática. `color` não aceita `oklch()`, o formato dos tokens deste projeto.

### SSR e Next.js
- O `dist` não tem `'use client'` e usa `useState`, `useEffect` e `useRef`. No App Router, só pode ser importado a partir de um Client Component.
- No servidor, renderiza um `<canvas>` vazio já no tamanho certo; a pintura acontece só no client.

### Divergências do prompt do libraries.dev
O prompt de instalação do site, usado para começar a integração, não bate com a 0.3.2:
- cita `dark: boolean`, que **não existe**; a prop é `theme: 'auto' | 'dark' | 'light'`;
- cita os tamanhos 64 e 20, mas também existe `32`, interpolado entre os dois e, segundo comentário da própria biblioteca, sem ajuste próprio.

### Limites
- **`size` só aceita 64, 32 ou 20.** `resolvePreset` lê `PRESETS[mode][size]`; com outro valor, o preset é `undefined` e a leitura de `preset.count` lança `TypeError`, derrubando o componente. O TypeScript já barra antes, porque `OrbSize = 64 | 32 | 20`.
- Ampliar o orb via CSS não resolve: o buffer do canvas continua com `size × DPR` pixels e a imagem fica borrada.

## Decisões / Soluções
O projeto não usa o componente `ThinkingOrb` da biblioteca, só a engine, por causa do limite de `size`. O porquê e as alternativas descartadas estão em [[orbs-docs/tamanho-customizado]]; a montagem atual está em [[orbs-docs/integracao-no-projeto]].

## Verificação
Verificado:
- metadados do pacote via `npm view`;
- tipos (`*.d.ts`) e implementação (`index.es.js`, `index-B8WsUNf5.js`) lidos no `dist`;
- busca no `dist` por chamadas de rede, `eval` e acesso a storage, sem nenhuma ocorrência.

Não verificado:
- o `TypeError` com outros valores de `size` foi deduzido do código, sem executar;
- `gravity`, `color`, `frame` e `opts` não foram testados;
- o preset de 32px não foi conferido visualmente;
- a afirmação do README de que o resultado é idêntico no Chrome, Safari e Firefox.

## Relacionados
- [[orbs-docs/orbs-docs_index]] — índice de orbs
- [[orbs-docs/tamanho-customizado]] — como contornar o limite de `size`
- [[orbs-docs/integracao-no-projeto]] — como o projeto usa a engine
