import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { PAGES, type PageKey } from './data/seo'
import { SITE_URL } from './data/site'
import { buildPageHead, renderPageHead } from './utils/seo'

/** Build-time entry: scripts/prerender.mjs uses it to write one static HTML file per page. */
export interface PrerenderedPage {
  path: string
  indexable: boolean
  head: string
  html: string
}

export const siteUrl = SITE_URL

export function renderPages(): PrerenderedPage[] {
  return (Object.keys(PAGES) as PageKey[]).map((key) => {
    const page = PAGES[key]

    return {
      path: page.path,
      indexable: page.indexable,
      head: renderPageHead(buildPageHead(key)),
      html: renderToString(
        <StrictMode>
          <StaticRouter location={page.path}>
            <AppRoutes />
          </StaticRouter>
        </StrictMode>,
      ),
    }
  })
}
