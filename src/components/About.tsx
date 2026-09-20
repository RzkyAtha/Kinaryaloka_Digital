import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import { ChevronRightIcon as ChevronRight, XMarkIcon as X } from '@heroicons/react/24/solid'

type ValueCard = {
  title: string
  subtitle: string
  badge: string
  description: string
  color: string
  image: string
  idleImage: string
  policeText: string
  code: string
}

const valueCards: ValueCard[] = [
  {
    title: 'Partner, Bukan Vendor.',
    subtitle: 'Hubungan Jangka Panjang',
    badge: 'Support Berkelanjutan',
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#FFA500',
    image: '/Assets/partner_vendor.webp',
    idleImage: '/Assets/PARTNER%20BUKAN%20VENDOR.webp',
    policeText: 'PARTNER, BUKAN VENDOR',
    code: 'Selalu Ada',
  },
  {
    title: 'Tepat Sasaran.',
    subtitle: 'Solusi yang Relevan',
    badge: 'Riset Dulu, Baru Bangun',
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#FF2D55',
    image: '/Assets/tepatsasaran.webp',
    idleImage: '/Assets/SELALU%20SESUAI%20TARGET.webp',
    policeText: 'TEPAT SASARAN',
    code: 'Selalu Sesuai',
  },
  {
    title: 'Langsung Kepakai.',
    subtitle: 'Praktis & Fungsional',
    badge: 'Tanpa Ribet Teknis',
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#0080FF',
    image: '/Assets/langsungkepakai.webp',
    idleImage: '/Assets/DAPAT%20SEGERA%20DIPAKAI.webp',
    policeText: 'LANGSUNG KEPAKAI',
    code: 'Selalu Efisien',
  },
  {
    title: 'Transparan & Jelas.',
    subtitle: 'Tanpa Biaya Tersembunyi',
    badge: 'Harga & Progress Jelas',
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#00C851',
    image: '/Assets/harga_jelas.webp',
    idleImage: '/Assets/RINCI%20JELAS%20AMAN.webp',
    policeText: 'TRANSPARAN & JELAS',
    code: 'Selalu Terbuka',
  },
]

/** Chromatic-aberration ghosts for the active card illustration. */
const GLITCH_LAYERS = [
  { tint: '#ff2d55', x: [0, -5, 4, -3, 0], delay: 0 },
  { tint: '#00c2ff', x: [0, 5, -4, 3, 0], delay: 0.07 },
]

/** Horizontal tear slices swept across the ghosts. */
const GLITCH_SLICES = [
  'inset(0% 0% 100% 0%)',
  'inset(8% 0% 64% 0%)',
  'inset(46% 0% 36% 0%)',
  'inset(72% 0% 14% 0%)',
  'inset(0% 0% 100% 0%)',
]

const BRAND_ACCENT = '#F5C542'
const INK = '#2a2a2a'
const RULE = `1px solid ${INK}`

const processSteps = [
  { code: 'Pertama', label: 'Dengar & Riset', note: 'Pahami cara bisnis berjalan di lapangan.' },
  { code: 'Lalu kita', label: 'Rancang Blueprint', note: 'Susun alur, identitas, dan prioritas.' },
  { code: 'Dilanjutkan dengan', label: 'Bangun Bertahap', note: 'Eksekusi rapi, bisa dipantau tiap langkah.' },
  { code: 'Tidak lupa juga', label: 'Dampingi Jalan', note: 'Support setelah rilis, bukan ditinggal.' },
]

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Rules for a 2-col (mobile) / 4-col (lg) grid of 4 cells, without doubling the outer border. */
function cellBorders(i: number) {
  return [
    'border-[#2a2a2a]',
    i % 2 === 0 ? 'border-r' : i < 3 ? 'lg:border-r' : '',
    i < 2 ? 'border-b lg:border-b-0' : '',
  ].join(' ')
}

