type ChevronDirection = 'left' | 'right' | 'down'

interface ChevronIconProps {
  direction: ChevronDirection
  size?: number
  className?: string
}

const paths: Record<ChevronDirection, string> = {
  left: 'M15 18l-6-6 6-6',
  right: 'M9 18l6-6-6-6',
  down: 'M6 9l6 6 6-6',
}

export default function ChevronIcon({ direction, size = 20, className }: ChevronIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={paths[direction]}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
