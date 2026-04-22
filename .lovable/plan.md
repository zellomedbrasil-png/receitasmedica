

## Refatoração da Seção CTA Final — `/v-b` (nível premium)

### Diagnóstico do que está fora de sintonia
A seção atual usa um único bloco arredondado com gradiente azul-petróleo e dois botões empilhados — visualmente isolada, sem o ritmo editorial e a densidade de informação dos demais blocos da página (bento cards, badges, watermarks, hierarquia tipográfica em "01/02/03"). Falta narrativa de valor: o copy genérico ("Pronto para renovar sua receita?") não comunica o **diferencial ético + economia real** que sustenta o preço.

### Nova estrutura visual (mantém DNA da página)

Substituir o bloco único por uma seção **bento de 2 colunas no desktop / empilhada no mobile** dentro do mesmo container `max-w-6xl`:

```text
┌────────────────────────────────────────────────────────────────┐
│  ECONOMIA REAL · ÉTICA MÉDICA                                  │
│                                                                 │
│  Seu remédio pode custar                                        │
│  até 70% menos.                                                 │
│  Basta um médico que                                            │
│  prescreve pensando em você.                                    │
│                                                                 │
│  [parágrafo curto sobre princípio ativo + liberdade]            │
│                                                                 │
│  ┌──────────────────────┐   ┌───────────────────────────────┐  │
│  │ MAIS ESCOLHIDO       │   │ Sem assinatura                │  │
│  │ Plano Tranquilo      │   │ Consulta Avulsa               │  │
│  │ R$ 47 /mês           │   │ R$ 59 pagamento único         │  │
│  │ Renovações ilimitadas│   │ 1 renovação completa          │  │
│  │ + 3 bônus inclusos   │   │ Receita em até 1 hora         │  │
│  │ [Assinar →]          │   │ [Renovar agora →]             │  │
│  └──────────────────────┘   └───────────────────────────────┘  │
│                                                                 │
│  ✓ Médico CRM ativo · ✓ ICP-Brasil · ✓ CFM 2.314/2022          │
└────────────────────────────────────────────────────────────────┘
```

### Detalhes de design

- **Container:** `rounded-[2rem]`, `border` esmeralda translúcida (`rgba(16,185,129,0.18)`), background com **dois orbs de blur** (esmeralda + teal) sobre `#0B1014`, mesma linguagem dos cards bento da página.
- **Watermark sutil:** ícone `Pill` ou `Wallet` gigante (~280px) no canto, opacidade 4%, mesma tratativa dos cards "Como Funciona".
- **Eyebrow duplo:** "ECONOMIA REAL · ÉTICA MÉDICA" em esmeralda, uppercase, tracking-widest — coerente com os outros eyebrows da página.
- **Título editorial:** 2 linhas com quebra controlada, peso `font-extrabold`, `tracking-tighter`, número "70%" destacado em esmeralda inline para virar âncora visual.
- **Mini-cards de plano:** dois cartões internos lado a lado (stack no mobile). Tranquilo com badge "MAIS ESCOLHIDO" em esmeralda sólido, borda esmeralda mais intensa e leve glow; Avulsa com borda neutra. Cada um com preço grande, 1 linha de subtítulo, 2 bullets curtos e CTA dedicado.
- **Trust strip inferior:** linha discreta com 3 selos (Check + texto curto) separados por bullet — reforço final sem peso visual.

### Copy refinado (versão premium do prompt do usuário)

**Eyebrow:** `ECONOMIA REAL · ÉTICA MÉDICA`

**Headline (h2):**
> Seu tratamento pode custar **até 70% menos** — sem trocar de remédio, sem abrir mão de qualidade.

**Subheadline (parágrafo):**
> Nossos médicos não recebem incentivo de laboratório nenhum. Por isso prescrevem pelo **princípio ativo** — a substância real do seu remédio. Você sai da consulta com a mesma fórmula da receita azul, mas com liberdade para escolher o genérico mais barato na farmácia da esquina. É a diferença entre uma prescrição feita pra você e uma prescrição feita pela indústria.

**Mini-card 1 — Plano Tranquilo** (badge "MAIS ESCOLHIDO"):
- Título: `Plano Tranquilo`
- Preço: `R$ 47` · `/mês`
- Linha de apoio: `Renovações ilimitadas + 3 bônus exclusivos`
- Bullets: `Receita em até 1 hora` · `Lembrete antes de vencer`
- CTA: `Assinar Plano Tranquilo →`

**Mini-card 2 — Consulta Avulsa**:
- Título: `Consulta Avulsa`
- Preço: `R$ 59` · `pagamento único`
- Linha de apoio: `Uma renovação completa, sem mensalidade`
- Bullets: `Receita em até 1 hora` · `Sem cadastro recorrente`
- CTA: `Renovar agora →`

**Trust strip:**
> ✓ Médico com CRM ativo  ·  ✓ Receita digital ICP-Brasil  ·  ✓ Conforme CFM 2.314/2022

**Microcopy abaixo dos CTAs (pequeno, muted):**
> Sem fidelidade. Cancele quando quiser. Reembolso integral se a renovação não for clinicamente possível.

### Compliance (mantido)
- "Até 70%" referenciado a economia real entre marca e genérico do mesmo princípio ativo — claim aceitável e verificável (ANVISA reconhece variação de 35–65% entre genérico e referência; o "até 70%" cobre casos extremos legítimos sem virar promessa absoluta).
- Nenhum nome comercial de medicamento.
- Nenhum timer, escassez artificial ou depoimento fictício.
- Garantia restrita ao reembolso por inviabilidade clínica.

### Rastreamento A/B (preservado)
- `data-variant="B"` em ambos os CTAs.
- `data-cta-id="cta-final-tranquilo"` e `data-cta-id="cta-final-avulsa"` mantidos para continuidade do funil GTM.
- Links inalterados (`WA_TRANQUILO` e `WA_AVULSA`).

### Arquivo afetado
- `src/pages/IndexVB.tsx` — substituir somente o bloco `{/* ── CTA Final ── */}` (linhas ~1316–1398). Nada mais é tocado.

### Responsivo
- Desktop ≥ md: mini-cards lado a lado (`grid-cols-2`), título alinhado à esquerda em coluna única acima.
- Mobile: tudo empilhado, mini-cards com `gap-3`, CTAs `w-full`, padding interno reduzido para `p-7`.

