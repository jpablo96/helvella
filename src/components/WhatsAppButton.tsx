import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getWhatsAppOrderUrl } from '../data/contact'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useCloseOnDesktopResize } from '../hooks/useCloseOnDesktopResize'
import WhatsAppIcon from './icons/WhatsAppIcon'
import './WhatsAppButton.css'

const MOBILE_BREAKPOINT = '(max-width: 768px)'

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [chatOpen, setChatOpen] = useState(false)
  const [heroInView, setHeroInView] = useState(false)
  const floatRef = useRef<HTMLButtonElement>(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_BREAKPOINT).matches,
  )

  const whatsAppUrl = getWhatsAppOrderUrl()

  const closeChat = useCallback(() => {
    setChatOpen(false)
    requestAnimationFrame(() => floatRef.current?.blur())
  }, [])

  const openChat = useCallback(() => {
    setChatOpen(true)
    requestAnimationFrame(() => floatRef.current?.blur())
  }, [])

  useBodyScrollLock(chatOpen && isMobile)
  useCloseOnDesktopResize(chatOpen, closeChat)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_BREAKPOINT)
    const updateIsMobile = () => setIsMobile(media.matches)
    updateIsMobile()
    media.addEventListener('change', updateIsMobile)
    return () => media.removeEventListener('change', updateIsMobile)
  }, [])

  useEffect(() => {
    if (!isHome || !isMobile) {
      setHeroInView(false)
      return
    }

    const scrollRoot = document.querySelector<HTMLElement>('.home-scroll')
    const hero = document.getElementById('inicio')
    if (!scrollRoot || !hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting && entry.intersectionRatio >= 0.45),
      { root: scrollRoot, threshold: [0, 0.45, 0.6, 1] },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome, isMobile])

  useEffect(() => {
    if (!chatOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeChat()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [chatOpen, closeChat])

  return (
    <>
      {isMobile && (
        <div
          className={`whatsapp-chat${chatOpen ? ' is-open' : ''}`}
          aria-hidden={!chatOpen}
        >
          <button
            type="button"
            className="whatsapp-chat-backdrop"
            onClick={closeChat}
            aria-label="Cerrar chat de WhatsApp"
            tabIndex={chatOpen ? 0 : -1}
          />

          <div
            className="whatsapp-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-chat-title"
            aria-hidden={!chatOpen}
          >
            <header className="whatsapp-chat-header">
              <div className="whatsapp-chat-brand">
                <WhatsAppIcon size={22} />
                <span id="whatsapp-chat-title">WhatsApp</span>
              </div>
              <button
                type="button"
                className="whatsapp-chat-close"
                onClick={closeChat}
                aria-label="Cerrar"
                tabIndex={chatOpen ? 0 : -1}
              >
                ✕
              </button>
            </header>

            <div className="whatsapp-chat-body">
              <div className="whatsapp-chat-bubble">
                <p>Hola 👋</p>
                <p>¿Tenés alguna consulta o deseas hacer tu pedido por WhatsApp?</p>
              </div>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-chat-cta"
                onClick={closeChat}
                tabIndex={chatOpen ? 0 : -1}
              >
                Abrir chat
                <SendIcon />
              </a>
            </div>
          </div>
        </div>
      )}

      {isMobile ? (
        <button
          ref={floatRef}
          type="button"
          className={`whatsapp-float${chatOpen ? ' whatsapp-float--chat-open' : ''}${heroInView ? ' whatsapp-float--hero-label' : ''}`}
          onClick={openChat}
          aria-label="¡Haz tu pedido! por WhatsApp"
          aria-expanded={chatOpen}
          aria-haspopup="dialog"
        >
          <WhatsAppIcon size={24} />
          <span className="whatsapp-float-label">¡Haz tu pedido!</span>
        </button>
      ) : (
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="¡Haz tu pedido! por WhatsApp"
        >
          <WhatsAppIcon size={24} />
          <span className="whatsapp-float-label">¡Haz tu pedido!</span>
        </a>
      )}
    </>
  )
}
