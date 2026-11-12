// Generates the images search engines and social networks ask for, from the brand logo and a
// gallery photo. Run it again (`npm run seo:images`) whenever either source image changes.
//
// - favicon.png / apple-touch-icon.png / logo/helvella-512.png: Google only shows favicons and
//   logos that are square, and the source logo is portrait.
// - og-image.jpg: 1200x630 JPEG, the size and format every network accepts for link previews.
import sharp from 'sharp'

const LOGO = 'public/logo/H Helvella.png'
const PHOTO = 'public/gallery/post1/post1.webp'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const logo = sharp(LOGO)
const { width, height } = await logo.metadata()
const side = Math.min(width, height)
const squareLogo = await logo
  .extract({
    left: Math.round((width - side) / 2),
    top: Math.round((height - side) / 2),
    width: side,
    height: side,
  })
  .png()
  .toBuffer()

for (const [file, size] of [
  ['public/favicon.png', 192],
  ['public/apple-touch-icon.png', 180],
  ['public/logo/helvella-512.png', 512],
]) {
  await sharp(squareLogo).resize(size, size).png({ compressionLevel: 9 }).toFile(file)
  console.log(`wrote ${file} (${size}x${size})`)
}

// Brand colour sampled from the logo's own background, so the logo blends into the canvas.
const { data } = await sharp(squareLogo)
  .extract({ left: 4, top: 4, width: 1, height: 1 })
  .raw()
  .toBuffer({ resolveWithObject: true })
const background = { r: data[0], g: data[1], b: data[2] }

const photo = await sharp(PHOTO).resize({ height: OG_HEIGHT }).toBuffer({ resolveWithObject: true })
const leftWidth = OG_WIDTH - photo.info.width
const logoSize = Math.min(leftWidth, OG_HEIGHT) - 120

await sharp({
  create: { width: OG_WIDTH, height: OG_HEIGHT, channels: 3, background },
})
  .composite([
    { input: photo.data, left: leftWidth, top: 0 },
    {
      input: await sharp(squareLogo).resize(logoSize, logoSize).toBuffer(),
      left: Math.round((leftWidth - logoSize) / 2),
      top: Math.round((OG_HEIGHT - logoSize) / 2),
    },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og-image.jpg')
console.log(`wrote public/og-image.jpg (${OG_WIDTH}x${OG_HEIGHT})`)
