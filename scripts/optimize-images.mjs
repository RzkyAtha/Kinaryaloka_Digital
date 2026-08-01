// One-off image optimizer: converts every PNG in public/Assets to WebP.
// - Downscales any image wider than MAX_WIDTH (keeps retina headroom).
// - Preserves alpha transparency.
// Usage: node scripts/optimize-images.mjs
import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = join(__dirname, '..', 'public', 'Assets')
const MAX_WIDTH = 1280
const QUALITY = 80

async function run() {
  const files = await readdir(ASSETS_DIR)
  const pngs = files.filter((f) => extname(f).toLowerCase() === '.png')

  let before = 0
  let after = 0
  let converted = 0

  for (const file of pngs) {
    const srcPath = join(ASSETS_DIR, file)
    const outPath = join(ASSETS_DIR, `${basename(file, extname(file))}.webp`)

    const input = sharp(srcPath)
    const meta = await input.metadata()
    const srcStat = await stat(srcPath)
    before += srcStat.size

    let pipeline = input
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    }

    await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath)
    const outStat = await stat(outPath)
    after += outStat.size
    converted++
    console.log(
      `${file} (${(srcStat.size / 1024).toFixed(0)}KB) -> ${basename(outPath)} (${(outStat.size / 1024).toFixed(0)}KB)`
    )
  }

  console.log('\n──────────────────────────────')
  console.log(`Converted: ${converted} files`)
  console.log(`Before: ${(before / 1024 / 1024).toFixed(1)} MB`)
  console.log(`After:  ${(after / 1024 / 1024).toFixed(1)} MB`)
  console.log(`Saved:  ${((1 - after / before) * 100).toFixed(1)}%`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
