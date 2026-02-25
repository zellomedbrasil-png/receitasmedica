
# Nova Landing Page: "O Código da Farmácia" — E-book

## Visão Geral

Criar uma **nova rota `/ebook`** com uma landing page de alta conversão para o produto "O Código da Farmácia". A página existente (`/`) da receitas.site **não será alterada**. A nova landing page será um arquivo independente em `src/pages/Ebook.tsx`, composto por seções inline (sem componentes separados para manter simplicidade).

## Arquitetura

```text
src/
  pages/
    Ebook.tsx          ← nova página completa
  App.tsx              ← adicionar rota /ebook
```

## Paleta e Estilo (específica para esta página)

- Fundo geral: `bg-white` / `bg-gray-50` (off-white)
- Azul escuro de autoridade: `#1E3A5F` (inline via style ou classe Tailwind `blue-900`)
- Verde CTA: cor primária existente do projeto (`hsl(var(--primary))`) ou `emerald-600`
- Fonte: Inter (já carregada no projeto)
- Raio de botões: `rounded-full`
- Sombras: `shadow-md`, `shadow-xl`

## Seções a Implementar (na ordem exata solicitada)

### 1. Trust Badge (topo)
Barra fixa no topo com: "Um conteúdo exclusivo em parceria com receitas.site" + ícone `BadgeCheck` do Lucide. Fundo `bg-slate-900`, texto branco, tamanho `text-xs`.

### 2. Hero Section (2 colunas desktop / 1 coluna mobile)
- **Esquerda:** Headline "Pare de Deixar Seu Salário no Balcão da Farmácia." (bold, grande), subheadline, selo "Atualizado para 2026" e botão CTA verde pulsante "QUERO DECIFRAR O CÓDIGO AGORA".
- **Direita:** Placeholder para mockup 3D do e-book — card com gradiente azul escuro, bordas arredondadas, sombra elegante e texto "Capa do E-book" centralizado.
- Botão com animação `animate-pulse` no background ou `hover:scale-105 transition-transform`.

### 3. Seção Problema (fundo `bg-gray-100`)
- Título centralizado: "Você sente que comprar remédios virou um aluguel mensal?"
- 3 Cards brancos com sombra, ícones em vermelho/laranja: `DollarSign`, `HelpCircle`, `ShieldOff`.
- Cada card: ícone + título curto + descrição.

### 4. Seção Solução (fundo branco)
- Título: "O que você vai descobrir dentro do Código da Farmácia:"
- Lista de 4 bullets com ícone `CheckCircle2` verde em cada linha.

### 5. Prova Social / Depoimentos (fundo `bg-gray-50`)
- Título centralizado.
- 3 cards com: avatar placeholder circular (iniciais), nome, 5 estrelas amarelas (`Star` fill), texto de depoimento.

### 6. Autoridade do Autor (fundo branco, 2 colunas)
- Esquerda: avatar circular grande com placeholder.
- Direita: título "Quem está revelando esses bastidores?", bio, menção ao receitas.site com ícone `BadgeCheck`.

### 7. Pitch Final e Oferta (fundo `bg-[#1E3A5F]`, texto branco)
- Título impactante, texto de valor, preço riscado (`R$ 49,00`) com destaque no preço real (`R$ 9,90`).
- Botão CTA gigante (`py-5 px-12 text-xl`) em verde ou laranja (`bg-orange-500`).
- Selo de garantia 7 dias com ícone `ShieldCheck`.

### 8. FAQ (Accordion)
- Fundo `bg-gray-50`.
- 3 perguntas usando o componente `Accordion` já existente no projeto.

### 9. Footer
- Links: Termos, Privacidade, Contato.
- Copyright.
- Ícones de pagamento seguros (placeholder com texto).
- Disclaimer em texto pequeno e cinza.

## Roteamento

Adicionar `<Route path="/ebook" element={<Ebook />} />` no `App.tsx`.

## Arquivos a Modificar / Criar

| Arquivo | Ação |
|---|---|
| `src/pages/Ebook.tsx` | Criar (nova página completa) |
| `src/App.tsx` | Adicionar rota `/ebook` |

## Notas Técnicas

- Todos os ícones importados do `lucide-react` (já instalado).
- Componentes `Accordion*` e `Button` já existem no projeto — serão reutilizados.
- O `ScrollReveal` (framer-motion) será usado para entradas suaves nas seções.
- Nenhum arquivo da landing page principal (`/`) será alterado.
