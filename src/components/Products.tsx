import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  PaintBrushIcon,
  Squares2X2Icon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import type { RequestQuoteProduct } from './RequestQuoteModal'

const RequestQuoteModal = lazy(() => import('./RequestQuoteModal'))

// --- Inventory Data ----------------------------------------------------------
const MAIN_ITEM = {
  id: 'main',
  name: 'Business Profile',
  type: 'Main Item',
  rarity: 'Core Service',
  image: '/Assets/nara_coding.webp',
  color: '#F5C542',
  priceMin: 1500,
  priceMax: 3000,
  stats: [
    { label: 'Kredibilitas', value: 92 },
    { label: 'Jangkauan', value: 85 },
    { label: 'Konversi', value: 80 },
  ],
  description:
    'Website company profile profesional sebagai rumah digital bisnismu - identitas, layanan, dan kontak resmi dalam satu tempat.',
  details: [
    'Custom website multi-halaman',
    'Profil bisnis, layanan & kontak resmi',
    'Mobile responsive + fast loading',
    'Revisi desain hingga puas',
    'Konsultasi domain & hosting',
  ],
}

const ADDONS = [
  {
    id: 'branding',
    name: 'Branding',
    type: 'Add-On',
    image: '/Assets/brnd_oren.webp',
    color: '#FF8C2E',
    price: 1000,
    icon: PaintBrushIcon,
    /** Hotspot pada gambar utama (%) + posisi chip melayang (%) */
    dot: [32, 62] as [number, number],
    chipPos: [4, 66] as [number, number],
    chipAlign: 'left' as const,
    stats: [
      { label: 'Visual Impact', value: 88 },
      { label: 'Konsistensi Brand', value: 92 },
    ],
    description:
      'Identitas visual lengkap supaya bisnismu mudah diingat - logo, warna, dan gaya yang konsisten di semua titik.',
    details: [
      'Desain logo (3 konsep)',
      'Color palette & typography',
      'Social media kit 5 template',
      'Brand guidelines PDF',
    ],
  },
  {
    id: 'katalog',
    name: 'Katalog Produk',
    type: 'Add-On',
    image: '/Assets/brnd_biru.webp',
    color: '#0080FF',
    price: 1000,
    icon: Squares2X2Icon,
    dot: [70, 30] as [number, number],
    chipPos: [96, 26] as [number, number],
    chipAlign: 'right' as const,
    stats: [
      { label: 'Konversi', value: 82 },
      { label: 'Kemudahan Kelola', value: 78 },
    ],
    description:
      'Katalog produk online di dalam website - pelanggan bisa jelajahi produk dan pesan langsung via WhatsApp.',
    details: [
      'Katalog produk (hingga 50 produk)',
      'Halaman detail produk + galeri',
      'Tombol pesan via WhatsApp',
      'Manajemen produk & kategori',
    ],
  },
]

/** Format harga dalam "K" menjadi teks juta: 1500 → "1,5" · 3000 → "3" */
function fmtJt(k: number): string {
  return (k / 1000).toLocaleString('id-ID')
}

