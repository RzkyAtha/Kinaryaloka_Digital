import { motion, useInView } from 'framer-motion'
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

export default function WhyDigital() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="digital" className="bg-black py-20 relative overflow-hidden" ref={ref}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[560px] bg-gradient-to-b from-[#831449]/20 to-transparent rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Kenapa Harus Digital
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#831449]">
            Sekarang?
          </h3>
        </motion.div>

        <motion.p
          className="text-center text-gray-500 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Bukan soal tren. Ini soal kelangsungan bisnis kamu.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gradient-to-br from-[#1c1c1c] to-[#111] rounded-2xl p-6 border border-[#282828] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              style={{ borderTopWidth: '3px', borderTopColor: stat.color }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-3xl opacity-10"
                style={{ backgroundColor: stat.color }}
              />

              <div className="relative">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                
                {stat.subtext && (
                  <p className="text-sm mb-1" style={{ color: stat.color }}>
                    {stat.subtext}
                  </p>
                )}
                
                <p className="text-white font-bold text-lg mb-1">{stat.label}</p>
                <p className="text-white font-bold text-lg mb-3">{stat.sublabel}</p>
                
                <div 
                  className="h-px w-full mb-4"
                  style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                />
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#831449]/20 to-[#831449]/5 rounded-2xl p-6 md:p-8 border border-[#831449]/30 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-white text-xl md:text-2xl font-bold text-center md:text-left">
            Bisnis kamu bisa jadi salah satu yang 23% itu{' '}
            <span className="text-[#c9547a]">mulai dari satu langkah kecil.</span>
          </p>
          
          <motion.button
            className="bg-[#831449] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#831449]/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            Ngobrol Dulu Yuk?
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
