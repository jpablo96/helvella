import type { CSSProperties, ReactElement, ReactNode } from 'react'
import type { FlowerVariant, IllustrationType } from './types'

type RendererProps = { color: string; variant: FlowerVariant; className?: string }

type SvgProps = {
  viewBox: string
  variant: FlowerVariant
  className?: string
  color: string
  children: ReactNode
}

export function IllustrationSvg({
  viewBox,
  variant,
  className,
  color,
  children,
}: SvgProps) {
  const classNames: Record<FlowerVariant, string> = {
    card: 'flower-svg',
    lightbox: 'image-lightbox-flower',
    gallery: 'gallery-flower-svg',
    hero: 'hero-flower-svg',
  }

  return (
    <svg
      viewBox={viewBox}
      className={className ?? classNames[variant]}
      aria-hidden="true"
      style={{ '--flower-color': color } as CSSProperties}
    >
      {children}
    </svg>
  )
}

export function Stem({ x = 60, y = 68, height = 30 }: { x?: number; y?: number; height?: number }) {
  return <rect x={x - 3} y={y} width={6} height={height} rx={3} fill="#6C265B" opacity={0.75} />
}

export function Background({ color, cx = 60, cy = 60 }: { color: string; cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r={55} fill={`${color}18`} />
}

export function PetalRing({
  cx,
  cy,
  count,
  color,
  rx,
  ry,
  petalCy,
  opacity = 0.85,
}: {
  cx: number
  cy: number
  count: number
  color: string
  rx: number
  ry: number
  petalCy: number
  opacity?: number
}) {
  const angle = 360 / count

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ellipse
          key={index}
          cx={cx}
          cy={petalCy}
          rx={rx}
          ry={ry}
          fill={color}
          opacity={opacity}
          transform={`rotate(${index * angle} ${cx} ${cy})`}
        />
      ))}
    </>
  )
}

function flowerLayout(variant: FlowerVariant) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const viewBox = isHero ? '0 0 100 100' : '0 0 120 120'

  return { isHero, cx, cy, viewBox }
}

