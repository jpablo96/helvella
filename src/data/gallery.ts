import type { Category } from './catalog'
import type { IllustrationType } from './types'

export interface GalleryItem {
  id: string
  title: string
  description: string
  category: Category
  illustration: IllustrationType
  images: string[]
  color: string
}

function galleryImages(folder: string, filenames: string[]): string[] {
  return filenames.map((filename) => `/gallery/${folder}/${encodeURIComponent(filename)}`)
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'post1',
    title: 'Arreglo de Rosas',
    description:
      'Composición en florero que contiene 3 Rosas vino, 1 Rosa blanca y 2 ramitas de Gypsophila.',
    category: 'flores-eternas',
    illustration: 'ramo',
    images: galleryImages('post1', ['post1.webp']),
    color: '#D4A5C8',
  },
  {
    id: 'post2',
    title: 'Arreglo de Girasoles',
    description: 'Composición en florero que contiene 3 Girasoles Pequeños.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post2', ['post2.webp']),
    color: '#C45C6A',
  },
  {
    id: 'post3',
    title: 'Hortensia',
    description: 'Composición en florero que contiene una Hortensia morada.',
    category: 'flores-eternas',
    illustration: 'ramo',
    images: galleryImages('post3', ['post3.webp']),
    color: '#E8B4B8',
  },
  {
    id: 'post4',
    title: 'Orquídeas',
    description:
      'Composición experimental en candela de madera con 3 Orquídeas blancas.',
    category: 'flores-eternas',
    illustration: 'centro-mesa',
    images: galleryImages('post4', ['post4.webp']),
    color: '#9B6B9E',
  },
  {
    id: 'post5',
    title: 'Arreglo de Girasoles y Margaritas',
    description:
      'Composición en florero que contiene 3 Girasoles Pequeños, 4 Margaritas y 3 ramitas con hojas.',
    category: 'flores-eternas',
    illustration: 'girasol',
    images: galleryImages('post5', ['post5.webp']),
    color: '#F0C040',
  },
  {
    id: 'post6',
    title: 'Macetita de Tulipanes',
    description: 'Composición en macetita que contiene 6 Tulipanes de diferentes colores.',
    category: 'flores-eternas',
    illustration: 'margarita',
    images: galleryImages('post6', ['post6.webp']),
    color: '#F5F0E8',
  },
  {
    id: 'post7',
    title: 'Arreglo de Clivias con Cempasúchil',
    description:
      'Composición en florero que contiene varias Clivias, 2 Cempasúchil y 3 Margaritas.',
    category: 'flores-eternas',
    illustration: 'rosa',
    images: galleryImages('post7', ['post7.webp']),
    color: '#B83B4A',
  },
  {
    id: 'post8',
    title: 'Macetitas de Gerberas',
    description:
      'Nuestras macetitas de Gerberas, una rosa, una azul y una roja.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post8', ['post8-1.webp', 'post8-2.webp', 'post8-3.webp', 'post8-4.webp']),
    color: '#A8C8E8',
  },
  {
    id: 'post9',
    title: 'Macetita de Corazones',
    description:
      'Composición en macetita que contiene flores en forma de corazón color rosa con perlas.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post9', ['post9.webp']),
    color: '#E8A0B8',
  },
  {
    id: 'post10',
    title: 'Nuestras macetitas',
    description:
      'Girasoles, tulipanes, hortensia y macetitas hechas a mano con limpiapipas.',
    category: 'flores-eternas',
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
    id: 'post11',
    title: 'Rosas',
    description: 'Nuestras Rosas, una roja y una amarilla.',
    category: 'flores-eternas',
    illustration: 'ramo',
    images: galleryImages('post11', ['post11.webp']),
    color: '#E8A838',
  },
  {
    id: 'post12',
    title: 'Girasol',
    description: 'Nuestro Girasol mediano con pétalo grueso.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post12', ['post12-1.webp', 'post12-2.webp']),
    color: '#6C265B',
  },
  {
    id: 'post13',
    title: 'Arreglo de Girasoles',
    description:
      'Composición en florero con 3 Girasoles medianos de pétalo delgado.',
    category: 'flores-eternas',
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
