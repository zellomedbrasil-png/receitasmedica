## Objetivo
Substituir todos os links de WhatsApp da landing page `/fralda` para que apontem para a rota interna `/funil` (funil guiado), mantendo o comportamento de navegação SPA.

## Mudanças em `src/pages/Fralda.tsx`

1. Trocar a constante `WHATSAPP` para a rota interna:
   - De: `"https://wa.me/5585991275429?text=..."`
   - Para: `"/funil"`

2. Em todas as 6 ocorrências `<a href={WHATSAPP} target="_blank" rel="noopener noreferrer">` (linhas 215, 228, 282, 610, 893 e a do header mobile), trocar por navegação interna usando `<Link to="/funil">` do `react-router-dom`:
   - Remover `target="_blank"` e `rel="noopener noreferrer"` (não fazem sentido em rota interna).
   - Importar `Link` do `react-router-dom`.
   - Manter classes, ícones e textos atuais dos botões.

3. Manter o link externo do DOU (linha 370) intacto — não é WhatsApp.

4. Opcional: renomear `WHATSAPP` para `CTA_HREF` para clareza, mas mantenho como `WHATSAPP` para minimizar diff (decisão: manter nome, só mudar valor).

## Não alterado
- `src/pages/Funil.tsx`: o número de WhatsApp final (5585991275429) usado no Step 9/10 do funil permanece, pois é o destino final do fluxo.
- Outras páginas (Hero, Header, FAQ do landing principal) não foram solicitadas — fora do escopo.

## Observações
- Como `/funil` é rota SPA já registrada em `App.tsx`, o React Router cuidará da navegação sem reload.
- Os atributos `data-cta-id` permanecem para tracking/analytics.