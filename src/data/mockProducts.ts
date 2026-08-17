import type { Category, FloresEternasSubcategory, IllustrationType, Product } from './types'

const MOCK_PRODUCTS_PER_SUBCATEGORY = 4

const floresEternasSubcategoryIds = [
  'flores-individuales',
  'macetitas',
  'arreglos',
  'animalitos',
] as const satisfies readonly Exclude<FloresEternasSubcategory, 'todos'>[]

type MockProductSeed = {
  name: string
  description: string
  color: string
  illustration: IllustrationType
}

const floresEternasSeeds: Record<
  (typeof floresEternasSubcategoryIds)[number],
  MockProductSeed[]
> = {
  'flores-individuales': [
    {
      name: 'Girasol Radiante',
      description: 'Girasol eterno hecho a mano con limpiapipas, lleno de luz y color.',
      color: '#E8A838',
      illustration: 'girasol',
    },
    {
      name: 'Margarita de Campo',
      description: 'Margarita eterna con pétalos delicados y centro dorado.',
      color: '#F5F0E8',
      illustration: 'margarita',
    },
    {
      name: 'Rosa Clásica',
      description: 'Flor eterna hecha a mano con limpiapipas, ideal para regalar.',
      color: '#C45C6A',
      illustration: 'rosa',
    },
    {
      name: 'Tulipán Elegante',
      description: 'Tulipán eterno con forma refinada y colores vibrantes.',
      color: '#9B6B9E',
      illustration: 'tulipan',
    },
  ],
  macetitas: [
    {
      name: 'Macetita Arcoíris',
      description: 'Macetita con flores eternas en tonos alegres y variados.',
      color: '#E8B4B8',
      illustration: 'macetita',
    },
    {
      name: 'Macetita Clásica',
      description: 'Macetita tradicional con flores eternas en tonos ciruela.',
      color: '#6C265B',
      illustration: 'macetita',
    },
    {
      name: 'Macetita Jardín',
      description: 'Mini macetita con flores eternas, perfecta para escritorio o repisa.',
      color: '#7CB342',
      illustration: 'macetita',
    },
    {
      name: 'Macetita Mini',
      description: 'Macetita compacta con detalle artesanal, ideal para espacios pequeños.',
      color: '#558B2F',
      illustration: 'macetita',
    },
  ],
  arreglos: [
    {
      name: 'Arreglo Aurora',
      description: 'Arreglo floral eterno con combinación de colores cálidos.',
      color: '#FFB6C1',
      illustration: 'arreglo',
    },
    {
      name: 'Centro de Mesa',
      description: 'Centro de mesa con flores eternas para celebraciones especiales.',
      color: '#C45C6A',
      illustration: 'centro-mesa',
    },
    {
      name: 'Ramo Primavera',
      description: 'Arreglo colorido con varias flores eternas en tonos pastel.',
      color: '#E8B4B8',
      illustration: 'ramo',
    },
    {
      name: 'Ramo Romántico',
      description: 'Ramo eterno en tonos rosados, perfecto para regalar con amor.',
      color: '#F48FB1',
      illustration: 'ramo',
    },
  ],
  animalitos: [
    {
      name: 'Conejito Tierno',
      description: 'Animalito artesanal con flores eternas, un regalo único y adorable.',
      color: '#F8BBD0',
      illustration: 'conejo',
    },
    {
      name: 'Mariposa Brillante',
      description: 'Mariposa eterna con alas coloridas y acabado artesanal.',
      color: '#FFAB91',
      illustration: 'mariposa',
    },
    {
      name: 'Osito de Peluche',
      description: 'Osito eterno elaborado con limpiapipas y mucho cariño.',
      color: '#BCAAA4',
      illustration: 'osito',
    },
    {
      name: 'Pollito Bebé',
      description: 'Pollito eterno tierno, ideal para decorar o regalar.',
      color: '#FFCC80',
      illustration: 'pollito',
    },
  ],
}

for (const subcategory of floresEternasSubcategoryIds) {
  const count = floresEternasSeeds[subcategory].length
  if (count !== MOCK_PRODUCTS_PER_SUBCATEGORY) {
    throw new Error(
      `mockProducts: se esperaban ${MOCK_PRODUCTS_PER_SUBCATEGORY} productos en "${subcategory}", hay ${count}`,
    )
  }
}

function formatMockPrice(index: number): string {
  const amount = 2800 + (index % MOCK_PRODUCTS_PER_SUBCATEGORY) * 500
  return `₡${amount.toLocaleString('es-CR')}`
}

function createMockProducts(): Product[] {
  return floresEternasSubcategoryIds
    .flatMap((subcategory) =>
      floresEternasSeeds[subcategory].map((seed, index) => ({
        id: `flores-eternas-${subcategory}-${index + 1}`,
        name: seed.name,
        description: seed.description,
        category: 'flores-eternas' as const,
        subcategory,
        illustration: seed.illustration,
        price: formatMockPrice(index),
        available: true,
        color: seed.color,
      })),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
}

export const products: Product[] = createMockProducts()

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category)
}
