import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../utils/cx'
import { revealDelay } from '../../utils/revealDelay'
import ArrowIcon from '../icons/ArrowIcon'
import SectionHeader from '../SectionHeader'
import HomeCarousel from './HomeCarousel'
import HomePanel from './HomePanel'
import HomeScrollHint from './HomeScrollHint'

interface HomeShowcaseProps<T> {
  id: string
  /** Panel the scroll hint leads to. */
  nextPanelId: string
  eyebrow: string
  title: string
  subtitle: string
  items: readonly T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  cta: { to: string; label: string }
  /** Optional banner shown between the heading and the cards. */
  notice?: ReactNode
  trackClassName?: string
}

/** Home panel with a heading, a row of cards (carousel on mobile) and a link to the full page. */
export default function HomeShowcase<T>({
  id,
  nextPanelId,
  eyebrow,
  title,
  subtitle,
  items,
  getKey,
  renderItem,
  cta,
  notice,
  trackClassName,
}: HomeShowcaseProps<T>) {
  return (
    <HomePanel id={id} className="bg-beige">
      <div className={cx('container home-section', notice != null && 'home-section--notice')}>
        <SectionHeader
          className="home-section__header home-reveal"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
        {notice != null && <div className="home-section__notice home-reveal">{notice}</div>}
        <HomeCarousel label={title} trackClassName={cx('home-grid', trackClassName)}>
          {items.map((item, index) => (
            <div key={getKey(item)} className="home-reveal" style={revealDelay(index + 1)}>
              {renderItem(item)}
            </div>
          ))}
        </HomeCarousel>
        <div className="home-section__cta home-reveal" style={revealDelay(items.length + 1)}>
          <Link to={cta.to} className="btn btn-primary">
            {cta.label}
            <ArrowIcon className="btn-icon btn-icon--arrow" />
          </Link>
        </div>
      </div>
      <HomeScrollHint targetId={nextPanelId} tone="beige" />
    </HomePanel>
  )
}
