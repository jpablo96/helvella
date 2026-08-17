import { PAGE_SIZE_OPTIONS, type PageSize } from '../data/catalog'
import './BrowsePageSize.css'

interface BrowsePageSizeProps {
  pageSize: PageSize
  onPageSizeChange: (size: PageSize) => void
}

export default function BrowsePageSize({ pageSize, onPageSizeChange }: BrowsePageSizeProps) {
  return (
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
      <span className="browse-page-size-suffix">por página</span>
    </div>
  )
}
