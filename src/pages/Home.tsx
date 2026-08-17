import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { getWhatsAppOrderUrl } from '../data/contact'
import { galleryItems } from '../data/gallery'
import Footer from '../components/Footer'
import FlowerIllustration from '../components/FlowerIllustration'
import GalleryCard from '../components/GalleryCard'
import HomePanel from '../components/HomePanel'
import HomeScrollHint from '../components/HomeScrollHint'
import ProductCard from '../components/ProductCard'
import OrderCta from '../components/OrderCta'
import WhatsAppIcon from '../components/icons/WhatsAppIcon'
import { IconArtisan, IconEternal, IconGift } from '../components/icons/BrandIcons'
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
] as const

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const featured = products.filter((product) => product.category === 'flores-eternas').slice(0, 4)
  const galleryPreview = galleryItems.slice(-4).reverse()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Seo />
      <div className="home-scroll" ref={scrollRef}>
        <HomePanel
          id="inicio"
          className="home-panel--intro"
          scrollRoot={scrollRef}
          initialVisible
        >
          <div className="home-panel__inner home-panel__inner--intro">
            <div className="hero">
              <div className="container hero-inner">
                <div className="hero-content home-reveal">
                  <span className="hero-badge">Hecho a mano en Costa Rica</span>
                  <h1 className="hero-title">
                    Flores que el tiempo
                    <em> no marchita</em>
                  </h1>
                  <p className="hero-text">
                    En Helvella creamos flores eternas con limpiapipas, piezas únicas para regalar
                    y decorar. Crear con las manos es nuestra forma de expresarnos. Las flores son solo
                    el primer capítulo.
                  </p>
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
                <div className="hero-visual" aria-hidden="true">
                  <div className="hero-flower hero-flower--1">
                    <FlowerIllustration color="#C45C6A" variant="hero" />
                  </div>
                  <div className="hero-flower hero-flower--2">
                    <FlowerIllustration color="#E8A838" variant="hero" />
                  </div>
                  <div className="hero-flower hero-flower--3">
                    <FlowerIllustration color="#9B6B9E" variant="hero" />
                  </div>
                </div>
              </div>
            </div>

            <div className="home-intro-features">
              <div className="container">
                <div className="features-grid">
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
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="home-scroll-hint-row">
                <HomeScrollHint targetId="destacados" tone="beige" />
              </div>
            </div>
          </div>
        </HomePanel>

        <HomePanel id="destacados" className="home-panel--featured bg-ciruela" scrollRoot={scrollRef}>
          <div className="container home-panel__inner">
            <div className="section-header home-reveal">
              <h2 className="section-title">Destacados</h2>
              <p className="section-subtitle">
                Algunas de nuestras creaciones más populares, disponibles para pedido.
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
                Ver todo el catálogo
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="galeria" tone="ciruela" />
        </HomePanel>

        <HomePanel id="galeria" className="home-panel--gallery bg-beige" scrollRoot={scrollRef}>
          <div className="container home-panel__inner">
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
                  <GalleryCard item={item} to="/galeria" />
                </div>
              ))}
            </div>
            <div className="featured-cta home-reveal home-reveal--delay-4">
              <Link to="/galeria" className="btn btn-primary">
                Ver galería completa
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="pedido" tone="beige" />
        </HomePanel>

        <HomePanel id="pedido" className="home-panel--final" scrollRoot={scrollRef}>
          <div className="home-panel__final">
            <div className="home-reveal">
              <OrderCta />
            </div>
            <div className="home-reveal home-reveal--delay-1">
              <Footer />
            </div>
          </div>
        </HomePanel>
      </div>
    </>
  )
}
