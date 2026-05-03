
## Objetivo

Criar a rota `/funil` com um funil de conversão de **10 etapas** (eligibilidade → laudo → pagamento), inspirado no HTML enviado, mas com a **mesma identidade visual do `/fralda`** (dark `#070B12`, accent `sky-400`, tipografia atual, glass cards). Sem usar a paleta creme/verde-musgo do HTML original.

## Arquitetura

**Novos arquivos:**
- `src/pages/Funil.tsx` — página única, autocontida, com state machine local.
- Rota adicionada em `src/App.tsx`: `<Route path="/funil" element={<Funil />} />`.

**Sem dependências novas.** Reaproveita: `Button`, `Input`, `Progress`, `ScrollReveal`, ícones lucide.

## Estrutura da página

```text
┌──────────────────────────────────────────────┐
│ Editorial band (atendimento online · 24h)    │
├──────────────────────────────────────────────┤
│ Header (logo Shield+Plus · CRM/CE)           │
├──────────────────────────────────────────────┤
│ Progress: "Etapa 03 / 10" · barra · 30%      │
├──────────────────────────────────────────────┤
│ Card glass (uma etapa visível por vez)       │
│  - eyebrow                                   │
│  - título com <em> em sky-400                │
│  - descrição                                 │
│  - opções / inputs / resumo                  │
│  - botões primário + voltar                  │
├──────────────────────────────────────────────┤
│ Trust pills + assinatura                     │
└──────────────────────────────────────────────┘
```

## State machine

```ts
type State = {
  step: 1..10;
  paraQuem, idade, condicao, gastoAtual: string;
  tamanho: 'P' | 'M' | 'G' | 'EG';
  freq: '3-5' | '6-8' | '8+' | 'nao-sei';
  nome, cpf, whatsapp: string;
  economiaAnual: number;  // derivado da freq
};
```

Avança automático em etapas com opções (380ms delay), manual nas etapas 5, 8, 9. Botão "Voltar" em todas exceto a 1.

## Conteúdo das 10 etapas

1. **Elegibilidade** — Para quem? (mãe/pai · avós · familiar · eu)
2. **Idade** — 60–70 · 71–80 · 80+ · <60 PCD
3. **Condição** — Incontinência urinária / fecal / mista / acamado (com nota Portaria 3.073/2024)
4. **Gasto atual** — >R$300/mês · economiza · ainda não · outro meio
5. **Bloco educacional** — card explicando: fralda 100% gratuita, paga-se a consulta médica, sem laudo a Farmácia Popular não libera. Comparativo Hoje (R$ 450/mês) → Depois (R$ 0/mês). CTA "Entendi · quero meu laudo".
6. **Tamanho** — P/M/G/EG com referências de cintura+peso
7. **Frequência** — 3–5 (noite) · 6–8 (dia) · 8+ (acamado) · não sei. Define `economiaAnual` (3600/4800/6000/4800).
8. **Nome + CPF** — inputs com máscara + validação CPF (algoritmo dos dígitos verificadores). Botão habilita só com nome ≥ 2 palavras + CPF válido.
9. **WhatsApp** — input com máscara `(00) 00000-0000`. Habilita com ≥10 dígitos.
10. **Resumo + pagamento** — checkmark de sucesso, resumo do pedido (paciente, CPF, tamanho, frequência, WA, prazo 24h), bloco "Economia anual estimada" R$ X, disclaimer (paga-se laudo, fralda gratuita), card de pagamento Mercado Pago (R$ 49) + CTA WhatsApp para enviar comprovante.

## Decisões de conteúdo (mantém compliance do /fralda)

- **Preço do laudo: R$ 49** (consistente com a memory do projeto e o /fralda atual — *não* R$ 97 do HTML enviado).
- **Disclaimer obrigatório** no step 5 e step 10: "Você paga apenas pela consulta médica e emissão do laudo. As fraldas continuam 100% gratuitas pela Farmácia Popular."
- Referência à **Portaria GM/MS 3.073/2024** e **Resolução CFM 2.314/2022** no rodapé/legal.
- Sem nome de responsável técnico exposto (alinhado à decisão prévia do `/fralda`).
- WhatsApp: o mesmo número já usado no projeto (`5585991275429`).

## Design tokens (reutiliza os do `/fralda`)

```ts
BG = "bg-[#070B12]"
SURFACE = "bg-white/[0.03] border border-white/[0.07]"
ACCENT = "text-sky-400" / "bg-sky-500"
SOFT_GRADIENT = radial sky-500/18 no topo
```

- Cards de opção: `rounded-2xl`, hover sky-400/30, selected com ring sky-400 + checkmark.
- Botão primário: `bg-sky-500 hover:bg-sky-400 text-slate-950`, com ícone seta.
- Botão pagamento (step 10): variant Mercado Pago (azul `#009ee3` → `#0070a8`) para diferenciar visualmente.
- Botão WhatsApp: verde `#25D366`.
- Progress: `<Progress />` do shadcn estilizado em sky-400.
- Tipografia: mantém `tracking-tighter-custom` e fonte do tema (não importa Fraunces — mantém consistência com o resto do site).

## SEO

- `title`: "Solicite seu laudo para fralda gratuita · Funil guiado"
- `description`: "Em 10 passos rápidos descubra se sua família tem direito à fralda geriátrica gratuita pelo SUS e receba o laudo médico em até 24h."
- `canonical`: `https://receitas.site/funil`
- `noindex` *não* será aplicado (página de conversão pública).

## Scope e não-escopo

- ✅ Página estática client-side com state local.
- ✅ Validação de CPF e formatação de máscaras.
- ✅ Persistência simples em `sessionStorage` (para o usuário não perder dados ao recarregar) — opcional, vou incluir.
- ❌ Sem integração com backend / sem gravar lead em banco (pode ser adicionado depois com Lovable Cloud).
- ❌ Sem A/B testing ou analytics events (pode ser plugado depois).

## Arquivos afetados

- **novo:** `src/pages/Funil.tsx`
- **edit:** `src/App.tsx` (uma rota nova)
