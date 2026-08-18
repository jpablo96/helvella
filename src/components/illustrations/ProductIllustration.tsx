import type { CSSProperties, ReactElement, ReactNode } from 'react'
import type { FlowerVariant, IllustrationType } from './types'
import { catalogFlowerRenderers } from './flowerCatalogRenderers'

interface ProductIllustrationProps {
  type: IllustrationType
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

function IllustrationSvg({
  viewBox,
  variant,
  className,
  color,
  children,
}: {
  viewBox: string
  variant: FlowerVariant
  className?: string
  color: string
  children: ReactNode
}) {
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

function Stem({ x = 60, y = 68, height = 30 }: { x?: number; y?: number; height?: number }) {
  return <rect x={x - 3} y={y} width={6} height={height} rx={3} fill="#6C265B" opacity={0.75} />
}

function Background({ color, cx = 60, cy = 60 }: { color: string; cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r={55} fill={`${color}18`} />
}

function PetalRing({
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

type RendererProps = { color: string; variant: FlowerVariant; className?: string }

function Rosa({ color, variant }: RendererProps) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const viewBox = isHero ? '0 0 100 100' : '0 0 120 120'

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} />}
      <ellipse cx={cx} cy={cy - 8} rx={16} ry={14} fill={color} opacity={0.75} />
      <ellipse cx={cx - 10} cy={cy - 2} rx={14} ry={12} fill={color} opacity={0.85} />
      <ellipse cx={cx + 10} cy={cy - 2} rx={14} ry={12} fill={color} opacity={0.85} />
      <ellipse cx={cx} cy={cy + 8} rx={15} ry={13} fill={color} />
      <circle cx={cx} cy={cy} r={10} fill={color} opacity={0.65} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Girasol({ color, variant }: RendererProps) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const viewBox = isHero ? '0 0 100 100' : '0 0 120 120'

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={14}
        color={color}
        rx={isHero ? 7 : 8}
        ry={isHero ? 16 : 18}
        petalCy={cy - (isHero ? 22 : 24)}
      />
      <circle cx={cx} cy={cy} r={isHero ? 12 : 14} fill="#5C3A1E" opacity={0.85} />
      <circle cx={cx - 4} cy={cy - 3} r={1.5} fill="#3D2814" opacity={0.5} />
      <circle cx={cx + 5} cy={cy + 2} r={1.5} fill="#3D2814" opacity={0.5} />
      <circle cx={cx + 1} cy={cy - 5} r={1.5} fill="#3D2814" opacity={0.5} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Tulipan({ color, variant }: RendererProps) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const viewBox = isHero ? '0 0 100 100' : '0 0 120 120'

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} />}
      <ellipse cx={cx - 12} cy={cy - 4} rx={12} ry={24} fill={color} opacity={0.9} />
      <ellipse cx={cx + 12} cy={cy - 4} rx={12} ry={24} fill={color} opacity={0.9} />
      <ellipse cx={cx} cy={cy - 10} rx={10} ry={26} fill={color} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Margarita({ color, variant }: RendererProps) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const viewBox = isHero ? '0 0 100 100' : '0 0 120 120'
  const petalColor = color === '#F5F0E8' ? '#FFFFFF' : color

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={12}
        color={petalColor}
        rx={isHero ? 5 : 6}
        ry={isHero ? 14 : 16}
        petalCy={cy - (isHero ? 20 : 22)}
        opacity={0.95}
      />
      <circle cx={cx} cy={cy} r={isHero ? 10 : 12} fill="#E8A838" />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Ramo({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx={42} cy={38} rx={10} ry={16} fill="#C45C6A" opacity={0.85} transform="rotate(-15 42 38)" />
      <ellipse cx={60} cy={32} rx={10} ry={17} fill={color} />
      <ellipse cx={78} cy={38} rx={10} ry={16} fill="#E8A838" opacity={0.9} transform="rotate(15 78 38)" />
      <path d="M48 52 Q60 46 72 52 L68 78 Q60 84 52 78 Z" fill="#FFEBCC" opacity={0.9} />
      <rect x="57" y="78" width="6" height="18" rx="3" fill="#6C265B" opacity={0.7} />
    </IllustrationSvg>
  )
}

function CentroMesa({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx="60" cy="88" rx="28" ry="8" fill="#6C265B" opacity={0.25} />
      <ellipse cx="60" cy="84" rx="24" ry="10" fill="#FFEBCC" />
      <circle cx="48" cy="58" r="10" fill={color} opacity={0.85} />
      <circle cx="72" cy="56" r="10" fill="#C45C6A" opacity={0.8} />
      <circle cx="60" cy="48" r="11" fill="#E8A838" opacity={0.9} />
      <circle cx="60" cy="62" r="8" fill={color} />
    </IllustrationSvg>
  )
}

function Arreglo({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <path d="M46 88 L46 62 Q60 48 74 62 L74 88 Z" fill="#A8C8E8" opacity={0.85} />
      <ellipse cx="52" cy="50" rx={9} ry={14} fill="#FFFFFF" opacity={0.95} />
      <ellipse cx="68" cy="48" rx={9} ry={14} fill={color} />
      <circle cx="60" cy="42" r={10} fill="#E8B4B8" />
    </IllustrationSvg>
  )
}

function Conejo({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx="48" cy="34" rx="8" ry="20" fill={color} />
      <ellipse cx="72" cy="34" rx="8" ry="20" fill={color} />
      <circle cx="60" cy="62" r="24" fill={color} />
      <circle cx="52" cy="58" r="3" fill="#6C265B" />
      <circle cx="68" cy="58" r="3" fill="#6C265B" />
      <ellipse cx="60" cy="68" rx="5" ry="3" fill="#6C265B" opacity={0.5} />
      <circle cx="44" cy="66" r="5" fill={color} opacity={0.6} />
      <circle cx="76" cy="66" r="5" fill={color} opacity={0.6} />
    </IllustrationSvg>
  )
}

function Osito({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <circle cx="44" cy="52" r="14" fill={color} />
      <circle cx="76" cy="52" r="14" fill={color} />
      <circle cx="60" cy="68" r="22" fill={color} />
      <circle cx="52" cy="64" r="3" fill="#6C265B" />
      <circle cx="68" cy="64" r="3" fill="#6C265B" />
      <ellipse cx="60" cy="74" rx="6" ry="4" fill="#6C265B" opacity={0.45} />
    </IllustrationSvg>
  )
}

function Mariposa({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx="44" cy="56" rx="18" ry="24" fill={color} opacity={0.85} />
      <ellipse cx="76" cy="56" rx="18" ry="24" fill={color} opacity={0.85} />
      <ellipse cx="40" cy="68" rx="12" ry="16" fill={color} opacity={0.7} />
      <ellipse cx="80" cy="68" rx="12" ry="16" fill={color} opacity={0.7} />
      <rect x="58" y="44" width="4" height="36" rx="2" fill="#6C265B" opacity={0.75} />
    </IllustrationSvg>
  )
}

function Pollito({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <circle cx="60" cy="64" r="22" fill={color} />
      <circle cx="52" cy="58" r="3" fill="#6C265B" />
      <circle cx="68" cy="58" r="3" fill="#6C265B" />
      <path d="M74 62 L84 58 L74 66 Z" fill="#E8A838" />
      <ellipse cx="60" cy="72" rx="5" ry="3" fill="#E8A838" />
    </IllustrationSvg>
  )
}

function Elefante({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx="60" cy="70" rx="28" ry="22" fill={color} />
      <circle cx="60" cy="48" r="18" fill={color} />
      <ellipse cx="38" cy="54" rx="10" ry="16" fill={color} opacity={0.95} />
      <ellipse cx="82" cy="54" rx="10" ry="16" fill={color} opacity={0.95} />
      <circle cx="54" cy="46" r="2.5" fill="#6C265B" />
      <circle cx="66" cy="46" r="2.5" fill="#6C265B" />
      <path d="M38 54 Q24 58 22 72 Q28 74 36 66" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </IllustrationSvg>
  )
}

function AmigurumiFlor({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <circle cx="60" cy="72" r="18" fill={color} opacity={0.85} />
      <PetalRing cx={60} cy={48} count={6} color="#E8A838" rx={7} ry={12} petalCy={36} />
      <circle cx="60" cy="48" r="8" fill="#E8A838" opacity={0.7} />
    </IllustrationSvg>
  )
}

function Bolso({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <path d="M38 48 C38 38 82 38 82 48 L86 88 C86 94 34 94 34 88 Z" fill={color} />
      <path d="M46 48 C46 42 74 42 74 48" fill="none" stroke="#6C265B" strokeWidth="3" />
    </IllustrationSvg>
  )
}

function Posavasos({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      {[
        [42, 46],
        [78, 46],
        [42, 78],
        [78, 78],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="14" fill={color} opacity={0.85} />
      ))}
    </IllustrationSvg>
  )
}

