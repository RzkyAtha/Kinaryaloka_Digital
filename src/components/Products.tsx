import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PaintBrushIcon,
  Squares2X2Icon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import type { RequestQuoteProduct } from './RequestQuoteModal'

const RequestQuoteModal = lazy(() => import('./RequestQuoteModal'))

// ─── Inventory Data ──────────────────────────────────────────────────────────
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
    'Website company profile profesional sebagai rumah digital bisnismu — identitas, layanan, dan kontak resmi dalam satu tempat.',
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
      'Identitas visual lengkap supaya bisnismu mudah diingat — logo, warna, dan gaya yang konsisten di semua titik.',
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
      'Katalog produk online di dalam website — pelanggan bisa jelajahi produk dan pesan langsung via WhatsApp.',
    details: [
      'Katalog produk (hingga 50 produk)',
      'Halaman detail produk + galeri',
      'Tombol pesan via WhatsApp',
      'Manajemen produk & kategori',
    ],
  },
]

const CORNERS = [
  { pos: 'top-1.5 left-1.5', tri: 'polygon(0 0, 100% 0, 0 100%)' },
  { pos: 'top-1.5 right-1.5', tri: 'polygon(0 0, 100% 0, 100% 100%)' },
  { pos: 'bottom-1.5 left-1.5', tri: 'polygon(0 0, 0 100%, 100% 100%)' },
  { pos: 'bottom-1.5 right-1.5', tri: 'polygon(100% 0, 0 100%, 100% 100%)' },
]

/** Format harga dalam "K" menjadi teks juta: 1500 → "1,5" · 3000 → "3" */
function fmtJt(k: number): string {
  return (k / 1000).toLocaleString('id-ID')
}

