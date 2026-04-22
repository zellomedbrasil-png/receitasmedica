

## Landing Page Versão B — Teste A/B (`/v-b`)

Vou criar uma nova landing page completa para teste A/B, mantendo a identidade visual do receitas.site (Dark Mode/Fintech, esmeralda, glassmorphism) e implementando o novo posicionamento de preço (R$ 59 avulsa / R$ 47/mês Plano Tranquilo) com bônus empilhados e garantia de reembolso clínico.

### Rota e estrutura

- Rota: **`/v-b`** (versão B do teste A/B). A versão atual em `/` permanece intocada como variante A.
- Página principal: `src/pages/IndexVB.tsx` com 11 seções na ordem solicitada.
- Componentes modulares em `src/components/landing-vb/` reutilizando o sistema visual existente (cores `--emerald`, `--background`, glassmorphism, ScrollReveal).

### Componentes a criar

| Componente | Função |
|---|---|
| `HeaderVB.tsx` | Logo + menu (Como Funciona, Preços, FAQ, Entrar) + CTA "Renovar Agora" com `data-variant="B"` |
| `HeroVB.tsx` | H1, subheadline, CTA primário e secundário, prova social discreta, mockup de receita digital (ilustração CSS-only) |
| `DorVB.tsx` | 4 cards com ícones Lucide (Clock, Calendar, Users, DollarSign) e textos curtos |
| `ComoFuncionaVB.tsx` | 3 passos numerados + linha de apoio CFM 2.314/2022 |
| `DiferencialEticoVB.tsx` | 2 parágrafos + card destacado "Prescrição pelo princípio ativo" |
| `PrecosVB.tsx` | 2 planos lado a lado (Avulsa R$ 59 / Tranquilo R$ 47/mês com badge "MAIS ESCOLHIDO" e 3 bônus) |
| `TransparenciaVB.tsx` | 2 colunas: verde (renovamos) vs vermelho suave (não fazemos) + texto de fechamento |
| `GarantiaVB.tsx` | Card único com Shield — apenas reembolso clínico |
| `FaqVB.tsx` | Accordion shadcn com 8 perguntas |
| `CtaFinalVB.tsx` | Banner verde-escuro com 2 CTAs |
| `FooterVB.tsx` | 4 colunas + responsável técnico + disclaimer CFM |

### Posicionamento visual

- **Paleta:** mantém esmeralda (`--emerald`) como secundária/CTA principal; introduz tom **azul-marinho profundo** (`#1A5276` aplicado via classe utilitária Tailwind arbitrária) para o CTA final, criando contraste com a versão A sem quebrar identidade.
- **Background:** dark mode `#0F1115` consistente; cards com `backdrop-blur` e bordas esmeralda translúcidas.
- **Tipografia:** Inter (já carregada), títulos `tracking-tighter-custom`, corpo com `leading-relaxed`.
- **Mobile-first:** grids colapsam em coluna única, CTAs `py-6` para área de toque generosa, planos empilham com Tranquilo em primeiro no mobile.

### Preços e copy — pontos críticos

- **Avulsa:** R$ 59 limpo (sem preço barrado fake), CTA outline esmeralda → link para `/pagamento` (precisa atualização paralela do valor — ver nota técnica abaixo).
- **Tranquilo:** R$ 47/mês com subtítulo "Menos de R$ 1,60 por dia", badge "MAIS ESCOLHIDO", 3 bônus destacados (Guia O Código da Farmácia, Lembrete WhatsApp 7 dias antes, Atendimento fim de semana). CTA primário sólido esmeralda.
- Todos os CTAs apontam para WhatsApp (`5585991275429`) ou `/pagamento` conforme contexto, com mensagens pré-definidas distintas por plano para rastreamento.

### Compliance e ética (CFM/LGPD)

- Sem urgência artificial, sem timers, sem depoimentos fictícios.
- Sem nomes comerciais de medicamentos.
- Garantia restrita a reembolso por inviabilidade clínica.
- Disclaimer obrigatório no footer reforçando não-substituição de acompanhamento médico.
- Responsável técnico com CRM no footer (placeholder marcado para preenchimento posterior).

### Rastreamento A/B

- `<meta name="ab-variant" content="B">` injetado via `useEffect` no `IndexVB.tsx` (manipulando `document.head` no mount, removendo no unmount para não vazar para outras rotas).
- Todos os botões CTA recebem `data-variant="B"` e `data-cta-id` único (ex: `hero-primary`, `precos-tranquilo`, `cta-final-avulsa`) para Google Tag Manager (GTM-5QZF57J6 já instalado) capturar via trigger de clique.
- `onClick` vazio nos botões fica implícito no Tag Manager — não é necessário handler React.

### Roteamento

- Atualizar `src/App.tsx` adicionando `<Route path="/v-b" element={<IndexVB />} />` antes do catch-all.
- `IndexV2.tsx` (`/`) e demais rotas permanecem intactas.

### SEO

- `<title>` e `<meta description>` específicos da Versão B injetados via `useEffect`.
- Open Graph tags (og:title, og:description, og:url) com URL `https://receitas.site/v-b`.
- JSON-LD MedicalBusiness reutilizando schema da `/`, ajustado para refletir os novos preços.
- HTML semântico: `<header>`, `<main>`, `<section>` com `aria-labelledby`, `<footer>`.

### Resumo técnico

```text
src/
├── pages/
│   └── IndexVB.tsx              [NOVO — orquestra seções, injeta meta + JSON-LD]
├── components/landing-vb/
│   ├── HeaderVB.tsx             [NOVO]
│   ├── HeroVB.tsx               [NOVO]
│   ├── DorVB.tsx                [NOVO]
│   ├── ComoFuncionaVB.tsx       [NOVO]
│   ├── DiferencialEticoVB.tsx   [NOVO]
│   ├── PrecosVB.tsx             [NOVO]
│   ├── TransparenciaVB.tsx      [NOVO]
│   ├── GarantiaVB.tsx           [NOVO]
│   ├── FaqVB.tsx                [NOVO]
│   ├── CtaFinalVB.tsx           [NOVO]
│   └── FooterVB.tsx             [NOVO]
└── App.tsx                      [EDIT — adiciona rota /v-b]
```

### Nota: página /pagamento

A `/pagamento` atual está fixada em **R$ 29** (plano da versão A). A Versão B usa **R$ 47/mês** e **R$ 59 avulsa**. Para não quebrar o checkout existente da V1/V2, os CTAs da Versão B vão direcionar para **WhatsApp** com mensagens distintas por plano (ex.: "Quero assinar o Plano Tranquilo - R$ 47/mês" e "Quero fazer uma Consulta Avulsa - R$ 59"). Quando você quiser, posso criar `/pagamento-vb` com os novos valores e link InfinitePay correspondente — fora do escopo desta entrega.

### Itens marcados como placeholder (para preenchimento posterior)

- Nome e CRM do responsável técnico no footer.
- Ano de início no texto "Receitas renovadas com segurança e ética desde [ano]" — vou usar **2024** como padrão; me avise se for outro.

