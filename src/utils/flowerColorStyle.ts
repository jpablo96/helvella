import type { CSSProperties } from 'react'

export function flowerColorStyle(color: string): CSSProperties {
  return { '--flower-color': color } as CSSProperties
}
