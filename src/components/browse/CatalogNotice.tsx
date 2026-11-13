import { cx } from '../../utils/cx'
import { IconConstruction } from '../icons/BrandIcons'

interface CatalogNoticeProps {
  className?: string
}

/** "Catálogo en construcción" banner shown on the catalog page and the home featured panel. */
export default function CatalogNotice({ className }: CatalogNoticeProps) {
  return (
    <div className={cx('browse-notice framed', className)} role="status">
      <span className="browse-empty-icon" aria-hidden="true">
        <IconConstruction size={26} />
      </span>
      <div>
        <h2 className="browse-notice-title">Catálogo en construcción</h2>
        <p>
          Estamos actualizando nuestro catálogo. Algunos productos o precios pueden no estar al día;
          escríbenos por WhatsApp para confirmar disponibilidad.
        </p>
      </div>
    </div>
  )
}
