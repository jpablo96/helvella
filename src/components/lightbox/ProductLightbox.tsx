import type { Product } from '../../data/catalog'
import { getProductPriceLabel } from '../../data/productDisplay'
import { useLightbox } from '../../hooks/useLightbox'
import { flowerColorStyle } from '../../utils/flowerColorStyle'
import ProductIllustration from '../illustrations/ProductIllustration'
import WhatsAppOrderLink from '../WhatsAppOrderLink'
import ImageLightbox from './ImageLightbox'

interface ProductLightboxProps {
  product: Product
  onClose: () => void
}

export default function ProductLightbox({ product, onClose }: ProductLightboxProps) {
  useLightbox({ onClose })
  const priceLabel = getProductPriceLabel(product)

  return (
    <ImageLightbox
      label={product.name}
      onClose={onClose}
      visual={
        <div
          className="image-lightbox-visual flower-backdrop"
          style={flowerColorStyle(product.color)}
        >
          <ProductIllustration
            type={product.illustration}
            color={product.color}
            variant="lightbox"
          />
        </div>
      }
      info={
        <div className="image-lightbox-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {priceLabel && <span className="image-lightbox-price">{priceLabel}</span>}
          <WhatsAppOrderLink productName={product.name} className="image-lightbox-cta" />
        </div>
      }
    />
  )
}
