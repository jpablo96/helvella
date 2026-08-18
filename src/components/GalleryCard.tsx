import { Link } from 'react-router-dom'
import type { GalleryItem } from '../data/gallery'
import ExpandIcon from './icons/ExpandIcon'
import GalleryImage from './GalleryImage'

interface GalleryCardProps {
  item: GalleryItem
  onOpen?: () => void
  to?: string
  className?: string
}

export default function GalleryCard({ item, onOpen, to, className }: GalleryCardProps) {
  const cardClass = `gallery-card browse-card${className ? ` ${className}` : ''}`
  const coverImage = item.images[0]

  const image = (
    <div className="gallery-card-image">
      <GalleryImage
        image={coverImage}
        color={item.color}
        title={item.title}
        illustration={item.illustration}
      />
      {item.images.length > 1 && (
        <span className="gallery-card-count" aria-hidden="true">
          {item.images.length}
        </span>
      )}
      <span className="gallery-card-expand" aria-hidden="true">
        <ExpandIcon />
      </span>
    </div>
  )

  const info = (
    <div className="gallery-card-info">
      <h3>{item.title}</h3>
      <p className="gallery-card-desc">{item.description}</p>
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
