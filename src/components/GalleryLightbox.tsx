import type { GalleryItem } from '../data/gallery'

import { formatGalleryDate } from '../utils/formatDate'

import ChevronIcon from './icons/ChevronIcon'

import GalleryImage from './GalleryImage'

import ImageLightbox from './ImageLightbox'

import { useLightbox } from '../hooks/useLightbox'

import './ImageLightbox.css'

import './GalleryLightbox.css'



interface GalleryLightboxProps {

  item: GalleryItem

  onClose: () => void

  onPrev?: () => void

  onNext?: () => void

}



export default function GalleryLightbox({ item, onClose, onPrev, onNext }: GalleryLightboxProps) {

  useLightbox({ onClose, onPrev, onNext })



  return (

    <ImageLightbox

      label={item.title}

      bubbleClassName="gallery-lightbox-bubble"

      onClose={onClose}

      visual={

        <div className="gallery-lightbox-visual">

          {onPrev && (

            <button

              type="button"

              className="gallery-lightbox-nav gallery-lightbox-prev"

              onClick={onPrev}

              aria-label="Anterior"

            >

              <ChevronIcon direction="left" />

            </button>

          )}

          {onNext && (

            <button

              type="button"

              className="gallery-lightbox-nav gallery-lightbox-next"

              onClick={onNext}

              aria-label="Siguiente"

            >

              <ChevronIcon direction="right" />

            </button>

          )}

          <GalleryImage
            image={item.image}
            color={item.color}
            title={item.title}
            illustration={item.illustration}
          />

        </div>

      }

      info={

        <div className="image-lightbox-info gallery-lightbox-info">

          <h2>{item.title}</h2>

          {item.description && <p>{item.description}</p>}

          {item.date && (

            <time className="gallery-lightbox-date" dateTime={item.date}>

              {formatGalleryDate(item.date, 'long')}

            </time>

          )}

        </div>

      }

    />

  )

}


