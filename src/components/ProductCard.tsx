import { getWhatsAppOrderUrl } from '../data/contact'
import type { Product } from '../data/catalog'
import { getProductPriceLabel } from '../data/productDisplay'
import ExpandIcon from './icons/ExpandIcon'
import ProductIllustration from './illustrations/ProductIllustration'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
  onImageClick?: () => void
}

export default function ProductCard({ product, onImageClick }: ProductCardProps) {
  const priceLabel = getProductPriceLabel(product)
  const imageStyle = { '--flower-color': product.color } as Record<string, string>
  const imageContent = (
    <ProductIllustration
      type={product.illustration}
      color={product.color}
      variant="card"
    />
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
          {imageContent}
          <span className="product-card-expand" aria-hidden="true">
            <ExpandIcon />
          </span>
        </button>
      ) : (
        <div className="product-card-image-btn" style={imageStyle}>
          {imageContent}
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
            className="btn btn-whatsapp product-card-btn"
          >
            ¡Haz tu pedido!
          </a>
        </div>
      </div>
    </article>
  )
}
