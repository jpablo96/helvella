import './ViewToggle.css'

export type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle" role="group" aria-label="Modo de vista">
      <button
        type="button"
        className={`view-toggle-btn${value === 'grid' ? ' active' : ''}`}
        onClick={() => onChange('grid')}
        aria-pressed={value === 'grid'}
        aria-label="Vista en cuadrícula"
      >
        <GridIcon />
        <span>Cuadrícula</span>
      </button>
      <button
        type="button"
        className={`view-toggle-btn${value === 'list' ? ' active' : ''}`}
        onClick={() => onChange('list')}
        aria-pressed={value === 'list'}
        aria-label="Vista en lista"
      >
        <ListIcon />
        <span>Lista</span>
      </button>
    </div>
  )
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="2" width="14" height="3" rx="1" />
      <rect x="1" y="7" width="14" height="3" rx="1" />
      <rect x="1" y="12" width="14" height="3" rx="1" />
    </svg>
  )
}
