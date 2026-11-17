import { useState } from 'react'
import { galleryOrderedItems, galleryTopItems } from '../data/gallery'
import BrowsePagination from '../components/browse/BrowsePagination'
import ViewToggle, { type ViewMode } from '../components/browse/ViewToggle'
import GalleryCard from '../components/GalleryCard'
import GalleryLightbox from '../components/lightbox/GalleryLightbox'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { usePagination } from '../hooks/usePagination'
import '../styles/browse-layout.css'

export default function Gallery() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  // Index into the shown list, so the lightbox can step across pages.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const items = showAll ? galleryOrderedItems : galleryTopItems
  const lastIndex = items.length - 1
  const pagination = usePagination(items, 20)

  return (
    <>
      <Seo page="gallery" />
      <PageHero
        eyebrow="Nuestro trabajo"
        title="Galería de flores eternas"
        lead="Un vistazo a nuestras creaciones hechas a mano con limpiapipas. Toca una imagen para verla en detalle."
      />

      <section className="section bg-beige">
        <div className="browse-shell browse-shell--full">
          <div className="browse-products-area">
            <div className="browse-toolbar browse-toolbar--end">
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>

            <div className={`browse-grid browse-grid--${viewMode}`}>
              {pagination.pageItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onOpen={() => setSelectedIndex(pagination.pageOffset + index)}
                />
              ))}
            </div>

            {showAll ? (
              <BrowsePagination pagination={pagination} />
            ) : (
              <div className="browse-show-all">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAll(true)}>
                  Ver todas las creaciones
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <GalleryLightbox
          item={items[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={selectedIndex > 0 ? () => setSelectedIndex(selectedIndex - 1) : undefined}
          onNext={
            selectedIndex < lastIndex ? () => setSelectedIndex(selectedIndex + 1) : undefined
          }
        />
      )}
    </>
  )
}
