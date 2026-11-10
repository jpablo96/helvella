import type { Product } from '../data/catalog'
import { getProductPriceLabel } from '../data/productDisplay'
import { flowerColorStyle } from '../utils/flowerColorStyle'
import ExpandIcon from './icons/ExpandIcon'
import ProductIllustration from './illustrations/ProductIllustration'
import WhatsAppOrderLink from './WhatsAppOrderLink'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
  /** When provided, the illustration becomes a button that opens the detail view. */
  onImageClick?: () => void
}

export default function ProductCard({ product, onImageClick }: ProductCardProps) {
  const priceLabel = getProductPriceLabel(product)
  const imageStyle = flowerColorStyle(product.color)
  const illustration = (
    <ProductIllustration type={product.illustration} color={product.color} variant="card" />
  )

  return (
    <article className="product-card browse-card">
      {onImageClick ? (
        <button
          type="button"
          className="product-card-image-btn flower-backdrop"
          onClick={onImageClick}
          aria-label={`Ver ${product.name}`}
          style={imageStyle}
        >
          {illustration}
          <span className="card-expand glass-chip" aria-hidden="true">
            <ExpandIcon />
          </span>
        </button>
      ) : (
        <div className="product-card-image-btn flower-backdrop" style={imageStyle}>
          {illustration}
        </div>
      )}
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          {priceLabel && <span className="product-card-price">{priceLabel}</span>}
          <WhatsAppOrderLink
            productName={product.name}
            variant="order"
            iconSize={14}
            className="product-card-btn"
          />
        </div>
      </div>
    </article>
  )
}
