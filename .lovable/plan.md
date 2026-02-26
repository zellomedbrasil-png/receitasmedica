
## Auditoria e Limpeza de Conteúdo — /ebook

### Problemas identificados

**1. Depoimentos em excesso (6 → 3)**
A seção 6 renderiza 6 cards em grade 3x2 via array `testimonials`. Manter apenas os 3 com maior impacto de resultado concreto: Maria Aparecida (R$ 45 na 1ª compra), João Ricardo (mãe caiu de R$ 380 → R$ 60) e Luciana (R$ 300 de economia no 1º mês). Os outros três repetem o mesmo argumento sem agregar novidade.

**2. Bloco "Compartilhar no WhatsApp" — remover**
O banner de share logo após os depoimentos (linhas 676–706) interrompe o fluxo de conversão: o visitante que acabou de ler os depoimentos está pronto para descer até a oferta, não para sair da página. Esse bloco dilui o momentum de compra.

**3. Seção 5 "Ancoragem de Valor" — remover**
A seção inteira (linhas 577–626) com os 3 mini-cards de ROI (R$ 29 / R$ 120 / 413%) duplica diretamente o texto da seção de Oferta (seção 8), que já diz "menor que um lanche — mas que devolve o seu dinheiro na primeira aplicação". Duas seções de ancoragem de preço seguidas afastam em vez de convencer.

**4. Trust bar: remover contagem "mais de 500 leitores"**
O número já foi questionado antes pelo usuário e enfraquece a credibilidade. Deixar apenas "Conteúdo oficial em parceria com receitas.site" e a nota de disponibilidade limitada — mais limpo e honesto.

---

### Mudanças técnicas

| Arquivo | Ação |
|---|---|
| `src/pages/Ebook.tsx` | Reduzir array `testimonials` para 3 itens (MA, JR, LS) |
| `src/pages/Ebook.tsx` | Remover bloco Share trigger (linhas 676–706) |
| `src/pages/Ebook.tsx` | Remover seção "Ancoragem de Valor" inteira (linhas 577–626) |
| `src/pages/Ebook.tsx` | Remover o trecho `· mais de 500 leitores` da trust bar (linha 316–317) |

---

### Resultado esperado

- Página mais enxuta e focada
- Fluxo: Dor → Revelação → Prova social (3 depoimentos objetivos) → Autoridade → Cross-promo → Oferta → FAQ → Footer
- Sem desvios de atenção entre a prova social e o botão de compra
