
## Redesign "Como Funciona" — Visual Moderno e Intuitivo

### Diagnóstico do problema atual

O layout atual tem problemas de clareza visual:
- Três cards genéricos com bordas quase invisíveis sobre fundo escuro
- O número "01/02/03" e o ícone ficam empilhados dentro do card sem hierarquia clara
- A linha conectora horizontal está no `top-[52px]` mas visualmente não "conecta" nada perceptível
- Para idosos e usuários menos técnicos, o fluxo de leitura não é óbvio
- O watermark numérico (opacity 0.03) é invisível — não cumpre função visual

### Novo conceito: "Step Explainer" com progressão visual clara

Substituir os cards genéricos por um **layout de três etapas com foco em clareza total**:

**Estrutura de cada etapa (desktop — horizontal):**
```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  [ Círculo numerado grande ]  ──── linha ────  [ Círculo ]  ...  │
│        ①                                           ②             │
│   ┌──────────────┐                          ┌──────────────┐     │
│   │  Ícone       │                          │  Ícone       │     │
│   │  grande      │                          │  grande      │     │
│   │  centralizado│                          │  centralizado│     │
│   │              │                          │              │     │
│   │  Triagem     │                          │  Teleconsulta│     │
│   │  Digital     │                          │  Médica      │     │
│   │              │                          │              │     │
│   │  desc...     │                          │  desc...     │     │
│   └──────────────┘                          └──────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Design detalhado

**Cada etapa tem 2 partes separadas:**
1. **Topo visual (acima do card):** Círculo grande (64px) numerado, com fundo esmeralda sólido, conectado pela linha. Visualmente domina e torna a progressão 1→2→3 imediatamente legível
2. **Card de conteúdo (abaixo):** Card branco-translúcido com ícone destacado no topo, título e descrição. Sem número no card (o número já está no círculo acima — sem duplicação)

**Linha conectora revisada:**
- Linha pontilhada (`border-dashed`) esmeralda de 2px que parte do centro do círculo 01 até o centro do 03
- Visível e óbvia (não opacity 0.25 invisível)
- Nos extremos (antes do 01 e depois do 03) a linha some com `opacity-0`

**Visual dos cards:**
- Fundo: `rgba(255,255,255,0.06)` com `backdrop-blur-sm`
- Borda mais visível: `rgba(255,255,255,0.14)`  
- Ícone centralizado no topo com círculo esmeralda maior (48px) e mais opacidade
- Hover: card sobe 8px + glow esmeralda + borda esmeralda — mais dramático
- Card 03 (Receita): tem badge "Receita imediata" + fundo levemente esmeralda diferenciado

**Mobile — layout vertical aprimorado:**
- Cada step vira um "row" horizontal: `[Círculo numerado] → [Card]` lado a lado
- Linha vertical à esquerda conectando os círculos, visível (2px esmeralda, opacity 0.5)
- Mais legível que empilhamento puro

**Copy melhorado nos steps:**
- Step 01: adicionar emoji de documento como auxílio visual de contexto
- Descrições mais curtas e diretas para acessibilidade (pacientes idosos)

**Cabeçalho da seção — pequena melhoria:**
- Manter "Do celular à farmácia" e "Simples assim."
- Adicionar abaixo do subtexto um indicador de tempo total: `"Processo completo em menos de 1 hora"` com ícone de relógio, em formato de pill esmeralda

### Resumo técnico

**Arquivo:** `src/pages/IndexV2.tsx`

| Área | Linhas | Mudança |
|---|---|---|
| steps data | 121–140 | Encurtar `desc` para no máximo 2 linhas (acessibilidade) |
| Header "Como Funciona" | 625–647 | Adicionar pill de "menos de 1h" abaixo do subtexto |
| Layout dos steps | 650–765 | Redesenho completo: círculo numerado separado + card de conteúdo + linha conectora visível |

Sem novos imports — tudo com `motion`, ícones já importados (`ClipboardCheck`, `Video`, `MessageCircle`, `Clock`) e Tailwind/inline styles existentes.
