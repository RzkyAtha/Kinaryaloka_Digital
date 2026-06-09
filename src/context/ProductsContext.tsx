import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Product {
  id: string
  name: string
  price: string
  image: string
  description: string
  details: string[]
  category: 'ecommerce' | 'webdesign' | 'branding'
  isFeatured: boolean
  color: string
  textColor: string
  badge?: string
}

export const DEFAULT_PRODUCTS: Product[] = [
  // ── E-Commerce ──────────────────────────────────────────────────────────
  {
    id: 'ecom-full-brand',
    name: 'E-Commerce Full Brand',
    price: '15000',
    image: '/Assets/ecom_ungu.png',
    description: 'E-commerce profesional + identitas brand lengkap. Dari toko online canggih hingga visual brand yang siap bersaing.',
    color: '#F5C542', textColor: '#F5C542', badge: 'Flagship',
    isFeatured: true, category: 'ecommerce',
    details: [
      'Semua fitur E-Commerce Pro',
      'Desain identitas visual (logo + color system)',
      'Social media kit (10 template siap pakai)',
      'Halaman landing promo / campaign',
      'Setup Google My Business & Google Shopping',
      'SEO on-page lengkap + submit sitemap',
      'Google Analytics + Meta Pixel integration',
      'Pelatihan kelola toko & admin (2 sesi)',
      'Konsultasi strategi penjualan digital',
      'Support prioritas 6 bulan',
    ],
  },
  {
    id: 'ecom-katalog',
    name: 'Katalog Digital',
    price: '2500',
    image: '/Assets/ecom_oren.png',
    description: 'Website katalog produk online. Pelanggan lihat produk & pesan langsung via WhatsApp. Tanpa ribet dengan payment gateway.',
    color: '#FF8C2E', textColor: '#FF8C2E',
    isFeatured: false, category: 'ecommerce',
    details: [
      'Web katalog produk (hingga 50 produk)',
      'Halaman detail produk + foto & deskripsi',
      'Kategori & filter produk',
      'Tombol pesan/tanya via WhatsApp per produk',
      'Profil toko & info kontak',
      'Mobile responsive + fast loading',
      'Revisi desain hingga puas',
      'Konsultasi domain & hosting',
    ],
  },
  {
    id: 'ecom-toko',
    name: 'Toko Online',
    price: '5000',
    image: '/Assets/ecom_biru.png',
    description: 'Toko online lengkap dengan keranjang belanja & payment gateway. Pelanggan bisa checkout langsung di website kamu.',
    color: '#0080FF', textColor: '#0080FF',
    isFeatured: false, category: 'ecommerce',
    details: [
      'Custom web toko online multi-halaman',
      'Keranjang belanja (shopping cart)',
      'Checkout & payment gateway (Midtrans/Xendit)',
      'Manajemen produk & kategori (CMS)',
      'Halaman produk detail + galeri foto',
      'Filter & pencarian produk',
      'Notifikasi order via WhatsApp & Email',
      'Dashboard admin kelola pesanan',
      'Domain & hosting (1 tahun)',
      'Support teknis 2 bulan',
    ],
  },
  {
    id: 'ecom-olshop',
    name: 'Olshop Full',
    price: '8000',
    image: '/Assets/ecom_hijau.png',
    description: 'Platform jual beli penuh fitur seperti inventori, multi-varian produk, voucher diskon, hingga laporan penjualan real-time.',
    color: '#00E639', textColor: '#0080FF',
    isFeatured: false, category: 'ecommerce',
    details: [
      'Semua fitur Toko Online',
      'Manajemen inventori & stok otomatis',
      'Multi-varian produk (warna, ukuran, tipe)',
      'Sistem voucher & kode diskon',
      'Hitung ongkos kirim otomatis (RajaOngkir)',
      'Laporan penjualan & analitik dashboard',
      'Halaman ulasan & rating produk',
      'SEO produk (siap muncul di Google)',
      'Mobile responsive + optimasi kecepatan',
      'Support prioritas 3 bulan',
    ],
  },
  // ── Web Design ───────────────────────────────────────────────────────────
  {
    id: 'web-full-digital',
    name: 'Full Digital Package',
    price: '12000',
    image: '/Assets/rserv_ungu.png',
    description: 'Transformasi digital menyeluruh dari mulai sistem, website, hingga identitas visual dan strategi konten.',
    color: '#F5C542', textColor: '#F5C542', badge: 'Flagship',
    isFeatured: true, category: 'webdesign',
    details: [
      'Semua fitur Web + Reservasi Pro',
      'Desain identitas visual (logo + color system)',
      'Social media kit (8 template siap pakai)',
      'Setup Google My Business & Google Maps',
      'SEO dasar on-page (siap dicari di Google)',
      'Google Analytics + laporan bulanan',
      'Landing page campaign (1 halaman promo)',
      'Pelatihan penggunaan sistem (2 sesi)',
      'Konsultasi strategi konten digital',
      'Support prioritas 6 bulan',
    ],
  },
  {
    id: 'web-reservasi',
    name: 'Paket Reservasi',
    price: '2500',
    image: '/Assets/rserv_oren.png',
    description: 'Sistem booking online siap pakai tanpa perlu website. Ideal untuk bisnis layanan yang masih pakai manual.',
    color: '#FF8C2E', textColor: '#FF8C2E',
    isFeatured: false, category: 'webdesign',
    details: [
      'Setup sistem booking online (widget)',
      'Konfigurasi jam operasional & kapasitas slot',
      'Link reservasi siap disebarkan ke pelanggan',
      'Notifikasi WhatsApp (pelanggan & admin)',
      'Interface mobile-friendly',
      'Panduan penggunaan lengkap',
      'Support teknis 30 hari',
    ],
  },
  {
    id: 'web-website-reservasi',
    name: 'Website & Reservasi',
    price: '5000',
    image: '/Assets/rserv_biru.png',
    description: 'Website profesional lengkap dengan sistem booking simpel. Bisnis kamu terlihat serius di mata pelanggan.',
    color: '#0080FF', textColor: '#0080FF',
    isFeatured: false, category: 'webdesign',
    details: [
      'Custom web design 1 halaman (landing page)',
      'Sistem reservasi simpel (tanpa database)',
      'Profil bisnis & galeri layanan/produk',
      'Informasi harga & paket layanan',
      'Integrasi Google Maps & arah lokasi',
      'Tombol kontak & chat WhatsApp',
      'Desain mobile responsive',
      'Revisi desain hingga puas',
      'Konsultasi domain & hosting',
      'Support teknis 1 bulan',
    ],
  },
  {
    id: 'web-pro',
    name: 'Website Pro',
    price: '8000',
    image: '/Assets/rserv_hijau.png',
    description: 'Web design multi-halaman dengan sistem reservasi bertenaga database. Data pelanggan tersimpan rapi, bisa diakses kapan saja.',
    color: '#00E639', textColor: '#0080FF',
    isFeatured: false, category: 'webdesign',
    details: [
      'Custom web design multi-halaman',
      'Sistem reservasi lengkap dengan database',
      'Dashboard admin kelola booking & jadwal',
      'Manajemen slot otomatis & blokir waktu',
      'Notifikasi otomatis WhatsApp & Email',
      'Riwayat booking & database pelanggan',
      'Mobile responsive + optimasi kecepatan',
      'Domain & hosting (1 tahun)',
      'Integrasi pembayaran (opsional)',
      'Support teknis 3 bulan',
    ],
  },
  // ── Branding ─────────────────────────────────────────────────────────────
  {
    id: 'brnd-paket',
    name: 'Paket Branding',
    price: '1500',
    image: '/Assets/brnd_oren.png',
    description: 'Identitas brand lengkap untuk membuat bisnismu profesional dan mudah diingat, dari logo hingga nama yang filosofis.',
    color: '#FF8C2E', textColor: '#FF8C2E',
    isFeatured: false, category: 'branding',
    details: [
      'Desain logo (3 konsep, 2x revisi)',
      'Color palette & typography system',
      'Copywriting brand (tagline + brand story)',
      'Business card design (digital)',
      'Social media kit (5 template feed)',
      'Brand guidelines (PDF)',
    ],
  },
  {
    id: 'brnd-copywriting',
    name: 'Branding + Copywriting',
    price: '2500',
    image: '/Assets/brnd_biru.png',
    description: 'Branding lengkap dengan copywriting profesional untuk website, social media, dan marketing material.',
    color: '#0080FF', textColor: '#0080FF',
    isFeatured: false, category: 'branding',
    details: [
      'Semua fitur Paket Branding',
      'Desain logo (5 konsep, unlimited revisi)',
      'Website copywriting (5 halaman)',
      'Social media copy (15 caption templates)',
      'Email marketing templates (3 desain)',
      'Stationery design lengkap',
      'Packaging label design',
      'Brand voice guidelines',
      'SEO-friendly product description (10 produk)',
      'Support 1 bulan',
    ],
  },
  {
    id: 'brnd-complete',
    name: 'Complete Branding',
    price: '4000',
    image: '/Assets/brnd_hijau.png',
    description: 'Solusi branding end-to-end: visual identity, semua copywriting, dan marketing kit siap pakai.',
    color: '#00E639', textColor: '#0080FF',
    isFeatured: false, category: 'branding',
    details: [
      'Semua fitur Branding + Copywriting',
      'Packaging & label design lengkap',
      'Social media kit (20 template)',
      'Instagram Highlight covers (5 desain)',
      'Ads copywriting (Google + Meta)',
      'Landing page copy + wireframe',
      'Brand strategy consultation',
      'Product photography direction',
      'Print-ready files (PDF, AI, PNG)',
      'Support 2 bulan',
    ],
  },
]

interface ProductsContextType {
  products: Product[]
  addProduct: (p: Omit<Product, 'id'>) => void
  updateProduct: (id: string, p: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const STORAGE_KEY = 'kinaryaloka_products'

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored) as Product[]
    } catch {}
    return DEFAULT_PRODUCTS
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)) } catch {}
  }, [products])

  const addProduct = (p: Omit<Product, 'id'>) =>
    setProducts(prev => [...prev, { ...p, id: `prod-${Date.now()}` }])

  const updateProduct = (id: string, p: Partial<Product>) =>
    setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, ...p } : prod))

  const deleteProduct = (id: string) =>
    setProducts(prev => prev.filter(prod => prod.id !== id))

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
