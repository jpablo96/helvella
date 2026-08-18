import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const sourcePath = path.join(root, 'src/data/catalogo.trello.json')
const outputPath = path.join(root, 'src/data/catalogTrelloProducts.ts')

const board = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const fields = board.customFields ?? []
const listById = Object.fromEntries((board.lists ?? []).map((list) => [list.id, list.name]))

const fieldOptionLabel = (fieldId, valueId) => {
  const field = fields.find((item) => item.id === fieldId)
  const option = field?.options?.find((item) => item.id === valueId)
  return option?.value?.text ?? option?.text ?? valueId
}

const flowerColors = {
  lavanda: '#9B7BB8',
  lirio: '#F3E8FF',
  clavel: '#E85A7A',
  gardenia: '#FFFFF5',
  cala: '#FFFFFF',
  gerbera: '#FF6B9D',
  dalia: '#FF8C42',
  clivia: '#FF5722',
  tulipan: '#9B6B9E',
  hibisco: '#E91E63',
  cerezo: '#FFB7C5',
  'lirio-del-valle': '#FFFFFF',
  peonia: '#F48FB1',
  jacinto: '#7E57C2',
  narciso: '#FFF176',
  'diente-de-leon': '#FFEB3B',
  girasol: '#E8A838',
  margarita: '#F5F0E8',
  cempasuchil: '#FF9800',
  rosa: '#C45C6A',
  hortensia: '#B39DDB',
  orquidea: '#E1BEE7',
  macetita: '#7CB342',
  flor: '#D4A5C8',
}

const illustrationMatchers = [
  { pattern: /macetita/i, illustration: 'macetita' },
  { pattern: /lirio del valle/i, illustration: 'lirio-del-valle' },
  { pattern: /flor de cerezo/i, illustration: 'cerezo' },
  { pattern: /flor de jacinto/i, illustration: 'jacinto' },
  { pattern: /diente de le[oó]n/i, illustration: 'diente-de-leon' },
  { pattern: /cempas[uú]chil/i, illustration: 'cempasuchil' },
  { pattern: /lavanda/i, illustration: 'lavanda' },
  { pattern: /lirio/i, illustration: 'lirio' },
  { pattern: /clavel/i, illustration: 'clavel' },
  { pattern: /gardenia/i, illustration: 'gardenia' },
  { pattern: /cala/i, illustration: 'cala' },
  { pattern: /gerbera/i, illustration: 'gerbera' },
  { pattern: /dalia/i, illustration: 'dalia' },
  { pattern: /clivia/i, illustration: 'clivia' },
  { pattern: /tulip/i, illustration: 'tulipan' },
  { pattern: /hibisco/i, illustration: 'hibisco' },
  { pattern: /peon[ií]a/i, illustration: 'peonia' },
  { pattern: /narciso/i, illustration: 'narciso' },
  { pattern: /girasol/i, illustration: 'girasol' },
  { pattern: /margarita/i, illustration: 'margarita' },
  { pattern: /rosa/i, illustration: 'rosa' },
  { pattern: /hortensia/i, illustration: 'hortensia' },
  { pattern: /orqu[ií]dea/i, illustration: 'orquidea' },
]

function illustrationForName(name) {
  const match = illustrationMatchers.find((item) => item.pattern.test(name))
  return match?.illustration ?? 'flor'
}

function readCustomFields(card) {
  const values = {}

  for (const item of card.customFieldItems ?? []) {
    const field = fields.find((entry) => entry.id === item.idCustomField)
    if (!field) continue

    if (field.type === 'checkbox') {
      values[field.name] = Boolean(item.value?.checked)
    } else if (field.type === 'list') {
      values[field.name] = fieldOptionLabel(field.id, item.idValue)
    } else {
      values[field.name] = item.value
    }
  }

  return values
}

function formatFlowerProductName(name) {
  const formatted = {
    'diente de leon': 'Diente de león',
    'diente de león': 'Diente de león',
    'flor de cerezo': 'Flor de Cerezo',
    'flor de jacinto': 'Flor de Jacinto',
    'lirio del valle': 'Lirio del valle',
    'gerberas': 'Gerberas',
    'hibiscos': 'Hibiscos',
    'tulipanes': 'Tulipanes',
  }

  const key = name.trim().toLowerCase()
  return formatted[key] ?? name
}

function buildProductName(name, customFields) {
  let result = formatFlowerProductName(name)

  if (customFields['Tamaño']) {
    result += ` ${customFields['Tamaño']}`
  }

  const details = []

  if (customFields['Tipo de petalo']) {
    details.push(`Pétalo ${customFields['Tipo de petalo'].toLowerCase()}`)
  }

  if (customFields['Planchado']) {
    details.push('planchado')
  }

  if (details.length > 0) {
    result += ` — ${details.join(', ')}`
  }

  return result
}

function buildDescription(customFields, available) {
  if (!available) {
    return 'Flor eterna hecha a mano con limpiapipas. Próximamente en catálogo.'
  }

  const specs = []

  if (customFields['Tamaño']) {
    specs.push(`tamaño ${customFields['Tamaño'].toLowerCase()}`)
  }

  if (customFields['Tipo de petalo']) {
    specs.push(`pétalo ${customFields['Tipo de petalo'].toLowerCase()}`)
  }

  if (customFields['Planchado']) {
    specs.push('planchado')
  }

  if (specs.length === 0) {
    return 'Flor eterna hecha a mano con limpiapipas.'
  }

  const sentence = specs.join(', ')
  return `Flor eterna hecha a mano con limpiapipas. ${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const products = (board.cards ?? [])
  .filter((card) => !card.closed)
  .filter((card) => !/macetita.*reel/i.test(card.name))
  .map((card) => {
    const listName = listById[card.idList] ?? ''
    const customFields = readCustomFields(card)
    const illustration = illustrationForName(card.name)
    const available = listName === 'Flor Lista'
    const subcategory = illustration === 'macetita' ? 'macetitas' : 'flores-individuales'

    return {
      id: `catalog-${card.idShort}`,
      name: buildProductName(card.name, customFields),
      description: buildDescription(customFields, available),
      category: 'flores-eternas',
      subcategory,
      illustration,
      available,
      color: flowerColors[illustration] ?? flowerColors.flor,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))

const fileContents = `import type { Product } from './types'

// Generated from src/data/catalogo.trello.json — run: node scripts/generate-catalog-products.mjs
export const catalogTrelloProducts: Product[] = ${JSON.stringify(products, null, 2)}
`

fs.writeFileSync(outputPath, fileContents)
console.log(`Wrote ${products.length} Trello products to ${path.relative(root, outputPath)}`)
