import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import './Layout.css'

export default function Layout() {
  const { pathname } = useLocation()
  const showFooter = pathname !== '/'
  const isHome = pathname === '/'

  useEffect(() => {
    document.documentElement.classList.toggle('is-home', isHome)
    return () => document.documentElement.classList.remove('is-home')
  }, [isHome])

  return (
    <div className={`layout${isHome ? ' layout--home' : ''}`}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      {showFooter && <Footer />}
      <WhatsAppButton />
    </div>
  )
}
