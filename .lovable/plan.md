
## Nova Versão V2 da Landing Page receitas.site

### Visão Geral

Criar um novo arquivo `src/pages/IndexV2.tsx` com uma landing page completa redesenhada com a estética dark do `/ebook` (fundo `#0F1115`, glassmorphism, gradientes esmeralda, tipografia extrabold) e uma nova seção de preços com dois planos: **Consulta Avulsa R$ 39** e **Assinatura R$ 29/mês**.

A rota `/v2` será adicionada em `App.tsx` para acessar a versão sem alterar o site atual.

---

### Estrutura da Nova Página

```text
┌─────────────────────────────────────────────────────┐
│  TRUST BAR  — badge verde · "Atendimento 100% Online"│
├─────────────────────────────────────────────────────┤
│  HEADER V2  — logo + nav + CTA button               │
├─────────────────────────────────────────────────────┤
│  HERO  — headline forte + subtext + 2 CTAs          │
│          badges ICP-Brasil · CRM · LGPD             │
├─────────────────────────────────────────────────────┤
│  COMO FUNCIONA  — 3 steps em cards dark             │
├─────────────────────────────────────────────────────┤
│  PROVA SOCIAL  — 3 stats animados + 3 depoimentos   │
├─────────────────────────────────────────────────────┤
│  CRITÉRIOS  — o que renovamos / não renovamos       │
├─────────────────────────────────────────────────────┤
│  PREÇOS  ← NOVO BLOCO PRINCIPAL                     │
│  ┌──────────────┐  ┌──────────────────────────────┐ │
│  │  AVULSO      │  │  ASSINATURA  (destacado)      │ │
│  │  R$ 39       │  │  R$ 29/mês   ← RECOMENDADO   │ │
│  │  • 1 consulta│  │  • Renovações mensais ilimit. │ │
│  │  • Receita   │  │  • Alertas de vencimento      │ │
│  │  • QR Code   │  │  • Atualizações de medicação  │ │
│  │  • Suporte   │  │  • Histórico digital          │ │
│  │              │  │  • Suporte prioritário        │ │
│  │              │  │  • Acesso ao e-book           │ │
│  │              │  │  • Sem taxa de adesão         │ │
│  └──────────────┘  └──────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│  FAQ  — accordion dark                              │
├─────────────────────────────────────────────────────┤
│  FOOTER V2  — dark mode                             │
└─────────────────────────────────────────────────────┘
```

---

### Design System (herdado do /ebook)

- **Background:** `#0F1115` (grafite escuro)
- **Cards:** `rgba(255,255,255,0.04)` com border `rgba(255,255,255,0.08)`, `border-radius: 1.5rem`
- **Primário:** `hsl(var(--emerald))` — verde esmeralda `#10B981`
- **Texto principal:** `white`
- **Texto secundário:** `rgba(255,255,255,0.55)`
- **Gradiente de glow:** `radial-gradient(circle, hsl(var(--emerald)/0.12), transparent)`
- **Trust bar:** `hsl(var(--emerald)/0.10)` com border `hsl(var(--emerald)/0.20)`
- **Animações:** `framer-motion` `whileInView` fade+slide (igual ao `/ebook`)
- **Header:** glassmorphism dark `hsla(15,7%,6%,0.85)` backdrop-blur-xl

---

### Seção de Preços — Detalhamento

**Plano Avulso — R$ 39**
- 1 teleconsulta com médico CRM ativo
- Receita digital assinada ICP-Brasil
- Envio via WhatsApp ou e-mail
- QR Code de verificação
- Suporte pós-consulta

**Plano Assinatura — R$ 29/mês** (card destacado com glow esmeralda)
- Renovações mensais de receitas incluídas
- Alertas automáticos de vencimento de receita
- Atualizações sobre interações e novas medicações
- Histórico digital de todas as receitas
- Relatório mensal de saúde preventiva
- Acesso ao e-book "O Código da Farmácia" (grátis)
- Suporte prioritário via WhatsApp
- Cancelamento a qualquer momento, sem multa
- Sem taxa de adesão
- Badge "Recomendado" + economia anual destacada (economiza R$ 120/ano vs avulso)

---

### Arquivos a criar/modificar

| Arquivo | Ação |
|---|---|
| `src/pages/IndexV2.tsx` | Criar — página completa dark mode |
| `src/App.tsx` | Adicionar rota `/v2` → `<IndexV2 />` |

---

### Notas técnicas

- Reutiliza o componente `SR` (motion wrapper) inline, igual ao Ebook.tsx
- Reutiliza `AnimatedNumber` inline para os stats
- Accordion FAQ usa `@radix-ui/react-accordion` já instalado
- WA link mantido igual ao atual
- Sem dependências novas — tudo já está no projeto
