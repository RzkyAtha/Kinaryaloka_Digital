import { motion, useInView } from 'framer-motion'
import type { TargetAndTransition } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Crosshair, Headphones, ShieldCheck } from 'lucide-react'

const cards = [
  {
    image: '/Assets/kmt90.png',
    icon: Crosshair,
    title: 'Akurasi Desain.',
    subtitle: 'Presisi Tinggi',
    label: '90%',
    description: 'Akurasi produk akhir sesuai dengan design figma.',
    color: '#F5C542',
    gradient: 'from-[#F5C542] to-[#D4912A]',
  },
  {
    image: '/Assets/kmt247.png',
    icon: Headphones,
    title: 'Support Aktif.',
    subtitle: 'Tanpa Batas Waktu',
    label: '24/7',
    description: 'Komunikasi aktif dan support tanpa batas waktu.',
    color: '#0080FF',
    gradient: 'from-[#0080FF] to-[#38BFFF]',
  },
  {
    image: '/Assets/kmt100.png',
    icon: ShieldCheck,
    title: 'Integrasi Penuh.',
    subtitle: 'Sistem Andal',
    label: '100%',
    description: 'Integrasi sistem yang dapat diandalkan sepenuhnya.',
    color: '#00E639',
    gradient: 'from-[#00E639] to-[#66FF8C]',
  },
]

type Pos = 'left' | 'center' | 'right'

function getPos(cardIdx: number, active: number): Pos {
  const n = cards.length
  if (cardIdx === active) return 'center'
  if (cardIdx === (active - 1 + n) % n) return 'left'
  return 'right'
}

const CARD_W = 300
const spring = { type: 'spring' as const, stiffness: 260, damping: 28 }

const positionStyles: Record<Pos, TargetAndTransition> = {
  center: {
    x: 0,
    rotate: 0,
    scale: 1,
    zIndex: 10,
    opacity: 1,
    filter: 'brightness(1) blur(0px)',
    transition: spring,
  },
  left: {
    x: -CARD_W * 0.68,
    rotate: -8,
    scale: 0.85,
    zIndex: 5,
    opacity: 0.7,
    filter: 'brightness(0.6) blur(1px)',
    transition: spring,
  },
  right: {
    x: CARD_W * 0.68,
    rotate: 8,
    scale: 0.85,
    zIndex: 5,
    opacity: 0.7,
    filter: 'brightness(0.6) blur(1px)',
    transition: spring,
  },
}

export default function Team() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  const next = () => setActive((p) => (p + 1) % cards.length)
  const prev = () => setActive((p) => (p - 1 + cards.length) % cards.length)

  return (
    <section id="komitmen" className="bg-[#050510] py-20 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Mesh gradient background (desktop only for performance) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20"
          animate={{ backgroundColor: cards[active].color }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10"
          animate={{ backgroundColor: cards[(active + 1) % cards.length].color }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050510_70%)]" />
      </div>

      {/* Subtle grid pattern (desktop only) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: cards[active].color }}
            animate={{ color: cards[active].color }}
            transition={{ duration: 0.5 }}
          >
            Our Promise
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Komitmen Kami
          </h2>
        </motion.div>

        {/* Carousel wrapper */}
        <motion.div
          className="relative flex items-center justify-center select-none"
          style={{ height: 460 }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Cards */}
          {cards.map((card, i) => {
            const pos = getPos(i, active)
            const isCenter = pos === 'center'
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ width: CARD_W, transformOrigin: 'bottom center', cursor: isCenter ? 'default' : 'pointer' }}
                animate={positionStyles[pos]}
                onClick={() => {
                  if (pos === 'left') prev()
                  if (pos === 'right') next()
                }}
              >
                {/* Card wrapper */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#141416',
                    border: `1px solid ${isCenter ? `${card.color}40` : '#2a2a2a'}`,
                    boxShadow: isCenter
                      ? `0 20px 60px ${card.color}20, 0 8px 32px rgba(0,0,0,0.5)`
                      : '0 12px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Image area */}
                  <div className="relative overflow-hidden" style={{ height: 220 }}>
                    <img
                      src={card.image}
                      alt={card.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* Content area - value card style */}
                  <div className="p-5 relative">
                    {/* Icon + Title + Subtitle row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${card.color}18` }}
                      >
                        <card.icon size={18} style={{ color: card.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm leading-snug">{card.title}</h3>
                        <p className="text-[11px] mt-0.5" style={{ color: '#777' }}>{card.subtitle}</p>
                      </div>
                    </div>


                    {/* Description with left border */}
                    <div className="border-l-2 pl-3" style={{ borderColor: `${card.color}50` }}>
                      <p className="text-[12px] leading-relaxed" style={{ color: '#999' }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Left arrow */}
          <motion.button
            onClick={prev}
            aria-label="Komitmen sebelumnya"
            className="absolute -left-2 md:-left-20 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white/80 border border-white/10 backdrop-blur-md cursor-pointer"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
            whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Right arrow */}
          <motion.button
            onClick={next}
            aria-label="Komitmen berikutnya"
            className="absolute -right-2 md:-right-20 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white/80 border border-white/10 backdrop-blur-md cursor-pointer"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
            whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {cards.map((card, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Lihat komitmen ${card.label}`}
              className="rounded-full cursor-pointer relative"
              animate={{
                width: i === active ? 32 : 8,
                height: 8,
                backgroundColor: i === active ? card.color : 'rgba(255,255,255,0.15)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: card.color, filter: 'blur(6px)', opacity: 0.5 }}
                  layoutId="dot-glow"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
