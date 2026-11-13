import { useEffect, useRef } from 'react'
import { HOME_PANEL_IDS } from '../constants/home'
import { products } from '../data/catalog'
import { getHomeGalleryPreview } from '../data/gallery'
import CatalogNotice from '../components/browse/CatalogNotice'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import GalleryCard from '../components/GalleryCard'
import HomeHero from '../components/home/HomeHero'
import HomePanel from '../components/home/HomePanel'
import { HomeScrollContext } from '../components/home/HomeScrollContext'
import HomeShowcase from '../components/home/HomeShowcase'
import OrderCta from '../components/OrderCta'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import { revealDelay } from '../utils/revealDelay'
import '../styles/browse-layout.css'
import './Home.css'

const FEATURED_COUNT = 4

const featuredProducts = products.slice(0, FEATURED_COUNT)

const galleryPreview = getHomeGalleryPreview()

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  return (
    <HomeScrollContext.Provider value={scrollRef}>
      <Seo page="home" />
      <div className="home-scroll" ref={scrollRef}>
        <HomeHero />

        <HomeShowcase
          id={HOME_PANEL_IDS.featured}
          nextPanelId={HOME_PANEL_IDS.gallery}
          eyebrow="Colección"
          title="Los más vendidos"
          subtitle="Las creaciones que más eligen nuestros clientes, disponibles para pedido."
          items={featuredProducts}
          getKey={(product) => product.id}
          renderItem={(product) => <ProductCard product={product} />}
          cta={{ to: '/catalogo', label: 'Ver catálogo completo' }}
          notice={<CatalogNotice className="browse-notice--compact" />}
        />

        <HomeShowcase
          id={HOME_PANEL_IDS.gallery}
          nextPanelId={HOME_PANEL_IDS.order}
          eyebrow="Nuestro trabajo"
          title="Galería"
          subtitle="Inspírate con nuestras creaciones y trabajos realizados."
          items={galleryPreview}
          getKey={(item) => item.id}
          renderItem={(item) => <GalleryCard item={item} preview />}
          cta={{ to: '/galeria', label: 'Ver galería completa' }}
        />

        <HomePanel id={HOME_PANEL_IDS.order} className="home-panel--closing bg-beige">
          <div className="container home-closing__body">
            <div className="home-reveal">
              <OrderCta />
            </div>
            <div className="home-reveal" style={revealDelay(1)}>
              <Faq />
            </div>
          </div>
          <div className="home-reveal" style={revealDelay(2)}>
            <Footer />
          </div>
        </HomePanel>
      </div>
    </HomeScrollContext.Provider>
  )
}
