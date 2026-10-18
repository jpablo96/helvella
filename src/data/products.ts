import type { Product } from './types'
import { catalogProducts } from './catalogProducts'

export const products: Product[] = [...catalogProducts].sort((a, b) =>
  a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }),
)
