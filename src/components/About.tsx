import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useRef } from 'react'
import NaraIntro from './NaraIntro'

type ValueCard = {
  title: string
  subtitle: string
  badge: string
  description: string
  color: string
  image: string
  /** Card art poster - tipografi + ilustrasi sudah baked-in */
  art: string
  code: string
}

const valueCards: ValueCard[] = [
  {
    title: 'PARTNER HANDAL',
    subtitle: 'Hubungan Jangka Panjang',
    badge: 'Support Berkelanjutan',
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#CA6029',
    image: '/Assets/hand.webp',
    art: '/Assets/PH.webp',
    code: 'Selalu Ada',
  },
  {
    title: 'TEPAT SASARAN',
    subtitle: 'Solusi yang Relevan',
    badge: 'Riset Dulu, Baru Bangun',
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#A42D25',
    image: '/Assets/checklist.webp',
    art: '/Assets/ST.webp',
    code: 'Selalu Sesuai',
  },
  {
    title: 'SIAP PAKAI',
    subtitle: 'Praktis & Fungsional',
    badge: 'Tanpa Ribet Teknis',
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#26537E',
    image: '/Assets/comp.webp',
    art: '/Assets/LT.webp',
    code: 'Selalu Efisien',
  },
  {
    title: 'RINICAN AKURAT',
    subtitle: 'Tanpa Biaya Tersembunyi',
    badge: 'Harga & Progress Jelas',
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#1AA5AA',
    image: '/Assets/invoice.webp',
    art: '/Assets/RA.webp',
    code: 'Selalu Terbuka',
  },
]

function ValueTile({
  card,
  active,
  onHoverStart,
  onHoverEnd,
  onToggle,
}: {
  card: ValueCard
  active: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onToggle: () => void
}) {
  // Track pointer type: mouse uses hover, touch/pen uses tap-to-toggle
  const lastPointer = useRef('mouse')
  return (
    <motion.button
      type="button"
      onPointerDown={(e) => { lastPointer.current = e.pointerType }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHoverStart() }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') onHoverEnd() }}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={() => { if (lastPointer.current !== 'mouse') onToggle() }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative block w-full overflow-hidden rounded-xl bg-white text-left outline-none aspect-[2488/2468]"
      style={{
        border: `1.5px solid ${active ? card.color : 'rgba(0,0,0,0.08)'}`,
        boxShadow: active ? `0 10px 28px ${card.color}2e, 0 2px 8px rgba(0,0,0,0.06)` : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'border-color 300ms ease, box-shadow 300ms ease',
      }}
      aria-label={`${card.title} - ${card.badge}`}
      aria-pressed={active}
    >
      {/* Card = poster penuh (tipografi + ilustrasi baked-in) */}
      <img
        src={card.art}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Active state - sticker + detail overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7f7f5] px-3 py-4 text-center sm:px-4"
          >
            {/* Blueprint paper grid - same texture as the section */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(42,42,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.035) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
            <motion.img
              src={card.image}
              alt=""
              initial={{ scale: 0.6, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="relative w-32 object-contain sm:w-40"
              style={{ filter: `drop-shadow(0 10px 16px ${card.color}40)` }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <h4
              className="relative mt-2 font-gasoek text-xl leading-tight sm:text-2xl"
              style={{ color: card.color }}
            >
              {card.title}
            </h4>
            <p className="relative mt-1.5 line-clamp-2 text-[9px] leading-snug text-[#6b6b70] sm:line-clamp-3 sm:text-[10px]">
              {card.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleHover = useCallback((index: number) => setActiveIndex(index), [])
  const clearHover = useCallback(() => setActiveIndex(-1), [])
  const handleToggle = useCallback(
    (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index)),
    []
  )

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
        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Identity column - rocket illustration + Nara intro trigger */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-3xl">
              <img
                src="/Assets/roket_illust.webp"
                alt="Kami Bantu Perkuat Identitas Brandmu."
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
              <NaraIntro />
            </div>
          </div>

          {/* Value tiles 2x2 */}
          <div className="grid content-start grid-cols-2 gap-3 sm:gap-5" onPointerLeave={clearHover}>
            {valueCards.map((card, i) => (
              <ValueTile
                key={card.code}
                card={card}
                active={activeIndex === i}
                onHoverStart={() => handleHover(i)}
                onHoverEnd={clearHover}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[640px] text-center text-[11px] leading-relaxed text-[#9a9a9a] sm:text-xs">
          Interaktif: arahkan kursor atau sentuh tiap kartu untuk melihat detail dari setiap upaya kami.
        </p>
      </div>
    </section>
  )
}
