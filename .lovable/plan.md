

## Redesign "Como Funciona" — Estilo Card V1 adaptado ao Dark Mode V2

### O que muda

Remover os circulos numerados separados (feios segundo feedback) e voltar ao estilo da versao anterior (ComoFunciona.tsx original): **cards autonomos com numero + icone watermark gigante** no canto inferior direito, adaptados para o tema dark da V2. Melhorar os textos e adicionar mais detalhes visuais.

### Novo layout (desktop: grid 3 colunas)

Cada card sera autocontido com:

1. **Numero no canto superior** dentro de um badge quadrado arredondado com fundo esmeralda translucido (nao circulo solto)
2. **Icone do passo** ao lado do numero em um container esmeralda
3. **Titulo + descricao** com textos mais ricos e humanos
4. **Icone watermark gigante** (140px, opacity 5%) no canto inferior direito, rotacionado -15deg — igual ao V1 original
5. **Card 03 destacado**: fundo esmeralda escuro diferenciado + glow blur + badge "Entrega imediata" pulsando
6. **Hover**: card sobe com `translateY(-6px)`, borda fica esmeralda, shadow glow aparece

### Textos melhorados

| Passo | Titulo | Nova descricao |
|---|---|---|
| 01 | Triagem Digital | Preencha um breve formulario e envie a foto da sua receita ou laudo anterior. Sem burocracia, tudo pelo celular. |
| 02 | Teleconsulta Medica | Videochamada curta com medico registrado no CRM para avaliar a continuidade do seu tratamento. |
| 03 | Receita no WhatsApp | Receita digital com assinatura ICP-Brasil e QR Code enviada direto no seu celular. Valida em qualquer farmacia do Brasil. |

### Detalhes visuais extras

- Manter o header atual (eyebrow "Do celular a farmacia", H2 "Simples assim.", pill de tempo)
- Remover toda a estrutura de circulos + linha conectora (desktop e mobile)
- Cards com `rounded-3xl`, `backdrop-blur-sm`, fundo translucido
- Adicionar uma **linha superior colorida** em cada card: um `div` de 3px de altura com gradiente esmeralda no topo do card (detalhe sutil de modernidade)
- Numero exibido como `font-mono font-bold` dentro do card, nao separado

### Resumo tecnico

**Arquivo:** `src/pages/IndexV2.tsx`

| Area | Linhas | Mudanca |
|---|---|---|
| steps data | 122-140 | Atualizar `desc` com textos mais longos e detalhados |
| Como Funciona layout | 663-855 | Remover circulos + linha conectora. Substituir por grid de 3 cards autocontidos com watermark icon, hover glow, e linha superior esmeralda |

Sem novos imports — reutiliza `motion`, icones existentes e Tailwind inline styles.

