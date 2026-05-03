## Objetivo
Reescrever os 5 CTAs da página `/fralda` com tom de "convite ao funil guiado", trocando o ícone `MessageCircle` por `Sparkles` + `ArrowRight` para reforçar progressão.

## Mudanças em `src/pages/Fralda.tsx`

| Linha | Local | Texto novo |
|---|---|---|
| 215 | Header desktop | "Ver se tenho direito (grátis)" |
| 228 | Header mobile | "Ver se tenho direito" |
| 282 | Hero principal | "Iniciar meu pedido em 2 minutos" |
| 610 | Pricing | "Começar meu pedido guiado" |
| 893 | CTA final | "Começar agora — leva 2 minutos" |

Todos os botões: ícone `Sparkles` à esquerda + `ArrowRight` à direita, mantendo classes/tamanhos atuais e `data-cta-id` para tracking. `href={WHATSAPP}` (já aponta para `/funil`) permanece.

## Notas técnicas
- `Sparkles` e `ArrowRight` já estão importados no arquivo.
- `MessageCircle` permanece importado (sem cleanup obrigatório).
- Nenhuma outra mudança de layout.