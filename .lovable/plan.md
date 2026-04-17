

## Instalar Google Tag Manager (GTM-5QZF57J6)

Adicionar o snippet do GTM no `index.html` em dois lugares:

**1. No `<head>` (logo após `<meta name="viewport">`):**
- Script inline do GTM que carrega `gtm.js` assincronamente.

**2. No `<body>` (logo após a abertura de `<body>`, antes de `<div id="root">`):**
- `<noscript>` com iframe de fallback para usuários sem JavaScript.

### Resumo técnico

| Arquivo | Local | Mudança |
|---|---|---|
| `index.html` | `<head>` | Inserir `<script>` do GTM |
| `index.html` | início de `<body>` | Inserir `<noscript>` com iframe |

ID configurado: **GTM-5QZF57J6**

Observação: o `<noscript>` ficará no `<body>` (não no `<head>`), respeitando a regra HTML5 já documentada no projeto.

