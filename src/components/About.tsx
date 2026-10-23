import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { XMarkIcon as X } from '@heroicons/react/24/solid'
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
    title: 'Partner, Bukan Vendor.',
    subtitle: 'Hubungan Jangka Panjang',
    badge: 'Support Berkelanjutan',
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#CA6029',
    image: '/Assets/partner_vendor.webp',
    art: '/Assets/PH.webp',
    code: 'Selalu Ada',
  },
  {
    title: 'Tepat Sasaran.',
    subtitle: 'Solusi yang Relevan',
    badge: 'Riset Dulu, Baru Bangun',
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#A42D25',
    image: '/Assets/tepatsasaran.webp',
    art: '/Assets/ST.webp',
    code: 'Selalu Sesuai',
  },
  {
    title: 'Langsung Kepakai.',
    subtitle: 'Praktis & Fungsional',
    badge: 'Tanpa Ribet Teknis',
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#26537E',
    image: '/Assets/langsungkepakai.webp',
    art: '/Assets/LT.webp',
    code: 'Selalu Efisien',
  },
  {
    title: 'Transparan & Jelas.',
    subtitle: 'Tanpa Biaya Tersembunyi',
    badge: 'Harga & Progress Jelas',
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#1AA5AA',
    image: '/Assets/harga_jelas.webp',
    art: '/Assets/RA.webp',
    code: 'Selalu Terbuka',
  },
]

function ValueTile({
  card,
  active,
  onHover,
  onOpen,
}: {
  card: ValueCard
  active: boolean
  onHover: () => void
  onOpen: () => void
}) {
  return (
    <motion.button
      type="button"
      onPointerEnter={onHover}
      onFocus={onHover}
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative block w-full overflow-hidden rounded-xl bg-white text-left outline-none aspect-[2488/2468]"
      style={{
        border: `1.5px solid ${active ? card.color : 'rgba(0,0,0,0.08)'}`,
        boxShadow: active ? `0 10px 28px ${card.color}2e, 0 2px 8px rgba(0,0,0,0.06)` : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'border-color 300ms ease, box-shadow 300ms ease',
      }}
      aria-label={`${card.title} - ${card.badge}`}
    >
      {/* Card = poster penuh (tipografi + ilustrasi baked-in) */}
      <img
        src={card.art}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
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
                onHover={() => handleHover(i)}
                onOpen={() => handleOpen(i)}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[640px] text-center text-[11px] leading-relaxed text-[#9a9a9a] sm:text-xs">
          Interaktif: arahkan kursor ke tiap kartu untuk melihat detailnya, lalu klik kartu untuk membaca
          detail dari setiap upaya kami.
        </p>
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
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 18 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm overflow-hidden rounded-xl bg-white p-5 sm:p-6"
              style={{
                border: `1.5px solid ${popupCard.color}`,
                boxShadow: `0 24px 60px rgba(10,10,12,0.35), 0 10px 28px ${popupCard.color}2e`,
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.05] text-[#8a8a90] transition-all hover:bg-black/10 hover:text-[#141414]"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="flex items-center gap-2 pr-10">
                  <span
                    className="font-poppins text-[10px] font-semibold uppercase tracking-[0.24em]"
                    style={{ color: popupCard.color }}
                  >
                    {popupCard.code}
                  </span>
                </div>

                <div className="relative flex items-center justify-center py-6">
                  <img
                    src={popupCard.image}
                    alt={popupCard.title}
                    className="relative w-28 object-contain sm:w-32"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                <span
                  className="block font-poppins text-[10px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: popupCard.color }}
                >
                  {popupCard.badge}
                </span>
                <h3 className="mt-1.5 font-poppins text-[19px] font-bold leading-snug text-[#141414] sm:text-[21px]">
                  {popupCard.title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[#6b6b70]">{popupCard.subtitle}</p>

                <div className="mt-4 border-t border-black/10 pt-3">
                  <p className="text-[13px] leading-relaxed text-[#3a3a3e] sm:text-[14px]">
                    {popupCard.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
