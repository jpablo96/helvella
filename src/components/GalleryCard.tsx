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

  const content = (
    <>
      <div className="gallery-card-media">
        <GalleryImage
          image={coverImage}
          color={item.color}
          title={item.title}
          illustration={item.illustration}
          imageClassName="gallery-photo--card"
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

      <div className="gallery-card-info">
        <h3>{item.title}</h3>
        <p className="gallery-card-desc">{item.description}</p>
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cardClass}>
        {content}
      </Link>
    )
  }

  return (
    <article className={cardClass}>
      <button
        type="button"
        className="gallery-card-hitarea"
        onClick={onOpen}
        aria-label={`Ver ${item.title}`}
      >
        {content}
      </button>
    </article>
  )
}
