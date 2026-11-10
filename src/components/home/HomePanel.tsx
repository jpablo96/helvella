import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { useHomeScrollRoot } from './HomeScrollContext'

interface HomePanelProps {
  id: string
  className?: string
  children: ReactNode
  /** Skip the entrance wait for the panel that is on screen at load. */
  initialVisible?: boolean
}

/** Full-height snap section; toggles `is-visible` to drive `.home-reveal` children. */
export default function HomePanel({
  id,
  className,
  children,
  initialVisible = false,
}: HomePanelProps) {
  const ref = useRef<HTMLElement>(null)
  const scrollRoot = useHomeScrollRoot()
  const [visible, setVisible] = useState(initialVisible)

  useEffect(() => {
    const panel = ref.current
    if (!panel) return

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      root: scrollRoot?.current ?? null,
      threshold: 0.12,
    })

    observer.observe(panel)
    return () => observer.disconnect()
  }, [scrollRoot])

  return (
    <section ref={ref} id={id} className={cx('home-panel', visible && 'is-visible', className)}>
      {children}
    </section>
  )
}
