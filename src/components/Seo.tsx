import { useEffect } from 'react'
import { SITE_URL, SITE_NAME, LOGO_URL, DEFAULT_SEO } from '../data/site'
import { SOCIAL_URLS, WHATSAPP_NUMBER } from '../data/contact'

interface SeoProps {
  /** Título breve en la pestaña del navegador */
  title?: string
  /** Título completo para redes y buscadores */
  socialTitle?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = url
}

function setJsonLd(data: Record<string, unknown>) {
  const id = 'helvella-jsonld'
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo({
  title = DEFAULT_SEO.title,
  socialTitle = DEFAULT_SEO.socialTitle,
  description = DEFAULT_SEO.description,
  path = '',
  type = 'website',
  noindex = false,
}: SeoProps) {
  const url = `${SITE_URL}${path}`
  const image = `${SITE_URL}${LOGO_URL}`
  const tabTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`

  useEffect(() => {
    document.title = tabTitle
    document.documentElement.lang = 'es'

    setMeta('description', description)
    setMeta('keywords', DEFAULT_SEO.keywords)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('author', SITE_NAME)

    setMeta('og:title', socialTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:image:alt', `${SITE_NAME} — Logo`, 'property')
    setMeta('og:locale', DEFAULT_SEO.locale, 'property')
    setMeta('og:site_name', SITE_NAME, 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', socialTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)

    setCanonical(url)

    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      alternateName: 'Helvella Costa Rica',
      description: DEFAULT_SEO.description,
      url: SITE_URL,
      image,
      logo: image,
      telephone: `+${WHATSAPP_NUMBER.replace(/(\d{3})(\d{4})(\d{4})/, '+$1-$2-$3')}`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CR',
        addressLocality: 'Costa Rica',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Costa Rica',
      },
      sameAs: [...SOCIAL_URLS],
      priceRange: '₡₡',
      knowsAbout: [
        'Flores eternas en Costa Rica',
        'Helvella Costa Rica',
        'Manualidades',
        'Arreglos florales',
        'Limpiapipas',
      ],
    })
  }, [tabTitle, socialTitle, description, url, image, type, noindex])

  return null
}
