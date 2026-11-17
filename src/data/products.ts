import type { Product } from './types'
import { catalogProducts } from './catalogProducts'

export const products: Product[] = [...catalogProducts].sort((a, b) =>
  (a.sortKey ?? a.name).localeCompare(b.sortKey ?? b.name, 'es', { sensitivity: 'base' }),
)
