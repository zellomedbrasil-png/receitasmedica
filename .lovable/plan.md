
# Redesign da Página /ebook — Elevação ao Padrão receitas.site

## Diagnóstico do Problema

A página atual `/ebook` possui os seguintes problemas de qualidade em relação ao padrão do site:

**Visual e tokens:**
- Usa cores hardcoded (`bg-gray-100`, `bg-gray-50`, `text-gray-600`) em vez do design system (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`)
- Sombras genéricas e pesadas (`shadow-md`, `shadow-2xl`) em vez de `shadow-sm` elegantes
- `rounded-2xl` em vez de `rounded-3xl` (padrão bento do site)
- Sem borda sutil (`border border-border`) nos cards

**Tipografia:**
- Headline sem `tracking-tighter-custom` (o site usa `tracking-tighter-custom` em todos os títulos grandes)
- Hierarquia de fontes incorreta (`font-extrabold` genérico vs. `font-semibold` refinado)
- Subtítulos sem `font-light` e sem `font-medium` adequados

**Layout e Composição:**
- Hero simples sem o gradiente radial de glow de fundo (assinatura visual do site)
- Cards sem ícones decorativos gigantes e translúcidos no canto (padrão `ComoFunciona`)
- Sem card escuro de destaque (`bg-slate-900`) contrastando no grid (padrão bento)
- CTA Hero sem o badge com pulsing dot animado

**Seções problemáticas específicas:**
- `bg-gray-100` na seção Problema → deve ser `bg-card border-y border-border`
- Mockup do e-book sem decoração de glow radial ao redor
- Seção de oferta com visual "genérico" sem o card escuro bento dark do padrão
- FAQ sem a estética de card refinada

---

## Solução: Redesign Completo de `src/pages/Ebook.tsx`

Reescrever o arquivo inteiro adotando 100% o design system e os padrões visuais do receitas.site.

---

## Seção 1 — Trust Badge

**Antes:** `bg-slate-900` em bloco separado hardcoded
**Depois:** Manter como barra discreta, porém usando tokens: `bg-foreground text-background` (fundo escuro consistente com o design system). Ícone `BadgeCheck` com `text-primary`.

---

## Seção 2 — Hero

**Antes:** 2 colunas simples com `bg-white`, texto hardcoded
**Depois:**
- `relative overflow-hidden` com gradiente radial de glow: `radial-gradient(circle, hsl(var(--emerald)/0.12) 0%, transparent 70%)` posicionado acima e centralizado (exatamente como o Hero principal)
- Badge superior com **pulsing dot animado** (`animate-pulse-dot`) + texto "E-book · Lançamento 2026"
- Headline `text-5xl md:text-6xl font-semibold tracking-tighter-custom` com `text-transparent bg-clip-text` no trecho de destaque
- Mockup do e-book: card `rounded-3xl bg-foreground` com brilho interno, ícone `BookOpen` em `text-primary` e glow radial `bg-primary/20 blur-3xl` atrás
- CTA: `Button` do design system com `size="lg" rounded-full shadow-xl shadow-primary/20`
- Trust icons abaixo (ICP-Brasil / Dados Seguros / Garantia 7 Dias) com `grayscale hover:grayscale-0`

---

## Seção 3 — Problema (Dores)

**Antes:** `bg-gray-100` com 3 cards brancos genéricos
**Depois:**
- Fundo: `bg-card border-y border-border` (padrão `ComoFunciona`)
- Título alinhado à esquerda: `text-3xl font-semibold tracking-tighter-custom` + subtítulo `text-muted-foreground font-light`
- 3 cards `rounded-3xl bg-secondary border border-border hover:border-primary/30` com:
  - Ícone decorativo gigante translúcido no canto inferior direito (`w-[120px] opacity-[0.06] -rotate-12`)
  - Número de item no topo em `font-mono font-bold`
  - Título `font-semibold` + descrição `text-muted-foreground text-sm`
  - 1 card escuro (`bg-slate-900 border-slate-800`) para o ponto de dor mais forte

---

## Seção 4 — Solução (O que você vai descobrir)

**Antes:** Lista plana com `bg-emerald-50` genérico
**Depois:**
- Layout bento: grid `md:grid-cols-2` com 4 cards `rounded-3xl`
- 1 card grande `bg-foreground text-background` com `BookOpen` decorativo gigante e glow `bg-primary/20 blur-3xl`
- 3 cards `bg-secondary border border-border` com ícone `CheckCircle2` em `text-primary`
- Cada card com título curto bold + descrição `text-muted-foreground text-sm`

---

## Seção 5 — Prova Social (Depoimentos)

**Antes:** Cards com avatar `bg-[#1E3A5F]` hardcoded
**Depois:**
- Stats animados no topo (3 números: "500+ Leitores", "R$ 300 Economizados em média", "4.9★ Avaliação") usando `AnimatedNumber` inline
- Cards `bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow` (idêntico ao `ProvaSocial` do site)
- Estrelas com `fill-primary text-primary` (verde esmeralda, não amarelo)
- Avatar com `bg-foreground text-background rounded-full` (consistente com o design system)

---

## Seção 6 — Autoridade do Autor

**Antes:** Layout com `User` icon placeholder, texto genérico
**Depois:**
- Card único `rounded-3xl bg-card border border-border p-8 md:p-12`
- Layout `md:grid-cols-[auto_1fr]`
- Avatar `rounded-3xl bg-foreground` com `User` e glow radial sutil atrás
- Título `font-semibold tracking-tighter-custom`
- Badge curadoria com `bg-secondary border border-border rounded-full`

---

## Seção 7 — Pitch Final / Oferta

**Antes:** `background: linear-gradient(160deg, #1E3A5F ...)` hardcoded
**Depois:**
- Fundo: `bg-foreground` (consistente com o design system dark)
- Card de preço: `bg-white/5 border border-white/10 rounded-3xl` com glow `bg-primary/20 blur-3xl` atrás
- Preço: tipografia `text-6xl font-semibold tracking-tighter-custom text-primary`
- CTA: botão `bg-primary hover:bg-primary/90 text-primary-foreground rounded-full` (usa o design system, não `bg-orange-500` hardcoded)
- Garantia: tag `bg-white/10 border border-white/20 rounded-full`
- Badges de pagamento: mesma estética das trust badges do Hero

---

## Seção 8 — FAQ

**Antes:** `Accordion` em `bg-gray-50` genérico
**Depois:**
- Fundo `bg-background`
- Título `font-semibold tracking-tighter-custom` alinhado à esquerda
- Cada `AccordionItem` em `bg-card border border-border rounded-2xl px-6 shadow-sm`

---

## Seção 9 — Footer

**Antes:** `bg-slate-900` hardcoded
**Depois:**
- `bg-foreground text-background/70` (tokens do design system)
- Mesmo padrão visual do footer do site principal
- Badges de pagamento como chips `bg-white/5 border border-white/10`

---

## Arquivo Alterado

| Arquivo | Ação |
|---|---|
| `src/pages/Ebook.tsx` | Reescrever completamente com o design system |

Nenhum outro arquivo será alterado. O `tailwind.config.ts` e `index.css` já possuem todos os tokens necessários.

---

## Tokens e Padrões Adotados (resumo)

| Padrão | receitas.site | Ebook atual (antes) |
|---|---|---|
| Fundo seções | `bg-background` / `bg-card` | `bg-white` / `bg-gray-100` |
| Bordas | `border border-border` | sem borda ou `border-gray-200` |
| Raio cards | `rounded-3xl` | `rounded-2xl` |
| Tipografia títulos | `font-semibold tracking-tighter-custom` | `font-extrabold` |
| Cores | tokens CSS | hex hardcoded |
| Estrelas | `fill-primary text-primary` | `fill-yellow-400` |
| CTA | `Button` design system | `<a>` com classes manuais |
| Ícone decorativo | gigante translúcido no card | nenhum |
| Glow radial | sim, em background | não |
