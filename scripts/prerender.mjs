// Runs after `vite build`: writes one static HTML file per page (so search engines get real
// content without running JavaScript), plus sitemap.xml and robots.txt.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const SSR_ENTRY = path.resolve('dist-ssr', 'entry-server.js')

const { renderPages, siteUrl } = await import(pathToFileURL(SSR_ENTRY).href)

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')
const pages = renderPages()

for (const page of pages) {
  const html = template
    .replace('<!--app-head-->', page.head)
    .replace('<!--app-html-->', page.html)

  // "/" -> index.html, "/catalogo" -> catalogo.html (served at /catalogo by static hosts)
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
  const target = path.join(DIST, file)

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html)
  console.log(`prerendered ${page.path} -> ${target} (${Math.round(html.length / 1024)} kB)`)
}

const today = new Date().toISOString().slice(0, 10)
const urls = pages
  .filter((page) => page.indexable)
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')

await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
)

await writeFile(
  path.join(DIST, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
)

await rm('dist-ssr', { recursive: true, force: true })
console.log('wrote sitemap.xml and robots.txt')