export default function Products() {
  const [equipped, setEquipped] = useState<string[]>([])
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<RequestQuoteProduct | null>(null)

  const equippedAddons = ADDONS.filter((a) => equipped.includes(a.id))
  const totalMin = MAIN_ITEM.priceMin + equippedAddons.reduce((s, a) => s + a.price, 0)
  const totalMax = MAIN_ITEM.priceMax + equippedAddons.reduce((s, a) => s + a.price, 0)

  const toggleEquip = (id: string) => {
    setEquipped((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleCheckout = () => {
    setSelectedProduct({
      title: ['Business Profile', ...equippedAddons.map((a) => a.name)].join(' + '),
      price: `${fmtJt(totalMin)} - ${fmtJt(totalMax)} Jt`,
      color: MAIN_ITEM.color,
      details: [...MAIN_ITEM.details, ...equippedAddons.flatMap((a) => a.details)],
    })
    setQuoteOpen(true)
  }

  return (
    <section id="produk" className="relative overflow-hidden bg-[#f7f7f5] py-16 md:py-24">
      {/* -- Giant backdrop word -- */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap font-poppins text-[19vw] font-extrabold uppercase leading-none tracking-tight text-[#e9eaec] md:top-2"
      >
        Product
      </span>

      <div className="relative mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-10">
        {/* -- Editorial header -- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-poppins text-[38px] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-[48px] md:text-[56px]">
            <span className="block text-[#141414]">Susun</span>
            <span className="block text-[#c6c7ca]">Loadout</span>
          </h2>
          <p className="max-w-xs text-[13px] leading-relaxed text-[#6b6b70] md:text-right">
            Mulai dari item utama, lalu pasang add-on sesuai kebutuhan bisnismu.
          </p>
        </div>

        {/* -- Asymmetric editorial grid -- */}
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,300px)_1fr_minmax(0,230px)] lg:gap-8">
          {/* -- Left: selected item detail -- */}
          <div className="order-2 lg:order-1">
            <div>
                <span className="block font-poppins text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8a90]">
                  {MAIN_ITEM.type}
                </span>
                <h3 className="mt-2 font-poppins text-[26px] font-bold leading-tight text-[#141414] sm:text-[30px]">
                  {MAIN_ITEM.name}
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#6b6b70]">
                  {MAIN_ITEM.description}
                </p>

                {/* Stat bars - thin editorial lines */}
                <div className="mt-6 space-y-3">
                  {MAIN_ITEM.stats.map((s) => (
                    <div key={s.label}>
                      <div className="mb-1 flex items-baseline justify-between">
                        <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8a8a90]">
                          {s.label}
                        </span>
                        <span className="font-poppins text-[11px] font-bold" style={{ color: MAIN_ITEM.color }}>
                          {s.value}
                        </span>
                      </div>
                      <div className="h-[3px] w-full bg-black/[0.08]">
                        <motion.div
                          className="h-full"
                          style={{ background: '#141414' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.value}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <ul className="mt-5 space-y-1.5 border-t border-black/10 pt-4">
                  {MAIN_ITEM.details.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span
                        className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                        style={{ background: MAIN_ITEM.color }}
                      />
                      <span className="text-[11px] leading-relaxed text-[#6b6b70]">{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Price + equip control */}
                <div className="mt-5 flex items-center justify-between gap-2">
                  <span className="font-poppins text-[17px] font-bold text-[#141414]">
                    Rp {fmtJt(MAIN_ITEM.priceMin)} - {fmtJt(MAIN_ITEM.priceMax)} Jt
                  </span>
                  <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a0a0a5]">
                    Always Equipped
                  </span>
                </div>
            </div>
          </div>

          {/* -- Center: floating product visual -- */}
          <div className="order-1 self-center lg:order-2">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
              {/* Leader lines + hotspot markers */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 80"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {ADDONS.filter((a) => equipped.includes(a.id)).map((a) => (
                  <g key={a.id} stroke={a.color} strokeWidth="1" vectorEffect="non-scaling-stroke">
                    <line
                      x1={a.chipPos[0]} y1={a.chipPos[1] * 0.8}
                      x2={a.dot[0]} y2={a.dot[1] * 0.8}
                      strokeDasharray="2 2.5"
                      opacity={0.8}
                    />
                    <circle cx={a.dot[0]} cy={a.dot[1] * 0.8} r={1.1} fill={a.color} stroke="none" />
                  </g>
                ))}
                {ADDONS.map((a) => (
                  <circle
                    key={`ring-${a.id}`}
                    cx={a.dot[0]} cy={a.dot[1] * 0.8} r={2.2}
                    fill="none"
                    stroke={equipped.includes(a.id) ? a.color : 'rgba(0,0,0,0.18)'}
                    strokeDasharray="1.5 2"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* Floating image */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
              >
                <img
                  src={MAIN_ITEM.image}
                  alt={MAIN_ITEM.name}
                  className="w-[78%] object-contain"
                  style={{ filter: 'drop-shadow(0 20px 28px rgba(0,0,0,0.16))' }}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </motion.div>

              {/* Add-on chips - minimal pills */}
              {ADDONS.map((a) => {
                const isEq = equipped.includes(a.id)
                const Icon = a.icon
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleEquip(a.id)}
                    className="absolute z-20 cursor-pointer outline-none"
                    style={{
                      left: `${a.chipPos[0]}%`,
                      top: `${a.chipPos[1]}%`,
                      transform: `translate(${a.chipAlign === 'right' ? '-100%' : '0'}, -50%)`,
                    }}
                    aria-pressed={isEq}
                    aria-label={`${isEq ? 'Lepas' : 'Pasang'} add-on ${a.name}`}
                  >
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: a.id === 'katalog' ? 1.2 : 0 }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-poppins text-[10px] font-semibold shadow-sm transition-colors sm:px-3.5 ${
                        isEq ? 'bg-[#141414] text-white' : 'bg-white/90 text-[#8a8a90]'
                      }`}
                      style={
                        isEq
                          ? { boxShadow: `0 6px 16px ${a.color}45, 0 2px 6px rgba(0,0,0,0.15)` }
                          : { border: '1px dashed rgba(0,0,0,0.22)' }
                      }
                    >
                      {isEq ? (
                        <>
                          <Icon className="h-3.5 w-3.5" style={{ color: a.color }} />
                          {a.name}
                        </>
                      ) : (
                        <>
                          <PlusIcon className="h-3 w-3" />
                          {a.name}
                        </>
                      )}
                    </motion.span>
                  </button>
                )
              })}
            </div>

            {/* Name plate - clean strip */}
            <div className="mx-auto mt-2 flex max-w-[520px] items-center justify-between border-b border-black/10 px-1 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-[#141414] px-2.5 py-0.5 font-poppins text-[8px] font-semibold uppercase tracking-[0.18em] text-white">
                  Equipped
                </span>
                <span className="font-poppins text-[14px] font-semibold text-[#141414]">
                  {MAIN_ITEM.name}
                </span>
              </div>
              <span className="font-poppins text-[13px] font-bold text-[#141414]">
                Rp {fmtJt(MAIN_ITEM.priceMin)} - {fmtJt(MAIN_ITEM.priceMax)} Jt
              </span>
            </div>
          </div>

          {/* -- Right: equipment slots -- */}
          <div className="order-3 lg:self-center">
            <span className="mb-3 block font-poppins text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8a90]">
              Equipment
            </span>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {ADDONS.map((a) => {
                const isEq = equipped.includes(a.id)
                return (
                  <motion.button
                    key={a.id}
                    type="button"
                    onClick={() => toggleEquip(a.id)}
                    whileTap={{ scale: 0.97 }}
                    className="relative cursor-pointer overflow-hidden rounded-xl bg-white text-left transition-all duration-300"
                    style={{
                      border: `1.5px solid ${isEq ? a.color : 'rgba(0,0,0,0.08)'}`,
                      boxShadow: isEq
                        ? `0 10px 28px ${a.color}30, 0 2px 8px rgba(0,0,0,0.08)`
                        : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    aria-pressed={isEq}
                    aria-label={`${isEq ? 'Lepas' : 'Pasang'} add-on ${a.name}`}
                  >
                    <div className="relative aspect-[1280/1028] overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.name}
                        className={`h-full w-full object-cover transition-all duration-300 ${
                          isEq ? 'scale-105' : 'opacity-50 grayscale'
                        }`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                    <div className="px-3.5 py-3">
                      <div className="flex items-baseline justify-between gap-1">
                        <span
                          className="font-poppins text-[12px] font-semibold leading-tight transition-colors duration-300"
                          style={{ color: isEq ? '#141414' : '#8a8a90' }}
                        >
                          {a.name}
                        </span>
                        <span
                          className="font-poppins text-[10px] font-bold transition-colors duration-300"
                          style={{ color: isEq ? '#141414' : '#b0b0b5' }}
                        >
                          +1 Jt
                        </span>
                      </div>
                      <span
                        className="mt-1 block font-poppins text-[8px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300"
                        style={{ color: isEq ? a.color : '#b0b0b5' }}
                      >
                        {isEq ? 'Equipped' : 'Tap to equip'}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* -- Total bar + CTA -- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="block font-poppins text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8a8a90]">
              Estimasi Total
            </span>
            <span className="font-poppins text-[28px] font-extrabold tracking-tight text-[#141414] sm:text-[34px]">
              Rp {fmtJt(totalMin)} - {fmtJt(totalMax)} Jt
            </span>
            <span className="block text-[10px] text-[#9a9aa0]">
              {equippedAddons.length > 0
                ? `${equippedAddons.length} add-on terpasang: ${equippedAddons.map((a) => a.name).join(' + ')}`
                : 'Belum ada add-on terpasang'}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full shrink-0 cursor-pointer rounded-lg bg-[#141414] px-9 py-3.5 font-poppins text-[13px] font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg sm:w-auto"
          >
            Ambil Paket Ini
          </button>
        </div>

        <p className="mt-6 text-center text-[10px] leading-relaxed text-[#9a9aa0] sm:text-xs">
          Harga tertera hanya estimasi, fleksibel dan bisa disesuaikan berdasarkan kebutuhan.
        </p>
      </div>

      <Suspense fallback={null}>
        {quoteOpen && (
          <RequestQuoteModal
            isOpen={quoteOpen}
            onClose={() => setQuoteOpen(false)}
            product={selectedProduct}
          />
        )}
      </Suspense>
    </section>
  )
}
