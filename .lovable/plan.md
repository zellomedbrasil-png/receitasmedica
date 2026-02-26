
# Substituir Imagem Estática do Hero por Vídeo em Loop

## Diagnóstico

No Hero da landing page `/ebook` (linhas 403–430 de `src/pages/Ebook.tsx`), há uma `<img>` estática com a capa do e-book, envolta em um `<motion.div>` com animação de flutuação. O usuário enviou um vídeo MP4 para substituir essa imagem por um loop silencioso — muito mais impactante visualmente.

---

## Mudanças Técnicas

### 1. Copiar o asset de vídeo
```
user-uploads://Retire_a_musica_e_deixe_ele_em_formato_de_loop_per_7eaca6bb46.mp4
→ src/assets/ebook-hero.mp4
```

### 2. Substituir `<img>` por `<video>` no Hero (linhas 417–422)

Trocar o elemento de imagem por uma tag `<video>` com os atributos corretos para loop silencioso e autoplay:

```tsx
<video
  src={ebookHeroVideo}
  autoPlay
  loop
  muted
  playsInline
  className="w-52 md:w-72 rounded-2xl object-cover"
  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
/>
```

- `autoPlay` — inicia automaticamente
- `loop` — repete sem parar
- `muted` — remove o som (exigido pelo browser para autoplay funcionar)
- `playsInline` — essencial para iOS não abrir em fullscreen

### 3. Manter todos os efeitos visuais existentes

A estrutura de glow esmeralda, animação de flutuação (`y: [0, -12, 0]`), shine overlay e drop-shadow permanecem intactos — apenas o elemento interno muda de `<img>` para `<video>`.

### 4. Importar o asset no componente

```tsx
import ebookHeroVideo from "@/assets/ebook-hero.mp4";
```

---

## Resultado Esperado

O vídeo em loop aparece no lugar da imagem estática no Hero, flutuando suavemente com o mesmo efeito de glow esmeralda. Sem som. Totalmente integrado ao tema dark da landing page.
