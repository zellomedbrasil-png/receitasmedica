
## Hero: 1 CTA unificado + "Como Funciona" redesenhado

### Diagnóstico atual

O Hero tem dois elementos de ação competindo: o botão principal "Quero renovar minha receita" (CTA) + o anchor "↓ Ver como funciona em 3 passos". O usuário quer consolidar tudo em **1 único elemento de ação** — um CTA que seja ao mesmo tempo a proposta de valor resumida e um convite ao scroll. A seção "Como Funciona" atual tem cards básicos com hover simples e pouca personalidade visual.

---

### Mudança 1 — Hero: 1 único CTA que resume e ancora

Remover o botão do WhatsApp e o anchor separados. Substituir por um **único elemento visual** que faz tudo:

**Conceito:** Um botão-âncora central com micro-copy de proposta de valor + ícone de seta animada para baixo. Ao clicar, faz scroll suave para `#como-funciona`. Sem WhatsApp no hero — a conversão principal acontece nos CTAs das seções abaixo (preços, FAQ, rodapé), onde o usuário já está aquecido.

**Texto do CTA único:**
```
Receita renovada em 3 passos simples  ↓
```

Estilo: botão outline esmeralda sutil (não filled, para não competir com os CTAs de conversão abaixo), com a seta animada em bounce. Passa a mensagem de "o que fazemos" + convida ao scroll sem pressionar a compra imediata.

Alternativamente, formato de pill/badge animado clicável em vez de botão — ainda mais sutil:
```
[ ↓  Veja como funciona em 3 passos ]
```
Com borda esmeralda pulsando levemente via keyframe, sem fill.

---

### Mudança 2 — "Como Funciona" redesenhado: layout horizontal com linha de progresso

**Layout atual:** 3 cards empilhados em grid 3 colunas simples com hover `-translate-y-1`.

**Layout novo — Timeline visual horizontal:**

```text
[  01 ]──────────[  02 ]──────────[  03 ]
Triagem         Teleconsulta      Receita
Digital          Médica          WhatsApp
[ícone]          [ícone]          [ícone]
desc...          desc...          desc...
```

- Uma **linha conectora** entre os 3 passos no desktop (hr esmeralda com gradiente fade nas pontas)
- Cada card tem um **número grande** no canto superior como watermark (`text-8xl opacity-5`) sombreando o fundo do card para textura
- **Estado hover melhorado:** o card ativo eleva-se + emite uma glow esmeralda sutil (`box-shadow`) + a borda fica esmeralda
- **Card 03 destacado:** mantém o glow de fundo + badge "Entrega imediata" pulsando, mas também ganha uma micro-animação no ícone (rotate no `MessageCircle` ao hover)
- **Eyebrow da seção:** mais criativo — de "Processo" para `"Do celular à farmácia"` (descreve a jornada do usuário)
- **H2 da seção:** de "Como funciona em 3 passos." para `"Simples assim."` — mais impactante, confiante

Em mobile: empilha verticalmente com uma linha vertical conectora à esquerda (border-left esmeralda de 2px conectando os 3 números).

---

### Resumo técnico

**Arquivo:** `src/pages/IndexV2.tsx`

| Área | Linhas aprox. | Mudança |
|---|---|---|
| Hero — bloco de CTAs | 544–580 | Substituir botão WA + anchor por 1 único CTA-âncora outline animado |
| Como Funciona — eyebrow | 627–631 | "Processo" → "Do celular à farmácia" |
| Como Funciona — H2 | 633–639 | "Como funciona em 3 passos." → "Simples assim." |
| Como Funciona — grid | 650–715 | Adicionar linha conectora + número watermark + glow hover nos cards |
| steps data | 121–140 | Enriquecer `desc` de cada passo com detalhe mais humano |

Nenhum componente novo importado — reutiliza `motion` (já importado) para as animações dos cards e da seta.
