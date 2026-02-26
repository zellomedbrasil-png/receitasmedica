
# Adicionar Capa 3D do E-book na Seção de Oferta

## Diagnóstico

A seção `#oferta` atual é uma coluna centralizada (`max-w-2xl mx-auto text-center`) com um price card, countdown e CTA. Não há nenhum visual do produto nessa região — o que é uma oportunidade perdida de conversão, pois o leitor não "vê" o que está comprando no momento de decisão.

A imagem enviada é um **mockup 3D premium** do livro físico ("O Código da Farmácia"), diferente da capa plana já usada no Hero. Esta versão tem perspectiva, profundidade e selo "#1 Bestseller" — muito mais impactante para a seção de venda.

---

## Estratégia de Posicionamento

Converter a seção de oferta de **1 coluna → 2 colunas** no desktop:

```text
┌─────────────────────────────────────────────────────────┐
│  [Capa 3D flutuando]   │   [Price Card + CTA + Timer]   │
│   (col esquerda)       │   (col direita)                 │
└─────────────────────────────────────────────────────────┘
```

No mobile, continua empilhado verticalmente — capa acima, card abaixo.

---

## Mudanças Técnicas

**Arquivo:** `src/pages/Ebook.tsx`

### 1. Copiar asset
Copiar `user-uploads://25_de_fev._de_2026_22_18_58.png` → `src/assets/capa-ebook-3d.png`

### 2. Importar no componente
```tsx
import ebookCover3D from "@/assets/capa-ebook-3d.png";
```

### 3. Refatorar layout da seção `#oferta`

- Alterar `max-w-2xl` → `max-w-5xl` no container principal
- Remover `text-center` do container raiz (manter nos elementos internos que precisam)
- Adicionar `md:grid-cols-[1fr_1fr] gap-16 items-center` no grid interno
- **Coluna esquerda (capa):** `<motion.img>` com `animate={{ y: [0, -10, 0] }}`, `drop-shadow` verde esmeralda, glow radial `blur-3xl` atrás, badge "Bestseller #1" sobreposto
- **Coluna direita (card):** o price card, countdown e CTA existentes — sem mudança de conteúdo

### 4. Ajustes visuais da coluna da capa

- Glow radial atrás da imagem: `bg-emerald/0.15 blur-3xl`
- `drop-shadow(0 40px 80px rgba(16,185,129,0.30))` via `filter` inline
- Animação `framer-motion` de flutuação suave (mesmo padrão do Hero)
- Badge `"#1 Bestseller"` já está na capa — não precisa duplicar

---

## Resultado Esperado

A seção de oferta fica visualmente muito mais forte: o usuário vê o produto físico 3D ao lado do preço, criando a percepção de valor tangível no momento de decisão de compra — técnica clássica de landing pages de alto desempenho.