export default function Products() {
  const [equipped, setEquipped] = useState<string[]>([])
  const [infoId, setInfoId] = useState<string>('main')
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<RequestQuoteProduct | null>(null)

  const info = infoId === 'main' ? MAIN_ITEM : ADDONS.find((a) => a.id === infoId) ?? MAIN_ITEM
  const equippedAddons = ADDONS.filter((a) => equipped.includes(a.id))
  const totalMin = MAIN_ITEM.priceMin + equippedAddons.reduce((s, a) => s + a.price, 0)
  const totalMax = MAIN_ITEM.priceMax + equippedAddons.reduce((s, a) => s + a.price, 0)

  const toggleEquip = (id: string) => {
    setEquipped((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    setInfoId(id)
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
    <section id="produk" className="relative overflow-hidden bg-black py-12 md:py-20">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-8 text-center md:mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-poppins text-[9px] font-bold uppercase tracking-[0.3em] text-[#F5C542]">
            ◄&nbsp; Inventory System &nbsp;►
          </span>
          <h2 className="mt-2 font-climate text-[26px] text-white md:text-[34px] lg:text-[40px]">
            Produk Kami
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
            Susun loadout digital bisnismu — mulai dari item utama, lalu pasang add-on sesuai kebutuhan.
          </p>
        </motion.div>

        {/* Inventory panel */}
        <motion.div
          className="relative overflow-hidden rounded-3xl p-4 sm:p-6"
          style={{
            background: 'linear-gradient(160deg, #15151d 0%, #0a0a0f 100%)',
            border: '1px solid rgba(245,197,66,0.18)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.45), inset 0 0 60px rgba(245,197,66,0.03)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Scanline + grid texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />

          {/* HUD top strip */}
          <div className="relative -mx-4 -mt-4 mb-4 flex items-center justify-between border-b border-white/10 px-4 py-3 sm:-mx-6 sm:-mt-6 sm:px-6">
            <span className="font-poppins text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
              ◤ Loadout // Produk
            </span>
            <div className="flex items-center gap-2.5">
              <span className="font-poppins text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                Slots
              </span>
              <span
                className="px-2 py-0.5 font-poppins text-[10px] font-bold"
                style={{
                  color: '#F5C542',
                  border: '1px solid rgba(245,197,66,0.3)',
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  background: 'rgba(245,197,66,0.08)',
                }}
              >
                {equippedAddons.length}/2
              </span>
            </div>
          </div>

          <div className="relative grid gap-5 lg:grid-cols-[230px_1fr_220px]">
            {/* ── Left: selected item detail ── */}
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={infoId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="font-poppins text-[9px] font-bold uppercase tracking-[0.28em]"
                    style={{ color: info.color }}
                  >
                    {info.type}
                  </span>
                  <h3 className="mt-1 font-fredoka text-[24px] font-semibold leading-tight text-white sm:text-[28px]">
                    {info.name}
                  </h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-white/50">{info.description}</p>

                  {/* Stat bars */}
                  <div className="mt-4 space-y-2.5">
                    {info.stats.map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className="w-[92px] shrink-0 font-poppins text-[8px] font-bold uppercase tracking-[0.14em] text-white/40">
                          {s.label}
                        </span>
                        <div className="h-[3px] flex-1 bg-white/10">
                          <motion.div
                            className="h-full"
                            style={{ background: info.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${s.value}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                          />
                        </div>
                        <span
                          className="w-6 shrink-0 text-right font-poppins text-[9px] font-bold"
                          style={{ color: info.color }}
                        >
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <ul className="mt-3.5 space-y-1.5 border-t border-white/10 pt-3">
                    {info.details.map((d) => (
                      <li key={d} className="flex items-start gap-1.5">
                        <span
                          className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: info.color }}
                        />
                        <span className="text-[10.5px] leading-relaxed text-white/55">{d}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price + equip control */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-poppins text-[15px] font-bold" style={{ color: info.color }}>
                      {'priceMin' in info
                        ? `Rp ${fmtJt(info.priceMin)} – ${fmtJt(info.priceMax)} Jt`
                        : `+Rp ${fmtJt(info.price)} Jt`}
                    </span>
                    {infoId === 'main' ? (
                      <span className="font-poppins text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                        Always Equipped
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleEquip(infoId)}
                        className="cursor-pointer px-4 py-2 font-poppins text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:brightness-110 active:translate-y-[1px]"
                        style={{
                          clipPath:
                            'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                          background: equipped.includes(infoId)
                            ? 'rgba(255,255,255,0.08)'
                            : `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
                          color: equipped.includes(infoId) ? 'rgba(255,255,255,0.55)' : '#141414',
                        }}
                      >
                        {equipped.includes(infoId) ? 'Unequip' : 'Equip'}
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* ── Center: hero-style annotated visual ── */}
            <div className="order-1 lg:order-2">
              <div
                className="relative aspect-[5/4]"
                onPointerEnter={() => setInfoId('main')}
              >
                {/* Dashed blueprint frame + vertex dots + leader lines */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 80"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <rect
                    x="2" y="3" width="96" height="74" rx="8"
                    fill="none"
                    stroke="rgba(255,255,255,0.16)"
                    strokeDasharray="3 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  {[
                    [2, 3], [50, 3], [98, 3],
                    [2, 40], [98, 40],
                    [2, 77], [50, 77], [98, 77],
                  ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r={0.9} fill="rgba(255,255,255,0.3)" />
                  ))}

                  {/* Leader lines chip → hotspot saat add-on terpasang */}
                  {ADDONS.filter((a) => equipped.includes(a.id)).map((a) => (
                    <g key={a.id} stroke={a.color} strokeWidth="1" vectorEffect="non-scaling-stroke">
                      <line
                        x1={a.chipPos[0]} y1={a.chipPos[1] * 0.8}
                        x2={a.dot[0]} y2={a.dot[1] * 0.8}
                        strokeDasharray="2 2.5"
                        opacity={0.75}
                      />
                      <circle cx={a.dot[0]} cy={a.dot[1] * 0.8} r={1.1} fill={a.color} stroke="none" />
                    </g>
                  ))}

                  {/* Hotspot ring marker — selalu terlihat, redup saat kosong */}
                  {ADDONS.map((a) => (
                    <circle
                      key={`ring-${a.id}`}
                      cx={a.dot[0]} cy={a.dot[1] * 0.8} r={2.4}
                      fill="none"
                      stroke={equipped.includes(a.id) ? a.color : 'rgba(255,255,255,0.25)'}
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
                    className="w-[76%] object-contain"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                </motion.div>

                {/* Add-on chips — ghost slot saat kosong, chip putih saat equipped */}
                {ADDONS.map((a) => {
                  const isEq = equipped.includes(a.id)
                  const Icon = a.icon
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleEquip(a.id)}
                      onPointerEnter={() => setInfoId(a.id)}
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
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: a.id === 'katalog' ? 1.2 : 0 }}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5"
                        style={
                          isEq
                            ? {
                                background: '#fff',
                                border: `1.5px solid ${a.color}`,
                                boxShadow: `0 6px 18px ${a.color}40`,
                              }
                            : {
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1.5px dashed rgba(255,255,255,0.25)',
                                }
                        }
                      >
                        {isEq ? (
                          <>
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: a.color }} />
                            <span className="font-poppins text-[10px] font-bold text-[#2a2a2a] sm:text-[11px]">
                              {a.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: 'rgba(255,255,255,0.35)' }} />
                            <span className="font-poppins text-[9px] font-semibold text-white/35 sm:text-[10px]">
                              {a.name}
                            </span>
                          </>
                        )}
                      </motion.span>
                    </button>
                  )
                })}
              </div>

              {/* Name plate */}
              <div
                className="mt-2 flex items-center justify-between gap-2 rounded-xl px-4 py-3"
                style={{
                  border: '1px solid rgba(245,197,66,0.25)',
                  background: 'rgba(245,197,66,0.06)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-md px-2 py-0.5 font-poppins text-[8px] font-bold uppercase tracking-[0.18em] text-[#141414]"
                    style={{ background: MAIN_ITEM.color }}
                  >
                    Equipped
                  </span>
                  <span className="font-fredoka text-[14px] text-white sm:text-[16px]">
                    {MAIN_ITEM.name}
                  </span>
                </div>
                <span className="font-poppins text-[12px] font-bold sm:text-[14px]" style={{ color: MAIN_ITEM.color }}>
                  Rp {fmtJt(MAIN_ITEM.priceMin)} – {fmtJt(MAIN_ITEM.priceMax)} Jt
                </span>
              </div>
            </div>

            {/* ── Right: equipment slots ── */}
            <div className="order-3">
              <span className="mb-2 block font-poppins text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
                Equipment
              </span>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1 lg:content-start">
                {ADDONS.map((a) => {
                  const isEq = equipped.includes(a.id)
                  return (
                    <motion.button
                      key={a.id}
                      type="button"
                      onPointerEnter={() => setInfoId(a.id)}
                      onClick={() => toggleEquip(a.id)}
                      whileTap={{ scale: 0.95 }}
                      className="relative cursor-pointer overflow-hidden rounded-xl text-left transition-all duration-300"
                      style={{
                        background: isEq ? `${a.color}1a` : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${isEq ? a.color : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: isEq ? `0 0 20px ${a.color}38, inset 0 0 16px ${a.color}12` : 'none',
                      }}
                      aria-pressed={isEq}
                      aria-label={`${isEq ? 'Lepas' : 'Pasang'} add-on ${a.name}`}
                    >
                      {CORNERS.map((c) => (
                        <span
                          key={c.pos}
                          className={`pointer-events-none absolute z-10 h-2.5 w-2.5 ${c.pos} transition-opacity duration-300`}
                          style={{ background: a.color, clipPath: c.tri, opacity: isEq ? 1 : 0 }}
                        />
                      ))}

                      <div className="relative h-24 overflow-hidden sm:h-28">
                        <img
                          src={a.image}
                          alt={a.name}
                          className={`h-full w-full object-cover transition-all duration-300 ${
                            isEq ? 'scale-105' : 'opacity-40 grayscale'
                          }`}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>

                      <div className="px-3 py-2.5">
                        <div className="flex items-baseline justify-between gap-1">
                          <span
                            className="font-poppins text-[12px] font-bold leading-tight transition-colors duration-300"
                            style={{ color: isEq ? '#fff' : 'rgba(255,255,255,0.5)' }}
                          >
                            {a.name}
                          </span>
                          <span
                            className="font-poppins text-[10px] font-bold transition-colors duration-300"
                            style={{ color: isEq ? a.color : 'rgba(255,255,255,0.3)' }}
                          >
                            +1 Jt
                          </span>
                        </div>
                        <span
                          className="mt-1 block font-poppins text-[8px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
                          style={{ color: isEq ? a.color : 'rgba(255,255,255,0.3)' }}
                        >
                          {isEq ? '● Equipped' : '○ Tap to equip'}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Total bar + CTA ── */}
          <div
            className="relative mt-4 flex flex-col items-center justify-between gap-3 rounded-xl px-4 py-4 sm:flex-row"
            style={{ border: '1px solid rgba(245,197,66,0.22)', background: 'rgba(245,197,66,0.05)' }}
          >
            <div className="text-center sm:text-left">
              <span className="block font-poppins text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                Estimasi Total
              </span>
              <span className="font-poppins text-[20px] font-bold text-[#F5C542] sm:text-[24px]">
                Rp {fmtJt(totalMin)} – {fmtJt(totalMax)} Jt
              </span>
              <span className="block text-[10px] text-white/40">
                {equippedAddons.length > 0
                  ? `${equippedAddons.length} add-on terpasang: ${equippedAddons.map((a) => a.name).join(' + ')}`
                  : 'Belum ada add-on terpasang'}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full shrink-0 cursor-pointer rounded-2xl px-8 py-3 font-poppins text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
            >
              Ambil Paket Ini
            </button>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-white/35 sm:text-xs">
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
