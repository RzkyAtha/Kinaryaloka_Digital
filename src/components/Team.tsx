import { motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight,
} from '@heroicons/react/24/solid'

const ACCENT = '#F5C542'

type Suit = 'spade' | 'club' | 'diamond'

type CommitmentCard = {
  image: string
  rank: string
  suit: Suit
  ink: string
  stage: string
  title: string
  subtitle: string
  description: string
  points: string[]
}

const cards: CommitmentCard[] = [
  {
    image: '/Assets/desain_sip.webp',
    rank: 'A',
    suit: 'spade',
    ink: '#141414',
    stage: 'Tahap 1',
    title: 'Desain',
    subtitle: 'Presisi Tinggi',
    description: 'Akurasi produk akhir sesuai dengan design figma.',
    points: ['Handoff figma ke kode 1:1', 'Responsif di semua ukuran layar', 'Revisi visual sampai pas'],
  },
  {
    image: '/Assets/support_sip.webp',
    rank: 'K',
    suit: 'club',
    ink: '#141414',
    stage: 'Tahap 2',
    title: 'Support',
    subtitle: 'Tanpa Batas Waktu',
    description: 'Komunikasi aktif dan support tanpa batas waktu.',
    points: ['Kanal komunikasi langsung', 'Respons cepat saat kendala', 'Pendampingan setelah rilis'],
  },
  {
    image: '/Assets/db_sip.webp',
    rank: 'Q',
    suit: 'diamond',
    ink: '#C62828',
    stage: 'Tahap 3',
    title: 'Tools',
    subtitle: 'Praktis & Custom',
    description: 'Tools bisnis praktis yang langsung bisa dipakai, tanpa perlu database rumit.',
    points: ['Tools custom sesuai kebutuhan', 'Tanpa setup teknis yang ribet', 'Langsung bisa dipakai tim'],
  },
]

type Pos = 'left' | 'center' | 'right'

const CARD_W = 260
const CARD_H = 364

function getPos(cardIdx: number, active: number): Pos {
  const n = cards.length
  if (cardIdx === active) return 'center'
  if (cardIdx === (active - 1 + n) % n) return 'left'
  return 'right'
}

/* Side-card offset in px: tighter on small viewports so side cards only peek */
function sideOffset(vw: number): number {
  return Math.round(Math.min(CARD_W * 0.62, Math.max(CARD_W * 0.36, vw * 0.28)))
}

function deckTransform(pos: Pos, sideX: number): string {
  switch (pos) {
    case 'left':
      return `translateX(${-sideX}px) translateY(26px) rotate(-9deg) scale(0.9)`
    case 'right':
      return `translateX(${sideX}px) translateY(26px) rotate(9deg) scale(0.9)`
    default:
      return 'translateX(0px) translateY(0px) rotate(0deg) scale(1)'
  }
}

const deckZ: Record<Pos, number> = { left: 5, center: 10, right: 5 }

/* GPU-composited via WAAPI - immune to prefers-reduced-motion CSS overrides,
   no per-frame JS like spring libraries. */
const DECK_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* Suit glyphs - viewBox 0 0 100 110 */
function SuitShapes({ suit }: { suit: Suit }) {
  if (suit === 'diamond') {
    return <path d="M50 8 L88 55 L50 102 L12 55 Z" />
  }
  if (suit === 'club') {
    return (
      <>
        <circle cx="50" cy="30" r="20" />
        <circle cx="30" cy="62" r="20" />
        <circle cx="70" cy="62" r="20" />
        <path d="M50 56 C55 76 47 90 38 102 L62 102 C53 90 45 76 50 56 Z" />
      </>
    )
  }
  return (
    <path d="M50 8 C50 8 14 44 14 62 C14 79 28 89 42 82 C40 92 34 99 28 102 L72 102 C66 99 60 92 58 82 C72 89 86 79 86 62 C86 44 50 8 50 8 Z" />
  )
}

function SuitGlyph({ suit, ink, className }: { suit: Suit; ink: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 110" className={className} fill={ink} aria-hidden="true">
      <SuitShapes suit={suit} />
    </svg>
  )
}

