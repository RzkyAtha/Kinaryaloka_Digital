import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShoppingCart, ArrowRight, X, Check } from 'lucide-react'
import AuthModal from './AuthModal'

// ─── Magic Card: 3D tilt + spotlight + glow border ──────────────────
function MagicCard({
  children,
  accentColor,
  fullHeight = false,
}: {
  children: React.ReactNode
  accentColor: string
  fullHeight?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [spotX, setSpotX] = useState(50)
  const [spotY, setSpotY] = useState(50)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spring = { stiffness: 200, damping: 22, mass: 0.4 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), spring)
  const scale = useSpring(isHovered ? 1.04 : 1, { stiffness: 300, damping: 25 })
  const shadowY = useSpring(isHovered ? 40 : 8, { stiffness: 300, damping: 25 })
  const shadowBlur = useSpring(isHovered ? 60 : 16, { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relX)
    mouseY.set(relY)
    setSpotX(((e.clientX - rect.left) / rect.width) * 100)
    setSpotY(((e.clientY - rect.top) / rect.height) * 100)
  }, [mouseX, mouseY])

  const handleLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? `0 ${shadowY.get()}px ${shadowBlur.get()}px -12px ${accentColor}80, 0 20px 40px -8px rgba(0,0,0,0.3)`
          : '0 4px 16px rgba(0,0,0,0.15)',
      }}
      className={`relative rounded-2xl overflow-hidden bg-[#fefefe] cursor-none${fullHeight ? ' flex flex-col h-full' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
    >
      {/* Gradient border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        animate={isHovered ? {
          boxShadow: `inset 0 0 0 1.5px ${accentColor}60`,
          opacity: 1
        } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(circle 180px at ${spotX}% ${spotY}%, rgba(255,255,255,0.18) 0%, transparent 70%)`
            : 'none',
          transition: 'background 0.05s',
        }}
      />

      {children}
    </motion.div>
  )
}

const tabs = [
  { id: 'ecommerce', label: 'E-Commerce', color: '#831449', glow: '#83144950', icon: '🛒' },
  { id: 'webdesign', label: 'Web Design', color: '#004896', glow: '#00489650', icon: '💻' },
  { id: 'branding', label: 'Branding',   color: '#207224', glow: '#20722450', icon: '✦'  },
]

interface Product {
  title: string
  price: string
  image: string
  description: string
  color: string
  textColor: string
  badge?: string
  details?: string[]
}

interface TabData {
  featured?: Product
  cards: Product[]
}

