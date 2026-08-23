import { readdir, readFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const ASSETS_DIR = path.join(ROOT, 'public', 'Assets')
const SCAN_DIRS = [path.join(ROOT, 'src')]
const SCAN_FILES = [path.join(ROOT, 'index.html')]
const CODE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.html', '.json', '.md'])

async function walk(dir) {
  const out = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else if (CODE_EXT.has(path.extname(e.name).toLowerCase())) out.push(full)
  }
  return out
}

const codeFiles = [...(await Promise.all(SCAN_DIRS.map(walk))).flat()]
for (const f of SCAN_FILES) {
  try {
    await stat(f)
    codeFiles.push(f)
  } catch {}
}

const haystack = (await Promise.all(codeFiles.map((f) => readFile(f, 'utf8')))).join('\n')
const decoded = decodeURIComponent(haystack.replace(/%(?![0-9A-Fa-f]{2})/g, '%25'))

const assets = (await readdir(ASSETS_DIR, { withFileTypes: true }))
  .filter((e) => e.isFile())
  .map((e) => e.name)

const used = []
const unused = []
for (const name of assets) {
  if (haystack.includes(name) || decoded.includes(name)) used.push(name)
  else unused.push(name)
}

const sizes = Object.fromEntries(
  await Promise.all(unused.map(async (n) => [n, (await stat(path.join(ASSETS_DIR, n))).size]))
)
const wasted = unused.reduce((a, n) => a + sizes[n], 0)

console.log(`Scanned ${codeFiles.length} code files against ${assets.length} assets.`)
console.log(`\nUSED: ${used.length}`)
console.log(`\nUNUSED: ${unused.length} (${(wasted / 1024).toFixed(1)} KB)`)
for (const n of unused.sort((a, b) => sizes[b] - sizes[a])) {
  console.log(`  ${(sizes[n] / 1024).toFixed(1).padStart(8)} KB  ${n}`)
}

if (process.argv.includes('--delete')) {
  for (const n of unused) await rm(path.join(ASSETS_DIR, n), { force: true })
  console.log(`\nDeleted ${unused.length} unused assets, freed ${(wasted / 1024).toFixed(1)} KB.`)
}
