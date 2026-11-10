import { WHATSAPP_NUMBER, formatPhoneNumber } from './contact'

export interface FaqItem {
  question: string
  answer: string
}

/** Shown on the home page and published as FAQ structured data. Keep answers factual. */
export const FAQ: FaqItem[] = [
  {
    question: '¿Qué son las flores eternas?',
    answer:
      'Son flores hechas a mano que no se marchitan. En Helvella las elaboramos con limpiapipas (también conocidos como limpia pipas o alambre de chenilla), pétalo a pétalo, para que conserven su forma y su color con el paso del tiempo.',
  },
  {
    question: '¿Hacen envíos de flores eternas a todo Costa Rica?',
    answer:
      'Sí. Hacemos envíos a todo el país. Escríbenos por WhatsApp y coordinamos la entrega de tu pedido.',
  },
  {
    question: '¿Qué flores y arreglos puedo pedir?',
    answer:
      'Rosas, girasoles, tulipanes, hortensias, orquídeas, gerberas, lavanda, margaritas y muchas más, además de macetitas, mini ramitos y arreglos para bodas, cumpleaños y otras ocasiones especiales. Si buscas una flor que no ves en el catálogo, pregúntanos.',
  },
  {
    question: '¿Puedo personalizar los colores o el arreglo?',
    answer:
      'Sí. Los colores son personalizables según disponibilidad y también creamos arreglos a tu medida. Cuéntanos tu idea y la hacemos realidad.',
  },
  {
    question: '¿Cómo hago un pedido?',
    answer: `Por WhatsApp al ${formatPhoneNumber(WHATSAPP_NUMBER)} o por mensaje directo en Instagram (@helvellacr). Te respondemos con los detalles y el precio de tu pedido.`,
  },
]
