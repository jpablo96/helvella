import { useBodyScrollLock } from './useBodyScrollLock'
import { useKeydown } from './useKeydown'

interface UseLightboxOptions {
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function useLightbox({ onClose, onPrev, onNext }: UseLightboxOptions) {
  useBodyScrollLock(true)
  useKeydown({ Escape: onClose, ArrowLeft: onPrev, ArrowRight: onNext })
}
