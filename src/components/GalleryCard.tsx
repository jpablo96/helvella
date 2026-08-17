import { Link } from 'react-router-dom'
import type { GalleryItem } from '../data/gallery'
import { formatGalleryDate } from '../utils/formatDate'
import GalleryImage from './GalleryImage'

interface GalleryCardProps {
  item: GalleryItem
  onOpen?: () => void
  to?: string
  className?: string
}

export default function GalleryCard({ item, onOpen, to, className }: GalleryCardProps) {
  const cardClass = `gallery-card browse-card${className ? ` ${className}` : ''}`

  const image = (
    <div className="gallery-card-image">
      <GalleryImage
        image={item.image}
        color={item.color}
        title={item.title}
        illustration={item.illustration}
      />
    </div>
  )

  const info = (
    <div className="gallery-card-info">
      <h3>{item.title}</h3>
      {item.date && <time dateTime={item.date}>{formatGalleryDate(item.date)}</time>}
    </div>
  )

  if (to) {
    return (
      <Link to={to} className={cardClass}>
        <span className="gallery-card-image-btn">{image}</span>
        {info}
      </Link>
    )
  }

  return (
    <article className={cardClass}>
      <button
        type="button"
        className="gallery-card-image-btn"
        onClick={onOpen}
        aria-label={`Ver ${item.title}`}
      >
        {image}
      </button>
      {info}
    </article>
  )
}
