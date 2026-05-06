import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

const stats = [
  {
    value: 5.35,
    suffix: ' M',
    label: 'Pengguna Internet',
    sublabel: 'Aktif Dunia',
    description: 'Hampir 2/3 populasi bumi sudah online dan mereka mencari bisnis seperti punya kamu.',
    color: '#831449',
  },
  {
    value: 2,
    suffix: '×',
    label: 'Pertumbuhan UMKM',
    sublabel: 'yang Go Digital',
    subtext: 'lebih cepat',
    description: 'UMKM yang punya kehadiran digital tumbuh rata-rata 2x lebih cepat dibanding yang belum.',
    color: '#004896',
  },
  {
    value: 80,
    suffix: '%',
    label: 'Konsumen Cari',
    sublabel: 'Bisnis Online Dulu',
    description: 'Sebelum datang atau beli, 80% orang searching dulu. Kalau tidak terlihat, mereka ke kompetitor.',
    color: '#b76431',
  },
  {
    value: 65,
    suffix: ' Juta+',
    label: 'UMKM',
    sublabel: 'di Indonesia',
    description: 'Tulang punggung 60% GDP Indonesia, tetapi hanya 23% yang punya kehadiran digital yang layak.',
    color: '#207224',
  },
]

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(progress * target)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, target, duration])

  const formatted = target % 1 === 0 
    ? Math.floor(count).toLocaleString('id-ID')
    : count.toFixed(2).replace('.', ',')

  return (
    <span ref={countRef}>
      {formatted}{suffix}
    </span>
  )
}

function StatCard({ stat, index, scrollYProgress }: {
  stat: typeof stats[0]
  index: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = 0.08 + index * 0.17
  const end = start + 0.15
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [60, 0])
  const scale = useTransform(scrollYProgress, [start, end], [0.85, 1])

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="bg-gradient-to-br from-[#1c1c1c] to-[#111] rounded-xl md:rounded-2xl p-3 md:p-6 border border-[#282828] relative overflow-hidden"
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      {...{ style: { borderTopWidth: '3px', borderTopColor: stat.color, opacity, y, scale } } as any}
    >
      <div
        className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: stat.color }}
      />
      <div className="relative">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl md:text-5xl font-extrabold text-white">
            <CountUp target={stat.value} suffix={stat.suffix} />
          </span>
        </div>
        {stat.subtext && (
          <p className="text-sm mb-1" style={{ color: stat.color }}>{stat.subtext}</p>
        )}
        <p className="text-white font-bold text-xs md:text-lg mb-1">{stat.label}</p>
        <p className="text-white font-bold text-xs md:text-lg mb-2 md:mb-3">{stat.sublabel}</p>
        <div
          className="h-px w-full mb-2 md:mb-4"
          style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
        />
        <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed hidden sm:block">{stat.description}</p>
      </div>
    </motion.div>
  )
}

export default function WhyDigital() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 1])
  const titleY = useTransform(scrollYProgress, [0, 0.05], [0, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.82, 0.95], [40, 0])

  return (
    <div id="digital" ref={containerRef} style={{ height: 'clamp(280vh, 350vh, 350vh)' }}>
      {/* STICKY wrapper */}
      <div className="sticky top-0 h-[100dvh] bg-black overflow-hidden flex flex-col justify-center">
        {/* Grid BG */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[560px] bg-gradient-to-b from-[#831449]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 w-full">
          {/* Title */}
          <motion.div className="text-center mb-3 md:mb-4" style={{ opacity: titleOpacity, y: titleY }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Kenapa Harus Digital</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#831449]">Sekarang?</h3>
          </motion.div>

          <motion.p
            className="text-center text-gray-500 text-sm md:text-base mb-6 md:mb-10"
            style={{ opacity: titleOpacity }}
          >
            Bukan soal tren. Ini soal kelangsungan bisnis kamu.
          </motion.p>

          {/* Stats — each animated by scroll */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-10">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            className="bg-gradient-to-r from-[#831449]/20 to-[#831449]/5 rounded-2xl p-6 md:p-8 border border-[#831449]/30 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <p className="text-white text-xl md:text-2xl font-bold text-center md:text-left">
              Bisnis kamu bisa jadi salah satu yang 23% itu{' '}
              <span className="text-[#c9547a]">mulai dari satu langkah kecil.</span>
            </p>
            <motion.button
              className="bg-[#831449] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#831449]/30"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-5 h-5" />
              Ngobrol Dulu Yuk?
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
