import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  FaceSmileIcon,
  CommandLineIcon,
  ChartBarIcon,
  ChevronDoubleUpIcon,
  HandRaisedIcon,
  BoltIcon,
  PaintBrushIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid'
import { useLanguage, Language } from '../context/LanguageContext'

type PillarId = 'interconnection' | 'balance' | 'unique' | 'infinity'

const PILLAR_ICONS: Record<PillarId, React.FC<{ className?: string }>[]> = {
  interconnection: [FaceSmileIcon, CommandLineIcon],
  unique: [ChartBarIcon, ChevronDoubleUpIcon],
  balance: [HandRaisedIcon, BoltIcon],
  infinity: [PaintBrushIcon, BookOpenIcon],
}

const PILLAR_COPY: Record<Language, Record<PillarId, { label: string; caption: string }>> = {
  id: {
    interconnection: { label: 'Rasa + Sistem', caption: 'Ide manusia dirapikan teknologi, bukan digantikan.' },
    balance: { label: 'Seimbang', caption: 'Estetika buatan tangan, presisi buatan mesin.' },
    unique: { label: 'Tumbuh Organik', caption: 'Identitas lahir dari cerita kamu, bukan template.' },
    infinity: { label: 'Terus Berkarya', caption: 'Kreativitas tak habis, teknologi yang menopang.' },
  },
  en: {
    interconnection: { label: 'Craft + System', caption: 'Human ideas refined by tech, never replaced by it.' },
    balance: { label: 'Balance', caption: 'Handmade taste, machine precision.' },
    unique: { label: 'Organic Growth', caption: 'An identity grown from your story, not a template.' },
    infinity: { label: 'Endless Craft', caption: 'Creativity that never runs dry, tech that carries it.' },
  },
  zh: {
    interconnection: { label: '手作 × 系统', caption: '技术打磨人的巧思，而非取代它。' },
    balance: { label: '平衡', caption: '手作的美感，机器的精准。' },
    unique: { label: '有机生长', caption: '源自你的故事，而非模板。' },
    infinity: { label: '无尽创作', caption: '创意不竭，技术承载。' },
  },
}

/** Blueprint geometry in % of the visual box (matches the branding construction sheet). */
const PILLARS: {
  id: PillarId
  dot: [number, number]
  label: [number, number]
  align: 'center' | 'left' | 'right'
}[] = [
  { id: 'interconnection', dot: [50, 28], label: [12, 16], align: 'left' },
  { id: 'balance', dot: [72, 36], label: [97, 38], align: 'right' },
  { id: 'unique', dot: [28, 52], label: [3, 57], align: 'left' },
  { id: 'infinity', dot: [50, 74], label: [88, 79], align: 'right' },
]

const DRAW = { duration: 1.2, ease: 'easeInOut' as const }

/** Scale/rotate SVG shapes around the viewBox centre. */
const ORIGIN = { transformBox: 'view-box', transformOrigin: 'center' } as const

/** Isometric hexagon silhouette of KNY_deskTOPP.webp, in % of the visual box. */
const HEX: [number, number][] = [
  [50, 13.1],
  [87.6, 32],
  [87.6, 68],
  [50, 86.9],
  [12.4, 68],
  [12.4, 32],
]

const hexPoints = (scale = 1) =>
  HEX.map(([x, y]) => `${(50 + (x - 50) * scale).toFixed(2)},${(50 + (y - 50) * scale).toFixed(2)}`).join(' ')

/** Isometric spokes: room corner (center) out to each hexagon vertex. */
const SPOKES = HEX.map(([x, y]) => {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  return {
    x1: lerp(50, x, 0.2),
    y1: lerp(50, y, 0.2),
    x2: lerp(50, x, 0.96),
    y2: lerp(50, y, 0.96),
  }
})

/**
 * Static blueprint scaffolding. Memoised so the pillar auto-tour (which changes
 * state every 2.8s) never re-renders these ~20 looping SVG animations.
 */
