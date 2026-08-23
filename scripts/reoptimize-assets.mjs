import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ASSETS_DIR = path.join(path.resolve(import.meta.dirname, '..'), 'public', 'Assets')

const MAX_EDGE = 1600
const QUALITY = 80

/** Assets rendered as low-opacity decoration never need full resolution. */
const DECORATIVE = new Map([['doodle_tech_art.webp', { maxEdge: 1000, quality: 62 }]])

const files = (await readdir(ASSETS_DIR, { withFileTypes: true }))
  .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.webp'))
  .map((e) => e.name)

let before = 0
let after = 0
const changed = []

for (const name of files) {
  const full = path.join(ASSETS_DIR, name)
  const original = await readFile(full)
  const meta = await sharp(original).metadata()
  const rule = DECORATIVE.get(name) ?? { maxEdge: MAX_EDGE, quality: QUALITY }
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0)

  const needsResize = longest > rule.maxEdge
  if (!needsResize && !DECORATIVE.has(name)) {
    before += original.length
    after += original.length
    continue
  }

  const out = await sharp(original)
    .resize({
      width: rule.maxEdge,
      height: rule.maxEdge,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: rule.quality, effort: 6 })
    .toBuffer()

  before += original.length
  if (out.length < original.length) {
    await writeFile(full, out)
    after += out.length
    const newMeta = await sharp(out).metadata()
    changed.push({
      name,
      from: `${meta.width}x${meta.height} ${(original.length / 1024).toFixed(1)}KB`,
      to: `${newMeta.width}x${newMeta.height} ${(out.length / 1024).toFixed(1)}KB`,
    })
  } else {
    after += original.length
  }
}

for (const c of changed) console.log(`${c.name}\n  ${c.from}  ->  ${c.to}`)
console.log(
  `\nRewrote ${changed.length}/${files.length} files. Total ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB`
)
