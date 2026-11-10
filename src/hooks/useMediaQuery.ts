import { useLayoutEffect, useState } from 'react'

/**
 * Starts as `false` so the first render matches the pre-rendered HTML,
 * then syncs with the real viewport before the browser paints.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}
