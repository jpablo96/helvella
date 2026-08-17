import type { CSSProperties } from 'react'

export type FlowerVariant = 'card' | 'lightbox' | 'gallery' | 'hero'

interface FlowerIllustrationProps {
  color: string
  variant?: FlowerVariant
  className?: string
}

const classNames: Record<FlowerVariant, string> = {
  card: 'flower-svg',
  lightbox: 'image-lightbox-flower',
  gallery: 'gallery-flower-svg',
  hero: 'hero-flower-svg',
}

export default function FlowerIllustration({
  color,
  variant = 'card',
  className,
}: FlowerIllustrationProps) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const petals = isHero || variant === 'gallery' ? 6 : 5
  const petalAngle = isHero || variant === 'gallery' ? 60 : 72
  const petalCy = isHero ? 28 : variant === 'card' || variant === 'lightbox' ? 35 : 32
  const petalRx = isHero ? 12 : variant === 'card' || variant === 'lightbox' ? 14 : 13
  const petalRy = isHero ? 20 : variant === 'card' || variant === 'lightbox' ? 22 : 21
  const centerR = isHero ? 12 : variant === 'card' || variant === 'lightbox' ? 14 : 13
  const stemY = isHero ? 58 : 68
  const bgAlpha = variant === 'card' || variant === 'lightbox' ? '18' : '20'

  return (
    <svg
      viewBox={isHero ? '0 0 100 100' : '0 0 120 120'}
      className={className ?? classNames[variant]}
      aria-hidden="true"
      style={{ '--flower-color': color } as CSSProperties}
    >
      {!isHero && (
        <circle cx={cx} cy={cy} r={55} fill={`${color}${bgAlpha}`} />
      )}
      {Array.from({ length: petals }, (_, index) => (
        <ellipse
          key={index}
          cx={cx}
          cy={petalCy}
          rx={petalRx}
          ry={petalRy}
          fill={color}
          opacity={isHero ? 0.9 : 0.85}
          transform={`rotate(${index * petalAngle} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={centerR} fill={color} opacity={isHero ? 0.7 : 0.6} />
      <rect
        x={cx - 3}
        y={stemY}
        width={6}
        height={isHero ? 28 : 30}
        rx={3}
        fill="#6C265B"
        opacity={isHero ? 1 : 0.7}
      />
    </svg>
  )
}
