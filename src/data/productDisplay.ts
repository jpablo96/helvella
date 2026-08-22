import type { Product } from './types'

export function isQuoteProduct(product: Product): boolean {
  if (product.subcategory === 'arreglos') return true
  if (/personaliz/i.test(product.name) || /personaliz/i.test(product.id)) return true
  return false
}

export function getProductPriceLabel(product: Product): string | null {
  if (isQuoteProduct(product)) return 'Cotizar'
  if (!product.price) return null
  return product.price.replace(/^Desde\s+/i, '')
}
