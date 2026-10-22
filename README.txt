SAMKANELI · SITIO WEB MULTIPÁGINA (HTML5 + CSS3 + JavaScript vanilla)
=====================================================================
Sin frameworks, sin compilación, sin Node. Se edita con Visual Studio Code,
Dreamweaver o cualquier editor de texto, y se abre con doble clic.

1. CÓMO ABRIR EL PROYECTO
-------------------------
- Descomprime la carpeta SAMKANELI completa (no abras los archivos desde dentro del ZIP).
- Mantén juntas todas las carpetas: las rutas son relativas.

2. QUÉ ARCHIVO ABRIR
--------------------
- Doble clic en  index.html  (portada).

3. DÓNDE ESTÁ CADA PÁGINA
-------------------------
 Inicio .................. index.html
 Empresa ................. empresa/empresa.html
 Público objetivo ........ publico-objetivo/publico-objetivo.html
 Identidad corporativa ... identidad-corporativa/identidad-corporativa.html
 Identidad visual ........ identidad-visual/identidad-visual.html
 Imagen institucional .... imagen-institucional/imagen-institucional.html
 Aplicaciones ............ aplicaciones/aplicaciones.html
 Comunicación ............ comunicacion/comunicacion.html
 Manual de identidad ..... manual-identidad/manual-identidad.html
 Propuestas de mejora .... propuestas/propuestas.html
 Contacto ................ contacto/contacto.html

 Cada página tiene su CSS con el mismo nombre en su carpeta (ej. empresa/empresa.css).
 Archivos COMPARTIDOS (no los borres): global.css, script.js, config.js.
 La portada usa inicio.css.

4. CÓMO MODIFICAR TEXTOS
------------------------
- Abre el .html de la página, busca el texto (Ctrl+F) y cámbialo entre las etiquetas.
- No borres las etiquetas <...> ni las comillas de los atributos.

5. CÓMO CAMBIAR UNA IMAGEN
--------------------------
- Guarda tu imagen nueva en la carpeta correspondiente de img/ (ver sección 20) y,
  en el HTML, cambia la ruta:  <img src="../img/mockups/bolsa-papel.webp" ...>
- Escribe siempre un texto en alt="..." que describa la imagen.
- Formatos recomendados: .webp o .jpg para fotos (máx. 1600 px de ancho, menos de 300 KB);
  .png solo si necesitas transparencia.
- Las imágenes originales sin tocar están en img/originales/.

6. CÓMO AÑADIR UNA FOTO A UN CARRUSEL
-------------------------------------
- En el HTML busca  <figure class="car-slide" ...>  dentro del carrusel (class="carousel").
- Copia una <figure class="car-slide"> completa, pégala debajo de otra, cambia src, alt
  y el texto de <figcaption>. Si quieres que se amplíe, deja  data-lightbox  y  data-group
  con el mismo valor que las demás imágenes del carrusel.
- Los puntos y el contador "1 / 6" se actualizan solos. Para el ejemplo "1 de 6" del
  atributo aria-label, actualiza el número a mano (opcional).

7. CÓMO REEMPLAZAR EL LOGOTIPO
------------------------------
- Logotipos: img/logo/  (imagotipo-rosa-blanco.png, imagotipo-transparente.png,
  imagotipo-fondo-blanco.png, logotipo-verde.png, avatar-circular.png, etc.).
- Para cambiar el de la cabecera, reemplaza img/logo/imagotipo-transparente.png
  conservando el MISMO nombre y proporción (es lo más simple). Mascota: img/mascota/mascota.png
- Favicon: la mascota (img/mascota/mascota.png). Se declara en el <head> de cada página.

8. CÓMO AÑADIR UN VIDEO
-----------------------
- Guarda tu video como  video/hero.mp4  (silencioso o corto, menos de 15 MB).
- La portada (index.html, bloque "La marca en movimiento") ya lo busca: solo se solicita cuando
  alguien pulsa "Reproducir". Si el archivo no existe aparece un aviso y no hay errores.
- Para otro nombre: cambia data-video-slot="video/hero.mp4" en index.html.

9. CÓMO MODIFICAR LOS COLORES
-----------------------------
- Abre global.css: arriba están las variables  :root { --rosa, --marron, --crema, --verde ... }
- Cambia el código HEX ahí y se actualiza toda la web.
- --rosa-texto y --verde-texto son versiones más oscuras para escribir texto con buen contraste.

10. CÓMO CAMBIAR LAS FUENTES
----------------------------
- En global.css: --f-display (titulares, hoy Fredoka) y --f-body (textos, hoy Nunito).
- Las fuentes se cargan de Google Fonts desde cada <head> (línea <link href="https://fonts.googleapis.com/...">).
  Si cambias de fuente, cambia también esa línea. Sin internet se usa una fuente del sistema.
- Para usar una fuente propia (por ejemplo la del logotipo, si se obtiene): guárdala en fonts/
  y declara @font-face en global.css.

