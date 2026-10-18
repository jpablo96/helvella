import { useMemo, useState } from 'react'
import {
  categories,
  floresEternasSubcategories,
  products,
  type Category,
  type FloresEternasSubcategory,
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
import { IconEternal } from '../components/icons/BrandIcons'
import { useFilterDrawer } from '../hooks/useFilterDrawer'
import { usePagination } from '../hooks/usePagination'
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

const DEFAULT_EMPTY_MESSAGE =
  'Estamos trabajando en esta línea de productos. ¡Síguenos en redes para conocer los lanzamientos!'

const allSubcategoryOnly = floresEternasSubcategories.filter((sub) => sub.id === 'todos')

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('flores-eternas')
  const [activeSubcategory, setActiveSubcategory] = useState<FloresEternasSubcategory>('todos')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { isOpen: filtersOpen, open: openFilters, close: closeFilters } = useFilterDrawer()

  const activeCat = categories.find((c) => c.id === activeCategory)
  const isFloresEternas = activeCategory === 'flores-eternas'
  const filterSubcategories =
    isFloresEternas && activeCat?.active ? floresEternasSubcategories : allSubcategoryOnly

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  const filteredProducts = useMemo(
    () =>
      !isFloresEternas || activeSubcategory === 'todos'
        ? categoryProducts
        : categoryProducts.filter((product) => product.subcategory === activeSubcategory),
    [activeSubcategory, categoryProducts, isFloresEternas],
  )

  const subcategoryCounts = useMemo(
    () =>
      Object.fromEntries(
        filterSubcategories.map((sub) => [
          sub.id,
          sub.id === 'todos'
            ? categoryProducts.length
            : categoryProducts.filter((product) => product.subcategory === sub.id).length,
        ]),
      ) as Record<FloresEternasSubcategory, number>,
    [categoryProducts, filterSubcategories],
  )

  const pagination = usePagination(filteredProducts)
  const activeFilterCount = isFloresEternas && activeSubcategory !== 'todos' ? 1 : 0

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
    setActiveSubcategory('todos')
    setSelectedProduct(null)
    closeFilters()
  }

  const handleSubcategoryChange = (subcategory: FloresEternasSubcategory) => {
    setActiveSubcategory(subcategory)
    setSelectedProduct(null)
    closeFilters()
  }

  const emptyMessage =
    isFloresEternas && activeSubcategory !== 'todos'
      ? (emptyMessages[activeSubcategory] ??
        'No hay productos en este filtro todavía. ¡Pronto habrá más!')
      : DEFAULT_EMPTY_MESSAGE

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
        eyebrow="Colección"
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
                  type="button"
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
                  {pagination.pageItems.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onImageClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>

                <BrowsePagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  pageSize={pagination.pageSize}
                  totalItems={filteredProducts.length}
                  onPageChange={(page) => {
                    pagination.setPage(page)
                    setSelectedProduct(null)
                  }}
                  onPageSizeChange={pagination.setPageSize}
                />
              </>
            ) : (
              <div className="browse-empty">
                <span className="browse-empty-icon" aria-hidden="true">
                  <IconEternal size={28} />
                </span>
                <h3>Próximamente</h3>
                <p>{emptyMessage}</p>
              </div>
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
