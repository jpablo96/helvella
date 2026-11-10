import type { CSSProperties } from 'react'

/** Staggers a `.home-reveal` element; `order` 0 animates first. */
export function revealDelay(order: number): CSSProperties {
  return { '--reveal-order': order } as CSSProperties
}
