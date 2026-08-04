# Estado del proyecto — Orlure (pxh5as-6t)

- Tienda: pxh5as-6t.myshopify.com — nombre de marca elegido: **Orlure**
- Carpeta del proyecto: /home/user/shopy (repo git, rama claude/tienda-shopify-v2-y69ijo)
- Tema base: Dawn (descargado 2026-08-04, vía `shopify theme init --clone-url`)
- Entorno: Node v20.20.2, Shopify CLI 4.6.0 — OK
- Tema de trabajo subido: "Mi Tienda (Claude)" — ID 160414728444 (NO publicado)
  - Preview portada: https://pxh5as-6t.myshopify.com?preview_theme_id=160414728444
  - Preview ficha de producto (plantilla mt, aún no asignada al producto):
    añadir `?view=mt&preview_theme_id=160414728444` a la URL del producto
  - Editor: https://pxh5as-6t.myshopify.com/admin/themes/160414728444/editor
- Temas existentes en la tienda: Sense [live] #160413483260, Helio (unpublished),
  Build Your Store Theme (unpublished), Pitch (unpublished)
- Sesión de tema (Session A, `shopify theme list`/`push`): OK, login por código de dispositivo.
- Sesión de datos (Session B, `shopify store auth` para Admin API): **BLOQUEADA**.
  El flujo PKCE de `store auth` necesita un servidor local en 127.0.0.1:<puerto>
  alcanzable por el navegador del usuario; este entorno remoto no tiene reenvío
  de puertos. Se intentó la alternativa de "app personalizada" (Admin API token
  manual) pero el usuario se quedó atascado en la verificación de email de su
  cuenta de Shopify y se decidió seguir sin ello.
  - Lectura de producto: resuelta igualmente por la vía pública `products.json`
    (sin necesitar Admin API).
  - Escritura (título/descripción de catálogo, asignar plantilla `mt` al
    producto, subir fotos a la galería oficial): sigue pendiente. Plan B
    aplicado: la plantilla `mt` está construida y probada (`?view=mt`) pero NO
    asignada; el título/descripción "bonitos" viven como ajustes editables de
    la sección `mt-producto` (se ven en la web ya, independientemente del
    catálogo). Pendiente dar al usuario los 3 pasos manuales para asignar la
    plantilla y, si quiere, actualizar el título/descripción del catálogo.
- Producto: LEÍDO por la vía pública `products.json`:
  - id numérico: 9416678768892 (gid probable `gid://shopify/Product/9416678768892`)
  - variant id: 50915206562044 (única variante, "New Upgrade-Red", 48.99, sin opciones reales)
  - handle: electric-scalp-vibration-massage-comb-infrared-head-knead-massager-red-light-hair-growth-liquid-oil-applicator-anti-hair-loss
  - Qué es: peine/cepillo masajeador eléctrico de cuero cabelludo con luz roja
    infrarroja (630nm), 3 modos de vibración/amasado tipo EMS, depósito de 6ML
    para infundir sérum/aceite capilar mientras se masajea. Colores: rojo y negro.
  - 9 fotos originales descargadas en `fotos-producto/producto-1.jpg`…`producto-9.jpg`
    (calidad de imagen buena pero con textos promocionales en inglés incrustados).
- Nombre de la tienda en Shopify (shop.name) sigue siendo "Mi tienda 3" (dato de
  cuenta, no de tema — no se puede cambiar por Admin API bloqueada). Pendiente
  que el usuario lo cambie a "Orlure" en Configuración → General.

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión (tema OK; datos de Admin API bloqueados, resuelto por vía pública)
- [x] 2 Proyecto (Dawn descargado, copiado, primera subida hecha)
- [x] 3 Diseño (brief confirmado con el usuario)
- [x] 3b Fotos IA (10 fotos + logo + favicon + antes/después generadas con OpenAI gpt-image-2)
- [x] 4 Construcción (secciones propias, CSS/JS globales)
- [x] 5 Páginas (producto, header, footer — legales pendientes de rellenar por el usuario)
- [x] 6 Publicación (subido como tema NO publicado, autorevisado por HTML, pendiente
      visto bueno del usuario para publicarlo como tema activo)

## Decisiones de diseño
- Marca: **Orlure**, logo del usuario (llama roja→dorada + tipografía serif),
  eslogan "Be bold, be beautiful, be you." / "Sé audaz. Sé hermosa, sé tú."
- Estilo: elegante, tecnológico, rojo + dorado (coral/vermillion, no rojo puro).
- Paleta real usada: fondo #0D0507 / #200C11, texto crema #F5EDE3, acento rojo
  #C2503F / #7A241B, dorado #D9A44E / #F0C77E.
- Tipografía: Cormorant Garamond (titulares, serif elegante, a juego con el
  logo) + Inter (cuerpo, sans limpia moderna).
