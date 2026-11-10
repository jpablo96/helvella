export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://helvella.cr'

export const SITE_NAME = 'Helvella'

export const SITE_LOCALE = 'es_CR'

export const LOGO_URL = '/logo/H%20Helvella.png'

/** Photo used when a page is shared on WhatsApp, Facebook, etc. */
export const SHARE_IMAGE_URL = '/gallery/post1/post1.webp'

export const HERO_VIDEO_URL = '/videos/hero.mp4'

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
