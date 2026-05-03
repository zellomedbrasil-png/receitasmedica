## Auditoria do `/funil` + correções

### 🐞 Bug crítico encontrado
Os "ícones" das opções estão renderizando o `value` cru (ex: **"mae-pai"**, **"avo"**, **"familiar"**) porque o `OptionList` usa `o.icon ?? o.value` como fallback e nenhum ícone foi passado nas etapas 1–5 e 7. Isso quebra completamente a leitura visual do funil.

### Plano de correção

**1. Substituir `value` como fallback por ícones lucide reais em cada etapa**

| Etapa | Opção | Ícone |
|---|---|---|
| 1 — Para quem | mãe/pai · avós · familiar · eu | `Users` · `UserRound` · `HeartHandshake` · `User` |
| 2 — Idade | 60–70 · 71–80 · 80+ · PCD | `Calendar` (×3) · `Accessibility` |
| 3 — Condição | urinária · fecal · mista · acamado | `Droplet` · `Droplets` · `RefreshCw` · `BedDouble` |
| 4 — Gasto | >300 · economiza · preparando · outro | `TrendingDown` · `PiggyBank` · `Search` · `Building2` |
| 6 — Tamanho | P/M/G/EG | manter as letras (já fazem sentido como "glyph") |
| 7 — Frequência | noite · dia · contínuo · não sei | `Moon` · `Sun` · `Repeat` · `HelpCircle` |

**2. Auditoria de funcionalidade**
- ✅ Persistência sessionStorage funciona, mas se o usuário recarregar no step 10 com `nome` vazio, o resumo mostra "—". Aceitável.
- ⚠️ `orderId` é gerado no `useMemo([])` — recalcula a cada mount. Trocar por `useState(() => …)` para travar o número uma vez.
- ⚠️ Botão "Voltar" no step 10 leva ao 9, mas se usuário voltar e mudar o WA, o `orderId` já travado não muda — ok, comportamento desejado.
- ⚠️ Step 8: validação só habilita o botão; mas se usuário colar CPF formatado vindo de outro lugar, a máscara reformatar. OK.
- ⚠️ Link `MP_LINK` ainda é placeholder — manter com comentário `[PREENCHER]`.
- ⚠️ Acessibilidade: adicionar `aria-label` ao progress bar e `role="radiogroup"` ao OptionList.

**3. Auditoria de design**
- Header em mobile: `CRM ativo · Telemedicina · CFM 2.314/2022` quebra/aperta. Reduzir texto em telas pequenas (esconder linha secundária < sm).
- Card padding `p-7 sm:p-10` ok; em telas muito pequenas (<360px) reduzir para `p-5`.
- Tipografia do título `text-2xl sm:text-3xl` ok.
- Botão "Pagar" no step 10 — ajustar tamanho do `<Wallet>` icon (parece desproporcional em mobile).
- Comparativo Hoje/Depois (step 5): em mobile pequeno os números R$ 450 podem cortar — adicionar `whitespace-nowrap`.

**4. Auditoria de responsividade**
- Testar em 375px (iPhone SE), 390px (iPhone 13), 768px (iPad), 1024+ (desktop).
- Garantir que o card não ultrapassa viewport e que o resumo (dl) trunca o nome corretamente — já tem `truncate max-w-[60%]`, manter.
- Trust pills wrappam ok; em 320px reduzir gap.

**5. Pequenos refinamentos**
- Adicionar `scroll-mt-4` ao card para o `scrollTo top` ser mais suave.
- Animação de entrada de cada step (`fade-in` 200ms) para reduzir sensação de salto.
- Selecionar opção: adicionar `aria-pressed`.

### Arquivos afetados
- `src/pages/Funil.tsx` — único arquivo modificado.
