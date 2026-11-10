import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import CloseIcon from '../icons/CloseIcon'
import './ImageLightbox.css'

interface ImageLightboxProps {
  label: string
  bubbleClassName?: string
  onClose: () => void
  visual: ReactNode
  info?: ReactNode
}

export default function ImageLightbox({
  label,
  bubbleClassName,
  onClose,
  visual,
  info,
}: ImageLightboxProps) {
  return (
    <div
      className="image-lightbox-overlay"
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
    </div>
  )
}
