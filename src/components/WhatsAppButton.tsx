import { getWhatsAppOrderUrl } from '../data/contact'

import WhatsAppIcon from './icons/WhatsAppIcon'

import './WhatsAppButton.css'



export default function WhatsAppButton() {

  return (

    <a

      href={getWhatsAppOrderUrl()}

      target="_blank"

      rel="noopener noreferrer"

      className="whatsapp-float"

      aria-label="¡Haz tu pedido! por WhatsApp"

    >

      <WhatsAppIcon size={24} />

      <span className="whatsapp-float-label">¡Haz tu pedido!</span>

    </a>

  )

}


