import { useEffect } from 'react'

let activeLocks = 0

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    activeLocks += 1
    document.body.style.overflow = 'hidden'

    return () => {
      activeLocks -= 1
      if (activeLocks === 0) document.body.style.overflow = ''
    }
  }, [locked])
}
