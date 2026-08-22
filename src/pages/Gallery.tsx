import { useEffect, useMemo, useState } from 'react'
import { galleryItems } from '../data/gallery'
import { type PageSize } from '../data/catalog'
import BrowsePagination from '../components/BrowsePagination'
import GalleryCard from '../components/GalleryCard'
import GalleryLightbox from '../components/GalleryLightbox'
import PageHero from '../components/PageHero'
import ViewToggle, { type ViewMode } from '../components/ViewToggle'
import Seo from '../components/Seo'
import '../styles/browse-layout.css'

export default function Gallery() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState<PageSize>(10)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / pageSize))

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return galleryItems.slice(start, start + pageSize)
  }, [currentPage, pageSize])

  const pageOffset = (currentPage - 1) * pageSize
  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null

  useEffect(() => {
    setCurrentPage(1)
    setSelectedIndex(null)
  }, [pageSize])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <>
      <Seo
        title="Galería"
        socialTitle="Galería de Creaciones | Helvella — Flores Eternas"
        description="Inspírate con nuestras flores eternas artesanales hechas a mano en Costa Rica. Un vistazo a nuestras creaciones y trabajos realizados."
        path="/galeria"
      />
      <PageHero
        className="gallery-hero"
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
              {paginatedItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onOpen={() => setSelectedIndex(pageOffset + index)}
                />
              ))}
            </div>

            <BrowsePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={galleryItems.length}
              onPageChange={(page) => {
                setCurrentPage(page)
                setSelectedIndex(null)
              }}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </section>

      {selectedItem && selectedIndex !== null && (
        <GalleryLightbox
          item={selectedItem}
          onClose={() => setSelectedIndex(null)}
          onPrev={selectedIndex > 0 ? () => setSelectedIndex((i) => (i !== null ? i - 1 : i)) : undefined}
          onNext={
            selectedIndex < galleryItems.length - 1
              ? () => setSelectedIndex((i) => (i !== null ? i + 1 : i))
              : undefined
          }
        />
      )}
    </>
  )
}
