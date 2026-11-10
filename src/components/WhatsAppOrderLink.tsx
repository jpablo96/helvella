import { ORDER_CTA_LABEL, getWhatsAppOrderUrl } from '../data/contact'
import { cx } from '../utils/cx'
import ExternalLink from './ExternalLink'
import WhatsAppIcon from './icons/WhatsAppIcon'

interface WhatsAppOrderLinkProps {
  /** Pre-fills the WhatsApp message with this product. */
  productName?: string
  variant?: 'whatsapp' | 'order'
  iconSize?: number
  className?: string
}

export default function WhatsAppOrderLink({
  productName,
  variant = 'whatsapp',
  iconSize = 18,
  className,
}: WhatsAppOrderLinkProps) {
  return (
    <ExternalLink
      href={getWhatsAppOrderUrl(productName)}
      className={cx('btn', `btn-${variant}`, className)}
    >
      <WhatsAppIcon size={iconSize} />
      {ORDER_CTA_LABEL}
    </ExternalLink>
  )
}
