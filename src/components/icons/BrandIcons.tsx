interface IconProps {
  size?: number
  className?: string
}

export function IconArtisan({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M11 27v-9.5c0-1.2.8-2 2-2 .6 0 1.2.3 1.5.8l.5 1V12.5c0-1 .7-1.8 1.7-1.8s1.8.8 1.8 1.8V18l1.2-3.5c.3-.9 1.2-1.5 2.2-1.3 1 .2 1.8 1.1 1.8 2.1V22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 27h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function IconEternal({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.5 16c0-3 2.2-5.5 4.5-5.5 1.6 0 3 .9 3.8 2.3.8-1.4 2.2-2.3 3.8-2.3 2.3 0 4.5 2.5 4.5 5.5s-2.2 5.5-4.5 5.5c-1.6 0-3-.9-3.8-2.3-.8 1.4-2.2 2.3-3.8 2.3-2.3 0-4.5-2.5-4.5-5.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconPersonalized({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M8 10h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="13" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="19" cy="16" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 22h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="11" cy="22" r="2.25" stroke="currentColor" strokeWidth="1.75" />
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