function Gorro({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <path d="M34 68 Q60 24 86 68 Z" fill={color} />
      <rect x="30" y="66" width="60" height="14" rx="7" fill={color} opacity={0.85} />
      <circle cx="60" cy="30" r="6" fill="#FFEBCC" />
    </IllustrationSvg>
  )
}

function Acuarela({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx="52" cy="72" rx="24" ry="16" fill="#FFEBCC" />
      <circle cx="42" cy="68" r="5" fill={color} />
      <circle cx="56" cy="64" r="5" fill="#E8A838" />
      <circle cx="64" cy="72" r="5" fill="#9B6B9E" />
      <rect x="72" y="36" width="8" height="40" rx="4" fill="#6C265B" opacity={0.7} transform="rotate(25 76 56)" />
    </IllustrationSvg>
  )
}

function Lienzo({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <rect x="34" y="30" width="52" height="58" rx="4" fill="#FFEBCC" stroke="#6C265B" strokeWidth="2" />
      <path d="M42 72 Q60 40 78 56" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="54" cy="52" r="8" fill="#E8A838" opacity={0.8} />
    </IllustrationSvg>
  )
}

function RetratoBotanico({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <rect x="30" y="28" width="60" height="64" rx="3" fill="#FFEBCC" stroke="#6C265B" strokeWidth="2" />
      <Stem x={60} y={58} height={24} />
      <PetalRing cx={60} cy={46} count={5} color={color} rx={8} ry={12} petalCy={34} />
      <circle cx={60} cy={46} r={7} fill={color} opacity={0.65} />
    </IllustrationSvg>
  )
}

