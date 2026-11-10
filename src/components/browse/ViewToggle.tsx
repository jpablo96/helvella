import { cx } from '../../utils/cx'
import { GridIcon, ListIcon } from '../icons/ViewIcons'
import './ViewToggle.css'

export type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

const modes = [
  { mode: 'grid', label: 'Cuadrícula', ariaLabel: 'Vista en cuadrícula', Icon: GridIcon },
  { mode: 'list', label: 'Lista', ariaLabel: 'Vista en lista', Icon: ListIcon },
] as const

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle" role="group" aria-label="Modo de vista">
      {modes.map(({ mode, label, ariaLabel, Icon }) => (
        <button
          key={mode}
          type="button"
          className={cx('view-toggle-btn', value === mode && 'active')}
          onClick={() => onChange(mode)}
          aria-pressed={value === mode}
          aria-label={ariaLabel}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
