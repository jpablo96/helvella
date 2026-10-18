import type { ReactNode } from 'react'
import CloseIcon from './icons/CloseIcon'

interface ImageLightboxProps {
  label: string
  bubbleClassName?: string
  onClose: () => void
  visual: ReactNode
  info?: ReactNode
}

export default function ImageLightbox({
  label,
  bubbleClassName = '',
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
        className={`image-lightbox-bubble${bubbleClassName ? ` ${bubbleClassName}` : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="image-lightbox-close"
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
