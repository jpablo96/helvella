import { useEffect } from 'react'
import { DESKTOP_BREAKPOINT } from '../constants/breakpoints'

export function useCloseOnDesktopResize(_isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > DESKTOP_BREAKPOINT) onClose()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [onClose])
}
