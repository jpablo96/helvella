export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://helvella.cr'

export const SITE_NAME = 'Helvella'
export const SITE_TAGLINE = 'Flores eternas artesanales y manualidades hechas a mano en Costa Rica'

export const DEFAULT_SEO = {
  title: 'Helvella',
  socialTitle: 'Helvella — Flores Eternas Artesanales | Costa Rica',
  description:
    'Helvella crea flores eternas hechas a mano con limpiapipas en Costa Rica. Arreglos florales personalizados, regalos únicos y manualidades artesanales. ¡Haz tu pedido por WhatsApp!',
  keywords:
    'flores eternas, flores de limpiapipas, manualidades Costa Rica, arreglos florales artesanales, regalos personalizados, Helvella, flores artificiales hechas a mano, arte y manualidades',
  locale: 'es_CR',
}

export const LOGO_URL = '/logo/H%20Helvella.png'

export const SITE_DEVELOPER = {
  name: 'Helvella',
}

export const FOUNDERS = [
  {
    name: 'Naye',
    role: 'Diseñadora gráfica',
    initial: 'N',
    photo: '',
  },
  {
    name: 'Pablo',
    role: 'Programador y florista eterno',
    initial: 'P',
    photo: '',
  },
] as const
