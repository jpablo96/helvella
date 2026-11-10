import type { ReactNode } from 'react'
import { cx } from '../utils/cx'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  className?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, className }: SectionHeaderProps) {
  return (
    <header className={cx('section-header', className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}
