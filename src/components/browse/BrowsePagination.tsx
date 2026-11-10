import type { Pagination } from '../../hooks/usePagination'
import ChevronIcon from '../icons/ChevronIcon'
import BrowsePageSize from './BrowsePageSize'
import './BrowsePagination.css'

interface BrowsePaginationProps {
  pagination: Pagination<unknown>
}

export default function BrowsePagination({ pagination }: BrowsePaginationProps) {
  const { currentPage, totalPages, pageSize, pageOffset, totalItems, setPage, setPageSize } =
    pagination

  if (totalItems === 0) return null

  const start = pageOffset + 1
  const end = Math.min(pageOffset + pageSize, totalItems)

  return (
    <div className="browse-pagination">
      <BrowsePageSize pageSize={pageSize} onPageSizeChange={setPageSize} />

      {totalPages > 1 ? (
        <nav className="browse-pagination-nav" aria-label="Paginación">
          <button
            type="button"
            className="browse-pagination-btn"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <ChevronIcon direction="left" size={14} />
            Anterior
          </button>

          <span className="browse-pagination-status">
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            className="browse-pagination-btn"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            Siguiente
            <ChevronIcon direction="right" size={14} />
          </button>
        </nav>
      ) : (
        // Keeps the three-column layout balanced when there is a single page.
        <div className="browse-pagination-nav browse-pagination-nav--placeholder" aria-hidden="true" />
      )}

      <p className="browse-pagination-range">
        {start}–{end} de {totalItems}
      </p>
    </div>
  )
}
