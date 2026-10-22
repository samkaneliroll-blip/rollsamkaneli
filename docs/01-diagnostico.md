# 01 · Diagnóstico de la ficha y de la web existente

Formato de cada hallazgo: **Problema → por qué importa → solución → dónde**.

## A. Fortalezas (verificadas en los archivos)
- Mascota de rollo de canela reconocible, con frutas sobre la cabeza (`SAMKANELI.png`).
- Paleta pastel definida en la ficha (rosa, marrón canela, crema, verde) y coherente con el arte.
- Combinación diferenciadora: canela + frutas de la Selva Central.
- La ficha incluye misión, visión (proyección a 2030), valores y propuesta de uniformes (polo crema, mandil rosa, gorro marrón).
- Tono de comunicación amigable, acogedor, responsable y confiable.
- Cinco propuestas de mejora en la ficha (manual básico, publicidad, coherencia, redes, nuevas aplicaciones).

## B. Debilidades
| Problema | Por qué importa | Solución | Dónde |
|---|---|---|---|
| El campo NOMBRE de la ficha dice «SANKANELI»; el logotipo y el resto, «SAMKANELI» | Inconsistencia de marca | Se usa SAMKANELI; **confirmar**; no se tocó el arte | Ficha; `empresa.html` (aviso) |
| El rosa aparece como #FAACD0 y como #FAADC0; el RGB (250,173,192) = #FAADC0; el fondo del logotipo mide ≈ #FFB8CA | Colores distintos entre documento y arte | Se usa #FAADC0; discrepancia documentada | `global.css`, `identidad-visual.html` |
| Los CMYK de la ficha parecen inconsistentes con el RGB (rosa y crema) | Riesgo al imprimir | Validar con prueba de color antes de producir | `identidad-visual.html` |
| No hay normas de uso del logotipo | Usos incoherentes | Manual web con reglas marcadas «recomendación propuesta» | `manual-identidad.html` |
| No hay fotografías reales del producto; las imágenes son generadas/mockups | Confianza y antojo reales | Se rotulan «referencia/mockup» y se dejan espacios editables | todas las páginas |
| El proyecto traía **testimonios con estrellas** (`dulce.png`) y un **certificado tipo Indecopi** (`autentico.png`) | Son pruebas sociales/legales no verificadas | No se usan | `docs/02-inventario-recursos.md` |
| `uniformes.jpg` muestra un letrero de otra marca («dulce canela») | Confusión de marca | No se usa; se reemplaza por el mockup de uniformes SAMKANELI | idem |
| Ficha y web mencionan «agricultura local y sostenible» sin prácticas documentadas | Afirmación sin respaldo | Se marca «por documentar» | `identidad-corporativa.html` |

## C. Oportunidades
Catálogo visual por sabor, fotografía gastronómica consistente, etiquetas de sabor, contenido para redes, campañas estacionales, experiencia web que despierte antojo. Implementadas como estructura en esta web.

## D. Riesgos visuales y comerciales
- **Exceso de rosa / apariencia infantil** → el rosa se limita a detalles y bloques; crema y marrón sostienen el contraste; el producto es protagonista.
- **Texto rosa o verde pastel sobre crema** no es legible (contraste 1,56 y 1,25) → se crean `--rosa-texto` (#A5306A) y `--verde-texto` (#3F6B2A) solo para texto (5,7 y 5,5 sobre crema).
- **Decoración botánica excesiva** → hojas y espirales solo como apoyo.

## E. Revisión técnica del proyecto original
| Problema detectado | Por qué importa | Solución | Archivo |
|---|---|---|---|
| `manual-identidad` y `propuestas` (HTML, CSS y JS) tenían 0 bytes | 2 de las páginas no existían | Se crearon completas | `manual-identidad/`, `propuestas/` |
| No existía página de Contacto; la navegación tenía 10 opciones | Faltaba un destino | Se creó `contacto/contacto.html` | `contacto/` |
| Unos 80 enlaces/imágenes rotos (rutas sin carpeta, `SAMKANELI.pngS`, `aplicaciones.htmls`, `amigable.png` vs `Amigable.png`, archivos inexistentes) | Imágenes y páginas que no cargan | Rutas reconstruidas; verificador automático en 11 páginas | todas |
| ≈ 40 enlaces `href="#"` | Botones sin destino | Eliminados; todo enlace apunta a un destino real | todas |
| `script.js`: observadores de revelado duplicados y `backTop.addEventListener` sin comprobar existencia | Errores de consola en páginas sin ese elemento | `script.js` nuevo, cada módulo comprueba sus elementos | `script.js` |
| Menú copiado a mano y con rutas distintas por página | Navegación incoherente | Menú único generado igual en las 11 páginas | cabecera |
| Datos no confirmados en el código («Pangoa · Satipo · Junín», un enlace de TikTok) | Información inventada | Reemplazados por marcadores + `config.js` | `contacto.html`, pie |
| Imágenes de 2–2,6 MB en PNG | Carga lenta | Copias WebP/PNG optimizadas (≈ 5 MB en total frente a ≈ 25 MB solo en la carpeta `img/` original) | `img/` |
| Fuentes Google sin respaldo | Sin internet cambia el diseño | Pilas de respaldo en `--f-display` y `--f-body` | `global.css` |

Nota: el documento «Desarrollo de la identidad visual para el emprendimiento de rollos de canela» no se encontró como archivo aparte; se trabajó con la ficha, `SAMKANELI (2).docx` y sus 23 imágenes incrustadas.
