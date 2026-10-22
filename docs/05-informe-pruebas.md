# 05 · Informe de pruebas

Fecha: 13 de octubre de 2026. Navegador: **Chromium 141 (Playwright)**, abriendo los archivos localmente (`file://`). Sin internet en el entorno de pruebas.

## Comprobado realmente
| Prueba | Resultado |
|---|---|
| Las 11 páginas HTML existen | ✔ |
| Enlaces, imágenes y anclas (`#id`) de las 11 páginas resueltos a archivos reales | ✔ 0 rotos |
| Enlaces `href="#"` | ✔ ninguno |
| Un solo `<h1>` por página; todas las imágenes con `alt` | ✔ |
| Desplazamiento horizontal a 320, 375, 390, 430, 768, 1024, 1280 y 1440 px, en las 11 páginas | ✔ ninguno (se corrigieron 5 desbordes durante las pruebas) |
| Errores de JavaScript y de carga de recursos locales | ✔ ninguno |
| Menú móvil: abre, cierra con Escape y al elegir un enlace; lista los 11 destinos | ✔ |
| Submenú «La marca» abre y navega; página actual marcada; logotipo vuelve al inicio | ✔ |
| Carrusel: botones, indicadores, contador, teclado (flechas), autoplay solo a petición | ✔ |
| Lightbox: abre, siguiente, contador, Escape, clic fuera, bloqueo de scroll | ✔ |
| Pestañas (con teclado), filtro de aplicaciones (25 → 7 en «Digital»), botón copiar | ✔ |
| Video ausente: aviso sin romper la página | ✔ |
| Formulario: valida vacíos y aclara que **no envía** | ✔ |
| Canales pendientes visibles como marcador; botones reales ocultos hasta rellenar `config.js` | ✔ |
| Contraste calculado (WCAG): marrón/crema 6,9 · rosa-texto/crema 5,7 · verde-texto/crema 5,5 · marrón oscuro/rosa 7,5 | ✔ ≥ 4,5 en texto |
| Sintaxis de `script.js` y `config.js` (`node --check`) | ✔ |

Total: 31 comprobaciones de interacción superadas, 0 fallidas en la última ejecución.

## NO comprobado (pendiente)
- Gestos táctiles reales (deslizar con el dedo en carrusel y lightbox): el código los soporta (desplazamiento nativo y eventos `touch`), pero se probó con ratón y teclado.
- Safari, Firefox y dispositivos reales.
- Lectores de pantalla (se aplicaron roles y etiquetas ARIA, pero no se probó con NVDA/VoiceOver).
- Carga de Google Fonts (el entorno no tenía internet); se verificó el respaldo con la fuente del sistema.
- Rendimiento medido (Lighthouse). Se optimizaron las imágenes (≈ 5 MB), pero no se midió.
- Reproducción de `video/hero.mp4` (no existe el archivo).
