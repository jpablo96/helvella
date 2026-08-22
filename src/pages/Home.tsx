import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { getWhatsAppOrderUrl } from '../data/contact'
import { galleryItems } from '../data/gallery'
import Footer from '../components/Footer'
import GalleryCard from '../components/GalleryCard'
import HomePanel from '../components/HomePanel'
import HomeScrollHint from '../components/HomeScrollHint'
import ProductCard from '../components/ProductCard'
import WhatsAppIcon from '../components/icons/WhatsAppIcon'
import { IconArtisan, IconEternal, IconGift, IconShipping } from '../components/icons/BrandIcons'
import Seo from '../components/Seo'
import '../styles/browse-layout.css'
import './Home.css'

const features = [
  {
    icon: IconArtisan,
    title: '100% Artesanal',
    text: 'Cada pieza es elaborada a mano con dedicación y cuidado en cada detalle.',
  },
  {
    icon: IconEternal,
    title: 'Eternas',
    text: 'Detalles que perduran en el tiempo y que te acompañarán para siempre.',
  },
  {
    icon: IconGift,
    title: 'Personalizadas',
    text: 'Creamos arreglos a tu medida para bodas, cumpleaños y ocasiones especiales.',
  },
  {
    icon: IconShipping,
    title: 'Envíos a todo el país',
    text: 'Llevamos tus creaciones a cualquier rincón de Costa Rica.',
  },
] as const

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const featured = products.filter((product) => product.category === 'flores-eternas').slice(0, 4)
  const galleryPreview = galleryItems.slice(-5).reverse()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Seo
        title="Flores Eternas en Costa Rica"
        socialTitle="Helvella | Flores Eternas en Costa Rica"
        description="Helvella es tu taller de flores eternas en Costa Rica: piezas hechas a mano con limpiapipas, arreglos personalizados y envíos a todo el país. ¡Haz tu pedido por WhatsApp!"
        path="/"
      />
      <div className="home-scroll" ref={scrollRef}>
        <HomePanel
          id="inicio"
          className="home-panel--hero"
          scrollRoot={scrollRef}
          initialVisible
        >
          <div className="container hero-inner">
            <div className="hero-top">
              <header className="hero-header home-reveal">
                <span className="hero-badge">Hecho a mano en Costa Rica</span>
                <h1 className="hero-title">
                  Flores que el tiempo
                  <em> no marchita</em>
                </h1>
              </header>

              <div
                className="hero-mock-video home-reveal home-reveal--delay-1"
                aria-label="Video de presentación próximamente"
              >
                <div className="hero-mock-video__frame">
                  <span className="hero-mock-video__play" aria-hidden="true">
                    ▶
                  </span>
                  <span className="hero-mock-video__label">Video próximamente</span>
                </div>
              </div>

              <div className="hero-meta home-reveal home-reveal--delay-2">
                <div className="hero-actions">
                  <Link to="/catalogo" className="btn btn-primary">
                    Ver catálogo
                  </Link>
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <WhatsAppIcon />
                    ¡Haz tu pedido!
                  </a>
                </div>
                <Link to="/nosotros" className="hero-about-link">
                  Conoce nuestra historia →
                </Link>
              </div>
            </div>

            <div className="hero-features-grid home-reveal home-reveal--delay-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className={`feature-card home-reveal home-reveal--delay-${index + 1}`}
                  >
                    <span className="feature-icon" aria-hidden="true">
                      <Icon size={32} />
                    </span>
                    <div className="feature-card-body">
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <HomeScrollHint targetId="destacados" tone="ciruela" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel id="destacados" className="home-panel--featured bg-beige" scrollRoot={scrollRef}>
          <div className="container home-panel__inner">
            <div className="section-header home-reveal">
              <h2 className="section-title">Los más vendidos</h2>
              <p className="section-subtitle">
                Las creaciones que más eligen nuestros clientes, disponibles para pedido.
              </p>
            </div>
            <div className="featured-grid">
              {featured.map((product, index) => (
                <div
                  key={product.id}
                  className={`home-reveal home-reveal--delay-${index + 1}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="featured-cta home-reveal home-reveal--delay-4">
              <Link to="/catalogo" className="btn btn-primary">
                Ver catálogo completo
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="galeria" tone="beige" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel
          id="galeria"
          className="home-panel--gallery home-panel--closing bg-beige"
          scrollRoot={scrollRef}
        >
          <div className="home-panel__inner home-panel__inner--closing">
            <div className="container home-gallery-closing-content">
              <div className="section-header home-reveal">
                <h2 className="section-title">Galería</h2>
                <p className="section-subtitle">
                  Inspírate con nuestras creaciones y trabajos realizados.
                </p>
              </div>
              <div className="browse-grid browse-grid--grid home-gallery-grid">
                {galleryPreview.map((item, index) => (
                  <div
                    key={item.id}
                    className={`home-reveal home-reveal--delay-${index + 1}`}
                  >
                    <GalleryCard item={item} preview />
                  </div>
                ))}
              </div>
              <div className="featured-cta home-reveal home-reveal--delay-6">
                <Link to="/galeria" className="btn btn-primary">
                  Ver galería completa
                </Link>
              </div>
            </div>
            <div className="home-closing-footer home-reveal home-reveal--delay-1">
              <Footer />
            </div>
          </div>
        </HomePanel>
      </div>
    </>
  )
}
