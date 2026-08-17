import { getWhatsAppOrderUrl, NATIONWIDE_SHIPPING_NOTE } from '../data/contact'
import WhatsAppIcon from './icons/WhatsAppIcon'
import { IconArtisan, IconChat, IconGift, IconShipping } from './icons/BrandIcons'
import './OrderCta.css'

const perks = [
  { icon: IconArtisan, text: 'Piezas personalizadas a tu gusto' },
  { icon: IconChat, text: 'Atención directa y respuesta rápida' },
  { icon: IconShipping, text: NATIONWIDE_SHIPPING_NOTE },
  { icon: IconGift, text: 'Ideal para regalar o decorar' },
] as const

export default function OrderCta() {
  return (
    <section className="section order-cta">
      <div className="container">
        <div className="order-cta-card">
          <div className="order-cta-content">
            <span className="order-cta-badge">Pedidos por WhatsApp</span>
            <h2>¿Hacemos tu pedido?</h2>
            <p>
              Cuéntanos tu idea y creamos algo único para ti: un regalo especial,
              una decoración o el arreglo perfecto para tu ocasión.
            </p>
            <ul className="order-cta-perks">
              {perks.map((perk) => {
                const Icon = perk.icon
                return (
                  <li key={perk.text}>
                    <span className="order-cta-perk-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    {perk.text}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="order-cta-action">
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp order-cta-btn"
            >
              <WhatsAppIcon size={22} />
              ¡Haz tu pedido!
            </a>
            <p className="order-cta-note">Sin compromiso · Te respondemos pronto</p>
          </div>
        </div>
      </div>
    </section>
  )
}
