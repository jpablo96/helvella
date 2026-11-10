import { getHomeScrollRoot } from '../../constants/home'
import ChevronIcon from '../icons/ChevronIcon'
import { useHomeScrollRoot } from './HomeScrollContext'

interface HomeScrollHintProps {
  /** Id of the panel to scroll to. */
  targetId: string
  /** Surface the hint sits on. */
  tone?: 'beige' | 'ciruela'
}

export default function HomeScrollHint({ targetId, tone = 'beige' }: HomeScrollHintProps) {
  const scrollRoot = useHomeScrollRoot()

  const scrollToTarget = () => {
    const root = scrollRoot?.current ?? getHomeScrollRoot()
    const target = document.getElementById(targetId)
    if (!root || !target) return

    root.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`home-scroll-hint home-scroll-hint--on-${tone}`}
      onClick={scrollToTarget}
      aria-label="Desplazarse hacia abajo"
    >
      <ChevronIcon direction="down" className="home-scroll-hint-arrow" />
    </button>
  )
}
