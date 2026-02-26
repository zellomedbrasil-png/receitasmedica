
## Adicionar bloco de cross-promotion para o receitas.site

### Objetivo
Inserir um destaque visual na página `/ebook` que converta leitores em potenciais clientes do serviço de renovação de receitas do `receitas.site`, com uma mensagem natural e contextual.

---

### Onde posicionar

**Entre a seção de Autoridade (seção 7) e o Pitch Final/Oferta (seção 8)** — linha ~782, após `</section>` da Autoridade.

Este é o momento ideal: o leitor já foi exposto à narrativa investigativa, conhece o receitas.site como parceiro confiável, e ainda não chegou na oferta do e-book. É o ponto de maior abertura para uma mensagem de serviço.

---

### Design do bloco

Um banner horizontal com duas zonas:

**Esquerda:** Ícone de receita médica + texto com gancho direto:
- Eyebrow: `receitas.site`
- Título: "Precisa renovar uma receita médica?"
- Subtítulo: "Teleconsulta em até 30 minutos. Receita digital válida em todo o Brasil."

**Direita:** Botão CTA verde esmeralda com seta → `"Renovar minha Receita"` apontando para `https://receitas.site` (abre em nova aba).

**Visual:** Fundo levemente distinto (`#0E1117`) com borda e um sutil glow esmeralda no canto — consistente com o tema dark da página. Não deve competir com o CTA de compra do e-book.

---

### Detalhe técnico

- Arquivo: `src/pages/Ebook.tsx`
- Inserir nova `<section>` entre linha 782 e 784
- Usar o componente `SR` (ScrollReveal com framer-motion) já existente
- Reaproveitar ícone `FileText` e `ArrowRight` já importados
- Link `href="https://receitas.site"` com `target="_blank" rel="noopener noreferrer"`
- Estilo inline consistente com o restante da página (sem adicionar novas classes Tailwind customizadas)
