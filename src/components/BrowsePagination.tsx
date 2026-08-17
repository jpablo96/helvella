import { type PageSize } from '../data/catalog'
import BrowsePageSize from './BrowsePageSize'
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
      <BrowsePageSize pageSize={pageSize} onPageSizeChange={onPageSizeChange} />

      {totalPages > 1 ? (
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
      ) : (
        <div className="browse-pagination-nav browse-pagination-nav--placeholder" aria-hidden="true" />
      )}

      <p className="browse-pagination-range">
        {start}–{end} de {totalItems}
      </p>
    </div>
  )
}
