import { useState, type CSSProperties } from 'react'
import type { IllustrationType } from '../data/types'
import ProductIllustration from './illustrations/ProductIllustration'
import './GalleryImage.css'

interface GalleryImageProps {
  image?: string
  color: string
  title: string
  illustration: IllustrationType
  imageClassName?: string
  imageStyle?: CSSProperties
  loading?: 'lazy' | 'eager'
}

export default function GalleryImage({
  image,
  color,
  title,
  illustration,
  imageClassName,
  imageStyle,
  loading = 'lazy',
}: GalleryImageProps) {
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
      className={imageClassName ? `gallery-photo ${imageClassName}` : 'gallery-photo'}
      style={imageStyle}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
