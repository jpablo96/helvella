import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { getHomeGalleryPreview } from '../data/gallery'
import { HERO_VIDEO_URL } from '../data/site'
import Footer from '../components/Footer'
import GalleryCard from '../components/GalleryCard'
import HomeCarousel from '../components/HomeCarousel'
import HomePanel from '../components/HomePanel'
import HomeScrollHint from '../components/HomeScrollHint'
import OrderCta from '../components/OrderCta'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import ArrowIcon from '../components/icons/ArrowIcon'
import '../styles/browse-layout.css'
import './Home.css'

const featuredProducts = products
  .filter((product) => product.category === 'flores-eternas')
  .slice(0, 4)

const galleryPreview = getHomeGalleryPreview()

interface HomeSectionHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

function HomeSectionHeader({ eyebrow, title, subtitle }: HomeSectionHeaderProps) {
  return (
    <header className="home-section__header home-reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="home-section__title">{title}</h2>
      <p className="home-section__subtitle">{subtitle}</p>
    </header>
  )
}

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

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
        <HomePanel id="inicio" className="home-panel--hero" scrollRoot={scrollRef} initialVisible>
          <div className="hero home-reveal">
            <video
              className="hero__video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Video de presentación de Helvella"
            >
              <source src={HERO_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="hero__scrim" aria-hidden="true" />

            <header className="hero__content home-reveal home-reveal--delay-1">
              <span className="eyebrow eyebrow--light">Hecho a mano en Costa Rica</span>
              <h1 className="hero__title">
                Flores que el tiempo <em>no marchita</em>
              </h1>
              <p className="hero__lead">
                Flores eternas hechas a mano con limpiapipas, pétalo a pétalo.
              </p>
              <div className="hero__actions">
                <Link to="/catalogo" className="btn btn-primary">
                  Ver catálogo
                  <ArrowIcon className="btn-icon btn-icon--arrow" />
                </Link>
              </div>
            </header>
          </div>
          <HomeScrollHint targetId="destacados" tone="ciruela" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel id="destacados" className="home-panel--featured bg-beige" scrollRoot={scrollRef}>
          <div className="container home-section">
            <HomeSectionHeader
              eyebrow="Colección"
              title="Los más vendidos"
              subtitle="Las creaciones que más eligen nuestros clientes, disponibles para pedido."
            />
            <HomeCarousel label="Los más vendidos" trackClassName="home-grid featured-grid">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className={`home-reveal home-reveal--delay-${index + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </HomeCarousel>
            <div className="home-section__cta home-reveal home-reveal--delay-4">
              <Link to="/catalogo" className="btn btn-primary">
                Ver catálogo completo
                <ArrowIcon className="btn-icon btn-icon--arrow" />
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="galeria" tone="beige" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel id="galeria" className="home-panel--gallery bg-beige" scrollRoot={scrollRef}>
          <div className="container home-section">
            <HomeSectionHeader
              eyebrow="Nuestro trabajo"
              title="Galería"
              subtitle="Inspírate con nuestras creaciones y trabajos realizados."
            />
            <HomeCarousel label="Galería" trackClassName="home-grid home-gallery-grid">
              {galleryPreview.map((item, index) => (
                <div key={item.id} className={`home-reveal home-reveal--delay-${index + 1}`}>
                  <GalleryCard item={item} preview />
                </div>
              ))}
            </HomeCarousel>
            <div className="home-section__cta home-reveal home-reveal--delay-5">
              <Link to="/galeria" className="btn btn-primary">
                Ver galería completa
                <ArrowIcon className="btn-icon btn-icon--arrow" />
              </Link>
            </div>
          </div>
          <HomeScrollHint targetId="pedido" tone="beige" scrollRoot={scrollRef} />
        </HomePanel>

        <HomePanel id="pedido" className="home-panel--closing bg-beige" scrollRoot={scrollRef}>
          <div className="container home-closing__body">
            <div className="home-reveal">
              <OrderCta />
            </div>
          </div>
          <div className="home-reveal home-reveal--delay-2">
            <Footer />
          </div>
        </HomePanel>
      </div>
    </>
  )
}
