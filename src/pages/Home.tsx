import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { getHomeGalleryPreview } from '../data/gallery'
import OrderCta from '../components/OrderCta'
import Footer from '../components/Footer'
import GalleryCard from '../components/GalleryCard'
import HomeCarousel from '../components/HomeCarousel'
import HomePanel from '../components/HomePanel'
import HomeScrollHint from '../components/HomeScrollHint'
import ProductCard from '../components/ProductCard'
import { IconArtisan, IconEternal, IconPersonalized, IconShipping } from '../components/icons/BrandIcons'
import Seo from '../components/Seo'
import { HERO_VIDEO_URL } from '../data/site'
import '../styles/browse-layout.css'
import './Home.css'

const features = [
  {
    icon: IconArtisan,
    title: '100% Artesanal',
    text: 'Hechas a mano con dedicación.',
  },
  {
    icon: IconEternal,
    title: 'Eternas',
    text: 'Detalles que perduran siempre.',
  },
  {
    icon: IconPersonalized,
    title: 'Personalizadas',
    text: 'Arreglos a tu medida.',
  },
  {
    icon: IconShipping,
    title: 'Envíos a todo el país',
    text: 'A cualquier rincón de Costa Rica.',
  },
] as const

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const featured = products.filter((product) => product.category === 'flores-eternas').slice(0, 4)
  const galleryPreview = getHomeGalleryPreview()

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
          <div className="hero-inner">
            <div className="hero-showcase home-reveal">
              <div className="hero-video">
                <video
                  className="hero-video__media"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Video de presentación de Helvella"
                >
                  <source src={HERO_VIDEO_URL} type="video/mp4" />
                </video>
              </div>

              <header className="hero-header home-reveal home-reveal--delay-1">
                <span className="hero-badge">Hecho a mano en Costa Rica</span>
                <h1 className="hero-title">
                  <span className="hero-title-line">Flores que el tiempo</span>
                  <span className="hero-title-line">
                    <em>no marchita</em>
                  </span>
                </h1>
              </header>
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
            <HomeCarousel label="Los más vendidos" trackClassName="featured-grid">
              {featured.map((product, index) => (
                <div
                  key={product.id}
                  className={`home-reveal home-reveal--delay-${index + 1}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </HomeCarousel>
            <div className="featured-cta home-reveal home-reveal--delay-4">
              <Link to="/catalogo" className="btn btn-primary">
                Ver catálogo completo
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="galeria" tone="beige" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel id="galeria" className="home-panel--gallery bg-beige" scrollRoot={scrollRef}>
          <div className="container home-panel__inner">
            <div className="section-header home-reveal">
              <h2 className="section-title">Galería</h2>
              <p className="section-subtitle">
                Inspírate con nuestras creaciones y trabajos realizados.
              </p>
            </div>
            <HomeCarousel
              label="Galería"
              trackClassName="browse-grid browse-grid--grid home-gallery-grid"
            >
              {galleryPreview.map((item, index) => (
                <div
                  key={item.id}
                  className={`home-reveal home-reveal--delay-${index + 1}`}
                >
                  <GalleryCard item={item} preview />
                </div>
              ))}
            </HomeCarousel>
            <div className="featured-cta home-reveal home-reveal--delay-5">
              <Link to="/galeria" className="btn btn-primary">
                Ver galería completa
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="pedido" tone="beige" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel
          id="pedido"
          className="home-panel--cta home-panel--closing bg-beige"
          scrollRoot={scrollRef}
        >
          <div className="home-panel__inner home-panel__inner--closing">
            <div className="container home-panel__cta-body">
              <div className="home-reveal">
                <OrderCta embedded features={features} showPerks={false} />
              </div>
            </div>
            <div className="home-closing-footer home-reveal home-reveal--delay-2">
              <Footer />
            </div>
          </div>
        </HomePanel>
      </div>
    </>
  )
}
