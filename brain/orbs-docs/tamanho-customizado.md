---
title: Tamanho customizado
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

# Tamanho customizado

## Contexto
Em 2026-10-05 o orb do hero precisou passar de 64px para **200px** e, no mesmo dia, ficou responsivo: **150px no celular e 400px no desktop** (a partir de 1024px, breakpoint `lg`). Até então o projeto usava o componente `ThinkingOrb` da biblioteca, envolvido num wrapper com `next/dynamic` e um mapa de classes (`64 → size-16`, `32 → size-8`, `20 → size-5`). A biblioteca só tem presets para 64, 32 e 20 (ver [[orbs-docs/biblioteca-thinking-orbs]]); qualquer outro `size`, como 200, derruba o componente.

## Conteúdo principal

### Alternativas avaliadas
As quatro primeiras foram descartadas pela leitura do código da biblioteca, sem chegar a ser implementadas.

| Alternativa | Resultado | Por que foi descartada |
|---|---|---|
| `size={200}` no componente | `TypeError` em `resolvePreset` e erro de tipo | não existe preset 200 |
| Desenhar em 64 e ampliar com CSS (`style`, `transform: scale`) | orb borrado | o buffer continua com `64 × DPR` pixels (no máximo 128) esticados para 200px; além disso, o `CLAUDE.md` proíbe `style={}` inline |
| Prop `frame` (geometria própria) com `size={64}` | desenho cortado | o tamanho do canvas e o `clearRect` ficam presos a `size`; geometria de 200px sai da área |
| Fork ou cópia do componente para o projeto | viável | código de terceiros para manter, divergindo da versão publicada |
| **Engine pública (`thinking-orbs/engine`) com canvas próprio** | **adotada** | a geometria já recebe o tamanho como parâmetro, então qualquer tamanho sai nítido |

### Como ficou
1. **O tamanho vem do CSS, não de prop.** O canvas ocupa 100% do `<span>` do componente (`block size-full`) e se mede com `ResizeObserver`. Quem usa o componente define o tamanho com uma classe Tailwind (`size-N` = N × 0,25rem, ou seja, N × 4px com fonte raiz de 16px). No hero: `className="size-37.5 lg:size-100"`, que dá 150px até 1023px e 400px a partir de 1024px. Como o canvas se mede sozinho, trocar de tamanho por breakpoint não exige código extra.
2. **Resolução nativa.** O buffer do canvas é `tamanho × DPR`, com DPR limitado a 2 como na biblioteca. A geometria é gerada no tamanho medido: `MODE_FRAMES[mode](tamanho, t, opts)`.
3. **Escolha do preset.** Até 64px vale o preset mais próximo (`< 26` → 20, `< 45` → 32, senão 64). Acima de 64px vale o preset de 64 com mais pontos (item 4).
4. **A densidade cresce com o tamanho.** Acima de 64px, `densidade = (tamanho / 64) ^ 0,6`, aplicada com o `scaleCounts` da biblioteca. Isso dá ≈ 1,67× em 150px, ≈ 1,98× em 200px e ≈ 3,0× em 400px. O raio dos pontos fica com a escala da própria biblioteca.

### Por que a densidade precisou mudar
Com o preset de 64 desenhado em 200px, a esfera fica 3,1× maior e a quantidade de pontos continua a mesma, então o orb fica ralo: `connecting` parecia quebrado, e `solving`, `weaving` e `shaping` ficavam com buracos grandes. Comparação feita com os 9 estados em 200px, nos temas claro e escuro:

| Variante | Resultado |
|---|---|
| preset 64 sem ajuste | nítido, mas ralo |
| preset 64 com densidade ×2 | densidade visual equivalente à do orb original de 64px — **escolhida** |
| densidade ×2 e raio ×0,8 | parecida, com pontos mais finos |

O expoente 0,6 é o mesmo que a biblioteca usa na escala do raio dos pontos (`(tamanho / 300) ^ 0,6`). Ele reproduz o ×2 em 200px e serve para qualquer tamanho acima de 64 sem ajuste por estado. A constante é `DENSITY_GROWTH`, em `src/shared/hooks/use-thinking-orb.ts`.

