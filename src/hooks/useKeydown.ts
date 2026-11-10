import { useEffect, useRef } from 'react'

type KeyHandlers = Partial<Record<string, (() => void) | undefined>>

/** Runs the handler matching `event.key` while `enabled`. Handlers may change every render. */
export function useKeydown(handlers: KeyHandlers, enabled = true) {
  const handlersRef = useRef(handlers)

  useEffect(() => {
    handlersRef.current = handlers
  })

  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (event: KeyboardEvent) => handlersRef.current[event.key]?.()

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled])
}
