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
    title: 'Arreglo de rosas',
    description:
      'Composición en florero que contiene 3 rosas vino, 1 rosa blanca y 2 ramitas de Gypsophila.',
    category: 'flores-eternas',
    illustration: 'ramo',
    images: galleryImages('post1', ['post1.webp']),
    color: '#D4A5C8',
  },
  {
    id: 'post2',
    title: 'Arreglo de girasoles',
    description: 'Composición en florero que contiene 3 Girasoles Pequeños.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post2', ['post2.webp']),
    color: '#C45C6A',
  },
  {
    id: 'post3',
    title: 'Ramo Rosado',
    description:
      'Ramo eterno en tonos suaves, ideal para regalar o decorar con un toque romántico y artesanal.',
    category: 'flores-eternas',
    illustration: 'ramo',
    images: galleryImages('post3', ['post3.webp']),
    color: '#E8B4B8',
  },
  {
    id: 'post4',
    title: 'Centro de Mesa',
    description:
      'Pieza central con flores eternas en tonos ciruela, perfecta para celebraciones y espacios especiales.',
    category: 'flores-eternas',
    illustration: 'centro-mesa',
    images: galleryImages('post4', ['post4.webp']),
    color: '#9B6B9E',
  },
  {
    id: 'post5',
    title: 'Girasol Eterno',
    description:
      'Girasol hecho a mano con limpiapipas, lleno de luz y color para alegrar cualquier ambiente.',
    category: 'flores-eternas',
    illustration: 'girasol',
    images: galleryImages('post5', ['post5.webp']),
    color: '#F0C040',
  },
  {
    id: 'post6',
    title: 'Margarita Artesanal',
    description:
      'Margarita eterna con pétalos delicados y acabado cuidado, una pieza sencilla y encantadora.',
    category: 'flores-eternas',
    illustration: 'margarita',
    images: galleryImages('post6', ['post6.webp']),
    color: '#F5F0E8',
  },
  {
    id: 'post7',
    title: 'Rosa Eterna',
    description:
      'Rosa elaborada a mano en tonos profundos, un clásico atemporal que nunca se marchita.',
    category: 'flores-eternas',
    illustration: 'rosa',
    images: galleryImages('post7', ['post7.webp']),
    color: '#B83B4A',
  },
  {
    id: 'post8',
    title: 'Arreglo Multicolor',
    description:
      'Arreglo floral con varias flores eternas en combinación de colores. Cada detalle está hecho a mano.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post8', ['post8-1.webp', 'post8-2.webp', 'post8-3.webp', 'post8-4.webp']),
    color: '#A8C8E8',
  },
  {
    id: 'post9',
    title: 'Ramo Dorado',
    description:
      'Ramo eterno con acentos cálidos y dorados, una creación artesanal llena de carácter.',
    category: 'flores-eternas',
    illustration: 'ramo',
    images: galleryImages('post9', ['post9.webp']),
    color: '#E8A838',
  },
  {
    id: 'post10',
    title: 'Arreglo Helvella',
    description:
      'Pieza representativa del taller Helvella: flores eternas en tonos ciruela con acabado artesanal.',
    category: 'flores-eternas',
    illustration: 'arreglo',
    images: galleryImages('post10', ['post10-1.webp', 'post10-2.webp']),
    color: '#6C265B',
  },
  {
    id: 'post11',
    title: 'Girasol Soleado',
    description:
      'Girasol eterno con pétalos radiantes y centro detallado, hecho con dedicación y mucho cariño.',
    category: 'flores-eternas',
    illustration: 'girasol',
    images: galleryImages('post11', ['post11.webp']),
    color: '#C45C6A',
  },
]
