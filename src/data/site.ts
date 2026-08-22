export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://helvella.cr'

export const SITE_NAME = 'Helvella'
export const SITE_TAGLINE = 'Flores eternas en Costa Rica hechas a mano con limpiapipas'

export const DEFAULT_SEO = {
  title: 'Helvella',
  socialTitle: 'Helvella | Flores Eternas en Costa Rica',
  description:
    'Helvella crea flores eternas en Costa Rica, hechas a mano con limpiapipas. Arreglos florales personalizados, regalos únicos y envíos a todo el país. ¡Haz tu pedido por WhatsApp!',
  keywords:
    'flores eternas Costa Rica, flores eternas en Costa Rica, Helvella Costa Rica, flores de limpiapipas, manualidades Costa Rica, arreglos florales, regalos personalizados, Helvella, flores artificiales hechas a mano',
  locale: 'es_CR',
}

export const LOGO_URL = '/logo/H%20Helvella.png'

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
