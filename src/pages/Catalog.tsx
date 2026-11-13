import { useState } from 'react'
import type { FloresEternasSubcategory, Product } from '../data/catalog'
import BrowseEmpty from '../components/browse/BrowseEmpty'
import { IconConstruction } from '../components/icons/BrandIcons'
import BrowseFilterDrawer from '../components/browse/BrowseFilterDrawer'
import BrowsePagination from '../components/browse/BrowsePagination'
import CatalogFilters from '../components/browse/CatalogFilters'
import ViewToggle, { type ViewMode } from '../components/browse/ViewToggle'
import ProductLightbox from '../components/lightbox/ProductLightbox'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useFilterDrawer } from '../hooks/useFilterDrawer'
import { usePagination } from '../hooks/usePagination'
import '../styles/browse-layout.css'

export default function Catalog() {
  const filters = useCatalogFilters()
  const drawer = useFilterDrawer()
  // Show the whole catalog on one page so every product is in the pre-rendered HTML.
  const pagination = usePagination(filters.filteredProducts, 40)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleSubcategoryChange = (subcategory: FloresEternasSubcategory) => {
    filters.selectSubcategory(subcategory)
    drawer.close()
  }

  const filtersPanel = (
    <CatalogFilters
      subcategories={filters.subcategories}
      counts={filters.subcategoryCounts}
      activeSubcategory={filters.activeSubcategory}
      onSubcategoryChange={handleSubcategoryChange}
    />
  )

  return (
    <>
      <Seo page="catalog" />
      <PageHero
        eyebrow="Colección"
        title="Catálogo de flores eternas"
        lead="Flores, macetitas y arreglos hechos a mano con limpiapipas. Pedidos por WhatsApp y envíos a todo Costa Rica."
      />

      <section className="section bg-beige">
        <div className="browse-shell">
          <aside className="browse-sidebar" aria-label="Filtros de catálogo">
            <h2 className="browse-sidebar-title label-caps">Filtros</h2>
            {filtersPanel}
          </aside>

          <BrowseFilterDrawer
            id="catalog-filter-drawer"
            label="Filtros de catálogo"
            isOpen={drawer.isOpen}
            onOpen={drawer.open}
            onClose={drawer.close}
            activeFilterCount={filters.activeFilterCount}
            toolbar={
              <div className="browse-toolbar browse-toolbar--end">
                <ViewToggle value={viewMode} onChange={setViewMode} />
              </div>
            }
          >
            {filtersPanel}
          </BrowseFilterDrawer>

          <div className="browse-products-area">
            <div className="browse-notice framed" role="status">
              <span className="browse-empty-icon" aria-hidden="true">
                <IconConstruction size={26} />
              </span>
              <div>
                <h2 className="browse-notice-title">Catálogo en construcción</h2>
                <p>
                  Estamos actualizando nuestro catálogo. Algunos productos o precios pueden no estar
                  al día; escríbenos por WhatsApp para confirmar disponibilidad.
                </p>
              </div>
            </div>
            {pagination.totalItems > 0 ? (
              <>
                <div className={`browse-grid browse-grid--${viewMode}`}>
                  {pagination.pageItems.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onImageClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
                <BrowsePagination pagination={pagination} />
              </>
            ) : (
              <BrowseEmpty
                title="Muy pronto"
                message="Todavía no hay productos en este filtro. ¡Síguenos en redes para conocer los lanzamientos!"
              />
            )}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductLightbox product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  )
}
