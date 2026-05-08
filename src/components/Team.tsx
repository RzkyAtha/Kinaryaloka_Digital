import { motion, useInView } from 'framer-motion'
import type { TargetAndTransition } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const cards = [
  {
    image: '/Assets/kmt90.png',
    label: '90%',
    description: 'Akurasi produk akhir sesuai dengan design figma.',
    color: '#831449',
  },
  {
    image: '/Assets/kmt247.png',
    label: '24/7',
    description: 'Komunikasi aktif dan support tanpa batas waktu.',
    color: '#004896',
  },
  {
    image: '/Assets/kmt100.png',
    label: '100%',
    description: 'Integrasi sistem yang dapat diandalkan sepenuhnya.',
    color: '#207224',
  },
]

type Pos = 'left' | 'center' | 'right'

function getPos(cardIdx: number, active: number): Pos {
  const n = cards.length
  if (cardIdx === active) return 'center'
  if (cardIdx === (active - 1 + n) % n) return 'left'
  return 'right'
}

const CARD_W = 280
const spring = { type: 'spring' as const, stiffness: 280, damping: 26 }

const positionStyles: Record<Pos, TargetAndTransition> = {
  center: {
    x: 0,
    rotate: 0,
    scale: 1,
    zIndex: 10,
    opacity: 1,
    filter: 'brightness(1)',
    transition: spring,
  },
  left: {
    x: -CARD_W * 0.62,
    rotate: -13,
    scale: 0.82,
    zIndex: 5,
    opacity: 0.88,
    filter: 'brightness(0.75)',
    transition: spring,
  },
  right: {
    x: CARD_W * 0.62,
    rotate: 13,
    scale: 0.82,
    zIndex: 5,
    opacity: 0.88,
    filter: 'brightness(0.75)',
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
    <section id="komitmen" className="bg-black py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Ambient glow — changes with active card */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        animate={{ backgroundColor: cards[active].color + '22' }}
        transition={{ duration: 0.6 }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Komitmen Kami
        </motion.h2>

        {/* Carousel wrapper */}
        <motion.div
          className="relative flex items-center justify-center select-none"
          style={{ height: 420 }}
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
                {/* Card body */}
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    backgroundColor: '#111',
                    boxShadow: isCenter
                      ? `0 20px 60px ${card.color}55, 0 4px 24px rgba(0,0,0,0.5)`
                      : '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Image area */}
                  <div className="overflow-hidden" style={{ height: 280 }}>
                    <img
                      src={card.image}
                      alt={card.label}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Label panel */}
                  <motion.div
                    className="px-5 py-4"
                    style={{ backgroundColor: card.color }}
                    animate={{ backgroundColor: card.color }}
                  >
                    <p className="text-white font-bold text-2xl mb-1">{card.label}</p>
                    <p className="text-white/85 text-sm leading-relaxed">{card.description}</p>
                  </motion.div>
                </div>

                {/* Active card top glow ring */}
                {isCenter && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${card.color}70` }}
                    layoutId="card-ring"
                    transition={spring}
                  />
                )}
              </motion.div>
            )
          })}

          {/* Left arrow */}
          <motion.button
            onClick={prev}
            className="absolute -left-4 md:-left-16 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/20 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Right arrow */}
          <motion.button
            onClick={next}
            className="absolute -right-4 md:-right-16 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/20 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {cards.map((card, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full"
              animate={{
                width: i === active ? 28 : 8,
                height: 8,
                backgroundColor: i === active ? card.color : '#333',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
