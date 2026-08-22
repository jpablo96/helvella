import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { DESKTOP_BREAKPOINT } from '../constants/breakpoints'
import ChevronIcon from './icons/ChevronIcon'
import './HomeCarousel.css'

const MOBILE_MEDIA_QUERY = `(max-width: ${DESKTOP_BREAKPOINT}px)`
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

interface HomeCarouselProps {
  label: string
  trackClassName?: string
  autoPlayMs?: number
  children: ReactNode
}

function useMobileCarouselEnabled() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MOBILE_MEDIA_QUERY).matches
  })

  useLayoutEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA_QUERY)
    const update = () => setEnabled(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return enabled
}

export default function HomeCarousel({
  label,
  trackClassName = '',
  autoPlayMs = 3000,
  children,
}: HomeCarouselProps) {
  const slides = Children.toArray(children).filter(isValidElement)
  const slideCount = slides.length
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const mobileCarousel = useMobileCarouselEnabled()
  const indexRef = useRef(index)

  indexRef.current = index

  const resumeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setIndex((current) => (slideCount > 0 ? current % slideCount : 0))
  }, [slideCount])

  const pauseCarousel = useCallback(() => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
    setIsPaused(true)
  }, [])

  const resumeCarousel = useCallback(() => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = window.setTimeout(() => setIsPaused(false), autoPlayMs)
  }, [autoPlayMs])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (slideCount <= 0) return
      const normalized = ((nextIndex % slideCount) + slideCount) % slideCount
      setIndex(normalized)
    },
    [slideCount],
  )

  const goNext = useCallback(() => goTo(indexRef.current + 1), [goTo])
  const goPrev = useCallback(() => goTo(indexRef.current - 1), [goTo])

  useEffect(() => {
    if (!mobileCarousel || slideCount <= 1 || isPaused) return

    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches
    if (prefersReducedMotion) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount)
    }, autoPlayMs)

    return () => window.clearInterval(timer)
  }, [autoPlayMs, isPaused, mobileCarousel, slideCount])

  const trackClass = ['home-carousel__track', trackClassName].filter(Boolean).join(' ')
  const showControls = mobileCarousel && slideCount > 1

  return (
    <div
      className={`home-carousel${showControls ? ' home-carousel--mobile' : ''}`}
      onMouseEnter={pauseCarousel}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={pauseCarousel}
      onTouchEnd={resumeCarousel}
      onFocusCapture={pauseCarousel}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
    >
      <div
        className="home-carousel__viewport"
        aria-roledescription="carrusel"
        aria-label={label}
      >
        <div className="home-carousel__media">
          <div className="home-carousel__stage">
            <div
              className={trackClass}
              style={
                showControls
                  ? { transform: `translate3d(-${index * 100}%, 0, 0)` }
                  : undefined
              }
            >
              {slides.map((slide, slideIndex) => (
                <div
                  key={slide.key ?? slideIndex}
                  className="home-carousel__slide"
                  aria-hidden={showControls ? slideIndex !== index : undefined}
                >
                  <div className="home-carousel__frame">{slide}</div>
                </div>
              ))}
            </div>

            {showControls && (
              <>
                <button
                  type="button"
                  className="home-carousel__nav home-carousel__nav--prev"
                  onClick={goPrev}
                  aria-label={`Anterior en ${label}`}
                >
                  <ChevronIcon direction="left" size={18} />
                </button>

                <button
                  type="button"
                  className="home-carousel__nav home-carousel__nav--next"
                  onClick={goNext}
                  aria-label={`Siguiente en ${label}`}
                >
                  <ChevronIcon direction="right" size={18} />
                </button>

                <div
                  className="home-carousel__dots"
                  role="tablist"
                  aria-label={`${label}: elemento ${index + 1} de ${slideCount}`}
                >
                  {slides.map((slide, dotIndex) => (
                    <button
                      key={slide.key ?? dotIndex}
                      type="button"
                      role="tab"
                      className={`home-carousel__dot${dotIndex === index ? ' is-active' : ''}`}
                      aria-selected={dotIndex === index}
                      aria-label={`Ir al elemento ${dotIndex + 1} de ${slideCount}`}
                      onClick={() => goTo(dotIndex)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
