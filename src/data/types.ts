export type FloresEternasSubcategory =
  | 'todos'
  | 'flores-individuales'
  | 'macetitas'
  | 'arreglos'
  | 'animalitos'
  | 'broches'

export type IllustrationType =
  | 'rosa'
  | 'girasol'
  | 'tulipan'
  | 'margarita'
  | 'ramo'
  | 'macetita'
  | 'centro-mesa'
  | 'arreglo'
  | 'conejo'
  | 'elefante'
  | 'osito'
  | 'mariposa'
  | 'pollito'
  | 'amigurumi-flor'
  | 'bolso'
  | 'posavasos'
  | 'gorro'
  | 'acuarela'
  | 'lienzo'
  | 'retrato-botanico'
  | 'mini-cuadro'
  | 'collar'
  | 'pulsera'
  | 'aretes'
  | 'marcador'
  | 'flor'
  | 'lavanda'
  | 'lirio'
  | 'clavel'
  | 'gardenia'
  | 'cala'
  | 'gerbera'
  | 'dalia'
  | 'clivia'
  | 'hibisco'
  | 'cerezo'
  | 'lirio-del-valle'
  | 'peonia'
  | 'jacinto'
  | 'narciso'
  | 'diente-de-leon'
  | 'cempasuchil'
  | 'hortensia'
  | 'orquidea'

export interface Product {
  id: string
  name: string
  /** Sorts the product in place of its name, e.g. to keep sizes in order from small to large. */
  sortKey?: string
  description: string
  /** Short line shown under the name on the card, e.g. the options the buyer picks from. */
  note?: string
  subcategory?: FloresEternasSubcategory
  /** Drawn placeholder, shown while the product has no photo (or if the photo fails to load). */
  illustration: IllustrationType
  /** Square product photo under /catalog, cut from the gallery by scripts/crop-catalog-images.mjs. */
  image?: string
  /** Fixed price as shown, e.g. "₡3.000". Products without one read "Cotizar". */
  price?: string
  available: boolean
  color: string
}
