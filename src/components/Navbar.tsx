import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../data/navigation'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useCloseOnDesktopResize } from '../hooks/useCloseOnDesktopResize'
import { useNavbarTheme } from '../hooks/useNavbarTheme'
import { cx } from '../utils/cx'
import BrandLogo from './BrandLogo'
import './Navbar.css'

interface NavLinksProps {
  linkClassName: string
  onNavigate?: () => void
}

function NavLinks({ linkClassName, onNavigate }: NavLinksProps) {
  return navLinks.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      className={({ isActive }) => cx(linkClassName, isActive && 'active')}
      onClick={onNavigate}
    >
      {link.label}
    </NavLink>
  ))
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const theme = useNavbarTheme()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useBodyScrollLock(menuOpen)
  useCloseOnDesktopResize(menuOpen, closeMenu)

  return (
    <>
      <header className={cx('navbar', `navbar--${theme}`)}>
        <div className="container navbar-inner">
          <BrandLogo
            className="navbar-logo"
            alt="Helvella — Flores eternas artesanales"
            onClick={closeMenu}
          />

          <nav className="navbar-nav" aria-label="Navegación principal">
            <NavLinks linkClassName="nav-link" />
          </nav>

          <div className="navbar-actions">
            <button
              type="button"
              className={cx('navbar-toggle', menuOpen && 'open')}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="navbar-toggle-bar" />
              <span className="navbar-toggle-bar" />
              <span className="navbar-toggle-bar" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cx('navbar-mobile-overlay', menuOpen && 'open')}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <nav
        id="mobile-nav"
        className={cx('navbar-mobile', `navbar-mobile--${theme}`, menuOpen && 'open')}
        aria-label="Navegación móvil"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="navbar-mobile-links">
          <NavLinks linkClassName="navbar-mobile-link" onNavigate={closeMenu} />
        </div>
      </nav>
    </>
  )
}
