interface IconProps {
  size?: number
  className?: string
}

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Hand offering a heart: made by hand, with care. */
export function IconArtisan({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 11.5c-2.3-1.5-4-2.9-4-4.7A2.1 2.1 0 0 1 14 5.6a2.1 2.1 0 0 1 4 1.2c0 1.8-1.7 3.2-4 4.7z"
        {...stroke}
      />
      <path d="M2.5 14.5v7" {...stroke} />
      <path d="M2.5 15.5h3.2c.8 0 1.5.2 2.1.6l1.4.9h3.3a1.5 1.5 0 0 1 0 3H8.8" {...stroke} />
      <path
        d="M12.6 19.5l5.2-2.5a1.6 1.6 0 0 1 1.8 2.6l-4.9 3c-.6.3-1.2.4-1.9.4H2.5"
        {...stroke}
      />
    </svg>
  )
}

/** Flower with a sparkle: flowers that last forever. */
export function IconEternal({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="11"
          cy="5.1"
          rx="1.45"
          ry="2"
          transform={`rotate(${angle} 11 8.6)`}
          {...stroke}
        />
      ))}
      <circle cx="11" cy="8.6" r="1.1" {...stroke} />
      <path d="M11 13.4V21.5" {...stroke} />
      <path d="M11 18.5c-2.6 0-4.3-1.4-4.8-3.6 2.6 0 4.3 1.4 4.8 3.6z" {...stroke} />
      <path d="M19.5 2.5v4M17.5 4.5h4" {...stroke} />
    </svg>
  )
}

/** Gift tag with a heart: made to your measure. */
export function IconPersonalized({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 4.2v6.6c0 .4.2.8.5 1.1l8.6 8.6c.6.6 1.5.6 2.1 0l6.2-6.2c.6-.6.6-1.5 0-2.1l-8.6-8.6c-.3-.3-.7-.5-1.1-.5H4.2C3.5 3 3 3.5 3 4.2z"
        {...stroke}
      />
      <circle cx="7.2" cy="7.2" r="1.3" {...stroke} />
      <path
        d="M13.4 16.4c-2-1.1-3.4-2.3-3.4-3.8a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.5-1.2 2.7-2.6 3.8z"
        {...stroke}
      />
    </svg>
  )
}

/** Delivery truck with motion lines. */
export function IconShipping({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 17.5H6V6.5h9.5v11H10.3" {...stroke} />
      <path d="M15.5 9.5h3.6L22 12.8v4.7h-1.3M15.5 17.5h1.7" {...stroke} />
      <circle cx="8.2" cy="17.8" r="1.8" {...stroke} />
      <circle cx="19" cy="17.8" r="1.8" {...stroke} />
      <path d="M1.5 9.5H4M2.5 12.5H4M1.5 15.5H4" {...stroke} />
    </svg>
  )
}

/** Traffic cone: work in progress. */
export function IconConstruction({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10.2 3h3.6l4.4 16H5.8z" {...stroke} />
      <path d="M8.6 8.8h6.8M7.2 13.9h9.6" {...stroke} />
      <path d="M3 21h18" {...stroke} />
    </svg>
  )
}
