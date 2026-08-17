import { useState } from 'react'

import { Link, NavLink } from 'react-router-dom'

import { LOGO_URL } from '../data/site'

import { navLinks } from '../data/navigation'

import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

import { useCloseOnDesktopResize } from '../hooks/useCloseOnDesktopResize'

import { useNavbarTheme } from '../hooks/useNavbarTheme'

import './Navbar.css'



export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  const theme = useNavbarTheme()



  useBodyScrollLock(menuOpen)

  useCloseOnDesktopResize(menuOpen, () => setMenuOpen(false))



  const closeMenu = () => setMenuOpen(false)



  return (

    <>

      <header className={`navbar navbar--${theme}`}>

        <div className="container navbar-inner">

          <Link to="/" className="navbar-logo" onClick={closeMenu}>

            <span className="logo-image-wrap">

              <img

                src={LOGO_URL}

                alt="Helvella — Flores eternas artesanales"

                className="logo-image"

                width={58}

                height={58}

              />

            </span>

            <span className="logo-text">Helvella</span>

          </Link>



          <nav className="navbar-nav" aria-label="Navegación principal">

            {navLinks.map((link) => (

              <NavLink

                key={link.to}

                to={link.to}

                end={link.to === '/'}

                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}

              >

                {link.label}

              </NavLink>

            ))}

          </nav>



          <div className="navbar-actions">

            <button

              type="button"

              className={`navbar-toggle${menuOpen ? ' open' : ''}`}

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

        className={`navbar-mobile-overlay${menuOpen ? ' open' : ''}`}

        onClick={closeMenu}

        aria-hidden={!menuOpen}

      />



      <nav

        id="mobile-nav"

        className={`navbar-mobile navbar-mobile--${theme}${menuOpen ? ' open' : ''}`}

        aria-label="Navegación móvil"

        aria-hidden={!menuOpen}

      >

        <div className="navbar-mobile-links">

          {navLinks.map((link) => (

            <NavLink

              key={link.to}

              to={link.to}

              end={link.to === '/'}

              className={({ isActive }) => `navbar-mobile-link${isActive ? ' active' : ''}`}

              onClick={closeMenu}

            >

              {link.label}

            </NavLink>

          ))}

        </div>

      </nav>

    </>

  )

}