function ValueTile({
  card,
  index,
  active,
  onHover,
  onOpen,
}: {
  card: ValueCard
  index: number
  active: boolean
  onHover: (index: number) => void
  onOpen: (index: number) => void
}) {
  return (
    <motion.button
      type="button"
      onPointerEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onClick={() => onOpen(index)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex aspect-square w-full flex-col overflow-hidden p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:p-5"
      style={{ backgroundColor: active ? card.color : '#ffffff', transition: 'background-color 250ms ease' }}
      aria-label={`${card.title} — ${card.badge}`}
    >
      <div className="relative flex items-start justify-between gap-2">
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200"
          style={{ color: active ? '#ffffff' : '#8a8a8a' }}
        >
          {pad2(index + 1)}{' '}
          <span style={{ color: active ? '#ffffff' : card.color }}>/ {card.code}</span>
        </span>
        <span
          className="text-right text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-opacity duration-200"
          style={{ opacity: active ? 1 : 0 }}
        >
          {card.badge}
        </span>
      </div>

      {/* Fixed-size stage: both states are absolutely stacked so the tile never resizes */}
      <div className="relative min-h-0 flex-1">
        <AnimatePresence initial={false}>
          {active ? (
            <motion.div
              key="active"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative flex min-h-0 flex-1 items-center justify-center py-2">
                <motion.div
                  className="relative w-[64px] max-w-full sm:w-24"
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ willChange: 'transform' }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="relative block w-full object-contain"
                  />
                  {GLITCH_LAYERS.map((layer) => (
                    <motion.span
                      key={layer.tint}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 block"
                      style={{
                        background: layer.tint,
                        mixBlendMode: 'screen',
                        WebkitMaskImage: `url(${card.image})`,
                        maskImage: `url(${card.image})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        willChange: 'transform, clip-path, opacity',
                      }}
                      animate={{
                        x: layer.x,
                        opacity: [0, 0.75, 0.3, 0.6, 0],
                        clipPath: GLITCH_SLICES,
                      }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        repeatDelay: 2.1,
                        ease: 'linear',
                        delay: layer.delay,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              <div>
                <h3 className="font-poppins text-[14px] font-bold leading-tight tracking-[-0.01em] text-white sm:text-[17px]">
                  {card.title}
                </h3>
                <p className="mt-1 hidden text-[11px] leading-snug text-white/85 sm:block">{card.description}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-white sm:text-[11px]">
                  Baca detail
                  <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex min-h-0 flex-1 items-center justify-center py-3">
                <img
                  src={card.idleImage}
                  alt={card.policeText}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[70px] w-auto max-w-[82%] object-contain sm:max-h-[110px]"
                />
              </div>
              <div>
                <h3 className="font-poppins text-[14px] font-bold leading-tight tracking-[-0.01em] text-[#2a2a2a] sm:text-[17px]">
                  {card.title}
                </h3>
                <p className="mt-1 text-[11px] leading-snug text-[#8a8a8a]">{card.subtitle}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const popupCard = openIndex === null ? null : valueCards[openIndex]

  const handleHover = useCallback((index: number) => setActiveIndex(index), [])
  const clearHover = useCallback(() => setActiveIndex(-1), [])
  const handleOpen = useCallback((index: number) => setOpenIndex(index), [])
  const closePopup = useCallback(() => setOpenIndex(null), [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, closePopup])

  return (
    <section id="tentang" className="relative overflow-hidden bg-white py-12 md:py-20">
      {/* Blueprint paper grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.028) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(125% 85% at 50% 25%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(125% 85% at 50% 25%, #000 35%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <motion.div
          className="bg-white"
          style={{ border: RULE }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Meta bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#2a2a2a] sm:px-6">
            <span>01 / Tentang</span>
            <span className="text-[#8a8a8a]">Kinaryaloka Digital Studio</span>
          </div>
          <div className="h-[3px]" style={{ background: INK }} />

          {/* Header */}
          <div className="grid lg:grid-cols-12" style={{ borderBottom: RULE }}>
            <div className="relative overflow-hidden border-b border-[#2a2a2a] px-4 py-8 sm:px-6 sm:py-10 lg:col-span-7 lg:border-b-0 lg:border-r">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  backgroundImage: 'url(/Assets/doodle_tech_art.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.04,
                }}
              />
              <h2
                className="relative font-poppins font-extrabold leading-[0.95] tracking-[-0.03em] text-[#2a2a2a]"
                style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
              >
                <span className="block">Bukan Agency Biasa.</span>
                <span className="block" style={{ color: BRAND_ACCENT }}>
                  Partner yang Ngerti
                </span>
                <span className="block">Bisnis Kamu.</span>
              </h2>
            </div>
            <div className="flex items-end px-4 py-6 sm:px-6 lg:col-span-5 lg:py-10">
              <p className="text-left text-[13px] leading-[1.75] text-[#5a5a5a] sm:text-[14px]">
                KINARYALOKA Digital Studio lahir dari satu pemahaman: kebanyakan UMKM bukan tidak mau digital, tetapi
                tidak tahu mulai dari mana atau sudah coba tapi hasilnya tidak kepakai. Kami duduk bareng kamu,
                pelajari cara bisnismu berjalan, lalu terjemahkan ke sistem digital yang rapi dan bisa dikontrol.
              </p>
            </div>
          </div>

          {/* Value modules */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderBottom: RULE }} onPointerLeave={clearHover}>
            {valueCards.map((card, i) => (
              <div key={card.code} className={cellBorders(i)}>
                <ValueTile
                  card={card}
                  index={i}
                  active={activeIndex === i}
                  onHover={handleHover}
                  onOpen={handleOpen}
                />
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderBottom: RULE }}>
            {processSteps.map((step, i) => (
              <div key={step.code} className={`px-4 py-4 sm:px-5 ${cellBorders(i)}`}>
                <div className="flex items-baseline gap-2 font-mono text-[10px] font-bold tracking-[0.14em]">
                  <span style={{ color: valueCards[i % valueCards.length].color }}>{pad2(i + 1)}</span>
                  <span className="uppercase text-[#8a8a8a]">{step.code}</span>
                </div>
                <p className="mt-2 font-poppins text-[13px] font-bold leading-tight text-[#2a2a2a] sm:text-[14px]">
                  {step.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#8f8f8f]">{step.note}</p>
              </div>
            ))}
          </div>

          {/* Footer meta */}
          <p className="px-4 py-2.5 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-[#8a8a8a] sm:px-6">
            Interaktif: arahkan kursor ke tiap modul untuk melihat nilainya menyala, lalu klik modul untuk membaca
            detail dari setiap upaya kami.
          </p>
        </motion.div>
      </div>

      {/* Detail sheet */}
      <AnimatePresence>
        {popupCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(10,10,12,0.82)', backdropFilter: 'blur(4px)' }}
            onClick={closePopup}
            role="dialog"
            aria-modal="true"
            aria-label={popupCard.title}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm overflow-hidden bg-white"
              style={{ border: RULE }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="h-2" style={{ background: popupCard.color }} />

              <button
                onClick={closePopup}
                className="absolute right-3 top-5 z-10 flex h-8 w-8 items-center justify-center border border-[#2a2a2a] bg-white text-[#2a2a2a] transition-colors hover:bg-[#2a2a2a] hover:text-white"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 pr-10 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                  <span style={{ color: popupCard.color }}>{popupCard.code}</span>
                  <span className="text-[#bdbdbd]">
                    {pad2(valueCards.indexOf(popupCard) + 1)}/{pad2(valueCards.length)}
                  </span>
                </div>

                <div className="flex items-center justify-center py-6" style={{ borderBottom: RULE }}>
                  <motion.img
                    src={popupCard.image}
                    alt={popupCard.title}
                    className="w-28 object-contain sm:w-32"
                    loading="eager"
                    decoding="async"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                <span
                  className="mt-4 block text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: popupCard.color }}
                >
                  {popupCard.badge}
                </span>
                <h3 className="mt-1.5 font-poppins text-[20px] font-bold leading-tight tracking-[-0.01em] text-[#2a2a2a] sm:text-[22px]">
                  {popupCard.title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[#8a8a8a]">{popupCard.subtitle}</p>

                <div className="mt-4 border-l-2 pl-3" style={{ borderColor: popupCard.color }}>
                  <p className="text-[13px] leading-relaxed text-[#5a5a5a] sm:text-[14px]">{popupCard.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