function Lavanda({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {[-16, -8, 0, 8, 16].map((offset) => (
        <ellipse
          key={offset}
          cx={cx + offset}
          cy={cy - 8}
          rx={isHero ? 4 : 5}
          ry={isHero ? 16 : 18}
          fill={color}
          opacity={0.88}
        />
      ))}
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Lirio({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <ellipse cx={cx} cy={cy - 10} rx={isHero ? 10 : 12} ry={isHero ? 24 : 28} fill={color} />
      <ellipse cx={cx - 14} cy={cy + 2} rx={isHero ? 8 : 10} ry={isHero ? 18 : 20} fill={color} opacity={0.9} />
      <ellipse cx={cx + 14} cy={cy + 2} rx={isHero ? 8 : 10} ry={isHero ? 18 : 20} fill={color} opacity={0.9} />
      <circle cx={cx} cy={cy + 10} r={isHero ? 5 : 6} fill="#E8A838" />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Clavel({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <path
        d={`M${cx} ${cy - 24} C${cx - 18} ${cy - 8}, ${cx - 16} ${cy + 10}, ${cx} ${cy + 14}
           C${cx + 16} ${cy + 10}, ${cx + 18} ${cy - 8}, ${cx} ${cy - 24} Z`}
        fill={color}
      />
      <path
        d={`M${cx} ${cy - 18} C${cx - 10} ${cy - 4}, ${cx - 8} ${cy + 8}, ${cx} ${cy + 10}
           C${cx + 8} ${cy + 8}, ${cx + 10} ${cy - 4}, ${cx} ${cy - 18} Z`}
        fill={color}
        opacity={0.75}
      />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Gardenia({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={8}
        color={color}
        rx={isHero ? 8 : 10}
        ry={isHero ? 14 : 16}
        petalCy={cy - (isHero ? 18 : 20)}
        opacity={0.95}
      />
      <circle cx={cx} cy={cy} r={isHero ? 8 : 10} fill="#FFFDE7" />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Cala({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <path
        d={`M${cx} ${cy + 16} Q${cx - 22} ${cy - 4}, ${cx} ${cy - 28} Q${cx + 22} ${cy - 4}, ${cx} ${cy + 16} Z`}
        fill={color}
      />
      <ellipse cx={cx} cy={cy + 4} rx={isHero ? 5 : 6} ry={isHero ? 10 : 12} fill="#FFEB3B" />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Gerbera({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={16}
        color={color}
        rx={isHero ? 5 : 6}
        ry={isHero ? 14 : 16}
        petalCy={cy - (isHero ? 20 : 22)}
      />
      <circle cx={cx} cy={cy} r={isHero ? 11 : 13} fill="#5C3A1E" opacity={0.8} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Dalia({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {[22, 18, 14].map((radius, index) => (
        <PetalRing
          key={radius}
          cx={cx}
          cy={cy}
          count={10}
          color={color}
          rx={isHero ? 5 + index : 6 + index}
          ry={isHero ? 10 + index * 2 : 12 + index * 2}
          petalCy={cy - radius + index * 2}
          opacity={0.95 - index * 0.12}
        />
      ))}
      <circle cx={cx} cy={cy} r={isHero ? 7 : 8} fill={color} opacity={0.7} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Clivia({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {[ -12, 0, 12 ].map((offset) => (
        <ellipse
          key={offset}
          cx={cx + offset}
          cy={cy - 2}
          rx={isHero ? 8 : 10}
          ry={isHero ? 14 : 16}
          fill={color}
          opacity={0.92}
        />
      ))}
      <circle cx={cx} cy={cy + 8} r={isHero ? 6 : 7} fill="#FFEB3B" />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Hibisco({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={5}
        color={color}
        rx={isHero ? 12 : 14}
        ry={isHero ? 18 : 20}
        petalCy={cy - (isHero ? 18 : 20)}
      />
      <circle cx={cx} cy={cy} r={isHero ? 8 : 9} fill="#C62828" opacity={0.85} />
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 14} stroke="#FFEB3B" strokeWidth={2} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Cerezo({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx={cx}
          cy={cy - (isHero ? 12 : 14)}
          rx={isHero ? 5 : 6}
          ry={isHero ? 10 : 12}
          fill={color}
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={isHero ? 4 : 5} fill="#FFEB3B" />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function LirioDelValle({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <ellipse cx={cx - 10} cy={cy - 4} rx={isHero ? 7 : 8} ry={isHero ? 12 : 14} fill={color} />
      <ellipse cx={cx + 10} cy={cy - 4} rx={isHero ? 7 : 8} ry={isHero ? 12 : 14} fill={color} />
      <ellipse cx={cx} cy={cy - 12} rx={isHero ? 6 : 7} ry={isHero ? 10 : 12} fill={color} opacity={0.95} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Peonia({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <circle cx={cx - 10} cy={cy - 4} r={isHero ? 12 : 14} fill={color} opacity={0.85} />
      <circle cx={cx + 10} cy={cy - 4} r={isHero ? 12 : 14} fill={color} opacity={0.85} />
      <circle cx={cx} cy={cy - 12} r={isHero ? 12 : 14} fill={color} />
      <circle cx={cx} cy={cy} r={isHero ? 8 : 10} fill={color} opacity={0.7} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Jacinto({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {[0, 1, 2, 3, 4].map((index) => (
        <circle
          key={index}
          cx={cx + (index % 2 === 0 ? -6 : 6)}
          cy={cy - 18 + index * 8}
          r={isHero ? 5 : 6}
          fill={color}
          opacity={0.95 - index * 0.05}
        />
      ))}
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Narciso({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={6}
        color={color}
        rx={isHero ? 8 : 10}
        ry={isHero ? 12 : 14}
        petalCy={cy - (isHero ? 14 : 16)}
      />
      <circle cx={cx} cy={cy + 2} r={isHero ? 9 : 11} fill="#FF9800" opacity={0.9} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function DienteDeLeon({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {Array.from({ length: 24 }, (_, index) => {
        const angle = index * 15
        return (
          <line
            key={angle}
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - (isHero ? 22 : 26)}
            stroke={color}
            strokeWidth={isHero ? 2 : 2.5}
            strokeLinecap="round"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={isHero ? 7 : 8} fill={color} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Cempasuchil({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={20}
        color={color}
        rx={isHero ? 4 : 5}
        ry={isHero ? 12 : 14}
        petalCy={cy - (isHero ? 18 : 20)}
      />
      <circle cx={cx} cy={cy} r={isHero ? 10 : 12} fill="#F57F17" opacity={0.9} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Hortensia({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      {[
        [-14, -10],
        [0, -14],
        [14, -10],
        [-10, 2],
        [10, 2],
        [0, 10],
      ].map(([offsetX, offsetY]) => (
        <circle
          key={`${offsetX}-${offsetY}`}
          cx={cx + offsetX}
          cy={cy + offsetY}
          r={isHero ? 7 : 8}
          fill={color}
          opacity={0.9}
        />
      ))}
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Orquidea({ color, variant }: RendererProps) {
  const { isHero, cx, cy, viewBox } = flowerLayout(variant)

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} cx={cx} cy={cy} />}
      <ellipse cx={cx} cy={cy - 8} rx={isHero ? 16 : 18} ry={isHero ? 10 : 12} fill={color} />
      <ellipse cx={cx - 12} cy={cy + 4} rx={isHero ? 8 : 10} ry={isHero ? 12 : 14} fill={color} opacity={0.9} />
      <ellipse cx={cx + 12} cy={cy + 4} rx={isHero ? 8 : 10} ry={isHero ? 12 : 14} fill={color} opacity={0.9} />
      <ellipse cx={cx} cy={cy + 12} rx={isHero ? 6 : 7} ry={isHero ? 10 : 12} fill="#6C265B" opacity={0.75} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

export const catalogFlowerRenderers: Partial<
  Record<IllustrationType, (props: RendererProps) => ReactElement>
> = {
  lavanda: Lavanda,
  lirio: Lirio,
  clavel: Clavel,
  gardenia: Gardenia,
  cala: Cala,
  gerbera: Gerbera,
  dalia: Dalia,
  clivia: Clivia,
  hibisco: Hibisco,
  cerezo: Cerezo,
  'lirio-del-valle': LirioDelValle,
  peonia: Peonia,
  jacinto: Jacinto,
  narciso: Narciso,
  'diente-de-leon': DienteDeLeon,
  cempasuchil: Cempasuchil,
  hortensia: Hortensia,
  orquidea: Orquidea,
}