const products: Record<string, TabData> = {
  ecommerce: {
    featured: {
      title: 'E-Commerce Full Brand',
      price: '15000',
      image: '/Assets/wd_ungu.png',
      description: 'E-commerce profesional + identitas brand lengkap. Dari toko online canggih hingga visual brand yang siap bersaing.',
      color: '#831449',
      textColor: '#831449',
      badge: 'Flagship',
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
    cards: [
      {
        title: 'Katalog Digital',
        price: '2500',
        image: '/Assets/wd_oren.png',
        description: 'Website katalog produk online. Pelanggan lihat produk & pesan langsung via WhatsApp. Tanpa ribet dengan payment gateway.',
        color: '#b76431',
        textColor: '#bb6732',
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
        title: 'Toko Online',
        price: '5000',
        image: '/Assets/wd_biru.png',
        description: 'Toko online lengkap dengan keranjang belanja & payment gateway. Pelanggan bisa checkout langsung di website kamu.',
        color: '#004896',
        textColor: '#004896',
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
        title: 'Olshop Full',
        price: '8000',
        image: '/Assets/wd_hijau.png',
        description: 'Platform jual beli penuh fitur seperti inventori, multi-varian produk, voucher diskon, hingga laporan penjualan real-time.',
        color: '#207224',
        textColor: '#004896',
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
    ],
  },
  webdesign: {
    featured: {
      title: 'Full Digital Package',
      price: '12000',
      image: '/Assets/wd_ungu.png',
      description: 'Transformasi digital menyeluruh dari mulai sistem, website, hingga identitas visual dan strategi konten.',
      color: '#831449',
      textColor: '#831449',
      badge: 'Flagship',
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
    cards: [
      {
        title: 'Paket Reservasi',
        price: '2500',
        image: '/Assets/wd_oren.png',
        description: 'Sistem booking online siap pakai tanpa perlu website. Ideal untuk bisnis layanan yang masih pakai manual.',
        color: '#b76431',
        textColor: '#bb6732',
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
        title: 'Website & Reservasi',
        price: '5000',
        image: '/Assets/wd_biru.png',
        description: 'Website profesional lengkap dengan sistem booking simpel. Bisnis kamu terlihat serius di mata pelanggan.',
        color: '#004896',
        textColor: '#004896',
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
        title: 'Website Pro',
        price: '8000',
        image: '/Assets/wd_hijau.png',
        description: 'Web design multi-halaman dengan sistem reservasi bertenaga database. Data pelanggan tersimpan rapi, bisa diakses kapan saja.',
        color: '#207224',
        textColor: '#004896',
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
    ],
  },
  branding: {
    cards: [
      {
        title: 'Paket Branding',
        price: '1500',
        image: '/Assets/br_oren.png',
        description: 'Identitas brand lengkap untuk membuat bisnismu profesional dan mudah diingat, dari logo hingga nama yang filosofis.',
        color: '#b76431',
        textColor: '#bb6732',
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
        title: 'Branding + Copywriting',
        price: '2500',
        image: '/Assets/br_biru.png',
        description: 'Branding lengkap dengan copywriting profesional untuk website, social media, dan marketing material.',
        color: '#004896',
        textColor: '#004896',
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
        title: 'Complete Branding',
        price: '4000',
        image: '/Assets/br_hijau.png',
        description: 'Solusi branding end-to-end: visual identity, semua copywriting, dan marketing kit siap pakai.',
        color: '#207224',
        textColor: '#004896',
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
    ],
  },
}

function DetailModal({ product, onClose, onSelect }: { product: Product | null; onClose: () => void; onSelect: (title: string, price: string) => void }) {
  if (!product) return null
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: '#fff' }}
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image strip */}
            <div className="relative h-32 overflow-hidden flex-shrink-0">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${product.color}99, ${product.color}ee)` }} />
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {product.badge && (
                  <span className="bg-[#e70000] text-white text-xs font-bold px-2 py-0.5 rounded mr-2">{product.badge}</span>
                )}
                <h3 className="text-white font-bold text-2xl leading-tight">{product.title}</h3>
                <p className="text-white/80 text-sm font-semibold mt-0.5">IDR {product.price}K</p>
              </div>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature list */}
            <div className="overflow-y-auto flex-1 p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: product.color }}>Yang Kamu Dapatkan</p>
              <ul className="space-y-2.5">
                {product.details?.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: product.color + '20' }}>
                      <Check className="w-3 h-3" style={{ color: product.color }} />
                    </div>
                    <span className="text-[#404040] text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="p-5 pt-0 flex-shrink-0">
              <motion.button
                onClick={() => { onSelect(product.title, product.price); onClose() }}
                className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-base"
                style={{ backgroundColor: product.color, boxShadow: `0 4px 20px ${product.color}60` }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Pilih Paket Ini
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('ecommerce')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ title: string; price: string } | null>(null)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSelectPackage = (title: string, price: string) => {
    setSelectedPackage({ title, price })
    setAuthModalOpen(true)
  }

  const currentProducts = products[activeTab as keyof typeof products]

  return (
    <section id="produk" className="bg-black py-12 md:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Produk Kami</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[#1a1a1a] p-1.5 rounded-2xl flex gap-1 border border-[#2a2a2a]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-5 md:px-7 py-2.5 md:py-3 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-colors duration-200 outline-none"
                  style={{ color: isActive ? '#fff' : '#666' }}
                >
                  {/* Sliding pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-xl z-0"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  {/* Glow when active */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-glow"
                      className="absolute inset-0 rounded-xl z-0 blur-md"
                      style={{ backgroundColor: tab.glow }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  {/* Label */}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-base leading-none">{tab.icon}</span>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Cards — crossfade on tab change */}
        <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >

        {/* Featured Product Card (Large) — with spotlight */}
        {currentProducts.featured && (
        <motion.div
          className="mb-6 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MagicCard accentColor={currentProducts.featured.color}>
          <div className="flex flex-col md:grid md:grid-cols-[380px_1fr] lg:grid-cols-[515px_1fr]">
            {/* Top/Left - Image */}
            <div className="relative h-[200px] sm:h-[260px] md:h-[441px] overflow-hidden group">
              <motion.img
                src={currentProducts.featured.image}
                alt={currentProducts.featured.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Color tint overlay on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: currentProducts.featured.color + '20' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Bottom/Right - Content */}
            <div className="p-4 sm:p-6 md:p-8 relative">
              {/* Badge */}
              {currentProducts.featured.badge && (
                <div className="bg-[#e70000] text-white px-4 py-2 rounded-md font-semibold text-sm inline-block mb-4">
                  {currentProducts.featured.badge}
                </div>
              )}

              {/* Title */}
              <h3 className="font-bold text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px] text-[#404040] leading-tight mb-3 md:mb-4">
                {currentProducts.featured.title}
              </h3>

              {/* Description */}
              <p className="text-[#9f9f9f] text-sm md:text-base lg:text-lg leading-relaxed text-justify max-w-[671px] mb-4 md:mb-6">
                {currentProducts.featured.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                <span className="text-xl md:text-2xl lg:text-[40px] font-semibold" style={{ color: currentProducts.featured.textColor }}>IDR</span>
                <span className="text-xl md:text-2xl lg:text-[40px] font-semibold text-[#454545]">{currentProducts.featured.price}K</span>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleSelectPackage(currentProducts.featured!.title, currentProducts.featured!.price)}
                className="w-full py-3 md:py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 text-base md:text-lg"
                style={{ backgroundColor: currentProducts.featured.color, boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ShoppingCart className="w-6 h-6" />
                Pilih Paket Ini
              </motion.button>

              {/* Detail Link */}
              <button
                onClick={() => setDetailProduct(currentProducts.featured!)}
                className="absolute top-8 right-8 text-lg font-semibold flex items-center gap-1 hover:underline"
                style={{ color: currentProducts.featured.textColor }}
              >
                Detail &gt;
              </button>
            </div>
          </div>
          </MagicCard>
        </motion.div>
        )}

        {/* 3 Smaller Product Cards — MagicCard */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {currentProducts.cards.map((product: Product, index: number) => (
            <motion.div
              key={product.title}
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagicCard accentColor={product.color} fullHeight>
                {/* Image with scale + color tint */}
                <div className="relative h-[200px] overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Color tint */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: product.color + '25' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  />
                  {/* Price floating tag that slides up on hover */}
                  <motion.div
                    className="absolute bottom-3 right-3 px-3 py-1 rounded-lg text-white font-bold text-sm"
                    style={{ backgroundColor: product.color }}
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    IDR {product.price}K
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Title and Detail */}
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      className="font-bold text-[28px] md:text-[32px] text-[#404040] leading-tight"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </motion.h3>
                    <motion.button
                      onClick={() => setDetailProduct(product)}
                      className="text-lg font-semibold flex items-center gap-1 whitespace-nowrap mt-2"
                      style={{ color: product.textColor }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Detail <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Description — flex-1 pushes price+button to bottom */}
                  <p className="text-[#9f9f9f] text-sm leading-relaxed text-justify mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Price */}
                  <motion.div
                    className="flex items-baseline gap-2 mb-4"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[28px] md:text-[32px] font-semibold" style={{ color: product.textColor }}>IDR</span>
                    <span className="text-[28px] md:text-[32px] font-semibold text-[#454545]">{product.price}K</span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleSelectPackage(product.title, product.price)}
                    className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                    style={{ backgroundColor: product.color, boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${product.color}60` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Pilih Paket Ini
                  </motion.button>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        </motion.div>
        </AnimatePresence>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          selectedPackage={selectedPackage}
        />

        {/* Detail Modal */}
        <DetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onSelect={handleSelectPackage}
        />
      </div>
    </section>
  )
}
