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

const CORNERS = [
  { pos: 'top-1 left-1', tri: 'polygon(0 0, 100% 0, 0 100%)' },
  { pos: 'top-1 right-1', tri: 'polygon(0 0, 100% 0, 100% 100%)' },
  { pos: 'bottom-1 left-1', tri: 'polygon(0 0, 0 100%, 100% 100%)' },
  { pos: 'bottom-1 right-1', tri: 'polygon(100% 0, 0 100%, 100% 100%)' },
]

export default function NaraIntro() {
  const [showNara, setShowNara] = useState(false)
  const [active, setActive] = useState(1)
  const current = naras[active]

  return (
    <>
      <button
        onClick={() => setShowNara(true)}
        className="w-full py-3 px-5 rounded-2xl font-semibold text-sm md:text-base text-[#ffffff] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
      >
        Tunggu, siapa mereka?
      </button>

      {/* Nara Popup Modal — character select */}
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

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-xl overflow-hidden rounded-3xl p-5 sm:p-7"
              style={{
                background: 'linear-gradient(160deg, #15151d 0%, #0a0a0f 100%)',
                border: '1px solid rgba(245,197,66,0.18)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 0 60px rgba(245,197,66,0.03)',
              }}
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 18 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Scanline texture */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)',
                }}
              />

              {/* P1 tag */}
              <span className="absolute left-4 top-4 font-audiowide text-[10px] tracking-wider text-[#F5C542]/70">
                P1
              </span>

              {/* Close button */}
              <button
                onClick={() => setShowNara(false)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] text-white/50 transition-all hover:bg-white/15 hover:text-white"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="relative text-center">
                <span className="font-poppins text-[9px] font-bold uppercase tracking-[0.3em] text-[#F5C542]">
                  ◄&nbsp; Select Your Assistant &nbsp;►
                </span>
                <h3 className="mt-2 font-audiowide text-[19px] leading-snug text-white sm:text-[23px]">
                  Kenalan sama Nara
                </h3>
                <p className="mx-auto mt-2 max-w-md text-[11.5px] leading-relaxed text-white/45 sm:text-[12.5px]">
                  {NARA_INTRO}
                </p>
              </div>

              {/* Character slots */}
              <div className="relative mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {naras.map((n, i) => {
                  const isActive = i === active
                  return (
                    <motion.button
                      key={n.name}
                      type="button"
                      onPointerEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      whileTap={{ scale: 0.95 }}
                      className="relative overflow-hidden rounded-xl px-1 pb-2.5 pt-3 text-center transition-all duration-300"
                      style={{
                        background: isActive ? `${n.color}1a` : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${isActive ? n.color : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: isActive
                          ? `0 0 22px ${n.color}40, inset 0 0 18px ${n.color}14`
                          : 'none',
                      }}
                      aria-label={`Pilih ${n.name}`}
                    >
                      {/* Corner triangles */}
                      {CORNERS.map((c) => (
                        <span
                          key={c.pos}
                          className={`pointer-events-none absolute h-2.5 w-2.5 ${c.pos} transition-opacity duration-300`}
                          style={{ background: n.color, clipPath: c.tri, opacity: isActive ? 1 : 0 }}
                        />
                      ))}

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
                        className="mt-1.5 block font-audiowide text-[10px] uppercase tracking-wider sm:text-[11px] transition-colors duration-300"
                        style={{ color: isActive ? n.color : 'rgba(255,255,255,0.35)' }}
                      >
                        {n.name}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Character info panel */}
              <div className="relative mt-3.5 min-h-[108px] rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <span className="absolute -top-2 left-3 bg-[#101016] px-2 font-poppins text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
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
                      <span className="font-audiowide text-base sm:text-lg" style={{ color: current.color }}>
                        {current.name}
                      </span>
                      <span
                        className="font-poppins text-[9px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: current.color }}
                      >
                        {current.role}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {current.meanings.map((m) => (
                        <span
                          key={m}
                          className="rounded-md px-2 py-[3px] font-poppins text-[9px] font-semibold uppercase tracking-wider"
                          style={{
                            background: `${current.color}1f`,
                            color: current.color,
                            border: `1px solid ${current.color}38`,
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <p className="mt-2.5 text-[11px] leading-relaxed text-white/50">{current.blurb}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <div className="relative mt-5 text-center">
                <button
                  onClick={() => setShowNara(false)}
                  className="rounded-lg px-8 py-2.5 font-poppins text-sm font-bold uppercase tracking-wider text-[#141414] transition-all duration-200 hover:scale-105 active:translate-y-[2px]"
                  style={{
                    background: 'linear-gradient(135deg, #F5C542, #D4912A)',
                    boxShadow: '0 4px 0 #8a5a12, 0 0 20px rgba(245,197,66,0.25)',
                  }}
                >
                  Oke, paham! ▶
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
