# Helvella — Sitio Web

Sitio web estático para **Helvella**, empresa de arte y manualidades costarricense.

## Páginas

- **Inicio** — Presentación, productos destacados y enlaces a redes
- **Nosotros** — Historia, valores y planes futuros
- **Catálogo** — Productos con pedidos por WhatsApp
- **Galería** — Creaciones y pedidos entregados

## Desarrollo

```bash
npm install
npm run dev
```

## Build para producción

```bash
npm run build
```

Los archivos estáticos se generan en `dist/` y pueden desplegarse en GitHub Pages, Netlify, Vercel, etc.

## Personalización

- **Productos:** editar `src/data/catalog.ts`
- **Galería:** editar `src/data/gallery.ts` y agregar fotos en `public/gallery/`
- **Logo:** `public/logo/H Helvella.png`
- **URL del sitio (SEO):** configurar `VITE_SITE_URL` en `.env` (ver `.env.example`)
- **Redes sociales y WhatsApp:** constantes en `src/data/catalog.ts`
- **Colores:** variables CSS en `src/index.css` (morado y beige)

### Agregar fotos a la galería

1. Coloca las imágenes en `public/gallery/` (ej: `ramo-boda.jpg`)
2. En `src/data/gallery.ts`, agrega o edita una entrada con `image: '/gallery/ramo-boda.jpg'`

## SEO

El sitio incluye optimización técnica para buscadores:

- Meta tags (descripción, Open Graph, Twitter Cards)
- Títulos y descripciones únicos por página
- `robots.txt` y `sitemap.xml` (generados en cada build)
- Datos estructurados JSON-LD (negocio local)
- Textos en español con palabras clave relevantes

### Para aparecer en Google

1. Despliega el sitio con tu dominio real
2. Crea `.env` con `VITE_SITE_URL=https://tudominio.com`
3. Vuelve a hacer `npm run build` y despliega
4. Registra el sitio en [Google Search Console](https://search.google.com/search-console)
5. Envía el sitemap: `https://tudominio.com/sitemap.xml`
6. Mantén activas las redes sociales (Instagram, Facebook) enlazando al sitio
