import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
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
const BRAND_GRADIENT = 'linear-gradient(135deg, #F5C542, #E5A830, #D4912A)'

const processSteps = [
  { code: 'Pertama', label: 'Dengar & Riset', note: 'Pahami cara bisnis berjalan di lapangan.' },
  { code: 'Lalu kita', label: 'Rancang Blueprint', note: 'Susun alur, identitas, dan prioritas.' },
  { code: 'Dilanjutkan dengan', label: 'Bangun Bertahap', note: 'Eksekusi rapi, bisa dipantau tiap langkah.' },
  { code: 'Tidak lupa juga', label: 'Dampingi Jalan', note: 'Support setelah rilis, bukan ditinggal.' },
]

function BlueprintFrame({ accent, active }: { accent: string; active: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <g
        fill="none"
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="3 4"
        vectorEffect="non-scaling-stroke"
        style={{ opacity: active ? 0.18 : 0.07, transition: 'opacity 400ms ease' }}
      >
        <line x1="0" y1="24" x2="100" y2="24" />
        <line x1="0" y1="76" x2="100" y2="76" />
        <line x1="16" y1="0" x2="16" y2="100" />
        <line x1="84" y1="0" x2="84" y2="100" />
      </g>
      <g
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        style={{ opacity: active ? 0.45 : 0.16, transition: 'opacity 400ms ease' }}
      >
        <path d="M3,10 L3,3 L10,3" />
        <path d="M90,3 L97,3 L97,10" />
        <path d="M97,90 L97,97 L90,97" />
        <path d="M10,97 L3,97 L3,90" />
      </g>
    </svg>
  )
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
  const meta = (
    <div className="relative flex items-center gap-3">
      <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: card.color }}>
        {card.code}
      </span>
    </div>
  )

  const visual = (
    <div className="relative flex min-h-0 flex-1 items-center justify-center py-2 sm:py-4">
      <span
        className="absolute rounded-full blur-2xl"
        style={{ width: '52%', height: '52%', background: `${card.color}0b` }}
      />
      <motion.div
        className="relative w-[62px] max-w-full sm:w-24"
        animate={active ? { y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] } : { y: 0, rotate: 0 }}
        transition={{ duration: 5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          decoding="async"
          className="relative block w-full object-contain"
          style={{ filter: `drop-shadow(0 8px 14px rgba(42,42,42,0.10))` }}
        />

        {active &&
          GLITCH_LAYERS.map((layer) => (
            <motion.span
              key={layer.tint}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block"
              style={{
                background: layer.tint,
                mixBlendMode: 'multiply',
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

        {/* Scanline sweep */}
        {active && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.span
              className="absolute inset-x-0 top-0 block h-[3px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.color}80, transparent)`,
                willChange: 'transform, opacity',
              }}
              animate={{ y: [4, 104], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.7, ease: 'linear' }}
            />
          </span>
        )}
      </motion.div>
    </div>
  )

  const readMore = (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold sm:text-[11px]" style={{ color: card.color }}>
      Baca detail
      <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  )

  const idleBody = (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="relative flex min-h-0 flex-1 items-center justify-center py-3 sm:py-5">
        <img
          src={card.idleImage}
          alt={card.policeText}
          loading="lazy"
          decoding="async"
          className="relative max-h-[74px] w-auto max-w-[82%] object-contain sm:max-h-[118px]"
        />
      </div>
      <div className="relative mt-auto">{readMore}</div>
    </div>
  )

  const copy = (
    <div className="relative mt-auto space-y-1.5">
      <span
        className="block text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px]"
        style={{ color: card.color }}
      >
        {card.badge}
      </span>
      <h3 className="font-poppins text-[13px] font-bold leading-snug text-[#2a2a2a] sm:text-[17px]">{card.title}</h3>
      <p className="text-[10px] leading-relaxed text-[#8a8a8a] sm:text-[12px]">{card.subtitle}</p>
      <span className="pt-1">{readMore}</span>
    </div>
  )

  return (
    <motion.button
      type="button"
      onPointerEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full min-h-[178px] overflow-hidden rounded-2xl bg-white p-3.5 text-left outline-none sm:min-h-[252px] sm:rounded-3xl sm:p-6"
      style={{
        border: `1px solid ${active ? `${card.color}45` : 'rgba(42,42,42,0.08)'}`,
        boxShadow: active ? `0 10px 22px rgba(42,42,42,0.07)` : '0 2px 12px rgba(42,42,42,0.04)',
        transition: 'border-color 350ms ease, box-shadow 350ms ease',
      }}
      aria-label={`${card.title} — ${card.badge}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(100% 70% at 50% 2%, ${card.color}07, transparent 62%)`,
          opacity: active ? 1 : 0,
        }}
      />
      <BlueprintFrame accent={card.color} active={active} />

      {/* Ghost marquee — selalu berjalan, menguat saat kartu aktif */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-3 overflow-hidden transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((k) => (
            <span
              key={k}
              className="whitespace-nowrap px-3 text-[26px] font-black leading-none tracking-[0.16em] sm:text-[32px]"
              style={{ color: `${card.color}12` }}
            >
              {Array(5).fill(`${card.policeText} \u2022 `).join('')}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative flex h-full w-full flex-col">
        {meta}
        {/* Fixed-size stage: both states are absolutely stacked so the tile never resizes */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
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
                {visual}
                {copy}
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
                {idleBody}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
          {/* Identity tile */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8"
            style={{ border: '1px solid rgba(42,42,42,0.08)', boxShadow: '0 2px 12px rgba(42,42,42,0.05)' }}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage: 'url(/Assets/doodle_tech_art.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.05,
              }}
            />
            <BlueprintFrame accent={BRAND_ACCENT} active={false} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(110% 80% at 12% 0%, ${BRAND_ACCENT}0d, transparent 62%)` }}
            />

            <div className="relative flex h-full flex-col">
              <h2 className="mt-5 font-climate text-[21px] leading-[1.25] sm:text-[27px] md:text-[31px]">
                <span className="block text-[#2a2a2a]">Bukan Agency Biasa.</span>
                <span
                  className="block"
                  style={{
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Partner yang Ngerti
                </span>
                <span className="block text-[#2a2a2a]">Bisnis Kamu.</span>
              </h2>

              <p className="mt-4 text-justify text-[13px] leading-[1.75] text-[#5a5a5a] sm:text-[14px]">
                KINARYALOKA Digital Studio lahir dari satu pemahaman: kebanyakan UMKM bukan tidak mau digital, tetapi
                tidak tahu mulai dari mana atau sudah coba tapi hasilnya tidak kepakai. Kami duduk bareng kamu,
                pelajari cara bisnismu berjalan, lalu terjemahkan ke sistem digital yang rapi dan bisa dikontrol.
              </p>

              {/* Process spec sheet */}
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#2a2a2a]/[0.10]">
                {processSteps.map((step, i) => (
                  <div key={step.code} className="group/step bg-white p-3.5 transition-colors duration-300 hover:bg-[#fafafa]">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] font-bold tracking-[0.14em]"
                        style={{ color: valueCards[i % valueCards.length].color }}
                      >
                        {step.code}
                      </span>
                      <span className="h-px flex-1" style={{ background: 'rgba(42,42,42,0.12)' }} />
                    </div>
                    <p className="mt-1.5 text-[12px] font-bold text-[#2a2a2a] sm:text-[13px]">{step.label}</p>
                    <p className="text-[10.5px] leading-relaxed text-[#8f8f8f] sm:text-[11px]">{step.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Value tiles 2x2 */}
          <div className="grid h-full auto-rows-fr grid-cols-2 gap-3 sm:gap-5" onPointerLeave={clearHover}>
            {valueCards.map((card, i) => (
              <ValueTile
                key={card.code}
                card={card}
                index={i}
                active={activeIndex === i}
                onHover={handleHover}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[640px] text-center text-[11px] leading-relaxed text-[#9a9a9a] sm:text-xs">
          Interaktif: arahkan kursor ke tiap kartu untuk melihat blueprint-nya menyala, lalu klik kartu untuk membaca
          detail dari setiap upaya kami.
        </p>
      </div>

      {/* Blueprint detail sheet */}
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
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 18 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-5 sm:p-6"
              style={{
                border: `1px solid ${popupCard.color}45`,
                boxShadow: '0 24px 60px rgba(10,10,12,0.35)',
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(100% 70% at 50% 2%, ${popupCard.color}07, transparent 62%)` }}
              />
              <BlueprintFrame accent={popupCard.color} active />

              <button
                onClick={closePopup}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a]/[0.06] text-[#8a8a8a] transition-all hover:bg-[#2a2a2a]/10 hover:text-[#2a2a2a]"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="flex items-center gap-3 pr-10">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: popupCard.color }}
                  >
                    {popupCard.code}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#bdbdbd]">
                    {String(valueCards.indexOf(popupCard) + 1).padStart(2, '0')}/
                    {String(valueCards.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative flex items-center justify-center py-6">
                  <span
                    className="absolute rounded-full blur-2xl"
                    style={{ width: '52%', height: '52%', background: `${popupCard.color}0b` }}
                  />
                  <motion.img
                    src={popupCard.image}
                    alt={popupCard.title}
                    className="relative w-28 object-contain sm:w-32"
                    loading="eager"
                    decoding="async"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: 'drop-shadow(0 8px 14px rgba(42,42,42,0.10))' }}
                  />
                </div>

                <span
                  className="block text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: popupCard.color }}
                >
                  {popupCard.badge}
                </span>
                <h3 className="mt-1.5 font-poppins text-[19px] font-bold leading-snug text-[#2a2a2a] sm:text-[21px]">
                  {popupCard.title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[#8a8a8a]">{popupCard.subtitle}</p>

                <div className="mt-4 border-l-2 pl-3" style={{ borderColor: `${popupCard.color}45` }}>
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