function MiniCuadro({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <rect x="38" y="36" width="44" height="48" rx="3" fill="#FFEBCC" stroke="#6C265B" strokeWidth="2" />
      <circle cx="60" cy="58" r="12" fill={color} opacity={0.85} />
      <circle cx="60" cy="58" r="6" fill={color} opacity={0.55} />
    </IllustrationSvg>
  )
}

function Collar({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <path
        d="M34 48 Q60 88 86 48"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="60" cy="72" r="8" fill={color} />
      <circle cx="48" cy="58" r="4" fill={color} opacity={0.85} />
      <circle cx="72" cy="58" r="4" fill={color} opacity={0.85} />
    </IllustrationSvg>
  )
}

function Pulsera({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <ellipse cx="60" cy="60" rx="30" ry="22" fill="none" stroke={color} strokeWidth="6" />
      <circle cx="42" cy="52" r="4" fill="#FFEBCC" />
      <circle cx="60" cy="46" r="4" fill="#FFEBCC" />
      <circle cx="78" cy="52" r="4" fill="#FFEBCC" />
    </IllustrationSvg>
  )
}

function Aretes({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <circle cx="44" cy="34" r="4" fill={color} />
      <circle cx="76" cy="34" r="4" fill={color} />
      <line x1="44" y1="38" x2="44" y2="54" stroke={color} strokeWidth="2" />
      <line x1="76" y1="38" x2="76" y2="54" stroke={color} strokeWidth="2" />
      <circle cx="44" cy="64" r="10" fill={color} opacity={0.9} />
      <circle cx="76" cy="64" r="10" fill={color} opacity={0.9} />
    </IllustrationSvg>
  )
}

