import { useEffect, useRef, useState } from 'react'
import { HOME_PANEL_IDS } from '../constants/home'
import { products } from '../data/catalog'
import { getHomeGalleryPreview } from '../data/gallery'
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

// The first three best sellers are fixed; the other two are drawn from the rest of the catalog.
const FIXED_FEATURED_COUNT = 3
const RANDOM_FEATURED_COUNT = 2

const fixedFeatured = products.slice(0, FIXED_FEATURED_COUNT)
const otherProducts = products.slice(FIXED_FEATURED_COUNT).filter((product) => product.available)

/** A few of the other products, picked at random without repeats. */
function pickRandomFeatured() {
  const pool = [...otherProducts]
  const picked = []
  while (picked.length < RANDOM_FEATURED_COUNT && pool.length > 0) {
    picked.push(...pool.splice(Math.floor(Math.random() * pool.length), 1))
  }
  return picked
}

const galleryPreview = getHomeGalleryPreview()

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  // Starts on the same products the pre-rendered page shows, then random ones take their place.
  const [extraFeatured, setExtraFeatured] = useState(() =>
    otherProducts.slice(0, RANDOM_FEATURED_COUNT),
  )
  const featuredProducts = [...fixedFeatured, ...extraFeatured]

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    setExtraFeatured(pickRandomFeatured())
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
          subtitle="Las creaciones que más eligen nuestros clientes."
          items={featuredProducts}
          getKey={(product) => product.id}
          renderItem={(product) => <ProductCard product={product} />}
          cta={{ to: '/catalogo', label: 'Ver catálogo completo' }}
          trackClassName="home-grid--five"
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
