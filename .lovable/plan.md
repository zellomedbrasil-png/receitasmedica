## Objetivo
Inserir as informações do "Guia Rápido: Fraldas Geriátricas na Farmácia Popular" dentro do funil `/funil`, de forma resumida e visualmente integrada ao design dark/glass já existente — fortalecendo a percepção de valor (gratuidade real + autoridade técnica) sem inflar a cópia.

A informação será **distribuída em 4 micro-blocos** ao longo das etapas (não concentrada em um único bloco), para reforçar a mensagem em momentos de decisão.

---

## Onde cada parte entra

### 1. Etapa 02 — "Quem tem direito" (reforço de elegibilidade)
Logo após o `StepHeader`, adicionar um `InfoNote` discreto:
> **Lei garante:** 60+ anos OU pessoa com deficiência (qualquer idade, com CID na receita).

Reforça a confiança de quem está respondendo a idade.

---

### 2. Etapa 05 — Bloco educacional (núcleo do guia)
A etapa 5 já é o ponto educacional. Vamos **expandir o card "Como funciona, na prática"** acrescentando 2 itens novos ao `<ul>` existente, mantendo o mesmo padrão visual (ícone + frase curta):

- **Calendar** — *Receita vale 6 meses (180 dias).* Um único laudo cobre todo o semestre.
- **Package** — *Até 4 fraldas/dia, retirada a cada 10 dias = até 40 fraldas por viagem* à Farmácia Popular.

Sem alterar o layout — apenas mais 2 `<li>` no mesmo `<ul>`.

---

### 3. Etapa 07 — Frequência (contexto de quantidade)
Adicionar um `InfoNote` curto acima das opções:
> **Como funciona o fornecimento:** SUS libera até **4 fraldas/dia** (até **40 a cada 10 dias** na farmácia). A frequência informada aqui define a quantidade no laudo.

Conecta a pergunta com o benefício concreto.

---

### 4. Etapa 09 — WhatsApp (instrução prática "o que levar")
Após o input do WhatsApp, adicionar um mini-card `SURFACE` com checklist do que levar à farmácia:
> **Ao retirar na Farmácia Popular, leve:**
> - Laudo médico original (válido por 6 meses)
> - Documento oficial com foto + CPF do paciente

Prepara o cliente para o sucesso pós-laudo (reduz reembolso/atrito).

---

### 5. Etapa 10 — "Dica de Ouro" + gancho de renovação
Após o resumo / antes do botão de pagar, inserir um callout final em destaque (ícone `Lightbulb`, borda sky-400/30):
> **Dica de ouro:** anote a data de emissão do laudo. Faltando ~30 dias para completar 6 meses, **renove com a gente** para não ficar sem fralda. (gancho de recorrência futura)

Plantio de receita recorrente sem ser invasivo.

---

## Padrão visual reaproveitado
Tudo com componentes que já existem em `Funil.tsx`:
- `InfoNote` (etapas 2, 7)
- `<ul>` dentro do card SURFACE (etapa 5)
- novo mini-card `SURFACE` rounded-2xl (etapas 9 e 10)
- ícones lucide já importados + 2 novos (`Lightbulb`, `Package`, `IdCard`)

## Arquivo afetado
- `src/pages/Funil.tsx` — único arquivo modificado.

## Não vai mudar
- Fluxo de 10 etapas, validações, links WhatsApp/Mercado Pago, preço R$ 49, copy dos títulos, design tokens.
