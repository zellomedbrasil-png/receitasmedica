
## Ajustes na Página /v2 — 5 Mudanças Cirúrgicas

### O que será alterado

---

### 1. Remover 2 features da Assinatura (linhas 203–204)

Remover as duas linhas do array `subscriptionFeatures`:
- `"Histórico digital completo de receitas"` (linha 203)
- `"Relatório mensal de saúde preventiva"` (linha 204)

Os ícones `HistoryIcon` e `HeartPulse` também serão removidos dos imports (linhas 13–14) pois ficam sem uso.

---

### 2. Remover bloco de Stats (linhas 144–148)

Remover o array `stats` e a seção inteira de contadores animados que exibe:
- +15.000 Receitas Renovadas
- 98% Taxa de Aprovação
- 7min Tempo Médio

Será necessário também remover a renderização desses stats na página (a seção `<section>` de "Prova Social" que itera sobre esse array).

---

### 3. Remover bloco de Diretor Técnico + Endereço no rodapé (linhas 1590–1602)

Remover apenas as duas tags `<p>` com os placeholders:
- `Diretor Técnico: Dr. [Nome Completo] · CRM [UF] [Número]...`
- `Endereço: [Rua, Número, Complemento...]`

Manter os avisos de conformidade CFM e LGPD que estão nas linhas seguintes — esses são obrigatórios e não foram pedidos para remover.

---

### 4. Novos CTAs do Hero — mais conectivos e humanos

**Antes:**
- `"Solicitar Renovação — R$ 39"` (primário)
- `"Ver Plano Mensal — R$ 29/mês"` (secundário)

**Depois (proposta):**
- **Primário:** `"Renovar minha Receita Agora"` + ícone de WhatsApp — direto, pessoal, no mesmo tom que o usuário usaria
- **Secundário:** `"Assinar por R$ 29/mês"` + ícone de seta — claro sobre o que está sendo clicado, sem ruído de preço duplicado no botão primário

O preço R$ 39 sai do label do botão e fica visível nos próprios cards de preço logo abaixo — evita poluição visual no Hero e deixa o CTA mais limpo e humano.

Os mesmos textos de CTA nas outras ocorrências (header mobile linha ~481, seção FAQ linha ~1444, CTA final linha ~1677) são atualizados de forma consistente para `"Renovar minha Receita"`.

---

### Arquivos modificados

| Arquivo | Ação |
|---|---|
| `src/pages/IndexV2.tsx` | 5 edições cirúrgicas — sem layout alterado |

---

### Resumo técnico

- Remover 2 itens do array `subscriptionFeatures`
- Remover o array `stats` + a `<section>` de stats animados
- Remover 2 `<p>` com placeholders no rodapé
- Atualizar texto dos 2 CTAs do Hero + ocorrências consistentes no header e seções de reforço
- Remover imports de ícones que ficam sem uso (`HistoryIcon`, `HeartPulse`)
