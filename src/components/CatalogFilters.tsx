import type { FloresEternasSubcategory } from '../data/catalog'
import './CatalogFilters.css'

interface CatalogFiltersProps {
  subcategories: { id: FloresEternasSubcategory; label: string }[]
  counts: Record<FloresEternasSubcategory, number>
  activeSubcategory: FloresEternasSubcategory
  onSubcategoryChange: (subcategory: FloresEternasSubcategory) => void
}

export default function CatalogFilters({
  subcategories,
  counts,
  activeSubcategory,
  onSubcategoryChange,
}: CatalogFiltersProps) {
  return (
    <div className="catalog-filters-panel">
      <ul className="catalog-filter-list">
        {subcategories.map((sub) => (
          <li key={sub.id}>
            <button
              type="button"
              className={`catalog-filter-option${activeSubcategory === sub.id ? ' active' : ''}`}
              aria-pressed={activeSubcategory === sub.id}
              aria-label={`${sub.label}, ${counts[sub.id]} ${counts[sub.id] === 1 ? 'producto' : 'productos'}`}
              onClick={() => onSubcategoryChange(sub.id)}
            >
              <span className="catalog-filter-label">{sub.label}</span>
              <span className="catalog-filter-count" aria-hidden="true">
                {counts[sub.id]}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
