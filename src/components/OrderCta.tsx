import type { ComponentType } from 'react'

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



export interface OrderCtaFeature {

  icon: ComponentType<{ size?: number }>

  title: string

  text: string

}



interface OrderCtaProps {

  showPerks?: boolean

  embedded?: boolean

  features?: readonly OrderCtaFeature[]

}



export default function OrderCta({

  showPerks = true,

  embedded = false,

  features,

}: OrderCtaProps) {

  const unified = Boolean(features?.length)



  const card = (

    <div className={`order-cta-card${unified ? ' order-cta-card--unified' : ''}`}>

      <header className="order-cta-intro">

        <span className="order-cta-badge">Pedidos por WhatsApp</span>

        <h2>¿Hacemos tu pedido?</h2>

        <p>

          {unified

            ? 'Escríbenos con tu idea y creamos el arreglo perfecto para tu ocasión.'

            : 'Cuéntanos tu idea y creamos algo único para ti: un regalo especial, una decoración o el arreglo perfecto para tu ocasión.'}

        </p>

      </header>



      {features && features.length > 0 && (

        <ul className="order-cta-features">

          {features.map((feature) => {

            const Icon = feature.icon

            return (

              <li key={feature.title} className="order-cta-feature">

                <span className="order-cta-feature-icon" aria-hidden="true">

                  <Icon size={28} />

                </span>

                <div className="order-cta-feature-body">

                  <h3>{feature.title}</h3>

                  <p>{feature.text}</p>

                </div>

              </li>

            )

          })}

        </ul>

      )}



      {showPerks && !unified && (

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

      )}



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

  )



  if (embedded) {

    return (

      <div className={`order-cta order-cta--embedded${unified ? ' order-cta--unified' : ''}`}>

        {card}

      </div>

    )

  }



  return (

    <section className="section order-cta">

      <div className="container">{card}</div>

    </section>

  )

}


