import type { Category, FloresEternasSubcategory } from './types'

export type { Category, FloresEternasSubcategory, Product } from './types'

export const floresEternasSubcategories: {
  id: FloresEternasSubcategory
  label: string
}[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'flores-individuales', label: 'Flores individuales' },
  { id: 'macetitas', label: 'Macetitas' },
  { id: 'arreglos', label: 'Arreglos' },
  { id: 'animalitos', label: 'Animalitos' },
]

export const categories: {
  id: Category
  label: string
  description: string
  active: boolean
}[] = [
  {
    id: 'flores-eternas',
    label: 'Flores Eternas',
    description: 'Arreglos florales hechos a mano con limpiapipas, que duran para siempre.',
    active: true,
  },
  {
    id: 'crochet',
    label: 'Crochet',
    description: 'Piezas tejidas con dedicación. Próximamente.',
    active: false,
  },
  {
    id: 'pintura',
    label: 'Pintura',
    description: 'Obras originales y piezas decorativas. Próximamente.',
    active: false,
  },
  {
    id: 'abalorios',
    label: 'Abalorios',
    description: 'Accesorios y decoración con abalorios. Próximamente.',
    active: false,
  },
]

export const PAGE_SIZE_OPTIONS = [8, 16, 24, 32] as const
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number]

export { products } from './mockProducts'
