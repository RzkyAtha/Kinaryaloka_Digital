import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon as X } from '@heroicons/react/24/solid'

export const NARA_INTRO =
  'Maskot sekaligus virtual assistant KINARYALOKA. Mereka yang nemenin kamu keliling layanan kami dan bantu jawab pertanyaan sebelum ngobrol sama timnya.'

export const naras = [
  {
    name: 'Kirana',
    role: 'Merencanakan',
    meanings: ['Cahaya', 'Sinar', 'Pancaran'],
    blurb: 'Bisa dimaknai inspirasi yang memunculkan sebuah ide cemerlang.',
    image: '/Assets/nara_02.webp',
    color: '#C8752E',
  },
  {
    name: 'Kriya',
    role: 'Merancang',
    meanings: ['Karya', 'Kerajinan', 'Kreatifitas'],
    blurb: 'Bisa dimaknai sebagai perwujudan ide menjadi sebuah karya nyata.',
    image: '/Assets/nara_01.webp',
    color: '#E8651A',
  },
  {
    name: 'Karsa',
    role: 'Mewujudkan',
    meanings: ['Kemauan', 'Niat', 'Daya Cipta'],
    blurb: 'Bisa dimaknai dorongan agar bisa menjadikan inspirasi ke gagasan.',
    image: '/Assets/nara_03.webp',
    color: '#D4912A',
  },
]

export default function NaraIntro() {
  const [showNara, setShowNara] = useState(false)
  const [active, setActive] = useState(1)
  const current = naras[active]

  return (
    <>
      <motion.button
        onClick={() => setShowNara(true)}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="absolute left-3 top-[30%] z-10 h-16 w-16 cursor-pointer rounded-2xl bg-[#141414] p-2 sm:left-4 sm:h-[72px] sm:w-[72px]"
        style={{ boxShadow: '0 10px 24px rgba(10,10,12,0.4), 0 2px 6px rgba(0,0,0,0.2)' }}
        aria-label="Kenalan sama Nara"
      >
        {/* Bubble tail */}
        <span
          aria-hidden="true"
          className="absolute -bottom-[9px] right-3.5 h-4 w-5 bg-[#141414]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
        />
        <span className="block h-full w-full overflow-hidden rounded-full bg-white">
          <img
            src={naras[2].image}
            alt="Nara"
            className="h-full w-full scale-[1.6] object-cover object-top"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </span>
      </motion.button>

      {/* Nara Popup Modal - character select */}
      <AnimatePresence>
        {showNara && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(5,5,8,0.88)', backdropFilter: 'blur(5px)' }}
              onClick={() => setShowNara(false)}
            />

            {/* Modal - light editorial style */}
            <motion.div
              className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#f7f7f5] p-5 sm:p-7"
              style={{
                border: '1.5px solid rgba(0,0,0,0.08)',
                boxShadow: '0 24px 60px rgba(10,10,12,0.35)',
              }}
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 18 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Blueprint paper grid */}
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(42,42,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.03) 1px, transparent 1px)',
                  backgroundSize: '44px 44px',
                  maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 100%)',
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setShowNara(false)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.05] text-[#8a8a90] transition-all hover:bg-black/10 hover:text-[#141414]"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="relative">
                <span className="block font-poppins text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8a90]">
                  Virtual Assistant
                </span>
                <h3 className="mt-1.5 font-poppins text-[24px] font-extrabold uppercase leading-[0.95] tracking-tight text-[#141414] sm:text-[28px]">
                  <span className="block">Kenalan</span>
                  <span className="block text-[#c6c7ca]">sama Nara</span>
                </h3>
                <p className="mt-2.5 text-justify text-[11px] leading-relaxed text-[#6b6b70]">
                  {NARA_INTRO}
                </p>
              </div>

              {/* Character slots */}
              <div className="relative mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                {naras.map((n, i) => {
                  const isActive = i === active
                  return (
                    <motion.button
                      key={n.name}
                      type="button"
                      onPointerEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      whileTap={{ scale: 0.97 }}
                      className="relative overflow-hidden rounded-xl bg-white px-1 pb-3 pt-3 text-center transition-all duration-300"
                      style={{
                        border: `1.5px solid ${isActive ? n.color : 'rgba(0,0,0,0.08)'}`,
                        boxShadow: isActive
                          ? `0 10px 28px ${n.color}30, 0 2px 8px rgba(0,0,0,0.08)`
                          : '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                      aria-label={`Pilih ${n.name}`}
                      aria-pressed={isActive}
                    >
                      <img
                        src={n.image}
                        alt={n.name}
                        className={`mx-auto h-16 w-auto object-contain transition-all duration-300 sm:h-20 ${
                          isActive ? 'scale-105' : 'opacity-45 grayscale'
                        }`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                      <span
                        className="mt-1.5 block font-poppins text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300"
                        style={{ color: isActive ? n.color : '#8a8a90' }}
                      >
                        {n.name}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Character info panel */}
              <div className="relative mt-3.5 min-h-[108px] rounded-xl border border-black/[0.08] bg-white p-4 sm:p-5">
                <span className="mb-3 block font-poppins text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8a8a90]">
                  Character Info
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-poppins text-[18px] font-bold leading-tight text-[#141414]">
                        {current.name}
                      </span>
                      <span
                        className="font-poppins text-[9px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: current.color }}
                      >
                        {current.role}
                      </span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {current.meanings.map((m) => (
                        <span
                          key={m}
                          className="rounded-md px-2 py-[3px] font-poppins text-[9px] font-semibold uppercase tracking-wider text-white"
                          style={{ background: current.color }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 pt-3 text-[11.5px] leading-relaxed text-[#6b6b70]">
                      {current.blurb}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <div className="relative mt-5 text-center">
                <button
                  onClick={() => setShowNara(false)}
                  className="cursor-pointer rounded-lg bg-[#141414] px-9 py-3.5 font-poppins text-[13px] font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg"
                >
                  Oke, Paham!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
