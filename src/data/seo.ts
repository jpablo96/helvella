export interface PageSeo {
  /** Route path, also used for the canonical URL. */
  path: string
  /** Browser tab and search result title (aim for under ~60 characters). */
  title: string
  /** Title shown when the page is shared on social networks. */
  socialTitle: string
  /** Search result snippet (aim for under ~160 characters). */
  description: string
  /** Label in breadcrumb structured data; omitted for the home page. */
  breadcrumb?: string
  /** False keeps the page out of search engines and the sitemap. */
  indexable: boolean
}

export const PAGES = {
  home: {
    path: '/',
    title: 'Flores Eternas en Costa Rica | Helvella',
    socialTitle: 'Helvella | Flores Eternas en Costa Rica',
    description:
      'Flores eternas en Costa Rica hechas a mano con limpiapipas: rosas, girasoles, tulipanes, macetitas y arreglos personalizados. Envíos a todo el país.',
    indexable: true,
  },
  catalog: {
    path: '/catalogo',
    title: 'Catálogo de Flores Eternas en Costa Rica | Helvella',
    socialTitle: 'Catálogo de Flores Eternas en Costa Rica | Helvella',
    description:
      'Catálogo y precios de flores eternas de limpiapipas en Costa Rica: rosas, girasoles, tulipanes, macetitas, ramos y arreglos. Pedidos por WhatsApp.',
    breadcrumb: 'Catálogo',
    indexable: true,
  },
  gallery: {
    path: '/galeria',
    title: 'Galería de Flores Eternas de Limpiapipas | Helvella',
    socialTitle: 'Galería de Flores Eternas | Helvella Costa Rica',
    description:
      'Fotos de nuestras flores eternas hechas a mano con limpiapipas en Costa Rica: arreglos en florero, macetitas, ramos y pedidos entregados.',
    breadcrumb: 'Galería',
    indexable: true,
  },
  about: {
    path: '/nosotros',
    title: 'Quiénes Somos: Flores Eternas Hechas a Mano | Helvella',
    socialTitle: 'Quiénes Somos | Helvella — Flores Eternas en Costa Rica',
    description:
      'Conoce a Helvella, el taller costarricense que crea flores eternas artesanales con limpiapipas, pétalo a pétalo, con envíos a todo Costa Rica.',
    breadcrumb: 'Nosotros',
    indexable: true,
  },
  notFound: {
    path: '/404',
    title: 'Página no encontrada | Helvella',
    socialTitle: 'Página no encontrada | Helvella',
    description: 'La página que buscas no existe. Descubre nuestras flores eternas en Costa Rica.',
    indexable: false,
  },
} as const satisfies Record<string, PageSeo>

export type PageKey = keyof typeof PAGES

export const SEO_KEYWORDS =
  'flores eternas, flores eternas Costa Rica, flores eternas en Costa Rica, flores de limpiapipas, flores de limpia pipas, flores eternas de limpiapipas, ramos de flores eternas, arreglos florales Costa Rica, regalos hechos a mano Costa Rica, Helvella'
