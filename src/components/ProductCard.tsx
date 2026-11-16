import type { Product } from '../data/catalog'
import { getProductPriceLabel } from '../data/productDisplay'
import { flowerColorStyle } from '../utils/flowerColorStyle'
import { cx } from '../utils/cx'
import GalleryImage from './GalleryImage'
import ProductIllustration from './illustrations/ProductIllustration'
import WhatsAppOrderLink from './WhatsAppOrderLink'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageStyle = flowerColorStyle(product.color)
  const imageClassName = cx(
    'product-card-image-btn flower-backdrop',
    product.image && 'product-card-image-btn--photo',
  )
  const illustration = product.image ? (
    <GalleryImage
      image={product.image}
      color={product.color}
      title={`${product.name} — hecho a mano con limpiapipas`}
      illustration={product.illustration}
      imageClassName="product-card-photo"
    />
  ) : (
    <ProductIllustration type={product.illustration} color={product.color} variant="card" />
  )

  return (
    <article className="product-card browse-card">
      <div className={imageClassName} style={imageStyle}>
        {illustration}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        {product.note && <p className="product-card-note">{product.note}</p>}
        <div className="product-card-footer">
          <span className="product-card-price">{getProductPriceLabel(product)}</span>
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
