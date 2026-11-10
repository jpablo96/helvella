import type { GalleryItem } from '../data/gallery'
import ExpandIcon from './icons/ExpandIcon'
import GalleryImage from './GalleryImage'

interface GalleryCardProps {
  item: GalleryItem
  onOpen?: () => void
  /** Static, non-interactive card used in the home preview. */
  preview?: boolean
}

export default function GalleryCard({ item, onOpen, preview = false }: GalleryCardProps) {
  const imageCount = item.images.length

  const media = (
    <div className="gallery-card-media">
      <GalleryImage
        image={item.images[0]}
        color={item.color}
        title={`${item.title} — flores eternas de limpiapipas`}
        illustration={item.illustration}
        imageClassName="gallery-photo--card"
      />
      <span className="gallery-card-caption" aria-hidden="true">
        {item.title}
      </span>
      {!preview && imageCount > 1 && (
        <span className="gallery-card-count glass-chip" aria-hidden="true">
          1 / {imageCount}
        </span>
      )}
      {!preview && (
        <span className="card-expand glass-chip" aria-hidden="true">
          <ExpandIcon />
        </span>
      )}
    </div>
  )

  if (preview) {
    return (
      <article className="gallery-card browse-card gallery-card--preview" aria-label={item.title}>
        {media}
      </article>
    )
  }

  return (
    <article className="gallery-card browse-card">
      <button
        type="button"
        className="gallery-card-hitarea"
        onClick={onOpen}
        aria-label={`Ver ${item.title}`}
      >
        {media}
      </button>
    </article>
  )
}
