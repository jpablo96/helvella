import { getWhatsAppOrderUrl } from '../data/contact'
import type { Product } from '../data/catalog'
import { getProductPriceLabel } from '../data/productDisplay'
import { flowerColorStyle } from '../utils/flowerColorStyle'
import ExpandIcon from './icons/ExpandIcon'
import WhatsAppIcon from './icons/WhatsAppIcon'
import ProductIllustration from './illustrations/ProductIllustration'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
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
          className="product-card-image-btn"
          onClick={onImageClick}
          aria-label={`Ver ${product.name}`}
          style={imageStyle}
        >
          {illustration}
          <span className="card-expand" aria-hidden="true">
            <ExpandIcon />
          </span>
        </button>
      ) : (
        <div className="product-card-image-btn" style={imageStyle}>
          {illustration}
        </div>
      )}
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          {priceLabel && <span className="product-card-price">{priceLabel}</span>}
          <a
            href={getWhatsAppOrderUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-order product-card-btn"
          >
            <WhatsAppIcon size={14} />
            ¡Haz tu pedido!
          </a>
        </div>
      </div>
    </article>
  )
}
