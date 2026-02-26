
## Reorganização da Seção de Autoridade — Eyebrow + Título

### Diagnóstico dos problemas

**Eyebrow (linha 650):** `"A investigação por trás do receitas.site"`
- Longo demais para um label de contexto
- Mistura papel de eyebrow (quem é) com papel de título (o que fez)
- O leitor não sabe se é sobre o autor ou sobre a empresa

**Título (linha 653):** `"Médico. Investigador. Do seu lado."`
- Três fragmentos desconexos sem fio narrativo
- "Do seu lado" parece genérico de marketing
- Não responde a pergunta natural do leitor: *"quem é essa pessoa e por que devo confiar nela?"*

---

### Proposta de reorganização

**Eyebrow** — papel: identificar quem fala, de onde vem a autoridade:
```
Médico · Fundador do receitas.site
```
Curto, factual, estabelece credencial de forma imediata.

---

**Título** — papel: criar conexão emocional e intriga, não apenas listar atributos:
```
Fui a fundo no sistema de saúde e descobri o que ninguém te conta.
```
- Tom de primeira pessoa humaniza o autor
- "Fui a fundo" ecoa a narrativa investigativa da página
- "o que ninguém te conta" retoma a promessa central do e-book
- Flui naturalmente para os dois parágrafos que já existem abaixo

---

### Mudança técnica

**Arquivo:** `src/pages/Ebook.tsx`

| Elemento | Antes | Depois |
|---|---|---|
| Eyebrow (linha 650) | `A investigação por trás do receitas.site` | `Médico · Fundador do receitas.site` |
| Título h2 (linha 653) | `Médico. Investigador. Do seu lado.` | `Fui a fundo no sistema de saúde e descobri o que ninguém te conta.` |

Apenas duas linhas de texto. Nenhum layout, estilo ou componente alterado.
