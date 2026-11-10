import { useEffect } from 'react'
import type { PageKey } from '../data/seo'
import { applyPageHead, buildPageHead } from '../utils/seo'

interface SeoProps {
  /** Key of the page in `src/data/seo.ts`, where titles and descriptions live. */
  page: PageKey
}

/**
 * Keeps the document head in sync while navigating in the browser.
 * The same tags are written into each page's static HTML at build time (scripts/prerender.mjs).
 */
export default function Seo({ page }: SeoProps) {
  useEffect(() => {
    applyPageHead(buildPageHead(page))
  }, [page])

  return null
}
