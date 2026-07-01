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
    name: 'Full E-Commerce Kit',
    price: '15000',
    image: '/Assets/ecom_ungu.png',
    description: 'E-commerce profesional + identitas brand lengkap. Dari toko online hingga visual brand yang siap bersaing.',
    color: '#6e2c94', textColor: '#6e2c94', badge: 'Flagship',
    isFeatured: true, category: 'ecommerce',
    details: [
      'Semua fitur E-Commerce Pro',
      'Desain identitas visual (logo + color system)',
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
    name: 'Company Profile',
    price: '2500',
    image: '/Assets/ecom_oren.png',
    description: 'Company profile website yang profesional, interaktif dan menarik. Menampilkan visi, misi, dan layanan perusahaan.',
    color: '#FF8C2E', textColor: '#FF8C2E',
    isFeatured: false, category: 'ecommerce',
    details: [
      'Profil perusahaan lengkap sesuai request & info kontak',
      'Mobile responsive + fast loading',
      'Revisi desain hingga puas',
      'Konsultasi domain & hosting',
    ],
  },
  {
    id: 'ecom-toko',
    name: 'Company Catalog',
    price: '5000',
    image: '/Assets/ecom_biru.png',
    description: 'Company profile yang interaktif dan profesional dilengkapi dengan katalog produk lengkap.',
    color: '#0080FF', textColor: '#0080FF',
    isFeatured: false, category: 'ecommerce',
    details: [
      'Custom website multi-halaman',
      'Manajemen produk & kategori (CMS)',
      'Halaman produk detail + galeri foto',
      'Filter & pencarian produk',
      'Order via WhatsApp',
      'Domain & hosting (1 tahun)',
      'Support teknis 2 bulan',
    ],
  },
  {
    id: 'ecom-olshop',
    name: 'Online Shop',
    price: '8000',
    image: '/Assets/ecom_hijau.png',
    description: 'Platform jual beli penuh fitur seperti inventori, multi-varian produk, hingga laporan penjualan real-time.',
    color: '#1e913a', textColor: '#1e913a',
    isFeatured: false, category: 'ecommerce',
    details: [
      'Semua fitur Toko Online',
      'Manajemen inventori & stok otomatis',
      'Multi-varian produk (warna, ukuran, tipe)',
      'Payment gateway (Midtrans/Xendit)',
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
    name: 'Full Reservation Kit',
    price: '12000',
    image: '/Assets/rserv_ungu.png',
    description: 'Transformasi digital menyeluruh dari mulai sistem, website, hingga identitas visual dan manajemen reservasi.',
    color: '#6e2c94', textColor: '#6e2c94', badge: 'Flagship',
    isFeatured: true, category: 'webdesign',
    details: [
      'Semua fitur Web + Reservasi Pro',
      'Desain identitas visual (logo + color system)',
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
    name: 'Company Profile',
    price: '2500',
    image: '/Assets/rserv_oren.png',
    description: 'Company profile website yang profesional, interaktif dan menarik. Menampilkan visi, misi, dan layanan perusahaan.',
    color: '#FF8C2E', textColor: '#FF8C2E',
    isFeatured: false, category: 'webdesign',
    details: [
      'Profil perusahaan lengkap sesuai request & info kontak',
      'Mobile responsive + fast loading',
      'Revisi desain hingga puas',
      'Konsultasi domain & hosting',
    ],
  },
  {
    id: 'web-website-reservasi',
    name: 'Company Reservation',
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
    name: 'Advance Reservation',
    price: '8000',
    image: '/Assets/rserv_hijau.png',
    description: 'Web design multi-halaman dengan sistem reservasi bertenaga database. Data pelanggan tersimpan rapi, bisa diakses kapan saja.',
    color: '#1e913a', textColor: '#1e913a',
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
    name: 'Brand Identity',
    price: 'Start From 350',
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
    name: 'UI/UX Design',
    price: 'Start From 1000',
    image: '/Assets/brnd_biru.png',
    description: 'Desain user interface high fidelity untuk aplikasi dan website yang user-friendly.',
    color: '#0080FF', textColor: '#0080FF',
    isFeatured: false, category: 'branding',
    details: [
      'User requirement interview',
      'Color pallete and typography',
      'Branding (if needed)',
      'Wireframing & low-fidelity desgin',
      'High-fidelity design & prototyping',
      'User testing',
      'Refinement & final design',
    ],
  },
]

export const PRODUCTS: Product[] = DEFAULT_PRODUCTS
