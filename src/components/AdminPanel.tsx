import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut, Plus, Edit2, Trash2, Eye, EyeOff,
  ShieldCheck, Upload, X, Check, Star, AlertTriangle,
  Package, LayoutGrid, ShoppingCart, Palette,
} from 'lucide-react'
import { useProducts, Product } from '../context/ProductsContext'

// ─── Constants ───────────────────────────────────────────────────────────────
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '036012'
const SESSION_KEY = 'kinaryaloka_admin_auth'

const CAT_LABEL: Record<string, string> = {
  ecommerce: 'E-Commerce',
  webdesign: 'Web Design',
  branding: 'Branding',
}
const CAT_COLOR: Record<string, string> = {
  ecommerce: '#FF2D78',
  webdesign: '#0080FF',
  branding: '#00E639',
}
const CAT_ICON: Record<string, React.ReactNode> = {
  ecommerce: <ShoppingCart className="w-3.5 h-3.5" />,
  webdesign: <LayoutGrid className="w-3.5 h-3.5" />,
  branding: <Palette className="w-3.5 h-3.5" />,
}

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = Omit<Product, 'id'>

const EMPTY_FORM: FormData = {
  name: '',
  price: '',
  image: '',
  description: '',
  details: [''],
  category: 'ecommerce',
  isFeatured: false,
  color: '#FF2D78',
  textColor: '#FF2D78',
  badge: '',
}

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductFormModal({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean
  onClose: () => void
  onSave: (data: FormData) => void
  initial?: Product | null
}) {
  const [form, setForm] = useState<FormData>(initial ? { ...initial } : { ...EMPTY_FORM })
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : { ...EMPTY_FORM })
      setImageMode('url')
    }
  }, [open, initial])

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const addDetail = () => set('details', [...form.details, ''])
  const removeDetail = (i: number) => set('details', form.details.filter((_, idx) => idx !== i))
  const setDetail = (i: number, v: string) =>
    set('details', form.details.map((d, idx) => (idx === i ? v : d)))

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set('image', reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned: FormData = {
      ...form,
      details: form.details.filter(d => d.trim()),
      badge: form.badge?.trim() || undefined,
    }
    onSave(cleaned)
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <motion.div
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col border border-white/[0.08] backdrop-blur-2xl"
          style={{ maxHeight: '92vh', background: 'linear-gradient(135deg, rgba(18,18,30,0.95) 0%, rgba(12,12,20,0.98) 100%)' }}
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
            <h2 className="text-white font-bold text-lg">
              {initial ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <button
              type="button" onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
            <div className="overflow-y-auto flex-1 p-6 space-y-5">

              {/* Nama Produk + Kategori */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-admin">Nama Produk *</label>
                  <input
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required placeholder="e.g. Toko Online Pro"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="label-admin">Kategori *</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value as Product['category'])}
                    className="input-admin"
                  >
                    <option value="ecommerce">E-Commerce</option>
                    <option value="webdesign">Web Design</option>
                    <option value="branding">Branding</option>
                  </select>
                </div>
              </div>

              {/* Harga + Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-admin">Harga (K IDR) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold select-none">IDR</span>
                    <input
                      value={form.price}
                      onChange={e => set('price', e.target.value.replace(/\D/g, ''))}
                      required placeholder="2500"
                      className="input-admin pl-12 pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm select-none">K</span>
                  </div>
                </div>
                <div>
                  <label className="label-admin">Badge (opsional)</label>
                  <input
                    value={form.badge || ''}
                    onChange={e => set('badge', e.target.value)}
                    placeholder="e.g. Flagship, Popular"
                    className="input-admin"
                  />
                </div>
              </div>

              {/* Gambar Produk */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label-admin mb-0">Gambar Produk</label>
                  <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
                    {(['url', 'upload'] as const).map(mode => (
                      <button key={mode} type="button" onClick={() => setImageMode(mode)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${imageMode === mode ? 'bg-[#FF2D78] text-white' : 'text-white/50 hover:text-white/80'}`}
                      >
                        {mode === 'url' ? 'URL' : 'Upload File'}
                      </button>
                    ))}
                  </div>
                </div>

                {imageMode === 'url' ? (
                  <input
                    value={form.image.startsWith('data:') ? '' : form.image}
                    onChange={e => set('image', e.target.value)}
                    placeholder="https://example.com/image.png atau /Assets/nama.png"
                    className="input-admin"
                  />
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-white/10 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF2D78]/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-white/30 mb-1.5" />
                    <span className="text-white/40 text-xs text-center">Klik untuk upload (PNG, JPG, WebP)</span>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                  </div>
                )}

                {form.image && (
                  <div className="mt-2.5 h-24 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                    <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div>
                <label className="label-admin">Deskripsi Produk</label>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  rows={3} placeholder="Deskripsi singkat yang menarik..."
                  className="input-admin resize-none"
                />
              </div>

              {/* Detail / Fitur */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label-admin mb-0">Detail & Fitur Produk</label>
                  <button
                    type="button" onClick={addDetail}
                    className="flex items-center gap-1 text-xs font-semibold text-[#FF6B9D] hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Baris
                  </button>
                </div>
                <div className="space-y-2">
                  {form.details.map((d, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-white/20 text-xs w-5 text-right flex-shrink-0">{i + 1}.</span>
                      <input
                        value={d}
                        onChange={e => setDetail(i, e.target.value)}
                        placeholder={`Fitur ke-${i + 1}...`}
                        className="input-admin flex-1"
                      />
                      {form.details.length > 1 && (
                        <button
                          type="button" onClick={() => removeDetail(i)}
                          className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 flex-shrink-0 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Warna + Featured */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label-admin">Warna Aksen</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={form.color} onChange={e => set('color', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer flex-shrink-0" />
                    <span className="text-white/40 text-xs font-mono">{form.color}</span>
                  </div>
                </div>
                <div>
                  <label className="label-admin">Warna Teks Harga</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={form.textColor} onChange={e => set('textColor', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer flex-shrink-0" />
                    <span className="text-white/40 text-xs font-mono">{form.textColor}</span>
                  </div>
                </div>
                <div>
                  <label className="label-admin">Tampilkan Sebagai Featured</label>
                  <button
                    type="button" onClick={() => set('isFeatured', !form.isFeatured)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all w-full justify-center ${form.isFeatured ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}
                  >
                    <Star className={`w-4 h-4 ${form.isFeatured ? 'fill-yellow-400' : ''}`} />
                    {form.isFeatured ? 'Featured' : 'Tidak'}
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/[0.06] flex gap-3 flex-shrink-0 backdrop-blur-xl"
              style={{ background: 'rgba(8,8,16,0.8)' }}>
              <button
                type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}
              >
                <Check className="w-4 h-4" />
                {initial ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirm({
  product,
  onConfirm,
  onCancel,
}: {
  product: Product
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        className="relative border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm text-center backdrop-blur-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(18,18,30,0.95) 0%, rgba(12,12,20,0.98) 100%)' }}
        initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-white font-bold text-lg mb-1">Hapus Produk?</h3>
        <p className="text-white/50 text-sm mb-5">
          <span className="text-white font-semibold">"{product.name}"</span> akan dihapus permanen dan tidak bisa dikembalikan.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors">
            Batal
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors flex items-center justify-center gap-1.5">
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Product Card (admin view) ────────────────────────────────────────────────
function AdminProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product
  onEdit: () => void
  onDelete: () => void
}) {
  const catColor = CAT_COLOR[product.category]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 60px ${catColor}10, 0 0 30px ${catColor}08` }} />

      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
            <Package className="w-10 h-10 text-white/15" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Badges overlay */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white flex items-center gap-0.5 backdrop-blur-md"
            style={{ backgroundColor: catColor + '99' }}
          >
            {CAT_ICON[product.category]} <span>{CAT_LABEL[product.category]}</span>
          </span>
          {product.isFeatured && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-yellow-500/70 backdrop-blur-md text-white flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-white" /> Featured
            </span>
          )}
          {product.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600/80 backdrop-blur-md text-white flex items-center justify-center">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">{product.name}</h3>
        <p className="text-white/40 text-xs mb-3 line-clamp-2 leading-relaxed flex-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-base" style={{ color: catColor }}>IDR {product.price}K</span>
          <span className="text-white/30 text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">{product.details.length} fitur</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-white/[0.06]">
        <button
          onClick={onEdit}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Edit2 className="w-3.5 h-3.5" /> Edit
        </button>
        <div className="w-px bg-white/[0.06]" />
        <button
          onClick={onDelete}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" /> Hapus
        </button>
      </div>
    </motion.div>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (u: string, p: string) => boolean }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = onLogin(username, password)
    if (!ok) {
      setError('Username atau password salah.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#FF2D78]/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-[#0080FF]/12 blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#080810]/50 pointer-events-none" />

      <motion.div
        animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : {}}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}>
            <div className="absolute inset-0 rounded-2xl bg-[#FF2D78]/40 blur-xl" />
            <ShieldCheck className="w-8 h-8 text-white relative z-10" />
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">KINARYALOKA Digital Studio</p>
        </div>

        {/* Card - Glassmorphic */}
        <div className="backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D78]/5 to-transparent pointer-events-none" />
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="label-admin">Username</label>
              <input
                value={username} onChange={e => setUsername(e.target.value)}
                required autoComplete="username" placeholder="Masukkan username"
                className="input-admin"
              />
            </div>
            <div>
              <label className="label-admin">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  required autoComplete="current-password" placeholder="Masukkan password"
                  className="input-admin pr-10"
                />
                <button
                  type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-red-400 text-xs flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 mt-2 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}
              whileHover={{ opacity: 0.92 }} whileTap={{ scale: 0.98 }}
            >
              <ShieldCheck className="w-4 h-4" /> Masuk sebagai Admin
            </motion.button>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs mt-5">
          Hanya untuk pengelola KINARYALOKA Digital Studio
        </p>

        <div className="text-center mt-3">
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.location.hash = '' }}
            className="text-white/30 text-xs hover:text-white/60 transition-colors"
          >
            ← Kembali ke Website
          </a>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [activeTab, setActiveTab] = useState<'all' | Product['category']>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const { products, addProduct, updateProduct, deleteProduct } = useProducts()

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }

  const handleLogin = (u: string, p: string): boolean => {
    if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    window.location.hash = ''
  }

  const handleOpenAdd = () => { setEditTarget(null); setFormOpen(true) }
  const handleOpenEdit = (p: Product) => { setEditTarget(p); setFormOpen(true) }

  const handleSave = (data: FormData) => {
    if (editTarget) {
      updateProduct(editTarget.id, data)
      showToast('Produk berhasil diperbarui!')
    } else {
      addProduct(data)
      showToast('Produk baru berhasil ditambahkan!')
    }
    setFormOpen(false)
    setEditTarget(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteProduct(deleteTarget.id)
    showToast(`"${deleteTarget.name}" dihapus.`)
    setDeleteTarget(null)
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  const filtered = activeTab === 'all' ? products : products.filter(p => p.category === activeTab)

  const stats = {
    all: products.length,
    ecommerce: products.filter(p => p.category === 'ecommerce').length,
    webdesign: products.filter(p => p.category === 'webdesign').length,
    branding: products.filter(p => p.category === 'branding').length,
  }

  const TABS: { id: 'all' | Product['category']; label: string; count: number }[] = [
    { id: 'all', label: 'Semua', count: stats.all },
    { id: 'ecommerce', label: 'E-Commerce', count: stats.ecommerce },
    { id: 'webdesign', label: 'Web Design', count: stats.webdesign },
    { id: 'branding', label: 'Branding', count: stats.branding },
  ]

  return (
    <div className="min-h-screen bg-[#080810] text-white relative overflow-hidden">

      {/* Background mesh gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF2D78]/8 blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] rounded-full bg-[#0080FF]/6 blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00E639]/4 blur-[200px]" />
        <div className="absolute inset-0 bg-[#080810]/60" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(8,8,16,0.8) 0%, rgba(8,8,16,0.9) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}>
              <div className="absolute inset-0 rounded-lg bg-[#FF2D78]/30 blur-md" />
              <ShieldCheck className="w-4 h-4 text-white relative z-10" />
            </div>
            <div>
              <span className="font-black text-sm tracking-tight">KINARYALOKA</span>
              <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#FF2D78]/15 text-[#FF6B9D] border border-[#FF2D78]/25 backdrop-blur-sm">
                ADMIN
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.location.hash = '' }}
              className="text-white/40 hover:text-white/70 text-xs font-medium transition-colors hidden sm:block"
            >
              Lihat Website →
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] text-xs font-semibold transition-all border border-white/[0.08] backdrop-blur-sm"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">

        {/* Page title + Add button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Manajemen Produk</h1>
            <p className="text-white/40 text-sm mt-0.5">Kelola semua paket layanan KINARYALOKA</p>
          </div>
          <motion.button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <Plus className="w-4 h-4 relative z-10" /> <span className="relative z-10">Tambah Produk</span>
          </motion.button>
        </div>

        {/* Stats row - Glassmorphic */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total Produk', value: stats.all, color: '#FF2D78' },
            { label: 'E-Commerce', value: stats.ecommerce, color: CAT_COLOR.ecommerce },
            { label: 'Web Design', value: stats.webdesign, color: CAT_COLOR.webdesign },
            { label: 'Branding', value: stats.branding, color: CAT_COLOR.branding },
          ].map(s => (
            <div key={s.label}
              className="relative rounded-xl p-4 border border-white/[0.06] backdrop-blur-xl overflow-hidden group hover:border-white/[0.12] transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)' }}>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: s.color }} />
              <p className="text-white/40 text-xs mb-1 relative z-10">{s.label}</p>
              <p className="text-2xl font-black relative z-10" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tab filter - Glassmorphic */}
        <div className="flex gap-1 backdrop-blur-xl border border-white/[0.06] rounded-xl p-1 mb-6 w-fit"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            const color = tab.id === 'all' ? '#FF2D78' : CAT_COLOR[tab.id as string]
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${isActive ? 'text-white backdrop-blur-md' : 'text-white/40 hover:text-white/70'}`}
                style={isActive ? { backgroundColor: color + '20', color, boxShadow: `0 0 20px ${color}15` } : {}}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/15' : 'bg-white/5'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Product grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 text-white/30"
            >
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Belum ada produk di kategori ini</p>
              <button onClick={handleOpenAdd}
                className="mt-3 text-[#FF6B9D] text-sm font-semibold hover:underline">
                + Tambah produk pertama
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map(p => (
                <AdminProductCard
                  key={p.id}
                  product={p}
                  onEdit={() => handleOpenEdit(p)}
                  onDelete={() => setDeleteTarget(p)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Product Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <ProductFormModal
            key={editTarget?.id ?? 'new'}
            open={formOpen}
            onClose={() => { setFormOpen(false); setEditTarget(null) }}
            onSave={handleSave}
            initial={editTarget}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            product={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-xl flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #FF2D78, #D91A60)' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
          >
            <Check className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