- El usuario pidió explícitamente: colores rojo+dorado, estilo tecnológico,
  fotos de mujeres usando el producto (elegantes), sección antes/después,
  mensaje de "envío gratis y seguro" para generar confianza, que la tienda
  pueda escalar a más productos en el futuro (colección destacada dinámica).
- Reseñas: son de EJEMPLO/ilustrativas (tienda sin ventas aún) — pendiente que
  el usuario decida: dejarlas, instalar app de reseñas verificadas, o pasar
  reseñas reales de otra plataforma si las tiene. NO se presentaron como reales.
- Vídeos UGC (TikTok/Facebook): no se descargó ni reutilizó contenido de
  terceros sin permiso (derechos de autor). Dawn trae sección de vídeo nativa
  lista para cuando el usuario tenga un vídeo propio o con permiso.

## Secciones creadas (prefijo `mt-`)
- `sections/mt-hero.liquid` — apertura con imagen de fondo (IA), titular, CTA.
- `sections/mt-confianza.liquid` — barra de 4 iconos de confianza (envío,
  pago, devolución, clientas), con bloques editables.
- `sections/mt-beneficios.liquid` — grid de 4 tarjetas beneficio (bloques),
  imagen + título + texto.
- `sections/mt-como-usar.liquid` — 3 pasos numerados con foto.
- `sections/mt-antes-despues.liquid` — comparador deslizante antes/después
  (JS en `mt-scripts.js`, función `initComparadores`).
- `sections/mt-resenas.liquid` — carrusel marquee de reseñas (bloques).
- `sections/mt-cta.liquid` — llamada final, admite producto real (precio
  dinámico) o enlace manual.
- `sections/mt-producto.liquid` — página de producto completa: galería
  (bloques de imagen con respaldo en `assets/`, swap por JS), columna de
  compra (precio dinámico, variantes ocultas si solo hay 1, cantidad,
  añadir al carrito con estado agotado), fila de confianza, descripción rica
  (intro + características en bloques + qué incluye).
- `templates/index.json` — portada: hero, confianza, beneficios, cómo usar,
  antes/después, colección destacada (nativa de Dawn, dinámica — collection
  "all", escala sola con productos nuevos), reseñas, cta.
- `templates/product.mt.json` — producto: principal (mt-producto), cómo usar,
  antes/después, reseñas. Sufijo de plantilla: `mt` (pendiente de asignar).
- `assets/mt-styles.css` — tokens de marca + estilos de todas las secciones.
- `assets/mt-scripts.js` — reveals on scroll, galería, variantes/cantidad,
  comparador antes/después.
- Header (`sections/header.liquid`) y footer (`sections/footer.liquid`):
  logo de respaldo (`mt-logo-oscuro.png`) cuando no hay `settings.logo`;
  footer configurado con marca + navegación (menú `main-menu` y `footer`) +
  políticas legales activadas (`show_policy: true`).
- `layout/theme.liquid`: favicon (`mt-favicon.png`), fuentes de Google
  (Cormorant Garamond + Inter).
- `config/settings_data.json`: esquemas de color 1-5 recoloreados a la marca,
  tipografía global (`cormorant_n6` / `assistant_n4`), footer configurado.

## Imágenes generadas con IA (OpenAI gpt-image-2, en `assets/`)
mt-hero-fondo.jpg, mt-producto-galeria-1/2/3.jpg, mt-beneficio-1/2/3/4.jpg,
mt-paso-1/2/3.jpg, mt-antes.jpg, mt-despues.jpg, mt-logo-oscuro.png,
mt-favicon.png. Coste aproximado: dentro del presupuesto de 2-3 € acordado.

## Auto-revisión hecha
No fue posible tomar capturas con navegador (Chromium no pudo conectar a
través del proxy del entorno ni siquiera a sitios de prueba — límite del
entorno, no del tema). Se revisó en su lugar el HTML servido real de la
portada y de la ficha de producto (con cookies de previsualización), sección
por sección: sin errores de Liquid, todos los textos/precios/estructura
correctos. Se encontró y corrigió un error real (`image_url` sobre imagen en
blanco en la galería del producto) antes de enseñar nada al usuario.

## Pendiente de decisión/acción del usuario
1. Revisar el enlace de previsualización y dar el visto bueno para publicar.
2. Rellenar las políticas legales nativas (Configuración → Políticas, 3 clics).
3. Cambiar el nombre de la tienda a "Orlure" en Configuración → General.
4. Decidir sobre las reseñas (dejar de ejemplo / app de reseñas / reales).
5. Cuando pueda resolver la verificación de email de su cuenta de Shopify (o
   en otra sesión sin las limitaciones de este entorno), retomar la conexión
   de datos para automatizar: asignar la plantilla `mt` al producto, escribir
   título/descripción del catálogo, y subir las fotos generadas a la galería
   oficial. Mientras tanto, instrucciones manuales de 3 pasos entregadas.
