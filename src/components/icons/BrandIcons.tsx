interface IconProps {
  size?: number
  className?: string
}

export function IconArtisan({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 4c-4 6-8 8-8 13a8 8 0 1016 0c0-5-4-7-8-13z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M16 17v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 25h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function IconEternal({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 16c0-4 3.5-7 8-7s8 3 8 7-3.5 7-8 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M10 16h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M16 9v14M12 12c1.5 2 6.5 2 8 0M12 20c1.5-2 6.5-2 8 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconGift({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="14" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 14v12M6 18h20" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16 14c-3 0-5-1.5-5-4s2-3 5-1.5c3-1.5 5 0 5 1.5s-2 4-5 4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconChat({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 6.5h14a2 2 0 012 2v6a2 2 0 01-2 2H10l-4 3v-3H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconShipping({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h11v8H3V8zM14 10h4l3 3v3h-7v-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="1.75" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17" cy="17" r="1.75" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}
