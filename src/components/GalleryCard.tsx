import { galleryCardSrcSet, type GalleryItem } from '../data/gallery'
import ExpandIcon from './icons/ExpandIcon'
import GalleryImage from './GalleryImage'

interface GalleryCardProps {
  item: GalleryItem
  onOpen?: () => void
  /** Static, non-interactive card used in the home preview. */
  preview?: boolean
}

// Width the card photo is shown at. Browsers that support `auto` measure the lazy image
// themselves; the rest use the estimate: the home preview is full width on phones, the gallery
// grid has two columns there, and both are about a quarter of the page on larger screens.
const PREVIEW_SIZES = 'auto, (max-width: 768px) 100vw, 25vw'
const GRID_SIZES = 'auto, (max-width: 768px) 50vw, 25vw'

export default function GalleryCard({ item, onOpen, preview = false }: GalleryCardProps) {
  const imageCount = item.images.length
  const cover = item.images[0]

  const media = (
    <div className="gallery-card-media">
      <GalleryImage
        image={cover}
        srcSet={cover && galleryCardSrcSet(cover)}
        sizes={preview ? PREVIEW_SIZES : GRID_SIZES}
        color={item.color}
        title={`${item.title} — flores eternas de limpiapipas`}
        illustration={item.illustration}
        imageClassName="gallery-photo--card"
      />
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
