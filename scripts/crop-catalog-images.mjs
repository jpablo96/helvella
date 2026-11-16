// Cuts the square product photos of the catalog out of the gallery posts.
// Run it again (`npm run catalog:images`) after changing a crop or adding a product photo.
//
// Each crop is [product id, gallery photo, centre x, centre y, side], with the centre and side
// given as fractions of the photo's width and height (side is a fraction of the width).
import sharp from 'sharp'
import { mkdir } from 'fs/promises'

const GALLERY = 'public/gallery'
const OUT = 'public/catalog'
// Cards show the photo at about 300 CSS px, so 640 px covers 2x screens.
const MAX_SIDE = 640

const crops = [
  // Flores individuales
  ['catalog-12', 'post7/post7.webp', 0.37, 0.35, 0.32],
  ['catalog-15', 'post7/post7.webp', 0.645, 0.585, 0.46],
  ['catalog-13', 'post8/post8-4.webp', 0.62, 0.39, 0.52],
  ['catalog-3', 'post13/post13.webp', 0.56, 0.365, 0.86],
  ['catalog-4', 'post10/post10-2.webp', 0.5, 0.3, 0.46],
  ['catalog-2', 'post12/post12-2.webp', 0.5, 0.24, 0.56],
  ['catalog-1', 'post2/post2.webp', 0.51, 0.46, 0.56],
  ['catalog-19', 'post3/post3.webp', 0.5, 0.268, 0.57],
  ['catalog-7', 'post18/post18.webp', 0.51, 0.3, 0.78],
  ['catalog-5', 'post5/post5.webp', 0.52, 0.366, 0.44],
  ['catalog-6', 'post15/post15-2.webp', 0.36, 0.47, 0.4],
  ['catalog-20', 'post4/post4.webp', 0.5, 0.478, 0.52],
  ['catalog-16', 'post1/post1.webp', 0.5, 0.404, 0.66],
  ['catalog-17', 'post6/post6.webp', 0.5, 0.6, 0.6],
  // Macetitas
  ['macetita-cactus', 'post17/post17.webp', 0.841, 0.544, 0.318],
  ['macetita-gerbera', 'post8/post8-1.webp', 0.5, 0.651, 0.84],
  ['macetita-girasol', 'post10/post10-2.webp', 0.5, 0.449, 0.86],
  ['macetita-hortensia', 'post10/post10-4.webp', 0.5, 0.529, 0.96],
  ['macetita-tulipanes', 'post10/post10-3.webp', 0.52, 0.544, 0.76],
  // Arreglos
  ['arreglo-personalizado', 'post7/post7.webp', 0.53, 0.605, 0.9],
  ['arreglo-cumpleanos', 'post15/post15-2.webp', 0.52, 0.402, 0.88],
  // Animalitos
  ['cabecitas-animales', 'post16/post16.webp', 0.5, 0.33, 1],
  // Broches
  ['broche-loto-rosa', 'post14/post14-1.webp', 0.42, 0.49, 0.44],
  ['broche-flores-amarillas', 'post14/post14-2.webp', 0.5, 0.52, 0.46],
  ['broche-cempasuchil', 'post14/post14-3.webp', 0.38, 0.46, 0.44],
  ['broche-flor-morada', 'post14/post14-4.webp', 0.5, 0.52, 0.42],
  ['broche-flores-naranjas', 'post14/post14-5.webp', 0.47, 0.52, 0.46],
  ['broche-rosas-fucsia', 'post14/post14-6.webp', 0.47, 0.53, 0.46],
  ['broche-flores-blancas', 'post14/post14-7.webp', 0.34, 0.51, 0.5],
  ['broche-flores-celestes', 'post14/post14-8.webp', 0.4, 0.54, 0.38],
  ['broche-ramo-morado', 'post19/post19-1.webp', 0.42, 0.53, 0.48],
  ['broche-flor-azul-blanca', 'post19/post19-2.webp', 0.42, 0.5, 0.46],
  ['broche-girasoles', 'post19/post19-3.webp', 0.44, 0.53, 0.44],
  ['broche-crisantemo', 'post19/post19-4.webp', 0.44, 0.55, 0.48],
  ['broche-margaritas', 'post19/post19-5.webp', 0.41, 0.485, 0.46],
  ['broche-azucenas-rosas', 'post19/post19-6.webp', 0.36, 0.5, 0.44],
  ['broche-tulipanes-rojos', 'post19/post19-7.webp', 0.56, 0.52, 0.46],
  ['broche-ramo-rosa', 'post19/post19-8.webp', 0.43, 0.5, 0.44],
]

await mkdir(OUT, { recursive: true })

for (const [id, source, cx, cy, sideFraction] of crops) {
  const photo = sharp(`${GALLERY}/${source}`)
  const { width, height } = await photo.metadata()
  const side = Math.min(Math.round(sideFraction * width), width, height)
  // Keep the square inside the photo when the centre sits close to an edge.
  const left = Math.min(Math.max(Math.round(cx * width - side / 2), 0), width - side)
  const top = Math.min(Math.max(Math.round(cy * height - side / 2), 0), height - side)

  await photo
    .extract({ left, top, width: side, height: side })
    .resize({ width: MAX_SIDE, height: MAX_SIDE, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${OUT}/${id}.webp`)
  console.log(`${id}.webp  <-  ${source}  (${side}px)`)
}

console.log(`Cropped ${crops.length} catalog photos`)
