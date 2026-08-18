import { useState, useEffect, useMemo } from 'react'
import {
  categories,
  floresEternasSubcategories,
  products,
  type Category,
  type FloresEternasSubcategory,
  type PageSize,
  type Product,
} from '../data/catalog'
import BrowseFilterDrawer from '../components/browse/BrowseFilterDrawer'
import BrowsePagination from '../components/BrowsePagination'
import CatalogFilters from '../components/CatalogFilters'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import ProductLightbox from '../components/ProductLightbox'
import ViewToggle, { type ViewMode } from '../components/ViewToggle'
import Seo from '../components/Seo'
import { useFilterDrawer } from '../hooks/useFilterDrawer'
import '../styles/browse-layout.css'
import './Catalog.css'

const emptyMessages: Partial<Record<FloresEternasSubcategory, string>> = {
  macetitas:
    'Estamos preparando nuestra colección de macetitas. ¡Síguenos en redes para estar al tanto!',
  arreglos:
    'Estamos preparando nuestra colección de arreglos. ¡Síguenos en redes para estar al tanto!',
  animalitos:
    'Pronto tendremos animalitos hechos a mano. ¡Síguenos en redes para conocer los lanzamientos!',
}

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('flores-eternas')
  const [activeSubcategory, setActiveSubcategory] = useState<FloresEternasSubcategory>('todos')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [pageSize, setPageSize] = useState<PageSize>(8)
  const [currentPage, setCurrentPage] = useState(1)
  const { isOpen: filtersOpen, open: openFilters, close: closeFilters } = useFilterDrawer()

  const activeCat = categories.find((c) => c.id === activeCategory)
  const hasLaunchedProducts = Boolean(activeCat?.active)
  const filterSubcategories =
    activeCategory === 'flores-eternas' && hasLaunchedProducts
      ? floresEternasSubcategories
      : floresEternasSubcategories.filter((sub) => sub.id === 'todos')

  const filteredProducts = products
    .filter((product) => {
      if (product.category !== activeCategory) return false
      if (activeCategory !== 'flores-eternas') return true
      if (activeSubcategory === 'todos') return true
      return product.subcategory === activeSubcategory
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProducts.slice(start, start + pageSize)
  }, [filteredProducts, currentPage, pageSize])

  const subcategoryCounts = useMemo(() => {
    const categoryProducts = products.filter((product) => product.category === activeCategory)

    return Object.fromEntries(
      filterSubcategories.map((sub) => [
        sub.id,
        sub.id === 'todos'
          ? categoryProducts.length
          : categoryProducts.filter((product) => product.subcategory === sub.id).length,
      ]),
    ) as Record<FloresEternasSubcategory, number>
  }, [activeCategory, filterSubcategories])

  const activeFilterCount =
    activeCategory === 'flores-eternas' && activeSubcategory !== 'todos' ? 1 : 0

  useEffect(() => {
    closeFilters()
  }, [activeCategory, closeFilters])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, activeSubcategory, pageSize])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
    setActiveSubcategory('todos')
    setSelectedProduct(null)
  }

  const handleSubcategoryChange = (subcategory: FloresEternasSubcategory) => {
    setActiveSubcategory(subcategory)
    setSelectedProduct(null)
    closeFilters()
  }

  const emptyMessage =
    activeCategory === 'flores-eternas' && activeSubcategory !== 'todos'
      ? emptyMessages[activeSubcategory] ??
        'No hay productos en este filtro todavía. ¡Pronto habrá más!'
      : 'Estamos trabajando en esta línea de productos. ¡Síguenos en redes para conocer los lanzamientos!'

  const filtersPanel = (
    <CatalogFilters
      subcategories={filterSubcategories}
      counts={subcategoryCounts}
      activeSubcategory={activeSubcategory}
      onSubcategoryChange={handleSubcategoryChange}
    />
  )

  return (
    <>
      <Seo
        title="Catálogo de Flores Eternas"
        socialTitle="Flores Eternas en Costa Rica | Catálogo Helvella"
        description="Catálogo de flores eternas en Costa Rica por Helvella. Rosas, girasoles, ramos y arreglos hechos a mano con limpiapipas. Envíos a todo el país."
        path="/catalogo"
      />
      <PageHero
        className="catalog-hero"
        title="Catálogo"
        lead="Explora nuestras creaciones. Pedidos por WhatsApp. Envíos a todo el país."
      />

      <section className="section catalog-content bg-beige">
        <div className="browse-shell">
          <div className="browse-main-header">
            <div className="category-tabs" role="tablist" aria-label="Categorías de productos">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`category-tab${activeCategory === cat.id ? ' active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                  {!cat.active && <span className="category-soon">Pronto</span>}
                </button>
              ))}
            </div>

            {activeCat && <p className="page-description">{activeCat.description}</p>}
          </div>

          <aside className="browse-sidebar" aria-label="Filtros de catálogo">
            <h2 className="browse-sidebar-title">Filtros</h2>
            {filtersPanel}
          </aside>

          <BrowseFilterDrawer
            id="catalog-filter-drawer"
            label="Filtros de catálogo"
            isOpen={filtersOpen}
            onOpen={openFilters}
            onClose={closeFilters}
            activeFilterCount={activeFilterCount}
            toolbar={
              <div className="browse-toolbar browse-toolbar--end">
                <ViewToggle value={viewMode} onChange={setViewMode} />
              </div>
            }
          >
            {filtersPanel}
          </BrowseFilterDrawer>

          <div className="browse-products-area">
            {filteredProducts.length > 0 ? (
              <>
                <div className={`browse-grid browse-grid--${viewMode}`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onImageClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>

                <BrowsePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredProducts.length}
                  onPageChange={(page) => {
                    setCurrentPage(page)
                    setSelectedProduct(null)
                  }}
                  onPageSizeChange={setPageSize}
                />
              </>
            ) : (
              <div className="browse-empty">
                <span className="browse-empty-icon" aria-hidden="true">🎨</span>
                <h3>Próximamente</h3>
                <p>{emptyMessage}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductLightbox
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
