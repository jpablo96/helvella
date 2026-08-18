export type Category = 'flores-eternas' | 'crochet' | 'pintura' | 'abalorios'

export type FloresEternasSubcategory =
  | 'todos'
  | 'flores-individuales'
  | 'macetitas'
  | 'arreglos'
  | 'animalitos'

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
  description: string
  category: Category
  subcategory?: FloresEternasSubcategory
  illustration: IllustrationType
  price?: string
  available: boolean
  color: string
}
