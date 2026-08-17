import type { Category } from './catalog'
import type { IllustrationType } from './types'

export interface GalleryItem {
  id: string
  title: string
  description?: string
  category: Category
  illustration: IllustrationType
  /** Ruta a la imagen en public/gallery/, ej: '/gallery/ramo-boda.jpg' */
  image?: string
  /** Color de respaldo cuando no hay imagen */
  color: string
  date: string
}

const gallerySource: GalleryItem[] = [
  {
    id: 'creacion-ramo-primavera',
    title: 'Ramo Primavera',
    description: 'Combinación de flores en tonos pastel.',
    category: 'flores-eternas',
    illustration: 'ramo',
    color: '#D4A5C8',
    date: '2025-03',
  },
  {
    id: 'creacion-girasol-solo',
    title: 'Girasol individual',
    description: 'Girasol eterno de pie, ideal para repisas.',
    category: 'flores-eternas',
    illustration: 'girasol',
    color: '#F0C040',
    date: '2025-04',
  },
  {
    id: 'creacion-margaritas',
    title: 'Margaritas de campo',
    description: 'Racimo de margaritas blancas con centro dorado.',
    category: 'flores-eternas',
    illustration: 'margarita',
    color: '#F5F0E8',
    date: '2025-05',
  },
  {
    id: 'creacion-tulipanes',
    title: 'Tulipanes púrpura',
    description: 'Par de tulipanes para decoración de escritorio.',
    category: 'flores-eternas',
    illustration: 'tulipan',
    color: '#9B6B9E',
    date: '2025-06',
  },
  {
    id: 'entrega-arreglo-bautizo',
    title: 'Arreglo para bautizo',
    description: 'Pieza delicada en tonos celeste y blanco.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    color: '#A8C8E8',
    date: '2025-07',
  },
  {
    id: 'entrega-rosas-rojas',
    title: 'Rosas rojas',
    description: 'Ramo de rosas rojas para aniversario.',
    category: 'flores-eternas',
    illustration: 'rosa',
    color: '#B83B4A',
    date: '2025-08',
  },
  {
    id: 'entrega-girasoles',
    title: 'Girasoles en jarrón',
    description: 'Tres girasoles eternos como regalo de cumpleaños.',
    category: 'flores-eternas',
    illustration: 'girasol',
    color: '#E8A838',
    date: '2025-09',
  },
  {
    id: 'entrega-centro-mesa',
    title: 'Centro de mesa',
    description: 'Arreglo floral para celebración familiar.',
    category: 'flores-eternas',
    illustration: 'centro-mesa',
    color: '#C45C6A',
    date: '2025-10',
  },
  {
    id: 'entrega-ramo-novia',
    title: 'Ramo de novia',
    description: 'Ramo personalizado en tonos blush y blanco para boda íntima.',
    category: 'flores-eternas',
    illustration: 'ramo',
    color: '#E8B4B8',
    date: '2025-11',
  },
]

export const galleryItems: GalleryItem[] = [...gallerySource].sort((a, b) =>
  a.date.localeCompare(b.date),
)
