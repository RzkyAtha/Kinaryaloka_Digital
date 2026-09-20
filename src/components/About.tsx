import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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

const processSteps = [
  { code: 'Pertama', label: 'Dengar & Riset', note: 'Pahami cara bisnis berjalan di lapangan.' },
  { code: 'Lalu kita', label: 'Rancang Blueprint', note: 'Susun alur, identitas, dan prioritas.' },
  { code: 'Dilanjutkan dengan', label: 'Bangun Bertahap', note: 'Eksekusi rapi, bisa dipantau tiap langkah.' },
  { code: 'Tidak lupa juga', label: 'Dampingi Jalan', note: 'Support setelah rilis, bukan ditinggal.' },
]

const INK = '#2a2a2a'
const PAPER = '#fdfbf5'
const PHOTO_BG = '#f6f1e6'
const CARD_TILT = [-2.5, 2, 1.5, -2]
const CIRCLED = ['\u2460', '\u2461', '\u2462', '\u2463']

const TORN_EDGE =
  'polygon(0 6%, 4% 0, 9% 7%, 15% 1%, 22% 8%, 29% 0, 35% 7%, 42% 1%, 49% 8%, 56% 0, 63% 7%, 70% 1%, 77% 8%, 84% 0, 91% 7%, 97% 1%, 100% 8%, 100% 94%, 96% 100%, 89% 93%, 82% 100%, 75% 92%, 68% 100%, 61% 93%, 54% 100%, 47% 92%, 40% 100%, 33% 93%, 26% 100%, 19% 92%, 12% 100%, 5% 93%, 0 100%)'

const RULED_LINES =
  'repeating-linear-gradient(transparent 0 21px, rgba(120,150,190,0.16) 21px 22px)'

const pad2 = (n: number) => String(n).padStart(2, '0')

