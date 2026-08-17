import { useCallback, useState } from 'react'
import { useBodyScrollLock } from './useBodyScrollLock'
import { useCloseOnDesktopResize } from './useCloseOnDesktopResize'

export function useFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useBodyScrollLock(isOpen)
  useCloseOnDesktopResize(isOpen, close)

  return { isOpen, open, close }
}
