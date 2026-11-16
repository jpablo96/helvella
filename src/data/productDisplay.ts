import type { Product } from './types'

/** Shown in place of a price: products without a fixed price are quoted on WhatsApp. */
export const QUOTE_LABEL = 'Cotizar'

/** The product's price, or "Cotizar" when it has none. */
export function getProductPriceLabel(product: Product): string {
  return product.price ?? QUOTE_LABEL
}
