import type { Product } from './types'
import { catalogExtraProducts } from './catalogExtras'
import { catalogTrelloProducts } from './catalogTrelloProducts'

export const products: Product[] = [...catalogTrelloProducts, ...catalogExtraProducts].sort((a, b) =>
  a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }),
)

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((product) => product.category === category)
}
