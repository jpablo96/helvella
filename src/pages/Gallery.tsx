import { useState } from 'react'
import { galleryItems } from '../data/gallery'
import BrowsePagination from '../components/BrowsePagination'
import GalleryCard from '../components/GalleryCard'
import GalleryLightbox from '../components/GalleryLightbox'
import PageHero from '../components/PageHero'
import ViewToggle, { type ViewMode } from '../components/ViewToggle'
import Seo from '../components/Seo'
import { usePagination } from '../hooks/usePagination'
import '../styles/browse-layout.css'

export default function Gallery() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const pagination = usePagination(galleryItems)
  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null

  return (
    <>
      <Seo
        title="Galería"
        socialTitle="Galería de Creaciones | Helvella — Flores Eternas"
        description="Inspírate con nuestras flores eternas artesanales hechas a mano en Costa Rica. Un vistazo a nuestras creaciones y trabajos realizados."
        path="/galeria"
      />
      <PageHero
        eyebrow="Nuestro trabajo"
        title="Galería"
        lead="Un vistazo a nuestras creaciones hechas a mano. Toca una imagen para verla en detalle."
      />

      <section className="section gallery-content bg-beige">
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

            <BrowsePagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              pageSize={pagination.pageSize}
              totalItems={galleryItems.length}
              onPageChange={(page) => {
                pagination.setPage(page)
                setSelectedIndex(null)
              }}
              onPageSizeChange={(size) => {
                pagination.setPageSize(size)
                setSelectedIndex(null)
              }}
            />
          </div>
        </div>
      </section>

      {selectedItem && selectedIndex !== null && (
        <GalleryLightbox
          item={selectedItem}
          onClose={() => setSelectedIndex(null)}
          onPrev={selectedIndex > 0 ? () => setSelectedIndex(selectedIndex - 1) : undefined}
          onNext={
            selectedIndex < galleryItems.length - 1
              ? () => setSelectedIndex(selectedIndex + 1)
              : undefined
          }
        />
      )}
    </>
  )
}
