

## Refinar Hero da `/v-b` — gatilho de economia no primeiro bloco

### Objetivo
Fazer o visitante entender, em 3 segundos no primeiro bloco, que renovar aqui **economiza dinheiro** (não só tempo). Hoje o Hero vende conveniência. Vamos somar **economia real** como segundo eixo de valor — sem inflar o headline e sem quebrar a estética minimalista atual.

### O que muda (cirúrgico — só o Hero)

**1. Headline (mantém, refinado)**
Mantém a linha atual "Renove sua receita médica sem sair de casa." — já é forte e está alinhada com a versão A. Não mexer.

**2. Subheadline (reescrito — aqui mora o no-brainer)**
Substituir o parágrafo genérico atual por uma frase que ancora **economia + ética** já no primeiro bloco:

> Médico com CRM ativo prescreve pelo **princípio ativo** — você sai com a mesma fórmula, mas livre para comprar o genérico **até 70% mais barato** na farmácia. Receita digital ICP-Brasil, válida em todo o Brasil.

Por que funciona: entrega benefício tangível (70% mais barato), justifica com mecanismo crível (princípio ativo), e mantém os selos de credibilidade (CRM, ICP-Brasil) na mesma frase. Sem promessa absoluta — "até 70%" é claim defensável.

**3. Strip de valor abaixo do CTA (NOVO — antes do "desde 2024")**
Adicionar uma linha enxuta de 3 micro-benefícios em pílulas finas, separadas por bullet, em esmeralda muted. Isso cria o efeito "no-brainer" sem peso visual:

```
✓ Receita em até 1h   ·   ✓ Economia de até 70% no remédio   ·   ✓ Sem trocar de farmácia
```

Estilo: texto pequeno (`text-xs`), ícone Check em esmeralda, espaçamento generoso, alinhado ao centro, abaixo do par de CTAs e acima do "Receitas renovadas com segurança e ética desde 2024".

**4. O resto do Hero permanece intocado**
- Badge superior ("Receita digital em até 1 hora · CFM 2.314/2022") — mantém
- Par de CTAs (Renovar Minha Receita / Ver como funciona) — mantém
- Linha "Receitas renovadas com segurança e ética desde 2024." — mantém
- Pílulas de selos (ICP-Brasil, CRM Ativo, LGPD, etc) — mantém

### Compliance (revisado)
- "Até 70% mais barato" → claim defensável, ANVISA reconhece variação de 35–65% entre referência e genérico do mesmo princípio ativo; o "até" cobre o teto sem virar promessa absoluta.
- Sem nome comercial de medicamento.
- Sem promessa de resultado clínico, sem urgência artificial.
- Mantém a coerência com o bloco CTA Final (que também usa "até 70%") — narrativa consistente do topo ao fundo.

### Rastreamento
- Nada muda: `data-variant="B"` e `data-cta-id="hero-primary"` / `hero-secondary` permanecem.

### Arquivo afetado
- `src/pages/IndexVB.tsx` — substituir apenas o `<p>` do subheadline (linhas ~478–484) e inserir o novo strip de valor entre o bloco de CTAs (linha ~522) e o `<p>` "Receitas renovadas..." (linha ~525). Nada mais é tocado.

### Responsivo
- Strip de valor: `flex flex-wrap justify-center gap-x-4 gap-y-2` — desktop em linha única com bullets, mobile quebra em 2–3 linhas mantendo legibilidade.
- Subheadline: largura `max-w-2xl` mantida, `leading-relaxed` mantido, "70%" em **bold branco** dentro do parágrafo muted para virar âncora visual sem precisar de cor extra.

