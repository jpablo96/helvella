import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type NavbarTheme = 'beige' | 'ciruela'

function getSectionTone(): NavbarTheme {
  const navHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10,
    ) || 72

  const x = Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth / 2))
  const el = document.elementFromPoint(x, navHeight + 2)

  if (!el) return 'ciruela'

  if (
    el.closest(
      '.bg-beige, .order-cta-card, .home-panel--featured, .home-panel--gallery, .home-panel--cta, .home-panel--closing',
    )
  ) {
    return 'beige'
  }

  if (el.closest('footer, .footer, .home-panel--hero, .home-panel--closing .footer, .hero, .page-hero')) {
    return 'ciruela'
  }

  return 'ciruela'
}

function getNavbarTheme(): NavbarTheme {
  const sectionTone = getSectionTone()
  return sectionTone === 'beige' ? 'ciruela' : 'beige'
}

export function useNavbarTheme(): NavbarTheme {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState<NavbarTheme>('beige')

  useEffect(() => {
    let frame = 0

    const updateTheme = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setTheme(getNavbarTheme())
      })
    }

    updateTheme()

    const homeScroll = document.querySelector('.home-scroll')

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
