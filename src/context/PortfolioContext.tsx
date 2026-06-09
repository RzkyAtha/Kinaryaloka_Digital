import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'

export type PortfolioCategory = 'Website' | 'Design'
export type WebsiteSubcategory = 'E-Commerce' | 'Reservasi' | 'Company Profile'
export type DesignSubcategory = 'UI/UX' | 'Branding'
export type PortfolioSubcategory = WebsiteSubcategory | DesignSubcategory

export interface PortfolioProject {
  id: string
  name: string
  url: string
  thumbnail: string
  description: string
  badge?: string
  category: PortfolioCategory
  subcategory: PortfolioSubcategory
  images?: string[]
}

export const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-redbox',
    name: 'Redbox Barbershop',
    url: 'https://www.redboxbarbershop.com/index.html',
    thumbnail: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.redboxbarbershop.com%2Findex.html?w=800&h=500',
    description:
      'Website company profile untuk Redbox Barbershop — barbershop modern yang menyediakan layanan potong rambut, styling, dan grooming profesional. Didesain dengan tampilan yang clean dan maskulin.',
    badge: 'Client Pertama Kami',
    category: 'Website',
    subcategory: 'Reservasi',
  },
]

// Migrate old projects that don't have the new category/subcategory fields
function migrateProject(p: any): PortfolioProject {
  if (p.category === 'Website' || p.category === 'Design') return p as PortfolioProject
  const cat = (p.category || '').toLowerCase()
  if (cat.includes('e-commerce') || cat.includes('ecommerce')) {
    return { ...p, category: 'Website', subcategory: 'E-Commerce' }
  } else if (cat.includes('reservasi')) {
    return { ...p, category: 'Website', subcategory: 'Reservasi' }
  } else if (cat.includes('web design') || cat.includes('webdesign') || cat.includes('company')) {
    return { ...p, category: 'Website', subcategory: 'Company Profile' }
  } else if (cat.includes('ui/ux') || cat.includes('uiux') || cat.includes('ui ux')) {
    return { ...p, category: 'Design', subcategory: 'UI/UX' }
  } else if (cat.includes('branding') || cat.includes('logo')) {
    return { ...p, category: 'Design', subcategory: 'Branding' }
  }
  // Default fallback
  return { ...p, category: 'Website', subcategory: 'Company Profile' }
}

// ─── IndexedDB helpers ───────────────────────────────────────────────────────
const DB_NAME = 'kinaryaloka_db'
const DB_VERSION = 1
const STORE_NAME = 'portfolio'

let cachedDB: IDBDatabase | null = null

function openDB(): Promise<IDBDatabase> {
  if (cachedDB) return Promise.resolve(cachedDB)
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => {
      cachedDB = req.result
      cachedDB.onclose = () => { cachedDB = null }
      cachedDB.onversionchange = () => { cachedDB?.close(); cachedDB = null }
      resolve(cachedDB)
    }
    req.onerror = () => reject(req.error)
  })
}

async function dbGetAll(): Promise<PortfolioProject[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result as PortfolioProject[])
    req.onerror = () => reject(req.error)
  })
}

async function dbPut(project: PortfolioProject): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.put(project)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

async function dbDelete(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

async function dbInit(): Promise<PortfolioProject[]> {
  try {
    const existing = await dbGetAll()
    if (existing.length > 0) {
      // Migrate old format projects to new category/subcategory format
      const migrated = existing.map(migrateProject)
      // Only re-write projects that actually changed during migration
      for (let i = 0; i < migrated.length; i++) {
        if (migrated[i] !== existing[i]) await dbPut(migrated[i])
      }
      return migrated
    }
    // Migrate from localStorage if available
    try {
      const stored = localStorage.getItem('kinaryaloka_portfolio')
      if (stored) {
        const parsed = JSON.parse(stored) as any[]
        const migrated = parsed.map(migrateProject)
        for (const p of migrated) await dbPut(p)
        localStorage.removeItem('kinaryaloka_portfolio')
        return migrated
      }
    } catch {}
    // Seed defaults
    for (const p of DEFAULT_PROJECTS) await dbPut(p)
    return DEFAULT_PROJECTS
  } catch (err) {
    console.error('[Portfolio] DB init failed:', err)
    return DEFAULT_PROJECTS
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
interface PortfolioContextType {
  projects: PortfolioProject[]
  addProject: (p: Omit<PortfolioProject, 'id'>) => void
  updateProject: (id: string, p: Partial<PortfolioProject>) => void
  deleteProject: (id: string) => void
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<PortfolioProject[]>(DEFAULT_PROJECTS)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    dbInit().then(setProjects).catch(() => setProjects(DEFAULT_PROJECTS))
  }, [])

  const addProject = useCallback((p: Omit<PortfolioProject, 'id'>) => {
    const newProject = { ...p, id: `proj-${Date.now()}` } as PortfolioProject
    setProjects(prev => [...prev, newProject])
    dbPut(newProject).catch(err => {
      console.error('[Portfolio] Failed to save project:', err)
      setProjects(prev => prev.filter(x => x.id !== newProject.id))
    })
  }, [])

  const updateProject = useCallback((id: string, p: Partial<PortfolioProject>) => {
    setProjects(prev => {
      const updated = prev.map(proj => proj.id === id ? { ...proj, ...p } : proj)
      const target = updated.find(proj => proj.id === id)
      if (target) dbPut(target).catch(err => console.error('[Portfolio] Failed to update project:', err))
      return updated
    })
  }, [])

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(proj => proj.id !== id))
    dbDelete(id).catch(err => console.error('[Portfolio] Failed to delete project:', err))
  }, [])

  return (
    <PortfolioContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
