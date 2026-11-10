import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets the window scroll whenever the route changes. */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}