const BlueprintScaffold = memo(function BlueprintScaffold({
  loop,
  hovered,
}: {
  loop: boolean
  hovered: boolean
}) {
  return (
    <>
      <g
        stroke="#2a2a2a"
        fill="none"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        style={{ opacity: hovered ? 0.5 : 0.26, transition: 'opacity 400ms ease' }}
      >
        {/* Isometric silhouette — breathes slowly */}
        <motion.g
          style={ORIGIN}
          animate={loop ? { scale: [1, 1.025, 1] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.polygon
            points={hexPoints(1)}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
            transition={{ ...DRAW, duration: 1.6, delay: 0.25 }}
          />
        </motion.g>

        {/* Outer dashed ring — dash flow travels around the shape */}
        <motion.polygon
          points={hexPoints(1.12)}
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0.7 }}
          animate={loop ? { strokeDashoffset: [0, -28] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner floor plate */}
        <motion.polygon
          points={hexPoints(0.62)}
          strokeDasharray="1.5 3"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0.6, ...ORIGIN }}
          animate={loop ? { strokeDashoffset: [0, 24] } : undefined}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Isometric spokes from the room corner — light travels outward */}
        {SPOKES.map((s, i) => (
          <motion.g
            key={`spoke${i}`}
            animate={loop ? { opacity: [0.25, 0.8, 0.25] } : undefined}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
            style={{ opacity: 0.45 }}
          >
            <motion.line
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              vectorEffect="non-scaling-stroke"
              variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
              transition={{ ...DRAW, delay: 0.5 + i * 0.08 }}
            />
          </motion.g>
        ))}

        {/* Vertex ticks */}
        {HEX.map(([x, y], i) => (
          <motion.circle
            key={`tick${i}`}
            cx={x} cy={y} r={0.9}
            fill="#2a2a2a"
            stroke="none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1 + i * 0.08, type: 'spring', stiffness: 260, damping: 16 }}
          />
        ))}
      </g>

      {/* Radar pulse following the isometric silhouette */}
      {loop && (
        <g fill="none" stroke="#F5C542" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <motion.polygon
            points={hexPoints(1)}
            vectorEffect="non-scaling-stroke"
            style={ORIGIN}
            animate={{ scale: [0.45, 0.85, 1.14], opacity: [0, 0.45, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', times: [0, 0.35, 1] }}
          />
        </g>
      )}
    </>
  )
})

export default function HeroBrandVisual() {
  const { language } = useLanguage()
  const copy = PILLAR_COPY[language] || PILLAR_COPY.id
  const reduceMotion = useReducedMotion()

  const boxRef = useRef<HTMLDivElement>(null)
  const inView = useInView(boxRef, { amount: 0.2 })
  const [hovered, setHovered] = useState(false)
  const [activeId, setActiveId] = useState<PillarId>('interconnection')
  const [pinned, setPinned] = useState(false)

  /** Infinite loops only run while the visual is on screen. */
  const loop = !reduceMotion && inView

  // Pointer parallax
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [10, -10])
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8])
  const roomX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const roomY = useTransform(sy, [-0.5, 0.5], [-10, 10])
  const gridX = useTransform(sx, [-0.5, 0.5], [-5, 5])
  const gridY = useTransform(sy, [-0.5, 0.5], [-4, 4])

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return
      const rect = boxRef.current?.getBoundingClientRect()
      if (!rect) return
      px.set((e.clientX - rect.left) / rect.width - 0.5)
      py.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [px, py, reduceMotion]
  )

  const handleLeave = useCallback(() => {
    setHovered(false)
    setPinned(false)
    px.set(0)
    py.set(0)
  }, [px, py])

  // Idle auto-tour of the brand pillars
  useEffect(() => {
    if (pinned || hovered || !inView) return
    const timer = setInterval(() => {
      setActiveId((prev) => {
        const i = PILLARS.findIndex((p) => p.id === prev)
        return PILLARS[(i + 1) % PILLARS.length].id
      })
    }, 2800)
    return () => clearInterval(timer)
  }, [pinned, hovered, inView])

  const isActive = (id: PillarId) => activeId === id
  const focus = (id: PillarId, pin = false) => {
    setActiveId(id)
    if (pin) setPinned(true)
  }

  return (
    <div className="relative w-full max-w-[440px] xs:max-w-[480px] sm:max-w-[520px] md:max-w-[560px] mx-auto lg:max-w-[600px] lg:mr-auto lg:ml-0">
      <div
        ref={boxRef}
        className="relative aspect-square [perspective:1200px]"
        onPointerMove={handleMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={handleLeave}
      >
        {/* Blueprint construction layer */}
        <motion.svg
          className="absolute inset-0 z-[5] w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ x: gridX, y: gridY }}
          initial="hidden"
          animate="shown"
        >
          <BlueprintScaffold loop={loop} hovered={hovered} />

          {/* Infinity / balance circles */}
          <g fill="none" strokeWidth="1.25" vectorEffect="non-scaling-stroke">
            {[
              { id: 'unique' as PillarId, cx: 33, cy: 50, r: 17 },
              { id: 'infinity' as PillarId, cx: 50, cy: 50, r: 17 },
              { id: 'balance' as PillarId, cx: 67, cy: 50, r: 17 },
            ].map((c, i) => (
              <motion.circle
                key={c.id}
                cx={c.cx} cy={c.cy} r={c.r}
                stroke={isActive(c.id) || isActive('interconnection') ? '#F5C542' : '#2a2a2a'}
                style={{
                  opacity: isActive(c.id) ? 0.9 : isActive('interconnection') ? 0.55 : hovered ? 0.3 : 0.16,
                  transition: 'opacity 350ms ease, stroke 350ms ease',
                }}
                variants={{ hidden: { pathLength: 0, scale: 0.85 }, shown: { pathLength: 1, scale: 1 } }}
                transition={{ ...DRAW, duration: 1.6, delay: 0.6 + i * 0.15 }}
              />
            ))}
          </g>

          {/* Leader lines from labels to hotspots */}
          <g stroke="#F5C542" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {PILLARS.map((p) => (
              <line
                key={p.id}
                x1={p.label[0]} y1={p.label[1]} x2={p.dot[0]} y2={p.dot[1]}
                style={{ opacity: isActive(p.id) ? 0.85 : 0, transition: 'opacity 300ms ease' }}
              />
            ))}
          </g>
        </motion.svg>

        {/* Hero image — tilts with the pointer */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, x: roomX, y: roomY, transformStyle: 'preserve-3d', willChange: 'transform' }
          }
        >
          <motion.div
            className="relative w-[74%]"
            animate={loop ? { y: [0, -14, 0] } : undefined}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          >
            {/* Static ground shadow — cheaper than an animated drop-shadow filter */}
            <div
              className="absolute left-1/2 bottom-[6%] h-[12%] w-[62%] -translate-x-1/2 rounded-[50%] blur-xl"
              style={{ background: 'rgba(0,0,0,0.32)' }}
              aria-hidden="true"
            />
            <img
              src="/Assets/KNY_deskTOPP.webp"
              alt="Digital Workspace"
              className="relative w-full object-contain"
              width={931}
              height={932}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>

        {/* Interactive hotspots */}
        <div className="absolute inset-0 z-20">
          {PILLARS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-label={copy[p.id].label}
              onPointerEnter={() => focus(p.id)}
              onFocus={() => focus(p.id)}
              onClick={() => focus(p.id, true)}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center outline-none"
              style={{ left: `${p.dot[0]}%`, top: `${p.dot[1]}%` }}
            >
              <span
                className="absolute inset-0 rounded-full bg-[#F5C542] transition-opacity duration-300"
                style={{ opacity: isActive(p.id) ? 0.22 : 0 }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full border-2 transition-[transform,background-color] duration-300"
                style={{
                  borderColor: '#F5C542',
                  background: isActive(p.id) ? '#F5C542' : '#ffffff',
                  transform: isActive(p.id) ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            </button>
          ))}

          {/* Annotation labels */}
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className="absolute w-[46%] sm:w-[42%]"
              style={{
                left: `${p.label[0]}%`,
                top: `${p.label[1]}%`,
                transform: `translate(${p.align === 'left' ? '0' : p.align === 'right' ? '-100%' : '-50%'}, -50%)`,
                textAlign: p.align === 'center' ? 'center' : p.align,
              }}
            >
              <div className="relative inline-block max-w-full align-top">
                {/* Idle card — fixed size, never resizes (only fades) */}
                <button
                  type="button"
                  onPointerEnter={() => focus(p.id)}
                  onFocus={() => focus(p.id)}
                  onClick={() => focus(p.id, true)}
                  className="inline-block max-w-full rounded-xl border bg-white px-3.5 py-2.5 outline-none sm:px-4 sm:py-3"
                  style={{
                    borderColor: 'rgba(42,42,42,0.10)',
                    boxShadow: '0 2px 8px rgba(42,42,42,0.06)',
                    opacity: isActive(p.id) ? 0 : 1,
                    transition: 'opacity 200ms ease',
                    willChange: 'opacity',
                  }}
                >
                  <span className="flex items-center gap-2.5 py-0.5 sm:gap-3" aria-hidden="true">
                    {PILLAR_ICONS[p.id].map((Icon, i) => (
                      <Icon key={i} className="h-[22px] w-[22px] sm:h-7 sm:w-7 text-[#F5C542]" />
                    ))}
                  </span>
                  <span className="sr-only">{copy[p.id].label}</span>
                </button>

                {/* Active card — a separate card that pops in above the idle one */}
                <AnimatePresence>
                  {isActive(p.id) && (
                    <motion.button
                      key="detail"
                      type="button"
                      onPointerEnter={() => focus(p.id)}
                      onClick={() => focus(p.id, true)}
                      className="absolute top-1/2 w-[240px] max-w-[76vw] rounded-xl border bg-white px-2.5 py-1.5 outline-none sm:px-3 sm:py-2"
                      style={{
                        left: p.align === 'right' ? undefined : 0,
                        right: p.align === 'right' ? 0 : undefined,
                        textAlign: p.align === 'center' ? 'center' : p.align,
                        borderColor: 'rgba(245,197,66,0.75)',
                        boxShadow: '0 6px 18px rgba(245,197,66,0.22)',
                        transformOrigin: p.align === 'right' ? 'right center' : 'left center',
                        willChange: 'transform, opacity',
                      }}
                      initial={{ opacity: 0, scale: 0.94, y: '-50%' }}
                      animate={{ opacity: 1, scale: 1, y: '-50%' }}
                      exit={{ opacity: 0, scale: 0.96, y: '-50%' }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="block font-poppins font-semibold text-[11px] sm:text-[13px] tracking-wide text-[#2a2a2a]">
                        {copy[p.id].label}
                      </span>
                      <span className="block text-[9px] sm:text-[11px] leading-snug text-[#828282]">
                        {copy[p.id].caption}
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
