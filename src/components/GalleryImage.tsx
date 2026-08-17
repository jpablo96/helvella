import { useState } from 'react'
import type { IllustrationType } from '../data/types'
import ProductIllustration from './illustrations/ProductIllustration'
import './GalleryImage.css'

interface GalleryImageProps {
  image?: string
  color: string
  title: string
  illustration: IllustrationType
}

export default function GalleryImage({ image, color, title, illustration }: GalleryImageProps) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !image || failed

  if (showPlaceholder) {
    return (
      <div
        className="gallery-placeholder"
        style={{ '--flower-color': color } as Record<string, string>}
      >
        <ProductIllustration type={illustration} color={color} variant="gallery" />
      </div>
    )
  }

  return (
    <img
      src={image}
      alt={title}
      className="gallery-photo"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
