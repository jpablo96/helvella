import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import CloseIcon from '../icons/CloseIcon'
import './ImageLightbox.css'

interface ImageLightboxProps {
  label: string
  bubbleClassName?: string
  overlayClassName?: string
  onClose: () => void
  visual: ReactNode
  info?: ReactNode
  /** Controls drawn on the backdrop, beside the bubble (e.g. previous / next item). */
  outside?: ReactNode
}

export default function ImageLightbox({
  label,
  bubbleClassName,
  overlayClassName,
  onClose,
  visual,
  info,
  outside,
}: ImageLightboxProps) {
  return (
    <div
      className={cx('image-lightbox-overlay', overlayClassName)}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className={cx('image-lightbox-bubble', bubbleClassName)}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="image-lightbox-close glass-chip"
          onClick={onClose}
          aria-label="Cerrar"
          autoFocus
        >
          <CloseIcon size={18} />
        </button>
        {visual}
        {info}
      </div>
      {outside}
    </div>
  )
}