11. CÓMO EDITAR EL MENÚ
-----------------------
- El menú está repetido en las 11 páginas, dentro de <header class="site-header">.
- Para añadir o cambiar un enlace, hay que editarlo en cada archivo .html (usa
  "Buscar en archivos" de VS Code: Ctrl+Shift+F, y busca el texto del enlace).
- En las páginas dentro de carpetas las rutas llevan ../  (ej. ../index.html).

12. CÓMO ACTUALIZAR LAS REDES SOCIALES  /  13. CÓMO CONFIGURAR EL CONTACTO
--------------------------------------------------------------------------
- TODO se hace en un solo archivo:  config.js
    whatsapp:  "51XXXXXXXXX"   (solo dígitos, con código de país)
    instagram: "https://www.instagram.com/usuario"
    facebook / tiktok: URL completa
    email:     "correo@dominio.com"
    direccion: "texto de la ubicación"
- Mientras un campo esté vacío, la web muestra el canal como PENDIENTE y no inventa enlaces.
- Al rellenarlo se activan los botones del pie de página, la portada, los sabores y Contacto.
- El formulario de contacto es una DEMOSTRACIÓN: valida en el navegador pero NO envía
  nada. Para recibir mensajes reales usa WhatsApp o correo, o conecta un servicio de formularios.

14. CÓMO IDENTIFICAR LOS RECURSOS PENDIENTES
--------------------------------------------
- En VS Code: Ctrl+Shift+F y busca  REEMPLAZAR  (comentarios HTML con lo que falta).
- En pantalla se ven como recuadros punteados "Espacio para imagen final" y textos
  como [AGREGAR NÚMERO DE WHATSAPP].
- La lista completa está en docs/06-pendientes.md.

15. CÓMO COMPROBAR LAS RUTAS
----------------------------
- Abre cada página y revisa que se vean las imágenes. En VS Code, Ctrl+clic sobre una ruta
  en src="..." te lleva al archivo (si no existe, la ruta está mal).
- Regla: archivos en la raíz  -> img/...   |   archivos en una carpeta -> ../img/...

16. ARCHIVOS QUE NO DEBEN ELIMINARSE
------------------------------------
 index.html, global.css, script.js, config.js, inicio.css, las 10 carpetas de páginas
 (con su .html y .css) y las carpetas img/logo, img/mascota, img/fotografia, img/mockups,
 img/fondos, img/referencias.
 Puedes mover img/originales/ fuera del sitio publicado (son respaldos, pesan ~40 MB),
 pero guárdala: contiene los archivos originales intactos.

17. SI UNA IMAGEN NO APARECE
----------------------------
 a) Comprueba mayúsculas/minúsculas y espacios del nombre (en servidores importan).
 b) Comprueba si la ruta lleva ../ (páginas en carpeta) o no (index.html).
 c) Comprueba que el archivo está en la carpeta indicada.
 d) Abre la consola del navegador (F12) y mira la pestaña Red/Console para ver qué ruta falla.

18. CÓMO PROBAR LA VERSIÓN MÓVIL
--------------------------------
- En Chrome o Edge: F12 -> icono de dispositivo (Ctrl+Shift+M) -> elige un teléfono o ancho 320-430 px.
- Prueba: menú hamburguesa, carruseles (arrastrar), lightbox (tocar una imagen) y que no haya desplazamiento lateral.

19. VISUAL STUDIO CODE / DREAMWEAVER
------------------------------------
- VS Code: Archivo -> Abrir carpeta -> elige SAMKANELI. Extensión opcional "Live Server" para ver cambios al guardar.
- Dreamweaver: Sitio -> Nuevo sitio -> carpeta raíz SAMKANELI.
- Todo funciona también abriendo index.html con doble clic.

20. ESTRUCTURA DE CARPETAS
--------------------------
SAMKANELI/
 index.html · inicio.css · global.css · script.js · config.js · README.txt
 empresa/ publico-objetivo/ identidad-corporativa/ identidad-visual/
 imagen-institucional/ aplicaciones/ comunicacion/ manual-identidad/
 propuestas/ contacto/        (cada una: página .html + su .css)
 img/logo/        variantes del logotipo
 img/mascota/     mascota y sello del eslogan
 img/fotografia/  fotos y referencias de producto
 img/mockups/     empaques, uniformes, local, redes, papelería
 img/fondos/      banners y fondos
 img/referencias/ infografías y boceto
 img/originales/  archivos originales sin modificar (respaldo)
 video/           aquí va hero.mp4 (vacío por ahora)
 docs/            diagnóstico, inventario, dirección creativa, prompts, pruebas, pendientes

NOTAS HONESTAS
--------------
- Las imágenes de producto, empaques, local y redes son REFERENCIAS / MOCKUPS CONCEPTUALES,
  no fotografías de productos o locales reales. Se rotulan en la web como tales.
- No hay precios, teléfonos, direcciones ni testimonios: no estaban confirmados.
- Nombre de marca: se usa SAMKANELI (el logotipo dice "Samkaneli"); la ficha trae una
  vez "SANKANELI". Confirmar.
