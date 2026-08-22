import { motion } from 'framer-motion'
import type { TargetAndTransition } from 'framer-motion'
import { useState } from 'react'
import {
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight,
  PaintBrushIcon,
  FaceSmileIcon,
  ServerStackIcon,
} from '@heroicons/react/24/solid'
import type { ComponentType, SVGProps } from 'react'

const ACCENT = '#F5C542'

type CommitmentCard = {
  image: string
  rank: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  hp: string
  stage: string
  title: string
  subtitle: string
  description: string
  attacks: string[]
  points: string[]
}

const cards: CommitmentCard[] = [
  {
    image: '/Assets/desain_sip.webp',
    rank: 'A',
    Icon: PaintBrushIcon,
    hp: '330',
    stage: 'Tahap 1',
    title: 'Desain',
    subtitle: 'Presisi Tinggi',
    description: 'Akurasi produk akhir sesuai dengan design figma.',
    attacks: ['Handoff Figma 1:1', 'Responsif Semua Layar'],
    points: ['Handoff figma ke kode 1:1', 'Responsif di semua ukuran layar', 'Revisi visual sampai pas'],
  },
  {
    image: '/Assets/support_sip.webp',
    rank: 'K',
    Icon: FaceSmileIcon,
    hp: '280',
    stage: 'Tahap 2',
    title: 'Support',
    subtitle: 'Tanpa Batas Waktu',
    description: 'Komunikasi aktif dan support tanpa batas waktu.',
    attacks: ['Kanal Komunikasi Langsung', 'Respons Cepat Kendala'],
    points: ['Kanal komunikasi langsung', 'Respons cepat saat kendala', 'Pendampingan setelah rilis'],
  },
  {
    image: '/Assets/db_sip.webp',
    rank: 'Q',
    Icon: ServerStackIcon,
    hp: '300',
    stage: 'Tahap 3',
    title: 'Integrasi',
    subtitle: 'Sistem Andal',
    description: 'Integrasi sistem yang dapat diandalkan sepenuhnya.',
    attacks: ['Database Rapi Terstruktur', 'Koneksi Antar Tool'],
    points: ['Database rapi dan terstruktur', 'Koneksi antar tool bisnis', 'Data aman dan ter-backup'],
  },
]

type Pos = 'left' | 'center' | 'right'

const CARD_W = 260
const CARD_H = 364
const spring = { type: 'spring' as const, stiffness: 200, damping: 26, mass: 0.8 }

function getPos(cardIdx: number, active: number): Pos {
  const n = cards.length
  if (cardIdx === active) return 'center'
  if (cardIdx === (active - 1 + n) % n) return 'left'
  return 'right'
}

const positionStyles: Record<Pos, TargetAndTransition> = {
  center: { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 10, opacity: 1, transition: spring },
  left: { x: -CARD_W * 0.62, y: 26, rotate: -9, scale: 0.9, zIndex: 5, opacity: 0.55, transition: spring },
  right: { x: CARD_W * 0.62, y: 26, rotate: 9, scale: 0.9, zIndex: 5, opacity: 0.55, transition: spring },
}

const FOIL_FRAME = `linear-gradient(150deg, #fdf3c0 0%, ${ACCENT} 18%, #b8860b 38%, #fff3b0 52%, ${ACCENT} 68%, #8a6510 86%, #fde79a 100%)`

const HOLO_SHEEN =
  'linear-gradient(115deg, rgba(255,0,128,0.18) 0%, rgba(255,200,0,0.16) 18%, rgba(0,255,200,0.16) 38%, rgba(80,140,255,0.18) 58%, rgba(200,0,255,0.16) 78%, rgba(255,120,0,0.16) 100%)'

function EnergyPip({ Icon, dim }: { Icon: CommitmentCard['Icon']; dim?: boolean }) {
  return (
    <span
      className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-full leading-none"
      style={{
        background: dim ? 'rgba(255,255,255,0.12)' : `radial-gradient(circle at 30% 25%, #fff6cf, ${ACCENT} 60%, #a97c12 100%)`,
        color: dim ? 'rgba(255,255,255,0.5)' : '#3a2a00',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)',
      }}
    >
      <Icon className="h-[9px] w-[9px]" aria-hidden="true" />
    </span>
  )
}

function TypeBadge({ card }: { card: CommitmentCard }) {
  return (
    <span
      className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full"
      style={{
        background: `radial-gradient(circle at 32% 26%, #fff8d8, ${ACCENT} 58%, #9c6f0d 100%)`,
        color: '#2b1f00',
        boxShadow: '0 1px 3px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.2)',
      }}
    >
      <card.Icon className="h-[15px] w-[15px]" aria-hidden="true" />
    </span>
  )
}

