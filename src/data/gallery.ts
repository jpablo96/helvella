import type { IllustrationType } from './types'

export interface GalleryItem {
  id: string
  title: string
  description: string
  illustration: IllustrationType
  images: string[]
  /** Reel or clip. The card shows the still; the lightbox plays this. */
  video?: string
  color: string
}

function galleryImages(folder: string, filenames: string[]): string[] {
  return filenames.map((filename) => `/gallery/${folder}/${encodeURIComponent(filename)}`)
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'post14',
    title: 'Broches florales',
    description: 'Broches florales hechos a mano, en distintos diseños y colores.',
    illustration: 'flor',
    images: galleryImages('post14', [
      'post14-1.webp',
      'post14-2.webp',
      'post14-3.webp',
      'post14-4.webp',
      'post14-5.webp',
      'post14-6.webp',
      'post14-7.webp',
      'post14-8.webp',
    ]),
    color: '#E89BB5',
  },
  {
    id: 'post15',
    title: 'Ramo de Gerberas, Margaritas y Cempasúchil',
    description:
      'Ramo con 2 Gerberas, 3 Margaritas y 2 Cempasúchil, en envoltura blanca con lazo dorado.',
    illustration: 'ramo',
    images: galleryImages('post15', ['post15-1.webp', 'post15-2.webp']),
    color: '#F0C040',
  },
  {
    id: 'post16',
    title: 'Cabecitas de animales',
    description: 'Cabecitas de conejo, pulpo, perro y cerdito hechas a mano con limpiapipas.',
    illustration: 'conejo',
    images: galleryImages('post16', ['post16.webp']),
    color: '#F5C6D0',
  },
  {
    id: 'post17',
    title: 'Pedido de macetitas',
    description:
      'Macetitas de lavanda, tulipán, girasol, suculenta colorata, cactus saguaro y cactus biznaga.',
    illustration: 'macetita',
    images: galleryImages('post17', ['post17.webp']),
    color: '#C4A574',
  },
  {
    id: 'post18',
    title: 'Arreglo de Lavanda',
    description: 'Arreglo de lavanda en florero blanco.',
    illustration: 'lavanda',
    images: galleryImages('post18', ['post18.webp']),
    video: '/gallery/post18/post18.webm',
    color: '#9B7EBD',
  },
  {
    id: 'post10',
    title: 'Nuestras macetitas',
    description:
      'Girasoles, tulipanes, hortensia y macetitas hechas a mano con limpiapipas.',
    illustration: 'girasol',
    images: galleryImages('post10', [
      'post10-1.webp',
      'post10-2.webp',
      'post10-3.webp',
      'post10-4.webp',
    ]),
    color: '#F0C040',
  },
  {
    id: 'post9',
    title: 'Macetita de Corazones',
    description:
      'Composición en macetita que contiene flores en forma de corazón color rosa con perlas.',
    illustration: 'arreglo',
    images: galleryImages('post9', ['post9.webp']),
    color: '#E8A0B8',
  },
  {
    id: 'post8',
    title: 'Macetitas de Gerberas',
    description:
      'Nuestras macetitas de Gerberas, una rosa, una azul y una roja.',
    illustration: 'arreglo',
    images: galleryImages('post8', ['post8-1.webp', 'post8-2.webp', 'post8-3.webp', 'post8-4.webp']),
    color: '#A8C8E8',
  },
  {
    id: 'post7',
    title: 'Arreglo de Clivias con Cempasúchil',
    description:
      'Composición en florero que contiene varias Clivias, 2 Cempasúchil y 3 Margaritas.',
    illustration: 'rosa',
    images: galleryImages('post7', ['post7.webp']),
    color: '#B83B4A',
  },
  {
    id: 'post6',
    title: 'Macetita de Tulipanes',
    description: 'Composición en macetita que contiene 6 Tulipanes de diferentes colores.',
    illustration: 'margarita',
    images: galleryImages('post6', ['post6.webp']),
    color: '#F5F0E8',
  },
  {
    id: 'post4',
    title: 'Orquídeas',
    description:
      'Composición experimental en candela de madera con 3 Orquídeas blancas.',
    illustration: 'centro-mesa',
    images: galleryImages('post4', ['post4.webp']),
    color: '#9B6B9E',
  },
  {
    id: 'post3',
    title: 'Hortensia',
    description: 'Composición en florero que contiene una Hortensia morada.',
    illustration: 'ramo',
    images: galleryImages('post3', ['post3.webp']),
    color: '#E8B4B8',
  },
  {
    id: 'post2',
    title: 'Arreglo de Girasoles',
    description: 'Composición en florero que contiene 3 Girasoles Pequeños.',
    illustration: 'arreglo',
    images: galleryImages('post2', ['post2.webp']),
    color: '#C45C6A',
  },
  {
    id: 'post1',
    title: 'Arreglo de Rosas',
    description:
      'Composición en florero que contiene 3 Rosas vino, 1 Rosa blanca y 2 ramitas de Gypsophila.',
    illustration: 'ramo',
    images: galleryImages('post1', ['post1.webp']),
    color: '#D4A5C8',
  },
  {
    id: 'post5',
    title: 'Arreglo de Girasoles y Margaritas',
    description:
      'Composición en florero que contiene 3 Girasoles Pequeños, 4 Margaritas y 3 ramitas con hojas.',
    illustration: 'girasol',
    images: galleryImages('post5', ['post5.webp']),
    color: '#F0C040',
  },
  {
    id: 'post11',
    title: 'Rosas',
    description: 'Nuestras Rosas, una roja y una amarilla.',
    illustration: 'ramo',
    images: galleryImages('post11', ['post11.webp']),
    color: '#E8A838',
  },
  {
    id: 'post12',
    title: 'Girasol',
    description: 'Nuestro Girasol mediano con pétalo grueso.',
    illustration: 'arreglo',
    images: galleryImages('post12', ['post12-1.webp', 'post12-2.webp']),
    color: '#6C265B',
  },
  {
    id: 'post13',
    title: 'Arreglo de Girasoles',
    description:
      'Composición en florero con 3 Girasoles medianos de pétalo delgado.',
    illustration: 'girasol',
    images: galleryImages('post13', ['post13.webp']),
    color: '#C45C6A',
  },
]

export const homeGalleryPreviewIds = ['post1', 'post3', 'post9', 'post12'] as const

export function getHomeGalleryPreview(): GalleryItem[] {
  const byId = new Map(galleryItems.map((item) => [item.id, item]))

  return homeGalleryPreviewIds.flatMap((id) => {
    const item = byId.get(id)
    return item ? [item] : []
  })
}
