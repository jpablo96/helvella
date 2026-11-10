import { createContext, useContext, type RefObject } from 'react'

/** Ref to the home page's snap-scroll container, shared with its panels. */
export const HomeScrollContext = createContext<RefObject<HTMLElement | null> | null>(null)

export function useHomeScrollRoot() {
  return useContext(HomeScrollContext)
}
