import { useCallback, useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from 'react'
import type { GalleryItem } from '../../data/gallery'
import { useLightbox } from '../../hooks/useLightbox'
import { cx } from '../../utils/cx'
import ChevronIcon from '../icons/ChevronIcon'
import ImageLightbox from './ImageLightbox'
import './GalleryLightbox.css'

interface GalleryLightboxProps {
  item: GalleryItem
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

interface SlideSize {
  width: number
  height: number
}

// Room kept free around the photo; mirrors --gallery-image-max-* in GalleryLightbox.css.
// Wide screens leave space at the sides for the post arrows, narrow ones a bar underneath.
const COMPACT_QUERY = '(max-width: 600px)'
const WIDE_MARGIN = { x: 144, y: 192 }
const COMPACT_MARGIN = { x: 32, y: 240 }

function getSlideMaxBounds() {
  const margin = window.matchMedia(COMPACT_QUERY).matches ? COMPACT_MARGIN : WIDE_MARGIN
  const maxWidth = Math.min(1081, window.innerWidth - margin.x)
  const maxHeight = Math.min(1351, window.innerHeight - margin.y)

  return { maxWidth, maxHeight }
}

function getDisplayedSlideSize(naturalWidth: number, naturalHeight: number): SlideSize {
  const { maxWidth, maxHeight } = getSlideMaxBounds()
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1)

  return {
    width: Math.floor(naturalWidth * scale),
    height: Math.floor(naturalHeight * scale),
  }
}

export default function GalleryLightbox({ item, onClose, onPrev, onNext }: GalleryLightboxProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [frameSize, setFrameSize] = useState<SlideSize | null>(null)
  const slideSizesRef = useRef<Map<string, SlideSize>>(new Map())
  const slidePhotoRefs = useRef<Map<string, HTMLImageElement>>(new Map())
  const images = item.images
  const hasMultipleSlides = images.length > 1
  const activeImage = images[slideIndex]

  const rememberSlideSize = useCallback(
    (src: string, image: HTMLImageElement) => {
      if (!image.naturalWidth || !image.naturalHeight) return

      const size = getDisplayedSlideSize(image.naturalWidth, image.naturalHeight)
      slideSizesRef.current.set(src, size)

      if (activeImage === src) {
        setFrameSize(size)
      }
    },
    [activeImage],
  )

  useEffect(() => {
    slideSizesRef.current.clear()
    slidePhotoRefs.current.clear()
    setSlideIndex(0)
  }, [item.id])

  useEffect(() => {
    images.forEach((src) => {
      if (slideSizesRef.current.has(src)) return

      const preloader = new Image()
      preloader.onload = () => rememberSlideSize(src, preloader)
      preloader.src = src
    })
  }, [images, rememberSlideSize])

  useEffect(() => {
    const activeSize = slideSizesRef.current.get(activeImage)
    if (activeSize) {
      setFrameSize(activeSize)
    }
  }, [activeImage])

  useEffect(() => {
    const handleResize = () => {
      slideSizesRef.current.clear()
      images.forEach((src) => {
        const image = slidePhotoRefs.current.get(src)
        if (image?.naturalWidth) {
          rememberSlideSize(src, image)
        }
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [images, rememberSlideSize])

  // Two levels of navigation, as on Instagram: arrows over the photo step through the photos
  // of this post, arrows beside the dialog jump to another post.
  const hasPrevSlide = slideIndex > 0
  const hasNextSlide = slideIndex < images.length - 1
  const showPrevSlide = () => setSlideIndex((index) => index - 1)
  const showNextSlide = () => setSlideIndex((index) => index + 1)

  // The keyboard walks through the photos first and moves on to the neighbouring post after.
  useLightbox({
    onClose,
    onPrev: hasPrevSlide ? showPrevSlide : onPrev,
    onNext: hasNextSlide ? showNextSlide : onNext,
  })

  const frameStyle: CSSProperties | undefined = frameSize
    ? { width: frameSize.width, height: frameSize.height }
    : undefined

  return (
    <ImageLightbox
      label={item.title}
      bubbleClassName="gallery-lightbox-bubble"
      overlayClassName="gallery-lightbox-overlay"
      onClose={onClose}
      outside={
        (onPrev || onNext) && (
          <div
            className="gallery-lightbox-post-nav"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox-post-btn gallery-lightbox-post-prev"
              onClick={onPrev}
              disabled={!onPrev}
              aria-label="Publicación anterior"
            >
              <ChevronIcon direction="left" size={22} />
              <span className="gallery-lightbox-post-label">Anterior</span>
            </button>
            <button
              type="button"
              className="gallery-lightbox-post-btn gallery-lightbox-post-next"
              onClick={onNext}
              disabled={!onNext}
              aria-label="Publicación siguiente"
            >
              <span className="gallery-lightbox-post-label">Siguiente</span>
              <ChevronIcon direction="right" size={22} />
            </button>
          </div>
        )
      }
      visual={
        <div className="gallery-lightbox-content">
          <div className="gallery-lightbox-visual gallery-lightbox-visual--framed" style={frameStyle}>
            {hasPrevSlide && (
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                onClick={showPrevSlide}
                aria-label="Foto anterior"
              >
                <ChevronIcon direction="left" size={16} />
              </button>
            )}

            {hasNextSlide && (
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                onClick={showNextSlide}
                aria-label="Foto siguiente"
              >
                <ChevronIcon direction="right" size={16} />
              </button>
            )}

            <div className="gallery-lightbox-slides">
              {item.video ? (
                <video
                  key={item.video}
                  src={item.video}
                  poster={images[0]}
                  className="gallery-photo gallery-lightbox-slide-photo gallery-lightbox-slide-video is-active"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedMetadata={(event: SyntheticEvent<HTMLVideoElement>) => {
                    const video = event.currentTarget
                    if (!video.videoWidth || !video.videoHeight) return
                    setFrameSize(getDisplayedSlideSize(video.videoWidth, video.videoHeight))
                  }}
                />
              ) : (
                images.map((src, index) => (
                <img
                  key={src}
                  ref={(element) => {
                    if (element) {
                      slidePhotoRefs.current.set(src, element)
                    } else {
                      slidePhotoRefs.current.delete(src)
                    }
                  }}
                  src={src}
                  alt={`${item.title}${hasMultipleSlides ? ` (${index + 1} de ${images.length})` : ''}`}
                  className={cx(
                    'gallery-photo gallery-lightbox-slide-photo',
                    index === slideIndex && 'is-active',
                  )}
                  decoding="async"
                  onLoad={(event: SyntheticEvent<HTMLImageElement>) =>
                    rememberSlideSize(src, event.currentTarget)
                  }
                />
              ))
              )}
            </div>

            {hasMultipleSlides && (
              <div
                className="gallery-lightbox-dots"
                aria-live="polite"
                aria-label={`Foto ${slideIndex + 1} de ${images.length}`}
              >
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={cx('gallery-lightbox-dot', index === slideIndex && 'is-active')}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="image-lightbox-info gallery-lightbox-info">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      }
    />
  )
}
