import { CUSTOM_ORDER_CTA_LABEL, getWhatsAppCustomOrderUrl } from '../../data/contact'
import ExternalLink from '../ExternalLink'
import { IconPersonalized } from '../icons/BrandIcons'
import WhatsAppIcon from '../icons/WhatsAppIcon'

/** Catalog banner: what is listed is only a sample, anything else is made to order. */
export default function CustomOrderNotice() {
  return (
    <div className="browse-notice browse-notice--action framed">
      <span className="browse-empty-icon" aria-hidden="true">
        <IconPersonalized size={26} />
      </span>
      <div className="browse-notice-text">
        <h2 className="browse-notice-title">¿No ves lo que buscas? Lo hacemos</h2>
        <p>
          Este catálogo es solo una muestra. Hacemos a mano cualquier flor, animalito, broche o
          arreglo que nos pidas, en los colores que quieras: cuéntanos tu idea por WhatsApp.
        </p>
      </div>
      <ExternalLink href={getWhatsAppCustomOrderUrl()} className="btn btn-whatsapp browse-notice-btn">
        <WhatsAppIcon size={18} />
        {CUSTOM_ORDER_CTA_LABEL}
      </ExternalLink>
    </div>
  )
}
