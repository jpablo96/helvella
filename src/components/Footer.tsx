import { Link } from 'react-router-dom'
import SocialLinks from './SocialLinks'
import { WHATSAPP_NUMBER, INSTAGRAM_URL, formatPhoneNumber, NATIONWIDE_SHIPPING_NOTE } from '../data/contact'
import { navLinks } from '../data/navigation'
import { LOGO_URL, SITE_DEVELOPER } from '../data/site'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-image-wrap">
              <img
                src={LOGO_URL}
                alt="Helvella"
                className="footer-logo-image"
                width={64}
                height={64}
              />
            </span>
            <span>Helvella</span>
          </Link>
          <p className="footer-tagline">
            Arte hecho a mano con amor en Costa Rica.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
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
            <h4>Pedidos</h4>
            <p className="footer-contact-text">
              <span className="footer-contact-line">Pedidos por WhatsApp.</span>
              <span className="footer-contact-line">{NATIONWIDE_SHIPPING_NOTE}</span>
            </p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="footer-whatsapp">
              +{formatPhoneNumber(WHATSAPP_NUMBER)}
            </a>
          </div>

          <div className="footer-social">
            <h4>Síguenos</h4>
            <SocialLinks size="md" onDark />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Helvella. Todos los derechos reservados.</p>
          <p className="footer-credit">
            Desarrollado por{' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              {SITE_DEVELOPER.name}
            </a>
          </p>
          <p className="footer-credit-pitch">
            Sabemos de flores eternas y de sitios web.{' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Contáctanos
            </a>{' '}
            si quieres tu página.
          </p>
        </div>
      </div>
    </footer>
  )
}
