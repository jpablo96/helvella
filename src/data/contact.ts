export const WHATSAPP_NUMBER = '50686583661'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const INSTAGRAM_URL = 'https://www.instagram.com/helvellacr/'
export const FACEBOOK_URL = 'https://www.facebook.com/people/Helvella/61592449117423/'

export const ORDER_CTA_LABEL = '¡Haz tu pedido!'
export const NATIONWIDE_SHIPPING_NOTE = 'Envíos a todo el país.'

export const SOCIAL_URLS = [INSTAGRAM_URL, FACEBOOK_URL] as const

export function getWhatsAppOrderUrl(productName?: string): string {
  const message = productName
    ? `Me interesa el producto: ${productName}. ¿Podrían darme más información?`
    : '¡Hola! Me gustaría hacer un pedido. ¿Podrían ayudarme?'
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

/** `50686583661` → `+506 8658 3661` (or with any other separator). */
export function formatPhoneNumber(number: string, separator = ' '): string {
  return `+${number.replace(/(\d{3})(\d{4})(\d{4})/, ['$1', '$2', '$3'].join(separator))}`
}
