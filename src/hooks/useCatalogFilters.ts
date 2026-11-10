import { useMemo, useState } from 'react'
import {
  floresEternasSubcategories,
  products,
  type FloresEternasSubcategory,
} from '../data/catalog'

const ALL: FloresEternasSubcategory = 'todos'

function countBySubcategory() {
  const counts = Object.fromEntries(
    floresEternasSubcategories.map((sub) => [sub.id, 0]),
  ) as Record<FloresEternasSubcategory, number>

  counts[ALL] = products.length
  for (const product of products) {
    if (product.subcategory && product.subcategory !== ALL) counts[product.subcategory] += 1
  }

  return counts
}

const subcategoryCounts = countBySubcategory()

/** Subcategory filter for the catalog, with everything derived from it. */
export function useCatalogFilters() {
  const [activeSubcategory, setActiveSubcategory] = useState<FloresEternasSubcategory>(ALL)
  const isFiltered = activeSubcategory !== ALL

  const filteredProducts = useMemo(
    () =>
      isFiltered
        ? products.filter((product) => product.subcategory === activeSubcategory)
        : products,
    [activeSubcategory, isFiltered],
  )

  return {
    activeSubcategory,
    subcategories: floresEternasSubcategories,
    subcategoryCounts,
    filteredProducts,
    activeFilterCount: isFiltered ? 1 : 0,
    selectSubcategory: setActiveSubcategory,
  }
}
