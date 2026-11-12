import { Link } from 'react-router-dom'
import {
  NATIONWIDE_SHIPPING_NOTE,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
  formatPhoneNumber,
} from '../data/contact'
import { navLinks } from '../data/navigation'
import { SITE_DEVELOPER, SITE_NAME } from '../data/site'
import BrandLogo from './BrandLogo'
import ExternalLink from './ExternalLink'
import SocialLinks from './SocialLinks'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer surface-ciruela">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandLogo className="footer-logo" />
          <p className="footer-tagline">Arte hecho a mano con amor en Costa Rica.</p>
        </div>

        <div className="footer-links">
          <h4 className="label-caps">Navegación</h4>
          <nav aria-label="Enlaces del pie de página">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-aside">
          <div className="footer-contact">
            <h4 className="label-caps">Pedidos</h4>
            <p className="footer-contact-text">
              <span>Pedidos por WhatsApp.</span>
              <span>{NATIONWIDE_SHIPPING_NOTE}</span>
            </p>
            <ExternalLink href={WHATSAPP_URL} className="footer-whatsapp">
              {formatPhoneNumber(WHATSAPP_NUMBER)}
            </ExternalLink>
          </div>

          <div className="footer-social">
            <h4 className="label-caps">Síguenos</h4>
            <SocialLinks size="md" onDark />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="footer-credit">
            Desarrollado por{' '}
            <ExternalLink href={SITE_DEVELOPER.url}>{SITE_DEVELOPER.name}</ExternalLink>
          </p>
          <p className="footer-credit footer-credit--pitch">
            Sabemos de flores eternas y de sitios web. ¿Quieres tu página? Visita{' '}
            <ExternalLink href={SITE_DEVELOPER.url}>{SITE_DEVELOPER.domain}</ExternalLink>.
          </p>
        </div>
      </div>
    </footer>
  )
}
