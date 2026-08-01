// One-off: rewrite /Assets/*.png references to .webp across source files.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const TARGET_EXT = new Set(['.tsx', '.ts', '.jsx', '.js', '.html', '.css'])
const RE = /(\/Assets\/[^"'`\s)]+?)\.png/g

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue
    const full = join(dir, e.name)
    if (e.isDirectory()) await walk(full, acc)
    else if (TARGET_EXT.has(extname(e.name))) acc.push(full)
  }
  return acc
}

async function run() {
  const files = [...(await walk(join(ROOT, 'src'))), join(ROOT, 'index.html')]
  let changed = 0
  for (const file of files) {
    const before = await readFile(file, 'utf8')
    if (!RE.test(before)) continue
    RE.lastIndex = 0
    const after = before.replace(RE, '$1.webp')
    if (after !== before) {
      await writeFile(file, after, 'utf8')
      const count = (before.match(RE) || []).length
      RE.lastIndex = 0
      console.log(`${file.replace(ROOT, '.')}: ${count} refs`)
      changed++
    }
  }
  console.log(`\nUpdated ${changed} files.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
