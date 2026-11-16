import type { FloresEternasSubcategory } from './types'

export type { FloresEternasSubcategory, Product } from './types'

export const floresEternasSubcategories: {
  id: FloresEternasSubcategory
  label: string
}[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'flores-individuales', label: 'Flores individuales' },
  { id: 'macetitas', label: 'Macetitas' },
  { id: 'arreglos', label: 'Arreglos' },
  { id: 'animalitos', label: 'Animalitos' },
  { id: 'broches', label: 'Broches' },
]

export { products } from './products'