A regra foi revalidada com os 9 estados em 150px e 400px. O `composing`, estado do hero, fica bom nos dois tamanhos. Em 400px o `shaping` fica com os pontos encostados, como uma corrente grossa: num contorno, a regra exagera a densidade. Isso não afeta o hero; se esse estado for usado em tamanho grande, vale reduzir a densidade só para ele.

### Ajustes no hero
- `src/features/hero/components/hero-avatar.tsx` usa `<ThinkingOrb state="composing" className="size-37.5 lg:size-100" />`.
- O anel em volta é definido por padding (`p-5`, 20px de folga), não por tamanho fixo, e acompanha o orb em qualquer breakpoint. Antes era `size-24` (96px) com o orb de 64px e depois `size-60` (240px) com o de 200px.
- O anel tem `w-fit`: no celular o hero é `flex-col`, que estica os filhos na largura toda, e sem `w-fit` o anel virava uma pílula.
- Entre 768px e 1023px (tablet) o orb fica com 150px, já no layout em linha. O container do hero (`max-w-4xl`) não mudou: em 1024px e 1280px o texto cabe ao lado do orb de 400px.
- O tamanho é o da **caixa** do canvas, como no `size` da biblioteca. No `composing`, a esfera visível ocupa cerca de 80% dela: ≈ 120px em 150px e ≈ 320px em 400px, medidos nos screenshots.

## Decisões / Soluções
- **Todos os tamanhos passam pela engine.** O componente React da biblioteca deixou de ser usado, inclusive em 64, 32 e 20. Fica uma API só (tamanho por classe) e um código só para manter.
- **O que se perdeu, ainda não reimplementado:**
  - a detecção de tema por ancestral (`.dark` ou `data-theme`): o orb segue só `prefers-color-scheme`, que é o mecanismo de dark mode do site hoje;
  - as props `color`, `dots`, `dotSize`, `opts`, `frame`, `gravity` e `paused`;
  - os `aria-label` padrão em inglês: sem `aria-label`, o orb fica `aria-hidden` (decorativo).
- **Tamanho medido, em vez de prop numérica.** Uma prop `size` exigiria `style={{ width }}`, que o `CLAUDE.md` proíbe, ou um mapa fechado de classes. Medindo o elemento, o CSS é a única fonte do tamanho, e tamanhos responsivos funcionam sem código extra.
- **Anel por padding, não por tamanho fixo.** Com `p-5`, a classe do orb é a única fonte do tamanho no hero. Antes, mudar o orb exigia mudar o anel junto.

## Verificação
Verificado:
- `npm run lint` e `npm run build` (TypeScript + export estático) sem erros; `size-37.5` e `lg:size-100` estão no CSS de produção;
- screenshots do `npm run dev` em Chrome headless. Com 200px: 1280×800 nos temas claro e escuro. Com 150/400px: 768×1024, 1024×768, 1280×800 e 1440×900 (escuro);
- celular: as capturas feitas como "390×844" na verdade saíram com layout de 504px, porque o Chrome headless não abre janela mais estreita que isso, e foram apenas recortadas. O layout real de 390px foi conferido depois carregando a página num iframe de 390px (tema claro, orb de 150px);
- páginas de teste com os 9 estados em frame estático (t = 3 s): em 200px, 4 variantes nos dois temas; em 150px e 400px, a regra final no tema claro.

Não verificado:
- Safari, Firefox e aparelhos reais;
- tema escuro em 390px reais;
- tamanhos fora de 150, 200 e 400px pelo novo caminho, incluindo 20, 32 e 64;
- o caminho de `prefers-reduced-motion` (frame estático);
- troca de DPR com o componente montado (por exemplo, ao arrastar a janela para outro monitor): o DPR é lido uma vez por execução do efeito, e o `ResizeObserver` não dispara nesse caso;
- o custo de CPU do canvas de 400px a 60fps (com DPR 2, o buffer chega a 800×800 pixels).

## Relacionados
- [[orbs-docs/orbs-docs_index]] — índice de orbs
- [[orbs-docs/biblioteca-thinking-orbs]] — o limite de `size` e como a engine funciona
- [[orbs-docs/integracao-no-projeto]] — a arquitetura atual e onde alterar cada configuração
