import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import path from 'path'

const galleryRoot = 'public/gallery'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath)
    }
  }

  return files
}

const pngFiles = await walk(galleryRoot)

for (const pngPath of pngFiles) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp')
  await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath)
  await unlink(pngPath)
  console.log(`${pngPath} -> ${webpPath}`)
}

console.log(`Converted ${pngFiles.length} images`)
