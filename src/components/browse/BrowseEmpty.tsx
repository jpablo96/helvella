import { IconEternal } from '../icons/BrandIcons'

interface BrowseEmptyProps {
  title?: string
  message: string
}

export default function BrowseEmpty({ title = 'Próximamente', message }: BrowseEmptyProps) {
  return (
    <div className="browse-empty framed">
      <span className="browse-empty-icon" aria-hidden="true">
        <IconEternal size={28} />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}
