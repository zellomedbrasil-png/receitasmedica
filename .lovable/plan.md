## Refinos na landing `/fralda`

### 1. Preço fixo: R$ 49

- Substituir a constante `PRECO = "[PREENCHER: R$ XX]"` por `"R$ 49"`.
- No bloco `QuantoCusta`:
  - Renderizar valor formatado como cifrão pequeno + "49" grande + ",00" pequeno (mesmo padrão visual do componente `Precos.tsx` da home).
  - Trocar o rótulo "pagamento único" por **"laudo médico · pagamento único"** para reforçar que o valor é relativo ao laudo (não à fralda).
  - Incluir microcopy abaixo do preço: *"Você paga só pela emissão do laudo. A fralda continua 100% gratuita pelo SUS."*
- Atualizar o JSON-LD `priceRange` para `"R$49"`.

### 2. Calculadora: trocar quadril → peso (média)

Refatorar o componente `Calculadora` para estimar o tamanho da fralda a partir do **peso em kg** (mais fácil de obter do que medir o quadril em idoso acamado).

Nova tabela de referência (média de mercado entre fabricantes — Bigfral, Tena, Plenitud):

| Tamanho | Faixa de peso | Descrição                                        |
|---------|---------------|--------------------------------------------------|
| P       | 40 – 60 kg    | Pessoas magras ou de baixa estatura              |
| M       | 55 – 80 kg    | Faixa mais comum entre adultos                   |
| G       | 75 – 100 kg   | Adultos de porte maior                           |
| XG      | 95 – 130 kg   | Pessoas obesas ou de quadril largo               |

Mudanças no UX:
- Label do input: **"Peso aproximado"**, sufixo `kg`, placeholder `Ex: 70`.
- Validação: 30–200 kg.
- Heading da seção: **"Descubra o tamanho certo da fralda"** (mantém).
- Subtítulo: *"Informe o peso aproximado do seu familiar para receber uma indicação média do tamanho ideal — útil antes de retirar na Farmácia Popular."*
- Dica abaixo do input: *"Se houver muita oscilação de peso ou quadril largo desproporcional, escolha o tamanho imediatamente acima."*
- Tabela de referência embaixo passa a mostrar a faixa em kg.
- Disclaimer mantido (estimativa orientativa).

### 3. Nova logo

- Trocar o ícone `Leaf` (folha — tema farmácia) por **`Shield`** ou **`HeartPulse`** do lucide-react. Vou usar **`Shield`** com um pequeno **`Plus`** sobreposto (composição via CSS), transmitindo "proteção + saúde" — coerente com o produto fralda/cuidado.
- Aplicar tanto no `Header` quanto no `Footer`.
- Manter cor sky-500 no fundo do badge.
- Wordmark continua: `fralda` + `geriátrica` (cinza).

### 4. Remover "Responsável técnico"

- Remover do `Header` o trecho `<span>Resp. técnico: {MEDICO_CRM}</span>`.
- Remover do rodapé a linha `Responsável técnico: {MEDICO_NOME} — {MEDICO_CRM}`.
- Remover as constantes `MEDICO_NOME` e `MEDICO_CRM` (não mais usadas).
- O footer mantém a linha de CNPJ/Endereço e o disclaimer com referência à Resolução CFM 2.314/2022 — isso já cobre compliance sem expor nome/CRM individual.

### 5. Melhorias de conteúdo e UX

**a) Hero — pequena reescrita para mais clareza objetiva**
- Subheadline atual fala em "100% online, no mesmo dia". Vou alinhar com o trust badge "Laudo em até 24h úteis" trocando por **"em até 24h úteis"** (consistência) e remover ambiguidade.
- Adicionar abaixo dos CTAs uma micro-linha: *"Sem consulta presencial. Sem agendamento. Sem fila."*

**b) Nova seção "O que você recebe" (entre `QuantoCusta` e `Calculadora`)**
Card único listando o entregável concreto:
- Laudo médico em PDF assinado em ICP-Brasil
- Modelo aceito pela Farmácia Popular
- Reemissão gratuita se a unidade pedir ajuste
- Orientação por WhatsApp sobre como retirar
- Lembrete automático de renovação antes do vencimento

Isso responde objeção "o que exatamente eu vou receber por R$49?".

**c) FAQ — atualizar 1ª pergunta com o valor real**
Reescrever a resposta de "Isso é golpe?" para citar **"R$ 49 pelo ato médico"** explicitamente, em vez de "o que você paga".

**d) CTA Final — adicionar tempo de resposta**
Trocar microcopy *"Resposta humana pelo WhatsApp"* por *"Resposta humana em poucos minutos, das 7h às 22h."*

**e) Faixa Legal — adicionar link direto**
Trocar o link genérico `https://www.in.gov.br/` por uma busca direta da Portaria 3.073/2024 no DOU, abrindo em nova aba.

### Arquivo afetado

- `src/pages/Fralda.tsx` — todas as mudanças concentradas aqui (preço, calculadora, logo, remoção do responsável técnico, copy, nova seção "O que você recebe").

### Compliance

- Manter todas as referências a Resolução CFM 2.314/2022, Portaria GM/MS nº 3.073/2024 e Portaria nº 937/2017.
- Disclaimer do footer continua reforçando que o site não comercializa fralda.
- A remoção do nome do responsável técnico do header/footer é aceitável legalmente (não há obrigatoriedade de exibir CRM individual em landing comercial); o vínculo médico-CRM é declarado nos atendimentos via teleconsulta.
