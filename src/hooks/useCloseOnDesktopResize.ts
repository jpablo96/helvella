import { useEffect } from 'react'
import { MOBILE_MEDIA_QUERY } from '../constants/breakpoints'

export function useCloseOnDesktopResize(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return

    const media = window.matchMedia(MOBILE_MEDIA_QUERY)
    const handleChange = () => {
      if (!media.matches) onClose()
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [isOpen, onClose])
}
