# Estado del proyecto — Tienda pxh5as-6t

- Tienda: pxh5as-6t.myshopify.com
- Carpeta del proyecto: /home/user/shopy (repo git, rama claude/tienda-shopify-v2-y69ijo)
- Tema base: Dawn (descargado 2026-08-04, vía `shopify theme init --clone-url`)
- Entorno: Node v20.20.2, Shopify CLI 4.6.0 — OK
- Tema de trabajo subido: "Mi Tienda (Claude)" — ID 160414728444 (NO publicado)
  - Preview: https://pxh5as-6t.myshopify.com?preview_theme_id=160414728444
  - Editor: https://pxh5as-6t.myshopify.com/admin/themes/160414728444/editor
- Temas existentes en la tienda: Sense [live] #160413483260, Helio (unpublished),
  Build Your Store Theme (unpublished), Pitch (unpublished)
- Sesión de tema (Session A, `shopify theme list`/`push`): OK, login por código de dispositivo.
- Sesión de datos (Session B, `shopify store auth` para Admin API): **BLOQUEADA**.
  El flujo PKCE de `store auth` abre un servidor local en 127.0.0.1:<puerto> y
  necesita que el navegador del usuario lo alcance. Esta sesión corre en un
  contenedor remoto sin reenvío de puertos, así que el navegador del usuario NO
  puede llegar a ese localhost. Plan B en curso: pedir al usuario una clave de
  acceso de Admin API generada a mano (app personalizada) para leer/escribir el
  producto sin pasar por `store auth`.
- Producto: LEÍDO por la vía pública `products.json` (sin necesitar Admin API):
  - id numérico: 9416678768892 → gid probable `gid://shopify/Product/9416678768892`
  - handle: electric-scalp-vibration-massage-comb-infrared-head-knead-massager-red-light-hair-growth-liquid-oil-applicator-anti-hair-loss
  - Título original (proveedor, en inglés, a reescribir): "Electric Scalp
    Vibration Massage Comb Infrared Head Knead Massager Red Light Hair Growth
    Liquid Oil Applicator Anti-Hair Loss"
  - Qué es: peine/cepillo masajeador eléctrico de cuero cabelludo con luz roja
    infrarroja (630nm), 3 modos de vibración/amasado tipo EMS, depósito de 6ML
    para infundir sérum/aceite capilar mientras se masajea. Colores: rojo y
    negro. Precio actual: 48.99 (moneda de la tienda).
  - 9 fotos descargadas en `fotos-producto/producto-1.jpg` … `producto-9.jpg`.
    Calidad de imagen buena (renders + una foto con modelo), pero con textos
    promocionales en inglés incrustados en las imágenes — estética de anuncio
    de proveedor, no de marca propia.
  - Escritura (título/descripción/plantilla) vía Admin API: PENDIENTE — sigue
    bloqueada la Sesión B (ver arriba). Si no se resuelve, usar plan B: dejar
    el texto listo para copiar/pegar y las instrucciones de asignar plantilla
    a mano (3 pasos) en la fase 5.

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión (tema OK; datos pendientes por el bloqueo de arriba)
- [x] 2 Proyecto (Dawn descargado, copiado, primera subida hecha)
- [ ] 3 Diseño
- [ ] 4 Construcción
- [ ] 5 Páginas
- [ ] 6 Publicación

## Decisiones de diseño
- Confirmado por el usuario: tienda "elegante y atractiva visualmente", jugando
  con rojo + dorado, cuidado al detalle ("que todo luzca bien"), estilo "un
  poco tecnológico también".
- Paleta propuesta: negro/granate muy oscuro de fondo (#150607 aprox.), rojo
  intenso de acento (#C81E3A aprox., cercano al rojo del producto), dorado cálido
  para detalles/CTAs (#C9A24B aprox.), texto claro tipo crema (#F5EDE3).
- Tipografía: sans-serif grande y contundente para titulares (estilo tech
  premium), sans limpia para cuerpo.
- Estructura portada acordada: 1) hero con producto flotando + haces de luz roja
  + claim corto; 2) grid de 4 beneficios con icono (luz roja 630nm, 3 modos de
  masaje, depósito de sérum, ergonomía); 3) cómo se usa en 3 pasos; 4) banda de
  reseñas/confianza; 5) cierre con llamada a comprar.
- El usuario pidió reescribir la descripción del producto para que sea más
  interesante/vendedora (no usar el texto de proveedor tal cual).
- El usuario quiere fotos generadas/limpiadas con IA — pendiente de la clave de
  OpenAI (pedida, fase 3b en curso).

## Secciones creadas
(se rellena en la fase 4)
