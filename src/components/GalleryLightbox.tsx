import { useCallback, useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from 'react'
import type { GalleryItem } from '../data/gallery'
import ChevronIcon from './icons/ChevronIcon'
import ImageLightbox from './ImageLightbox'
import { useLightbox } from '../hooks/useLightbox'
import './ImageLightbox.css'
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

const LIGHTBOX_PADDING = 40

function getSlideMaxBounds() {
  const maxWidth = Math.min(1081, window.innerWidth - LIGHTBOX_PADDING)
  const maxHeight = Math.min(1351, window.innerHeight - 192)

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

  const canGoPrev = slideIndex > 0 || Boolean(onPrev)
  const canGoNext = slideIndex < images.length - 1 || Boolean(onNext)

  const goPrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((index) => index - 1)
      return
    }

    onPrev?.()
  }

  const goNext = () => {
    if (slideIndex < images.length - 1) {
      setSlideIndex((index) => index + 1)
      return
    }

    onNext?.()
  }

  useLightbox({
    onClose,
    onPrev: canGoPrev ? goPrev : undefined,
    onNext: canGoNext ? goNext : undefined,
  })

  const frameStyle: CSSProperties | undefined = frameSize
    ? { width: frameSize.width, height: frameSize.height }
    : undefined

  return (
    <ImageLightbox
      label={item.title}
      bubbleClassName="gallery-lightbox-bubble"
      onClose={onClose}
      visual={
        <div className="gallery-lightbox-content">
          <div className="gallery-lightbox-visual gallery-lightbox-visual--framed" style={frameStyle}>
            {canGoPrev && (
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                onClick={goPrev}
                aria-label="Anterior"
              >
                <ChevronIcon direction="left" />
              </button>
            )}

            {canGoNext && (
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                onClick={goNext}
                aria-label="Siguiente"
              >
                <ChevronIcon direction="right" />
              </button>
            )}

            <div className="gallery-lightbox-slides">
              {images.map((src, index) => (
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
                  className={`gallery-photo gallery-lightbox-slide-photo${index === slideIndex ? ' is-active' : ''}`}
                  decoding="async"
                  onLoad={(event: SyntheticEvent<HTMLImageElement>) =>
                    rememberSlideSize(src, event.currentTarget)
                  }
                />
              ))}
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
                    className={`gallery-lightbox-dot${index === slideIndex ? ' is-active' : ''}`}
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
      info={null}
    />
  )
}
