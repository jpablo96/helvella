import { PAGE_SIZE_OPTIONS, type PageSize } from '../data/catalog'
import './BrowsePagination.css'

interface BrowsePaginationProps {
  currentPage: number
  totalPages: number
  pageSize: PageSize
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: PageSize) => void
}

export default function BrowsePagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: BrowsePaginationProps) {
  if (totalItems === 0) return null

  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="browse-pagination">
      <div className="browse-page-size">
        <label htmlFor="browse-page-size">Mostrar</label>
        <select
          id="browse-page-size"
          className="browse-page-size-select"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value) as PageSize)}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>por página</span>
      </div>

      <p className="browse-pagination-range">
        {start}–{end} de {totalItems}
      </p>

      {totalPages > 1 && (
        <nav className="browse-pagination-nav" aria-label="Paginación">
          <button
            type="button"
            className="browse-pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            Anterior
          </button>

          <span className="browse-pagination-status">
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            className="browse-pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </nav>
      )}
    </div>
  )
}
