import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { cx } from '../utils/cx'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppButton from './WhatsAppButton'
import './Layout.css'

export default function Layout() {
  const { pathname } = useLocation()
  // Home is a full-height snap scroller that renders its own footer in the last panel.
  const isHome = pathname === '/'

  useScrollToTop()

  useEffect(() => {
    document.documentElement.classList.toggle('is-home', isHome)
    return () => document.documentElement.classList.remove('is-home')
  }, [isHome])

  return (
    <div className={cx('layout', isHome && 'layout--home')}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      {!isHome && <Footer />}
      <WhatsAppButton />
    </div>
  )
}
