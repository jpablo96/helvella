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
  // Flores individuales: a single "pick any flower" entry
  ['flor-individual', 'post1/post1.webp', 0.5, 0.404, 0.66],
  // Macetitas
  ['macetita-cactus', 'post17/post17.webp', 0.841, 0.544, 0.318],
  ['macetita-gerbera', 'post8/post8-1.webp', 0.5, 0.651, 0.84],
  ['macetita-girasol', 'post10/post10-2.webp', 0.5, 0.449, 0.86],
  ['macetita-hortensia', 'post10/post10-4.webp', 0.5, 0.529, 0.96],
  ['macetita-tulipanes', 'post10/post10-3.webp', 0.52, 0.544, 0.76],
  // Arreglos
  ['arreglo-personalizado-macetita', 'post9/post9.webp', 0.52, 0.57, 0.945],
  ['arreglo-personalizado', 'post15/post15-1.webp', 0.5, 0.57, 1],
  ['arreglo-personalizado-florero', 'post7/post7.webp', 0.53, 0.605, 0.9],
  // Animalitos
  ['cabecitas-animales', 'post16/post16.webp', 0.5, 0.33, 1],
  // Broches
  ['broche-loto-rosa', 'post14/post14-1.webp', 0.416, 0.467, 0.57],
  ['broche-flores-amarillas', 'post14/post14-2.webp', 0.501, 0.521, 0.59],
  ['broche-cempasuchil', 'post14/post14-3.webp', 0.453, 0.456, 0.57],
  ['broche-flor-morada', 'post14/post14-4.webp', 0.517, 0.514, 0.55],
  ['broche-flores-naranjas', 'post14/post14-5.webp', 0.479, 0.516, 0.59],
  ['broche-rosas-fucsia', 'post14/post14-6.webp', 0.481, 0.533, 0.59],
  ['broche-flores-blancas', 'post14/post14-7.webp', 0.383, 0.509, 0.64],
  ['broche-flores-celestes', 'post14/post14-8.webp', 0.431, 0.527, 0.51],
  ['broche-ramo-morado', 'post19/post19-1.webp', 0.441, 0.536, 0.62],
  ['broche-flor-azul-blanca', 'post19/post19-2.webp', 0.452, 0.496, 0.59],
  ['broche-girasoles', 'post19/post19-3.webp', 0.41, 0.514, 0.57],
  ['broche-crisantemo', 'post19/post19-4.webp', 0.448, 0.541, 0.62],
  ['broche-margaritas', 'post19/post19-5.webp', 0.41, 0.471, 0.59],
  ['broche-azucenas-rosas', 'post19/post19-6.webp', 0.432, 0.491, 0.57],
  ['broche-tulipanes-rojos', 'post19/post19-7.webp', 0.57, 0.523, 0.59],
  ['broche-ramo-rosa', 'post19/post19-8.webp', 0.434, 0.487, 0.57],
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
