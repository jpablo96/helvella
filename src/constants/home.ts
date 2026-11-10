/** Scroll container of the snap-scrolling home page. */
export const HOME_SCROLL_SELECTOR = '.home-scroll'

export const HOME_PANEL_IDS = {
  hero: 'inicio',
  featured: 'destacados',
  gallery: 'galeria',
  order: 'pedido',
} as const

export function getHomeScrollRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>(HOME_SCROLL_SELECTOR)
}
