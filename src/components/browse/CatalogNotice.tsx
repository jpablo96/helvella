import { IconConstruction } from '../icons/BrandIcons'

/** "Catálogo en construcción" banner shown on the catalog page. */
export default function CatalogNotice() {
  return (
    <div className="browse-notice framed" role="status">
      <span className="browse-empty-icon" aria-hidden="true">
        <IconConstruction size={26} />
      </span>
      <div>
        <h2 className="browse-notice-title">Catálogo en construcción</h2>
        <p>Algunos productos pueden no estar al día. Confirma disponibilidad por WhatsApp.</p>
      </div>
    </div>
  )
}
