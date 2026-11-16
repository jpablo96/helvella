// Writes a small copy of every gallery photo to public/gallery-thumbs, mirroring public/gallery.
// Cards load the small copy; the full-size photo is only fetched by the enlarged view.
// Run it again (`npm run gallery:thumbs`) after adding or replacing a gallery photo.
import sharp from 'sharp'
import { mkdir, readdir } from 'fs/promises'
import path from 'path'

const GALLERY = 'public/gallery'
const OUT = 'public/gallery-thumbs'
// Keep in sync with GALLERY_THUMB_WIDTH in src/data/gallery.ts
const THUMB_WIDTH = 540

let count = 0

for (const folder of await readdir(GALLERY, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue

  const photos = (await readdir(path.join(GALLERY, folder.name))).filter((name) =>
    name.toLowerCase().endsWith('.webp'),
  )
  if (photos.length === 0) continue

  await mkdir(path.join(OUT, folder.name), { recursive: true })

  for (const photo of photos) {
    await sharp(path.join(GALLERY, folder.name, photo))
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, folder.name, photo))
    count += 1
  }
}

console.log(`Wrote ${count} gallery thumbnails (${THUMB_WIDTH}px wide)`)
