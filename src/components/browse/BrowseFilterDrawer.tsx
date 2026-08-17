import type { ReactNode } from 'react'
import FilterIcon from '../icons/FilterIcon'

interface BrowseFilterDrawerProps {
  id: string
  label: string
  isOpen: boolean
  onClose: () => void
  activeFilterCount: number
  onOpen: () => void
  toolbar?: ReactNode
  children: ReactNode
}

export default function BrowseFilterDrawer({
  id,
  label,
  isOpen,
  onClose,
  activeFilterCount,
  onOpen,
  toolbar,
  children,
}: BrowseFilterDrawerProps) {
  return (
    <>
      <div className="browse-toolbar-area">
        <button
          type="button"
          className="browse-filter-toggle"
          onClick={onOpen}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <FilterIcon />
          Filtros
          {activeFilterCount > 0 && (
            <span className="browse-filter-badge">{activeFilterCount}</span>
          )}
        </button>
        {toolbar}
      </div>

      <div
        className={`browse-filter-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <div
        id={id}
        className={`browse-filter-drawer${isOpen ? ' open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label={label}
      >
        <div className="browse-filter-drawer-header">
          <h2>Filtros</h2>
          <button
            type="button"
            className="browse-filter-drawer-close"
            onClick={onClose}
            aria-label="Cerrar filtros"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </>
  )
}
