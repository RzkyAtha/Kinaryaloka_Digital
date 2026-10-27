import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import type { RequestQuoteProduct } from './RequestQuoteModal'

const RequestQuoteModal = lazy(() => import('./RequestQuoteModal'))

// --- Inventory Data ----------------------------------------------------------
const MAIN_ITEM = {
  id: 'main',
  name: 'Website Bisnis',
  type: 'Main Item',
  rarity: 'Core Service',
  image: '/Assets/nara_coding.webp',
  color: '#F5C542',
  priceMin: 3000,
  priceMax: 5000,
  stats: [
    { value: '5+', label: 'halaman' },
    { value: 'ID·EN', label: 'bilingual' },
    { value: '100%', label: 'responsive' },
  ],
  description:
    'Website company profile profesional sebagai rumah digital bisnismu ; identitas, layanan, dan kontak resmi dalam satu tempat. Kami juga menerima brand identity settlement, serta pengembangan fitur/tools custom yang disesuaikan dengan kebutuhan bisnis klien.',
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
    name: 'Brand Identity',
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
    name: 'Tools/Fitur Custom',
    type: 'Add-On',
    image: '/Assets/brnd_biru.webp',
    color: '#0080FF',
    price: 'discuss' as const,
    icon: WrenchScrewdriverIcon,
    dot: [70, 30] as [number, number],
    chipPos: [96, 26] as [number, number],
    chipAlign: 'right' as const,
    stats: [
      { label: 'Konversi', value: 82 },
      { label: 'Kemudahan Kelola', value: 78 },
    ],
    description:
      'Tools atau fitur custom yang disesuaikan dengan workflow bisnismu - mulai dari pengelola dokumen hingga sistem internal.',
    details: [
      'Fitur custom sesuai kebutuhan bisnis',
      'Contoh: invoice, PO, booking, dashboard',
      'Integrasi dengan sistem internal',
      'Konsultasi scope fitur gratis',
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
  const pricedTotal = equippedAddons.reduce(
    (s, a) => s + (typeof a.price === 'number' ? a.price : 0),
    0
  )
  const hasCustom = equippedAddons.some((a) => a.price === 'discuss')
  const totalMin = MAIN_ITEM.priceMin + pricedTotal
  const totalMax = MAIN_ITEM.priceMax + pricedTotal

  const toggleEquip = (id: string) => {
    setEquipped((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleCheckout = () => {
    setSelectedProduct({
      title: [MAIN_ITEM.name, ...equippedAddons.map((a) => a.name)].join(' + '),
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
        <div className="flex flex-col gap-4">
          <h2 className="text-[38px] uppercase leading-[0.95] tracking-tight sm:text-[48px] md:text-[56px]">
            <span className="block font-prompt font-extrabold text-[#141414]">Susun</span>
            <span className="block font-prompt font-extrabold text-[#757575]">Loadout</span>
          </h2>
          <p className="max-w-md text-[13px] leading-relaxed text-[#6b6b70]">
            Mulai dari item utama, lalu pasang add-on sesuai kebutuhan bisnismu.
          </p>
        </div>

        {/* -- Asymmetric editorial grid -- */}
        <div className="mt-6 grid gap-5 md:mt-14 lg:grid-cols-[minmax(0,300px)_1fr_minmax(0,230px)] lg:gap-8">
          {/* -- Left: selected item detail -- */}
          <div className="order-2 lg:order-1">
            <div>
                <h3 className="font-poppins text-[26px] font-bold leading-tight text-[#141414] sm:text-[30px]">
                  {MAIN_ITEM.name}
                </h3>
                <p className="mt-2.5 text-justify text-[12.5px] leading-relaxed text-[#6b6b70]">
                  {MAIN_ITEM.description}
                </p>

                {/* Stats - 3 kolom ala profile card */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {MAIN_ITEM.stats.map((s) => (
                    <div key={s.label}>
                      <span className="block font-poppins text-[18px] font-extrabold tracking-tight text-[#141414] sm:text-[20px]">
                        {s.value}
                      </span>
                      <span className="mt-0.5 block font-poppins text-[10px] text-[#8a8a90]">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <ul className="mt-4 space-y-1.5">
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

            </div>
          </div>

          {/* -- Center: floating product visual -- */}
          <div className="order-1 self-center lg:order-2">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px] origin-center lg:scale-[1.15]">
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
                      className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 font-poppins text-[12px] font-semibold shadow-sm transition-colors sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-[10px] ${
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
                          <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5" style={{ color: a.color }} />
                          {a.name}
                        </>
                      ) : (
                        <>
                          <PlusIcon className="h-4 w-4 sm:h-3 sm:w-3" />
                          {a.name}
                        </>
                      )}
                    </motion.span>
                  </button>
                )
              })}
            </div>


          </div>

          {/* -- Right: equipment slots -- */}
          <div className="order-3 lg:self-center">
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
                          {typeof a.price === 'number' ? `+${fmtJt(a.price)} Jt` : '(discuss)'}
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="font-poppins text-[28px] font-extrabold tracking-tight text-[#141414] sm:text-[34px]">
              Rp {fmtJt(totalMin)} - {fmtJt(totalMax)} Jt
            </span>
            <span className="block text-[10px] text-[#9a9aa0]">
              {equippedAddons.length > 0
                ? `${equippedAddons.length} add-on terpasang: ${equippedAddons.map((a) => a.name).join(' + ')}${hasCustom ? ' · harga custom didiskusikan' : ''}`
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
