import { SOCIAL_URLS, WHATSAPP_NUMBER, formatPhoneNumber } from '../data/contact'
import { FAQ } from '../data/faq'
import { galleryItems } from '../data/gallery'
import { products } from '../data/products'
import { PAGES, SEO_KEYWORDS, type PageKey, type PageSeo } from '../data/seo'
import {
  BUSINESS_PHOTO_URL,
  SHARE_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  SQUARE_LOGO_URL,
} from '../data/site'
import type { Product } from '../data/types'

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
    image: absoluteUrl(BUSINESS_PHOTO_URL),
    logo: absoluteUrl(SQUARE_LOGO_URL),
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

/** "₡5.500" -> 5500, "Desde ₡18.000" -> 18000. */
function parsePrice(price: string): number | null {
  const digits = price.replace(/\D/g, '')
  return digits ? Number(digits) : null
}

function buildOffer(product: Product): Record<string, unknown> {
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    itemOffered: { '@type': 'Product', name: product.name, description: product.description },
    availability: product.available
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: { '@id': BUSINESS_ID },
  }

  const amount = product.price ? parsePrice(product.price) : null
  if (amount !== null) {
    const startingPrice = /desde/i.test(product.price ?? '')
    offer.priceSpecification = {
      '@type': 'PriceSpecification',
      priceCurrency: 'CRC',
      ...(startingPrice ? { minPrice: amount } : { price: amount }),
    }
  }

  return offer
}

/** The whole catalog, with prices, as the business's list of offers. */
function buildOfferCatalog(url: string): Record<string, unknown> {
  return {
    '@type': 'OfferCatalog',
    '@id': `${url}#catalogo`,
    name: 'Catálogo de flores eternas',
    url,
    numberOfItems: products.length,
    itemListElement: products.map(buildOffer),
  }
}

/** Every gallery photo with its caption, so image search can read them. */
function buildImageGallery(url: string): Record<string, unknown> {
  return {
    '@type': 'ImageGallery',
    '@id': `${url}#galeria`,
    name: 'Galería de flores eternas',
    url,
    image: galleryItems.flatMap((item) =>
      item.images.map((image) => ({
        '@type': 'ImageObject',
        contentUrl: absoluteUrl(image),
        name: item.title,
        caption: item.description,
        creator: { '@id': BUSINESS_ID },
        creditText: SITE_NAME,
        copyrightNotice: SITE_NAME,
      })),
    ),
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

  if (key === 'catalog') graph.push(buildOfferCatalog(url))
  if (key === 'gallery') graph.push(buildImageGallery(url))

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
  const image = absoluteUrl(SHARE_IMAGE.url)
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
      property('og:image:type', SHARE_IMAGE.type),
      property('og:image:width', String(SHARE_IMAGE.width)),
      property('og:image:height', String(SHARE_IMAGE.height)),
      property('og:image:alt', SHARE_IMAGE.alt),
      name('twitter:card', 'summary_large_image'),
      name('twitter:title', page.socialTitle),
      name('twitter:description', page.description),
      name('twitter:image', image),
      name('twitter:image:alt', SHARE_IMAGE.alt),
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
