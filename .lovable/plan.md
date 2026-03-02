
## Ajustes Cirúrgicos — Hero, FAQ, Depoimentos, Textos CFM

### Diagnóstico atual

Problema identificado no Hero: há dois botões com texto similar. O CTA primário é **"Quero renovar minha receita"** (linha 573) e o segundo é **"Ver como funciona ↓"** — OK, esses são distintos. O duplicado mencionado é o botão do **header desktop** (linha 436: "Renovar minha Receita") vs. o CTA primário do hero. Em mobile, o menu também repete. A seção de depoimentos está sem título e com 5 cards. A seção de FAQ usa um accordion básico sem muito charme visual. Há também textos que precisam de auditoria CFM (ex: "garantido" em "Reembolso integral garantido" — linha 1326).

---

### Mudança 1 — Hero: retirar CTA secundário "Ver como funciona" e substituir por um elemento informativo

O usuário quer **apenas 1 botão** no hero. O segundo CTA será transformado em um elemento informativo/âncora sutil (não um botão de igual peso), tipo:

```
↓ Ver como funciona em 3 passos  (link âncora simples, não botão)
```

Apresentado como texto-link com ícone de seta animado, não como botão — elimina a percepção de "dois botões iguais" sem perder a âncora de scroll.

---

### Mudança 2 — Remover 2 depoimentos + adicionar título criativo

Remover os 2 últimos da lista (José Raimundo e Antônio Carlos, linhas 165–178), ficando com 3 cards (Maria, Carlos, Ana Paula) em uma grade limpa de 3 colunas.

**Adicionar título de seção acima dos cards:**
- Eyebrow: `O que dizem nossos pacientes`
- H2 criativo: `Receita resolvida. Tratamento mantido.`
- Subtexto: `Relatos verificados de pacientes que utilizaram o serviço para continuidade de tratamentos de uso contínuo.`

A grade volta para `md:grid-cols-3` (3 colunas, grid limpo).

---

### Mudança 3 — Redesign do FAQ (visual mais rico)

O FAQ atual usa apenas `CARD_BG` genérico com accordion padrão. Proposta de upgrade visual:

- **Separar em 2 colunas** no desktop (4 perguntas × 2 col) — mais compacto, menos scroll
- Adicionar um **número de índice** na cor esmeralda à esquerda de cada pergunta (01, 02…) para hierarquia visual
- Adicionar uma **linha de separação esmeralda sutil** no item aberto (border-left verde)
- Estado aberto: background levemente mais claro `rgba(16,185,129,0.04)` para indicar seleção
- Manter o accordion `type="single"` mas mudar para dois acordeões lado a lado, cada um com 4 perguntas

---

### Mudança 4 — Auditoria CFM nos textos

Texto com risco identificado nas seguintes linhas:

| Linha | Texto atual | Problema CFM | Correção |
|---|---|---|---|
| 1326 | `"Reembolso integral garantido"` | "garantido" é termo proibido (promessa de resultado) | `"Reembolso integral"` (sem "garantido") |
| 258 | `"Em média 7 minutos após a teleconsulta"` | OK — "em média" é aceitável | Manter |
| 274 | `"você recebe reembolso integral do valor pago"` | OK — descritivo | Manter |
| 529 | `"Receita em até 30 min"` no badge hero | Promessa de tempo precisa de ressalva | Manter mas adicionar "em média" |
| 1245 | `"Economia de R$ 120/ano em relação à consulta avulsa"` | Pode ser interpretado como publicidade comparativa | Suavizar para `"Equivalente a R$ 0,97/dia"` |

Correções a aplicar:
1. Linha 1326: remover "garantido" → `"Reembolso integral caso o médico não possa renovar sua receita."`
2. Linha 529 badge: `"Médicos disponíveis agora · Receita em até 30 min"` → `"Médicos disponíveis agora · Receita em minutos"` (mais seguro)
3. Linha 1245: `"Economia de R$ 120/ano em relação à consulta avulsa"` → `"Equivalente a menos de R$ 1 por dia"`

---

### Resumo técnico

**Arquivo:** `src/pages/IndexV2.tsx`

| Área | Linha(s) | Mudança |
|---|---|---|
| Hero — CTA secundário | 575–588 | Substituir `<a>` botão por âncora-link sutil com seta animada |
| Testimonials — data | 165–178 | Remover 2 últimos depoimentos |
| Testimonials — seção | 729–796 | Adicionar cabeçalho de seção + ajustar grid para `md:grid-cols-3` |
| FAQ — layout | 1336–1398 | Redesenho em 2 colunas com índice numérico e estados visuais |
| CFM texto — reembolso strip | 1325–1328 | Remover "garantido" |
| CFM texto — badge hero | 529 | "em minutos" em vez de "em até 30 min" |
| CFM texto — pricing | 1245 | Âncora de valor sem comparativo |
