import { useEffect, useRef, useState, type RefObject, type ReactNode } from 'react'

interface HomePanelProps {
  id: string
  className?: string
  children: ReactNode
  scrollRoot?: RefObject<HTMLElement | null>
  initialVisible?: boolean
}

export default function HomePanel({
  id,
  className = '',
  children,
  scrollRoot,
  initialVisible = false,
}: HomePanelProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(initialVisible)

  useEffect(() => {
    const panel = ref.current
    if (!panel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      {
        root: scrollRoot?.current ?? null,
        threshold: 0.12,
      },
    )

    observer.observe(panel)
    return () => observer.disconnect()
  }, [scrollRoot])

  return (
    <section
      ref={ref}
      id={id}
      className={`home-panel${visible ? ' is-visible' : ''}${initialVisible ? ' home-panel--instant' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </section>
  )
}
