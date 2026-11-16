import type { Product } from './types'

function isQuoteProduct(product: Product): boolean {
  if (product.subcategory === 'arreglos') return true
  if (/personaliz/i.test(product.name) || /personaliz/i.test(product.id)) return true
  return false
}

/** Price shown on the card; products that are quoted, or have no price yet, read "Cotizar". */
export function getProductPriceLabel(product: Product): string {
  if (isQuoteProduct(product) || !product.price) return 'Cotizar'
  return product.price.replace(/^Desde\s+/i, '')
}
