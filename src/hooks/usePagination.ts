import { useCallback, useMemo, useState } from 'react'
import type { PageSize } from '../data/catalog'

export function usePagination<T>(items: readonly T[], initialPageSize: PageSize = 10) {
  const [pageSize, setPageSizeState] = useState<PageSize>(initialPageSize)
  const [requestedPage, setRequestedPage] = useState(1)
  const [trackedItems, setTrackedItems] = useState(items)

  if (trackedItems !== items) {
    setTrackedItems(items)
    setRequestedPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(requestedPage, totalPages)
  const pageOffset = (currentPage - 1) * pageSize

  const pageItems = useMemo(
    () => items.slice(pageOffset, pageOffset + pageSize),
    [items, pageOffset, pageSize],
  )

  const setPageSize = useCallback((size: PageSize) => {
    setPageSizeState(size)
    setRequestedPage(1)
  }, [])

  return {
    pageItems,
    pageOffset,
    pageSize,
    currentPage,
    totalPages,
    setPage: setRequestedPage,
    setPageSize,
  }
}
