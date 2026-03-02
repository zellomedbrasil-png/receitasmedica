
## Avaliação Geral da /v2 + Ajustes no Hero

### Diagnóstico completo da página

**Pontos fortes (manter):**
- Trust bar com pulse verde e frases de credencial — funciona bem
- Estrutura semântica H1 → H2 → H3 com schema JSON-LD
- Cards de "Como Funciona" com step numbers e ícones
- Seção de Segurança & LGPD com 6 blocos — forte sinal de confiança
- Critérios "Renovamos / Não renovamos" — reduz suporte e ansiedade do usuário
- FAQ accordion com conteúdo jurídico detalhado
- Sticky CTA mobile após scroll

**Problemas identificados:**

| Área | Problema | Impacto |
|---|---|---|
| Hero — CTA secundário | "Assinar por R$ 29/mês" como segunda ação imediata afasta quem ainda não conhece o serviço | Alto |
| Hero — CTA primário | "Renovar minha Receita Agora" com ícone MessageCircle é bom, mas pode ser mais específico | Médio |
| Hero — badge CFM | Eyebrow longo (`Telemedicina regulamentada pelo CFM · Res. 2.314/2022`) — texto técnico demais para o topo | Médio |
| Depoimentos | Apenas 3 depoimentos sem foto ou identificação visual — pouca força | Médio |
| Seção Preços | Card "Assinatura" não tem nenhum destaque visual de ancoragem de valor (ex: "equivale a R$ 9,67/semana") | Baixo-Médio |
| Footer | Sem aviso de horário de atendimento visível | Baixo |

---

### Mudança 1 — CTAs do Hero (principal pedido)

**Problema:** O segundo botão "Assinar por R$ 29/mês" empurra uma decisão de assinatura antes do usuário entender o serviço. Quem chega pelo Google com "renovar receita" não está pronto para assinar — quer resolver o problema hoje.

**Proposta para os 2 CTAs:**

**Primário (mantém WhatsApp, muda o ângulo):**
```
"Quero renovar minha receita"
```
Tom de primeira pessoa + intenção clara. Sem "Agora" forçado. O ícone de MessageCircle fica.

**Secundário (substitui "Assinar por R$ 29/mês"):**
```
"Ver como funciona  ↓"
```
Ancora para `#como-funciona`. Convida à descoberta, não força uma decisão de compra. Usuários que ainda não confiam no serviço descem, leem, e convertem melhor nos CTAs das seções de preço e FAQ.

Esta é a mudança de maior impacto — remove fricção no topo sem tirar o plano de assinatura da página (ele continua na seção `#precos`).

---

### Mudança 2 — Badge do Hero (melhoria de UX)

**Antes:** `"Telemedicina regulamentada pelo CFM · Res. 2.314/2022"` — jargão técnico-jurídico que intimida ao invés de acolher.

**Depois:** `"Médicos disponíveis agora · Receita em até 30 min"` — emocional + prático, ecoa a trust bar acima com informação complementar de tempo.

---

### Mudança 3 — Depoimentos: adicionar 2 novos + melhorar apresentação

Adicionar mais 2 depoimentos (total 5, exibidos em grade 2 colunas no tablet e 3 no desktop) com contexto de condição tratada para reforçar identificação:

- **Depoimento 4:** paciente com diabetes, cidade no Nordeste
- **Depoimento 5:** paciente mais idoso com hipertensão

Adicionar uma linha de "condição tratada" abaixo do nome em cada card, tornando os depoimentos mais específicos e identificáveis.

---

### Mudança 4 — Ancoragem de valor na Assinatura

Abaixo do preço `R$ 29/mês` no card de assinatura, adicionar:

```
Equivale a menos de R$ 1 por dia
Economize R$ 120 comparado ao avulso
```

Texto pequeno, em verde muted. Ancoragem de valor clássica que elimina a percepção de preço sem usar a palavra "desconto" (proibida pelo tom CFM).

---

### Resumo das alterações técnicas

**Arquivo:** `src/pages/IndexV2.tsx`

| Linha aprox. | Elemento | Mudança |
|---|---|---|
| ~511 | Badge hero eyebrow | Texto mais acolhedor e prático |
| ~555–557 | CTA primário hero | Texto: "Quero renovar minha receita" |
| ~558–573 | CTA secundário hero | Substituir link externo por âncora `#como-funciona`, texto "Ver como funciona" + ChevronDown |
| ~143–162 | Array `testimonials` | Adicionar 2 novos depoimentos com campo `condition` |
| ~723–785 | Render dos testimonials | Exibir `condition` como badge abaixo do nome |
| ~930–1000 (aprox) | Card Assinatura preço | Adicionar linha de ancoragem de valor |
