import { SOCIAL_URLS, WHATSAPP_NUMBER, formatPhoneNumber } from '../data/contact'
import { FAQ } from '../data/faq'
import { PAGES, SEO_KEYWORDS, type PageKey, type PageSeo } from '../data/seo'
import { LOGO_URL, SHARE_IMAGE_URL, SITE_LOCALE, SITE_NAME, SITE_URL } from '../data/site'

const JSON_LD_ID = 'helvella-jsonld'
const BUSINESS_ID = `${SITE_URL}/#negocio`

interface MetaTag {
  attribute: 'name' | 'property'
  key: string
  content: string
}

export interface PageHead {
  title: string
  canonical: string
  metas: MetaTag[]
  jsonLd: Record<string, unknown>
}

const absoluteUrl = (path: string) => `${SITE_URL}${path}`

function buildBusiness(): Record<string, unknown> {
  return {
    '@type': 'Florist',
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    alternateName: ['Helvella Costa Rica', 'Helvella Flores Eternas'],
    description: PAGES.home.description,
    slogan: 'Flores que el tiempo no marchita',
    url: absoluteUrl('/'),
    image: absoluteUrl(SHARE_IMAGE_URL),
    logo: absoluteUrl(LOGO_URL),
    telephone: formatPhoneNumber(WHATSAPP_NUMBER, '-'),
    address: { '@type': 'PostalAddress', addressCountry: 'CR' },
    areaServed: { '@type': 'Country', name: 'Costa Rica' },
    sameAs: [...SOCIAL_URLS],
    priceRange: '₡₡',
    knowsAbout: [
      'Flores eternas',
      'Flores eternas en Costa Rica',
      'Flores de limpiapipas',
      'Arreglos florales artesanales',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Pedidos',
      telephone: formatPhoneNumber(WHATSAPP_NUMBER, '-'),
      availableLanguage: 'es',
      areaServed: 'CR',
    },
  }
}

function buildJsonLd(key: PageKey, page: PageSeo): Record<string, unknown> {
  const url = absoluteUrl(page.path)
  const graph: Record<string, unknown>[] = [
    buildBusiness(),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#sitio`,
      url: absoluteUrl('/'),
      name: SITE_NAME,
      inLanguage: 'es-CR',
      publisher: { '@id': BUSINESS_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'es-CR',
      isPartOf: { '@id': `${SITE_URL}/#sitio` },
      about: { '@id': BUSINESS_ID },
    },
  ]

  if (page.breadcrumb) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: url },
      ],
    })
  }

  if (key === 'home') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** Everything a page needs in <head>, shared by the pre-renderer and the browser. */
export function buildPageHead(key: PageKey): PageHead {
  const page: PageSeo = PAGES[key]
  const canonical = absoluteUrl(page.path)
  const image = absoluteUrl(SHARE_IMAGE_URL)
  const name = (metaName: string, content: string): MetaTag => ({
    attribute: 'name',
    key: metaName,
    content,
  })
  const property = (metaProperty: string, content: string): MetaTag => ({
    attribute: 'property',
    key: metaProperty,
    content,
  })

  return {
    title: page.title,
    canonical,
    metas: [
      name('description', page.description),
      name('keywords', SEO_KEYWORDS),
      name('robots', page.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'),
      name('author', SITE_NAME),
      property('og:type', 'website'),
      property('og:site_name', SITE_NAME),
      property('og:locale', SITE_LOCALE),
      property('og:title', page.socialTitle),
      property('og:description', page.description),
      property('og:url', canonical),
      property('og:image', image),
      property('og:image:alt', 'Arreglo de flores eternas hecho a mano por Helvella'),
      name('twitter:card', 'summary_large_image'),
      name('twitter:title', page.socialTitle),
      name('twitter:description', page.description),
      name('twitter:image', image),
    ],
    jsonLd: buildJsonLd(key, page),
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Serialises a page head to HTML for the build-time pre-renderer. */
export function renderPageHead(head: PageHead): string {
  const json = JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    ...head.metas.map(
      (meta) => `<meta ${meta.attribute}="${meta.key}" content="${escapeHtml(meta.content)}" />`,
    ),
    `<link rel="canonical" href="${escapeHtml(head.canonical)}" />`,
    `<script type="application/ld+json" id="${JSON_LD_ID}">${json}</script>`,
  ].join('\n    ')
}

function upsert<T extends HTMLElement>(selector: string, create: () => T): T {
  const existing = document.head.querySelector<T>(selector)
  if (existing) return existing

  const element = create()
  document.head.appendChild(element)
  return element
}

/** Updates the live document head when navigating between pages in the browser. */
export function applyPageHead(head: PageHead) {
  document.title = head.title

  for (const meta of head.metas) {
    upsert(`meta[${meta.attribute}="${meta.key}"]`, () => {
      const element = document.createElement('meta')
      element.setAttribute(meta.attribute, meta.key)
      return element
    }).setAttribute('content', meta.content)
  }

  upsert<HTMLLinkElement>('link[rel="canonical"]', () => {
    const element = document.createElement('link')
    element.rel = 'canonical'
    return element
  }).href = head.canonical

  upsert<HTMLScriptElement>(`#${JSON_LD_ID}`, () => {
    const element = document.createElement('script')
    element.id = JSON_LD_ID
    element.type = 'application/ld+json'
    return element
  }).textContent = JSON.stringify(head.jsonLd)
}
