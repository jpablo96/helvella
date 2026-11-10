import { IconArtisan, IconEternal, IconPersonalized, IconShipping } from './icons/BrandIcons'
import WhatsAppOrderLink from './WhatsAppOrderLink'
import './OrderCta.css'

const features = [
  { icon: IconArtisan, title: '100% Artesanal', text: 'Hechas a mano con dedicación.' },
  { icon: IconEternal, title: 'Eternas', text: 'Detalles que perduran siempre.' },
  { icon: IconPersonalized, title: 'Personalizadas', text: 'Arreglos a tu medida.' },
  { icon: IconShipping, title: 'Envíos a todo el país', text: 'A cualquier rincón de Costa Rica.' },
] as const

export default function OrderCta() {
  return (
    <div className="order-cta framed">
      <header className="order-cta-intro">
        <span className="eyebrow">Pedidos por WhatsApp</span>
        <h2>
          ¿Hacemos tu <em>pedido</em>?
        </h2>
        <p>Escríbenos con tu idea y creamos el arreglo perfecto para tu ocasión.</p>
      </header>

      <ul className="order-cta-features">
        {features.map(({ icon: Icon, title, text }) => (
          <li key={title} className="order-cta-feature">
            <span className="order-cta-feature-icon" aria-hidden="true">
              <Icon size={24} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>

      <div className="order-cta-action">
        <WhatsAppOrderLink iconSize={20} className="order-cta-btn" />
        <p className="order-cta-note">Sin compromiso · Te respondemos pronto</p>
      </div>
    </div>
  )
}
