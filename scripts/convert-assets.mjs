/**
 * Converts every raster asset in public/Assets to WebP at a sane display size.
 *
 * Usage:
 *   node scripts/convert-assets.mjs            # dry run, prints the plan
 *   node scripts/convert-assets.mjs --write    # convert and delete the originals
 */
import { readdir, readFile, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ASSETS_DIR = path.resolve('public/Assets')
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])
const MAX_EDGE = 1600
const QUALITY = 82

const write = process.argv.includes('--write')
const kb = (bytes) => Math.round(bytes / 1024)

const entries = await readdir(ASSETS_DIR, { withFileTypes: true })
const existing = new Set(entries.filter((e) => e.isFile()).map((e) => e.name.toLowerCase()))
const sources = entries
  .filter((e) => e.isFile() && SOURCE_EXT.has(path.extname(e.name).toLowerCase()))
  .map((e) => e.name)
  .sort()

let before = 0
let after = 0
const rows = []

for (const name of sources) {
  const from = path.join(ASSETS_DIR, name)
  const target = `${path.basename(name, path.extname(name))}.webp`
  const to = path.join(ASSETS_DIR, target)
  const src = await stat(from)
  before += src.size

  // A hand-optimized WebP already exists — keep it and drop the raster original.
  if (existing.has(target.toLowerCase())) {
    const kept = await stat(to)
    after += kept.size
    rows.push({ asset: name, action: 'kept existing webp', from: kb(src.size), to: kb(kept.size) })
    if (write) await unlink(from)
    continue
  }

  // Read into a buffer so Windows never keeps a handle on the file we are about to delete.
  const image = sharp(await readFile(from))
  const meta = await image.metadata()
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0)
  const resize = longest > MAX_EDGE ? { width: meta.width, height: meta.height, fit: 'inside' } : null

  if (!write) {
    rows.push({
      asset: name,
      action: longest > MAX_EDGE ? `resize ${longest}px -> ${MAX_EDGE}px` : 'convert',
      from: kb(src.size),
      to: '?',
    })
    continue
  }

  let pipeline = image
  if (resize) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_EDGE : undefined,
      height: meta.height > meta.width ? MAX_EDGE : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(to)

  const out = await stat(to)
  after += out.size
  rows.push({
    asset: name,
    action: resize ? `resized to ${MAX_EDGE}px` : 'converted',
    from: kb(src.size),
    to: kb(out.size),
  })
  await unlink(from)
}

console.table(rows)
console.log(
  `${write ? 'Converted' : 'Would convert'} ${sources.length} files | before ${kb(before)} KB` +
    (write ? ` -> after ${kb(after)} KB (-${Math.round((1 - after / before) * 100)}%)` : '')
)
