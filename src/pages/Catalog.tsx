import { useState } from 'react'
import type { FloresEternasSubcategory } from '../data/catalog'
import BrowseEmpty from '../components/browse/BrowseEmpty'
import BrowseFilterDrawer from '../components/browse/BrowseFilterDrawer'
import BrowsePagination from '../components/browse/BrowsePagination'
import CatalogFilters from '../components/browse/CatalogFilters'
import CatalogNotice from '../components/browse/CatalogNotice'
import CustomOrderNotice from '../components/browse/CustomOrderNotice'
import ViewToggle, { type ViewMode } from '../components/browse/ViewToggle'
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
  const pagination = usePagination(filters.filteredProducts, 60)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

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
        lead="Flores, macetitas, arreglos, animalitos y broches hechos a mano con limpiapipas. ¿Buscas algo que no está aquí? También lo hacemos a pedido. Envíos a todo Costa Rica."
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
            <CatalogNotice />
            <CustomOrderNotice />
            {pagination.totalItems > 0 ? (
              <>
                <div className={`browse-grid browse-grid--${viewMode}`}>
                  {pagination.pageItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <BrowsePagination pagination={pagination} />
              </>
            ) : (
              <BrowseEmpty
                title="Muy pronto"
                message="Todavía no hay productos en este filtro, pero podemos hacer lo que nos pidas: escríbenos por WhatsApp."
              />
            )}
          </div>
        </div>
      </section>

    </>
  )
}
