import { getWhatsAppOrderUrl } from '../data/contact'
import type { Product } from '../data/catalog'
import ProductIllustration from './illustrations/ProductIllustration'
import ImageLightbox from './ImageLightbox'
import { useLightbox } from '../hooks/useLightbox'
import './ImageLightbox.css'

interface ProductLightboxProps {
  product: Product
  onClose: () => void
}

export default function ProductLightbox({ product, onClose }: ProductLightboxProps) {
  useLightbox({ onClose })

  return (
    <ImageLightbox
      label={product.name}
      onClose={onClose}
      visual={
        <div
          className="image-lightbox-visual"
          style={{ '--flower-color': product.color } as Record<string, string>}
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
          {product.price && <span className="image-lightbox-price">{product.price}</span>}
          <a
            href={getWhatsAppOrderUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp image-lightbox-cta"
          >
            ¡Haz tu pedido!
          </a>
        </div>
      }
    />
  )
}
