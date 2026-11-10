import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MOBILE_MEDIA_QUERY } from '../constants/breakpoints'
import { HOME_PANEL_IDS, getHomeScrollRoot } from '../constants/home'
import { ORDER_CTA_LABEL, getWhatsAppOrderUrl } from '../data/contact'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useCloseOnDesktopResize } from '../hooks/useCloseOnDesktopResize'
import { useKeydown } from '../hooks/useKeydown'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { cx } from '../utils/cx'
import ExternalLink from './ExternalLink'
import CloseIcon from './icons/CloseIcon'
import SendIcon from './icons/SendIcon'
import WhatsAppIcon from './icons/WhatsAppIcon'
import './WhatsAppButton.css'

const whatsAppUrl = getWhatsAppOrderUrl()
const FLOAT_ARIA_LABEL = `${ORDER_CTA_LABEL} por WhatsApp`
const HERO_VISIBLE_RATIO = 0.45

/** True while the home hero fills most of the screen on mobile, where the button shows its label. */
function useHomeHeroInView(enabled: boolean) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const scrollRoot = enabled ? getHomeScrollRoot() : null
    const hero = enabled ? document.getElementById(HOME_PANEL_IDS.hero) : null

    if (!scrollRoot || !hero) {
      setInView(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= HERO_VISIBLE_RATIO),
      { root: scrollRoot, threshold: [0, HERO_VISIBLE_RATIO, 0.6, 1] },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [enabled])

  return inView
}

function FloatContent() {
  return (
    <>
      <WhatsAppIcon size={24} />
      <span className="whatsapp-float-label">{ORDER_CTA_LABEL}</span>
    </>
  )
}

/** Floating order button: a direct link on desktop, a small chat sheet on mobile. */
export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const [chatOpen, setChatOpen] = useState(false)
  const floatRef = useRef<HTMLButtonElement>(null)
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  const heroInView = useHomeHeroInView(pathname === '/' && isMobile)

  const setChat = useCallback((open: boolean) => {
    setChatOpen(open)
    requestAnimationFrame(() => floatRef.current?.blur())
  }, [])
  const closeChat = useCallback(() => setChat(false), [setChat])

  useBodyScrollLock(chatOpen && isMobile)
  useCloseOnDesktopResize(chatOpen, closeChat)
  useKeydown({ Escape: closeChat }, chatOpen)

  if (!isMobile) {
    return (
      <ExternalLink href={whatsAppUrl} className="whatsapp-float" aria-label={FLOAT_ARIA_LABEL}>
        <FloatContent />
      </ExternalLink>
    )
  }

  const chatTabIndex = chatOpen ? 0 : -1

  return (
    <>
      <div className={cx('whatsapp-chat', chatOpen && 'is-open')} aria-hidden={!chatOpen}>
        <button
          type="button"
          className="whatsapp-chat-backdrop"
          onClick={closeChat}
          aria-label="Cerrar chat de WhatsApp"
          tabIndex={chatTabIndex}
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
              tabIndex={chatTabIndex}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="whatsapp-chat-body">
            <div className="whatsapp-chat-bubble">
              <p>Hola 👋</p>
              <p>¿Tenés alguna consulta o deseas hacer tu pedido por WhatsApp?</p>
            </div>

            <ExternalLink
              href={whatsAppUrl}
              className="whatsapp-chat-cta"
              onClick={closeChat}
              tabIndex={chatTabIndex}
            >
              Abrir chat
              <SendIcon />
            </ExternalLink>
          </div>
        </div>
      </div>

      <button
        ref={floatRef}
        type="button"
        className={cx(
          'whatsapp-float',
          chatOpen && 'whatsapp-float--chat-open',
          heroInView && 'whatsapp-float--hero-label',
        )}
        onClick={() => setChat(true)}
        aria-label={FLOAT_ARIA_LABEL}
        aria-expanded={chatOpen}
        aria-haspopup="dialog"
      >
        <FloatContent />
      </button>
    </>
  )
}