function CornerPip({ card, rotated }: { card: CommitmentCard; rotated?: boolean }) {
  return (
    <div
      className={`absolute z-20 flex flex-col items-center leading-none ${rotated ? 'bottom-3 right-3 rotate-180' : 'left-3 top-3'}`}
      style={{ color: card.ink }}
    >
      <span className="font-poppins text-[24px] font-extrabold leading-none">{card.rank}</span>
      <SuitGlyph suit={card.suit} ink={card.ink} className="mt-1 h-[14px] w-[13px]" />
    </div>
  )
}

/** Ilustrasi produk tampil utuh, melayang di tengah kartu dengan ghost suit pucat di belakang */
function SuitArt({ card }: { card: CommitmentCard }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <SuitGlyph
        suit={card.suit}
        ink={card.ink}
        className="absolute h-[92%] opacity-[0.06]"
      />
      <img
        src={card.image}
        alt={card.title}
        className="relative z-10 h-full w-full scale-[1.1] object-contain"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}

export default function Team() {
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState<number | null>(null)
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280))
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const innerRefs = useRef<Array<HTMLDivElement | null>>([])
  const prevFlipped = useRef<number | null>(null)

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const sideX = sideOffset(vw)

  // Deck position animation - WAAPI reads the live computed transform,
  // so interrupting mid-flight still animates smoothly.
  useLayoutEffect(() => {
    cards.forEach((_, i) => {
      const el = cardRefs.current[i]
      if (!el) return
      const pos = getPos(i, active)
      const target = deckTransform(pos, sideX)
      const cs = getComputedStyle(el)
      if (cs.transform === 'none') {
        el.style.transform = target
        el.style.opacity = pos === 'center' ? '1' : '0.55'
        return
      }
      el.animate(
        [
          { transform: cs.transform, opacity: cs.opacity },
          { transform: target, opacity: pos === 'center' ? '1' : '0.55' },
        ],
        { duration: 520, easing: DECK_EASE, fill: 'forwards' }
      )
    })
  }, [active, sideX])

  // Flip animation - same WAAPI approach
  useLayoutEffect(() => {
    if (prevFlipped.current === flipped) return
    const prev = prevFlipped.current
    prevFlipped.current = flipped
    const idx = flipped ?? prev
    if (idx === null) return
    const el = innerRefs.current[idx]
    if (!el) return
    const current = getComputedStyle(el).transform
    el.animate(
      [
        { transform: current === 'none' ? 'rotateY(0deg)' : current },
        { transform: `rotateY(${flipped === idx ? 180 : 0}deg)` },
      ],
      { duration: 560, easing: DECK_EASE, fill: 'forwards' }
    )
  }, [flipped])

  const go = (dir: 1 | -1) => {
    setFlipped(null)
    setActive((p) => (p + dir + cards.length) % cards.length)
  }

  return (
    <section id="komitmen" className="bg-[#050510] py-20 md:py-32 relative overflow-hidden">
      {/* Mesh gradient background (desktop only for performance) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20"
          style={{ backgroundColor: ACCENT }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10"
          style={{ backgroundColor: ACCENT }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050510_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-climate text-[30px] md:text-[48px] text-white tracking-tight">
            Komitmen Kami
          </h2>
          <p className="mt-3 text-[12px] md:text-[13px] text-white/40">
            Klik kartu untuk membalik dan melihat detailnya.
          </p>
        </div>

        {/* -- Card deck - CSS-composited transitions, no per-frame JS -- */}
        <div
          className="relative flex items-center justify-center select-none"
          style={{ height: CARD_H + 90, perspective: 1400 }}
        >
          {cards.map((card, i) => {
            const pos = getPos(i, active)
            const isCenter = pos === 'center'


            return (
              <div
                key={card.title}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformOrigin: 'bottom center',
                  marginTop: -CARD_H / 2,
                  marginLeft: -CARD_W / 2,
                  willChange: 'transform',
                  zIndex: deckZ[pos],
                }}
              >
                <div
                  ref={(el) => {
                    innerRefs.current[i] = el
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={card.title}
                  className="relative h-full w-full cursor-pointer outline-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      go(pos === 'left' ? -1 : 1)
                      return
                    }
                    setFlipped((p) => (p === i ? null : i))
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setFlipped((p) => (p === i ? null : i))
                    }
                  }}
                >
                  {/* -- Front face - playing card -- */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[16px] bg-[#F0F0F0]"
                    style={{
                      backfaceVisibility: 'hidden',
                      border: '1px solid rgba(0,0,0,0.14)',
                      boxShadow: isCenter
                        ? '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.2), 0 0 44px rgba(245,197,66,0.2)'
                        : '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* faint inner card edge */}
                    <div className="pointer-events-none absolute inset-[5px] rounded-[12px] border border-black/[0.06]" />

                    <CornerPip card={card} />
                    <CornerPip card={card} rotated />

                    {/* center artwork */}
                    <div className="absolute inset-x-6 bottom-14 top-11">
                      <SuitArt card={card} />
                    </div>

                    {/* bottom caption */}
                    <div className="absolute inset-x-0 bottom-3 z-20 text-center">
                      <span className="font-poppins text-[7px] font-semibold uppercase tracking-[0.22em] text-[#9a9a9e]">
                        {card.stage} · {card.title} · {card.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* -- Back face - card back / detail -- */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[16px] bg-[#F0F0F0]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      border: '1px solid rgba(0,0,0,0.14)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 44px rgba(245,197,66,0.2)',
                    }}
                  >
                    {/* lattice pattern like a card back */}
                    <div
                      className="pointer-events-none absolute inset-[5px] rounded-[12px]"
                      style={{
                        border: `1.5px solid ${card.ink}`,
                        backgroundImage: `repeating-linear-gradient(45deg, ${card.ink}14 0 5px, transparent 5px 10px), repeating-linear-gradient(-45deg, ${card.ink}14 0 5px, transparent 5px 10px)`,
                      }}
                    />

                    <div className="relative z-10 flex h-full flex-col px-4 py-4">
                      <div className="flex items-center gap-2">
                        <SuitGlyph suit={card.suit} ink={card.ink} className="h-[18px] w-[16px]" />
                        <div className="min-w-0">
                          <h3 className="truncate font-poppins text-[14px] font-extrabold leading-tight text-[#141414]">
                            {card.title}
                          </h3>
                          <p className="font-poppins text-[7px] font-semibold uppercase tracking-[0.2em] text-[#8a8a90]">
                            {card.stage} · {card.subtitle}
                          </p>
                        </div>
                        <span
                          className="ml-auto font-poppins text-[16px] font-extrabold leading-none"
                          style={{ color: card.ink }}
                        >
                          {card.rank}
                        </span>
                      </div>

                      <p className="mt-3 rounded-md border border-black/[0.08] bg-white/70 px-3 py-2 text-[10.5px] italic leading-relaxed text-[#55555a]">
                        {card.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {card.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 border-t border-black/[0.08] pt-2 text-[11px] font-medium leading-snug text-[#3a3a3e] first:border-t-0 first:pt-0"
                          >
                            <SuitGlyph suit={card.suit} ink={card.ink} className="mt-[1px] h-[11px] w-[10px] shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex items-center justify-between border-t border-black/[0.08] pt-2 font-poppins text-[6.5px] font-semibold uppercase tracking-[0.16em] text-[#9a9a9e]">
                        <span>Klik untuk kembali</span>
                        <span>
                          {String(i + 1).padStart(3, '0')}/{String(cards.length).padStart(3, '0')} KNR
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Arrows */}
          <motion.button
            onClick={() => go(-1)}
            aria-label="Kartu sebelumnya"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            className="absolute left-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm hover:text-white md:-left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={() => go(1)}
            aria-label="Kartu berikutnya"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            className="absolute right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm hover:text-white md:-right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {cards.map((card, i) => (
            <button
              key={card.title}
              onClick={() => {
                setFlipped(null)
                setActive(i)
              }}
              aria-label={`Lihat kartu ${card.title}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 32 : 8,
                height: 8,
                backgroundColor: i === active ? ACCENT : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
