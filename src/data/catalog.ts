import type { FloresEternasSubcategory } from './types'

export type { FloresEternasSubcategory, Product } from './types'

export const floresEternasSubcategories: {
  id: FloresEternasSubcategory
  label: string
}[] = [
  // 'Todos' first, then alphabetical
  { id: 'todos', label: 'Todos' },
  { id: 'animalitos', label: 'Animalitos' },
  { id: 'arreglos', label: 'Arreglos' },
  { id: 'broches', label: 'Broches' },
  { id: 'flores-individuales', label: 'Flores individuales' },
  { id: 'macetitas', label: 'Macetitas' },
]

export { products } from './products'
