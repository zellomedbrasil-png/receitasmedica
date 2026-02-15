

# Atualizar Botoes e Links da Landing Page

## Resumo das Alteracoes

Renomear botoes e adicionar links de WhatsApp/ancora conforme solicitado em 4 arquivos.

## Detalhes

### 1. Hero (src/components/landing/Hero.tsx)
- "Solicitar Receita" -> "Renovar minha Receita" — envolver com tag `<a>` apontando para `https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica.`
- "Verificar medicamentos" -> "Consultar lista de remedios" — envolver com tag `<a href="#medicamentos">`

### 2. Header (src/components/landing/Header.tsx)
- "Iniciar agora" (desktop e mobile) -> "Renovar Agora" — envolver com tag `<a>` apontando para o mesmo link WhatsApp acima

### 3. Precos (src/components/landing/Precos.tsx)
- "Solicitar Receita Agora" -> "Renovar minha Receita" — envolver com link WhatsApp

### 4. FAQ (src/components/landing/FAQ.tsx)
- "Iniciar Avaliacao" -> "Renovar Agora" — envolver com link WhatsApp

### Link WhatsApp padrao
`https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica.`

Todos os links WhatsApp abrirao em nova aba (`target="_blank"`, `rel="noopener noreferrer"`). Os botoes usarao `asChild` do Radix para renderizar como `<a>` mantendo o estilo.

