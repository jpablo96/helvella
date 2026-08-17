import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const siteUrl = process.env.VITE_SITE_URL ?? 'https://helvella.cr'
const routes = ['', '/nosotros', '/catalogo', '/galeria']

function seoPlugin() {
  return {
    name: 'helvella-seo',
    closeBundle() {
      const urls = routes
        .map((route) => {
          const loc = route === '' ? `${siteUrl}/` : `${siteUrl}${route}`
          return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
        })
        .join('\n')

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

      const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

      writeFileSync(resolve('dist', 'sitemap.xml'), sitemap)
      writeFileSync(resolve('dist', 'robots.txt'), robots)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
})
