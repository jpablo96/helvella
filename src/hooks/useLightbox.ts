import { useEffect } from 'react'
import { useBodyScrollLock } from './useBodyScrollLock'

interface UseLightboxOptions {
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function useLightbox({ onClose, onPrev, onNext }: UseLightboxOptions) {
  useBodyScrollLock(true)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])
}
