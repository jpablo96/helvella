import type { ReactNode } from 'react'

interface ImageLightboxProps {
  label: string
  bubbleClassName?: string
  onClose: () => void
  visual: ReactNode
  info: ReactNode
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
        <button type="button" className="image-lightbox-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        {visual}
        {info}
      </div>
    </div>
  )
}