function Tape({
  color,
  rotate,
  className = '',
  width = 64,
  height = 18,
  centered = false,
}: {
  color: string
  rotate: number
  className?: string
  width?: number
  height?: number
  centered?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 block ${className}`}
      style={{
        width,
        height,
        background: `${color}66`,
        transform: `${centered ? 'translateX(-50%) ' : ''}rotate(${rotate}deg)`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      }}
    />
  )
}

function PolaroidCard({
  card,
  index,
  active,
  onHover,
  onOpen,
  reduceMotion,
}: {
  card: ValueCard
  index: number
  active: boolean
  onHover: (index: number) => void
  onOpen: (index: number) => void
  reduceMotion: boolean
}) {
  const tilt = CARD_TILT[index % CARD_TILT.length]
  const tapeRotate = index % 2 === 0 ? -6 : 6
  const tapeSide = index % 2 === 0 ? 'left-3' : 'right-3'

  return (
    <motion.button
      type="button"
      onPointerEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 24, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#2a2a2a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfbf5]"
      style={{ perspective: 1000 }}
      aria-label={`${card.title} — ${card.badge}`}
    >
      <Tape color={card.color} rotate={tapeRotate} className={`-top-2 ${tapeSide}`} />

      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: active ? 180 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front */}
        <div
          className="relative bg-white p-2.5 pb-3 sm:p-3 sm:pb-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 4px 12px rgba(60,40,10,0.14), 0 1px 2px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex aspect-[4/3] items-center justify-center" style={{ background: PHOTO_BG }}>
            <motion.img
              src={card.image}
              alt={card.title}
              loading="lazy"
              decoding="async"
              className="w-20 object-contain sm:w-28"
              animate={reduceMotion ? undefined : { y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <h3 className="font-poppins text-[13px] font-bold leading-tight text-[#2a2a2a] sm:text-[15px]">{card.title}</h3>
            <p className="font-caveat text-[15px] leading-tight text-[#8a8a8a] sm:text-[17px]">{card.subtitle}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col p-3 sm:p-4"
          style={{
            background: PAPER,
            backgroundImage: RULED_LINES,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 4px 12px rgba(60,40,10,0.14), 0 1px 2px rgba(0,0,0,0.06)',
          }}
        >
          <span className="absolute right-3 top-2 font-caveat text-[14px] font-bold text-[#b5ab98]">
            {pad2(index + 1)}/{pad2(valueCards.length)}
          </span>
          <div className="flex min-h-0 flex-1 items-center justify-center py-1">
            <img
              src={card.idleImage}
              alt={card.policeText}
              loading="lazy"
              decoding="async"
              className="max-h-[44px] w-auto max-w-[80%] object-contain sm:max-h-[56px]"
              style={{ transform: 'rotate(-4deg)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
            />
          </div>
          <span
            className="inline-block self-start border px-1.5 py-0.5 font-typewriter text-[9px] uppercase tracking-[0.06em] text-[#2a2a2a] sm:text-[10px]"
            style={{ borderColor: INK, transform: 'rotate(-2deg)', background: '#fff' }}
          >
            {card.badge}
          </span>
          <p className="mt-1.5 hidden font-poppins text-[11px] leading-snug text-[#5a5a5a] sm:block sm:text-[12px]">
            {card.description}
          </p>
          <span
            className="mt-1.5 inline-flex items-center gap-0.5 font-caveat text-[15px] font-bold sm:text-[17px]"
            style={{ color: card.color }}
          >
            Baca detail
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </motion.div>
    </motion.button>
  )
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion() ?? false

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
    <section
      id="tentang"
      className="relative overflow-hidden py-12 md:py-20"
      style={{
        background: '#e6d9c4',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '6px 6px',
      }}
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <motion.div
          className="grid lg:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: '0 14px 30px rgba(60,40,10,0.22)' }}
        >
          {/* Left page */}
          <div
            className="relative p-6 pb-32 sm:p-8 sm:pb-36 lg:p-10 lg:pb-36"
            style={{
              background: PAPER,
              boxShadow: 'inset -14px 0 18px -14px rgba(0,0,0,0.22)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage: 'url(/Assets/doodle_tech_art.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.06,
              }}
            />

            <div className="relative">
              <span className="inline-block font-caveat text-[18px] font-bold text-[#8a8a8a]" style={{ transform: 'rotate(-2deg)' }}>
                tentang kami ✎
              </span>

              <div className="mt-3 inline-block" style={{ transform: 'rotate(-1.5deg)' }}>
                <div
                  className="px-4 py-2.5 sm:px-5 sm:py-3"
                  style={{ background: '#fff2c4', clipPath: TORN_EDGE, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                >
                  <h2 className="font-marker leading-[1.05] text-[#2a2a2a]" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
                    Bukan Agency Biasa.
                  </h2>
                </div>
              </div>

              <p
                className="mt-3 pl-2 font-caveat font-bold leading-[1.05] text-[#D4912A]"
                style={{ fontSize: 'clamp(24px, 2.8vw, 36px)' }}
              >
                Partner yang Ngerti Bisnis Kamu.
              </p>

              <p className="mt-5 max-w-[540px] font-poppins text-[13px] leading-[1.75] text-[#5a5a5a] sm:text-[14px]">
                KINARYALOKA Digital Studio lahir dari satu pemahaman: kebanyakan UMKM bukan tidak mau digital, tetapi
                tidak tahu mulai dari mana atau sudah coba tapi hasilnya tidak kepakai. Kami duduk bareng kamu,
                pelajari cara bisnismu berjalan, lalu terjemahkan ke sistem digital yang rapi dan bisa dikontrol.
              </p>

              {/* Process */}
              <div className="relative mt-7">
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-[13px] top-3 border-l-2 border-dashed"
                  style={{ borderColor: '#c9bda3' }}
                />
                <ul className="relative space-y-4">
                  {processSteps.map((step, i) => (
                    <li key={step.code} className="flex items-start gap-3">
                      <span
                        className="flex w-7 flex-shrink-0 justify-center font-caveat text-[26px] font-bold leading-none"
                        style={{ color: valueCards[i % valueCards.length].color, background: PAPER }}
                      >
                        {CIRCLED[i]}
                      </span>
                      <div className="pt-0.5">
                        <span className="font-caveat text-[13px] text-[#a09580]">{step.code}</span>
                        <p className="font-poppins text-[13px] font-bold leading-tight text-[#2a2a2a] sm:text-[14px]">{step.label}</p>
                        <p className="font-poppins text-[11px] leading-relaxed text-[#8f8f8f]">{step.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <img
              src={valueCards[3].idleImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute bottom-6 left-6 w-24 sm:bottom-8 sm:left-8 sm:w-28 lg:w-32"
              style={{ transform: 'rotate(-6deg)', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.18))' }}
            />
          </div>

          {/* Right page */}
          <div
            className="relative p-6 pb-14 sm:p-8 sm:pb-16 lg:p-10 lg:pb-16"
            style={{
              background: PAPER,
              boxShadow: 'inset 14px 0 18px -14px rgba(0,0,0,0.22)',
            }}
          >
            <div className="grid grid-cols-2 gap-5 pt-3 sm:gap-7" onPointerLeave={clearHover}>
              {valueCards.map((card, i) => (
                <PolaroidCard
                  key={card.code}
                  card={card}
                  index={i}
                  active={activeIndex === i}
                  onHover={handleHover}
                  onOpen={handleOpen}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            <span
              className="absolute bottom-5 right-6 font-caveat text-[16px] text-[#8a8a8a] sm:right-8 sm:text-[18px]"
              style={{ transform: 'rotate(3deg)' }}
            >
              klik untuk baca ✎
            </span>
          </div>
        </motion.div>
      </div>

      {/* Postcard detail */}
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
              initial={{ scale: 0.92, opacity: 0, y: 16, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12, rotate: -2 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-white p-4 pb-6"
              style={{ boxShadow: '0 24px 60px rgba(10,10,12,0.35)' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Tape color={popupCard.color} rotate={-3} width={90} height={22} centered className="-top-2.5 left-1/2" />

              <button
                onClick={closePopup}
                className="absolute -right-3 -top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2a2a2a] transition-colors hover:bg-[#2a2a2a] hover:text-white"
                style={{ border: `1px solid ${INK}`, boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex aspect-[4/3] items-center justify-center" style={{ background: PHOTO_BG }}>
                <motion.img
                  src={popupCard.image}
                  alt={popupCard.title}
                  className="w-28 object-contain sm:w-32"
                  loading="eager"
                  decoding="async"
                  animate={reduceMotion ? undefined : { y: [-5, 5, -5] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <div className="relative mt-4 px-1">
                <span
                  className="absolute -top-1 right-0 border-2 px-2 py-1 font-typewriter text-[9px] uppercase tracking-[0.06em] sm:text-[10px]"
                  style={{ borderColor: popupCard.color, color: popupCard.color, transform: 'rotate(-4deg)', background: '#fff' }}
                >
                  {popupCard.badge}
                </span>

                <span className="font-caveat text-[14px] font-bold text-[#b5ab98]">
                  {popupCard.code} · {pad2(valueCards.indexOf(popupCard) + 1)}/{pad2(valueCards.length)}
                </span>
                <h3 className="mt-1 max-w-[70%] font-marker text-[20px] leading-tight text-[#2a2a2a] sm:text-[22px]">{popupCard.title}</h3>
                <p className="mt-1 font-caveat text-[18px] leading-tight text-[#8a8a8a]">{popupCard.subtitle}</p>

                <p className="mt-3 font-poppins text-[13px] leading-relaxed text-[#5a5a5a] sm:text-[14px]">{popupCard.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