export default function Team() {
  const isInView = true
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState<number | null>(null)

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
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-climate text-[30px] md:text-[48px] text-white tracking-tight">
            Komitmen Kami
          </h2>
          <p className="mt-3 text-[12px] md:text-[13px] text-white/40">
            Klik kartu untuk membalik dan melihat detailnya.
          </p>
        </motion.div>

        {/* Card deck */}
        <motion.div
          className="relative flex items-center justify-center select-none"
          style={{ height: CARD_H + 90, perspective: 1400 }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {cards.map((card, i) => {
            const pos = getPos(i, active)
            const isCenter = pos === 'center'
            const isFlipped = flipped === i

            return (
              <motion.div
                key={card.title}
                className="absolute"
                style={{ width: CARD_W, height: CARD_H, transformOrigin: 'bottom center' }}
                animate={positionStyles[pos]}
              >
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label={card.title}
                  className="relative h-full w-full cursor-pointer outline-none"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22 }}
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
                  {/* Front face */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[14px] p-[6px]"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: FOIL_FRAME,
                      boxShadow: isCenter
                        ? `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.35), 0 0 44px ${ACCENT}33`
                        : '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.35)',
                    }}
                  >
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[9px] bg-[#F0F0F0]">
                      {/* Header: stage + name + HP + type */}
                      <div className="relative z-20 flex items-start gap-2 px-2 pt-1.5">
                        <div className="min-w-0 flex-1">
                          <span className="inline-block rounded-[3px] bg-[#2b2b2b] px-1.5 py-[1px] font-mono text-[7px] uppercase tracking-[0.18em] text-white/80">
                            {card.stage}
                          </span>
                          <h3 className="mt-0.5 truncate font-climate text-[14px] leading-tight text-[#141414]">
                            {card.title}
                          </h3>
                          <p className="text-[8px] uppercase tracking-[0.16em] text-[#8a8a8a]">{card.subtitle}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1 pt-1">
                          <span className="font-mono text-[8px] font-bold text-[#7a7a7a]">HP</span>
                          <span className="font-poppins text-[20px] font-extrabold leading-none text-[#141414]">
                            {card.hp}
                          </span>
                          <TypeBadge card={card} />
                        </div>
                      </div>

                      {/* Full-art illustration */}
                      <div className="relative mt-1 flex-1 overflow-hidden bg-[#F0F0F0]">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="relative z-10 h-full w-full scale-[1.28] object-contain"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>

                      {/* Attacks */}
                      <div className="relative z-20 bg-[#F0F0F0]/95 px-2 pb-1 pt-1.5">
                        {card.attacks.map((attack, idx) => (
                          <div key={attack} className="border-t border-[#c9c9c9] py-[5px] first:border-t-0 first:pt-0">
                            <div className="flex items-center gap-1.5">
                              <span className="flex gap-[2px]">
                                {Array.from({ length: idx + 1 }).map((_, k) => (
                                  <EnergyPip key={k} Icon={card.Icon} />
                                ))}
                              </span>
                              <span className="flex-1 font-poppins text-[10px] font-semibold leading-tight text-[#1a1a1a]">
                                {attack}
                              </span>
                              <span className="font-poppins text-[13px] font-extrabold leading-none text-[#1a1a1a]">
                                {idx === 0 ? '60+' : card.hp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer bar */}
                      <div className="relative z-20 flex items-center justify-between border-t border-[#c9c9c9] bg-[#e4e4e8] px-2 py-[3px] font-mono text-[6.5px] uppercase tracking-[0.12em] text-[#6b6b6b]">
                        <span>Illus. Kinaryaloka</span>
                        <span>
                          {String(i + 1).padStart(3, '0')}/{String(cards.length).padStart(3, '0')} SAR
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back face */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[14px] p-[6px]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: FOIL_FRAME,
                      boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 44px ${ACCENT}33`,
                    }}
                  >
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[9px] bg-[#101014]">
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-screen"
                        style={{ background: HOLO_SHEEN }}
                      />
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, ${ACCENT}1a 0 6px, transparent 6px 12px)`,
                        }}
                      />

                      <div className="relative z-10 flex items-center gap-2 px-3 pt-3">
                        <TypeBadge card={card} />
                        <div className="min-w-0">
                          <h3 className="truncate font-climate text-[13px] leading-tight text-white">{card.title}</h3>
                          <p className="text-[8px] uppercase tracking-[0.16em] text-white/40">{card.subtitle}</p>
                        </div>
                      </div>

                      <div className="relative z-10 mx-3 mt-3 rounded-[6px] border border-white/10 bg-white/[0.04] px-3 py-2">
                        <p className="text-[10.5px] italic leading-relaxed text-white/60">{card.description}</p>
                      </div>

                      <ul className="relative z-10 mt-3 space-y-2 px-3">
                        {card.points.map((point, idx) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 border-t border-white/10 pt-2 text-[11px] leading-snug text-white/75 first:border-t-0 first:pt-0"
                          >
                            <span className="mt-[1px] flex gap-[2px]">
                              <EnergyPip Icon={card.Icon} dim={idx > 0} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 bg-black/40 px-3 py-[5px] font-mono text-[6.5px] uppercase tracking-[0.14em] text-white/35">
                        <span>Klik untuk kembali</span>
                        <span>
                          {String(i + 1).padStart(3, '0')}/{String(cards.length).padStart(3, '0')} SAR
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
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
        </motion.div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {cards.map((card, i) => (
            <motion.button
              key={card.title}
              onClick={() => {
                setFlipped(null)
                setActive(i)
              }}
              aria-label={`Lihat kartu ${card.title}`}
              className="rounded-full"
              animate={{
                width: i === active ? 32 : 8,
                height: 8,
                backgroundColor: i === active ? ACCENT : 'rgba(255,255,255,0.15)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
