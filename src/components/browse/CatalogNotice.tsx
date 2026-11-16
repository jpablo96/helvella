import { cx } from '../../utils/cx'
import { IconConstruction } from '../icons/BrandIcons'

interface CatalogNoticeProps {
  className?: string
  /** Show only the icon and title, without the explanatory paragraph. */
  titleOnly?: boolean
}

/** "Catálogo en construcción" banner shown on the catalog page and the home featured panel. */
export default function CatalogNotice({ className, titleOnly = false }: CatalogNoticeProps) {
  return (
    <div className={cx('browse-notice framed', className)} role="status">
      <span className="browse-empty-icon" aria-hidden="true">
        <IconConstruction size={26} />
      </span>
      <div>
        <h2 className="browse-notice-title">Catálogo en construcción</h2>
        {!titleOnly && (
          <p>
            Estamos actualizando nuestro catálogo y algunos productos pueden no estar al día.
            Escríbenos por WhatsApp para confirmar disponibilidad y precio.
          </p>
        )}
      </div>
    </div>
  )
}
