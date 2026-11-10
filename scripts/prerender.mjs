// Runs after `vite build`: writes one static HTML file per page (so search engines get real
// content without running JavaScript), plus sitemap.xml and robots.txt.
//
// The server bundle is built here with Vite's build() API, not `vite build --ssr`.
// That CLI path goes through the environment builder. Cloudflare's Vite plugin opts into
// the builder and then builds the client environment, which emits
// dist-ssr/assets/entry-server-<hash>.js instead of dist-ssr/entry-server.js.
import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const DIST = 'dist'
const SSR_OUT_DIR = 'dist-ssr'

await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: SSR_OUT_DIR,
    emptyOutDir: true,
    copyPublicDir: false,
  },
  ssr: {
    target: 'node',
  },
})

const SSR_ENTRY = await resolveSsrEntry(SSR_OUT_DIR)
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

await rm(SSR_OUT_DIR, { recursive: true, force: true })
console.log('wrote sitemap.xml and robots.txt')

async function resolveSsrEntry(outDir) {
  for (const name of ['entry-server.js', 'entry-server.mjs']) {
    const file = path.resolve(outDir, name)
    try {
      await access(file)
      return file
    } catch {
      // try the next filename Vite may emit
    }
  }

  throw new Error(
    `SSR build did not write ${outDir}/entry-server.js. Prerender needs that module.`,
  )
}
