
# Reestruturar Secao de Medicamentos / Criterios de Atendimento

## Resumo
Reescrever completamente o componente `CriteriosAtendimento.tsx` para aumentar o nivel de informacao, persuasao e clareza visual, seguindo as 4 diretrizes fornecidas.

## Alteracoes no arquivo `src/components/landing/CriteriosAtendimento.tsx`

### 1. Coluna Verde — "O que renovamos" (destaque visual)
Substituir as 3 linhas genericas por 4 categorias detalhadas com icones tematicos, titulos e exemplos de remedios reais:

- **Saude Cardiovascular e Metabolica** (icone Heart): Uso continuo para hipertensao, diabetes, colesterol e acido urico. Exemplos: Losartana, Metformina, Glifage, Rosuvastatina.
- **Saude Mental — Receita Branca 2 Vias** (icone Brain): Antidepressivos, ansioliticos leves e estabilizadores de humor. Exemplos: Sertralina, Fluoxetina, Escitalopram, Amitriptilina.
- **Saude da Mulher e Endocrina** (icone User): Anticoncepcionais, reposicao hormonal e tireoide. Exemplos: Puran T4, pilulas anticoncepcionais.
- **Outros Tratamentos Continuos** (icone Pill): Asma, alergias cronicas, dermatologia basica e antibioticos (sujeito a avaliacao rigorosa).

Card com fundo esverdeado suave (`bg-emerald-light/50`) e borda verde (`border-primary/20`) para dar mais peso visual ao "SIM".

### 2. Inversao de Peso Visual
- Coluna verde: fundo menta suave, borda verde, sombra mais pronunciada — atrair atencao
- Coluna vermelha: fundo branco discreto, sem sombra pesada — informativa mas secundaria

### 3. Coluna Vermelha — "Nao atendemos" (com exemplos)
Cada item ganha uma descricao e exemplos concretos:

- **Receitas Amarelas e Azuis** (tag LEI): Restricao da Anvisa (Notificacao A e B). Ex: Ritalina, Venvanse, Roacutan, Sibutramina, Clonazepam.
- **Emergencias Medicas** (tag PS): Dores agudas, febre alta, falta de ar. Busque o Pronto Socorro.
- **Atestados para Afastamento** (tag INSS): Nao emitimos atestados medicos ou laudos para INSS/Trabalho.

### 4. CTA de Resgate (faixa abaixo das colunas)
Nova faixa horizontal apos o grid com:
- Texto: "Nao encontrou o seu medicamento na lista ou esta na duvida?"
- Botao WhatsApp: "Falar com a Triagem Agora" (link para `https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica.`)
- Subtexto de garantia: "Fique tranquilo: se voce pagar e seu remedio nao puder ser renovado, devolvemos 100% do valor na hora."

### Layout
- Manter o grid `md:grid-cols-2` com ScrollReveal direcional
- Titulo e subtitulo da secao permanecem acima do grid
- CTA de resgate fica abaixo do grid em uma faixa centralizada com fundo sutil

### Tecnico
- Importar icones adicionais do lucide-react: `Heart`, `Brain`, `User`, `Pill`, `MessageCircle`
- Usar `Button` com `asChild` para o link WhatsApp
- Manter animacoes ScrollReveal existentes