function Marcador({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <rect x="52" y="24" width="16" height="72" rx="4" fill={color} />
      <circle cx="60" cy="34" r="6" fill="#FFEBCC" />
      <path d="M48 88 L72 88 L68 96 H52 Z" fill="#6C265B" opacity={0.65} />
    </IllustrationSvg>
  )
}

function FlorGenerica({ color, variant }: RendererProps) {
  const isHero = variant === 'hero'
  const cx = isHero ? 50 : 60
  const cy = isHero ? 50 : 60
  const viewBox = isHero ? '0 0 100 100' : '0 0 120 120'

  return (
    <IllustrationSvg viewBox={viewBox} variant={variant} color={color}>
      {!isHero && <Background color={color} />}
      <PetalRing
        cx={cx}
        cy={cy}
        count={isHero || variant === 'gallery' ? 6 : 5}
        color={color}
        rx={isHero ? 12 : 14}
        ry={isHero ? 20 : 22}
        petalCy={cy - (isHero ? 22 : 25)}
      />
      <circle cx={cx} cy={cy} r={isHero ? 12 : 14} fill={color} opacity={0.6} />
      <Stem x={cx} y={isHero ? 58 : 68} height={isHero ? 28 : 30} />
    </IllustrationSvg>
  )
}

function Macetita({ color, variant }: RendererProps) {
  return (
    <IllustrationSvg viewBox="0 0 120 120" variant={variant} color={color}>
      <Background color={color} />
      <path d="M42 78 L42 64 Q60 54 78 64 L78 78 Z" fill="#7CB342" opacity={0.9} />
      <rect x="38" y="78" width="44" height="14" rx="4" fill="#BCAAA4" />
      <circle cx="52" cy="58" r="8" fill={color} opacity={0.9} />
      <circle cx="68" cy="56" r="8" fill="#E8A838" opacity={0.9} />
      <circle cx="60" cy="48" r="7" fill={color} />
    </IllustrationSvg>
  )
}

const baseRenderers: Partial<Record<IllustrationType, (props: RendererProps) => ReactElement>> = {
  rosa: Rosa,
  girasol: Girasol,
  tulipan: Tulipan,
  margarita: Margarita,
  ramo: Ramo,
  macetita: Macetita,
  'centro-mesa': CentroMesa,
  arreglo: Arreglo,
  conejo: Conejo,
  elefante: Elefante,
  osito: Osito,
  mariposa: Mariposa,
  pollito: Pollito,
  'amigurumi-flor': AmigurumiFlor,
  bolso: Bolso,
  posavasos: Posavasos,
  gorro: Gorro,
  acuarela: Acuarela,
  lienzo: Lienzo,
  'retrato-botanico': RetratoBotanico,
  'mini-cuadro': MiniCuadro,
  collar: Collar,
  pulsera: Pulsera,
  aretes: Aretes,
  marcador: Marcador,
  flor: FlorGenerica,
}

export default function ProductIllustration({
  type,
  color,
  variant = 'card',
  className,
}: ProductIllustrationProps) {
  const Renderer = catalogFlowerRenderers[type] ?? baseRenderers[type] ?? FlorGenerica
  return <Renderer color={color} variant={variant} className={className} />
}
