import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getHomeScrollRoot } from '../constants/home'

/** The navbar always contrasts with the surface right below it. */
export type NavbarTheme = 'beige' | 'ciruela'

const CIRUELA_SURFACES = '.page-hero, .home-panel--hero, .footer'
const FALLBACK_NAV_HEIGHT = 76

function getNavbarTheme(): NavbarTheme {
  const navHeight =
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) ||
    FALLBACK_NAV_HEIGHT

  const x = Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth / 2))
  // Look through the whole stack so overlays (lightbox, drawers) don't hide the page surface.
  const stack = document.elementsFromPoint(x, navHeight + 2)

  if (stack.length === 0) return 'beige'
  return stack.some((element) => element.matches(CIRUELA_SURFACES)) ? 'beige' : 'ciruela'
}

export function useNavbarTheme(): NavbarTheme {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState<NavbarTheme>('beige')

  useEffect(() => {
    let frame = 0

    const updateTheme = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setTheme(getNavbarTheme()))
    }

    updateTheme()

    const homeScroll = getHomeScrollRoot()

    window.addEventListener('scroll', updateTheme, { passive: true })
    window.addEventListener('resize', updateTheme)
    homeScroll?.addEventListener('scroll', updateTheme, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateTheme)
      window.removeEventListener('resize', updateTheme)
      homeScroll?.removeEventListener('scroll', updateTheme)
    }
  }, [pathname])

  return theme
}
