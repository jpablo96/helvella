import { useState, type CSSProperties } from 'react'
import type { IllustrationType } from '../data/types'
import { cx } from '../utils/cx'
import { flowerColorStyle } from '../utils/flowerColorStyle'
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
  if (!image || failed) {
    return (
      <div className="gallery-placeholder flower-backdrop" style={flowerColorStyle(color)}>
        <ProductIllustration type={illustration} color={color} variant="gallery" />
      </div>
    )
  }

  return (
    <img
      src={image}
      alt={title}
      className={cx('gallery-photo', imageClassName)}
      style={imageStyle}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
