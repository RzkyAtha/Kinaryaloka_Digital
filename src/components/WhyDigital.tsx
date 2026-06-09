import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    value: 5.35,
    suffix: ' M',
    label: 'Pengguna Internet',
    sublabel: 'Aktif Dunia',
    description: 'Hampir 2/3 populasi bumi sudah online dan mereka mencari bisnis seperti punya kamu.',
    color: '#F5C542',
  },
  {
    value: 2,
    suffix: '×',
    label: 'Pertumbuhan UMKM',
    sublabel: 'yang Go Digital',
    subtext: 'lebih cepat',
    description: 'UMKM yang punya kehadiran digital tumbuh rata-rata 2x lebih cepat dibanding yang belum.',
    color: '#E5A830',
  },
  {
    value: 80,
    suffix: '%',
    label: 'Konsumen Cari',
    sublabel: 'Bisnis Online Dulu',
    description: 'Sebelum datang atau beli, 80% orang searching dulu. Kalau tidak terlihat, mereka ke kompetitor.',
    color: '#D4912A',
  },
  {
    value: 65,
    suffix: ' Juta+',
    label: 'UMKM',
    sublabel: 'di Indonesia',
    description: 'Tulang punggung 60% GDP Indonesia, tetapi hanya 23% yang punya kehadiran digital yang layak.',
    color: '#C8841E',
  },
]

function StaticNumber({ target, suffix }: { target: number; suffix: string }) {
  const formatted = target % 1 === 0
    ? target.toLocaleString('id-ID')
    : target.toFixed(2).replace('.', ',')

  return <span>{formatted}{suffix}</span>
}

function StatCard({ stat, index }: {
  stat: typeof stats[0]
  index: number
}) {
  return (
    <motion.div
      style={{ borderTopWidth: '3px', borderTopColor: stat.color }}
      className="bg-gradient-to-br from-[#1c1c1c] to-[#111] rounded-xl md:rounded-2xl p-3 md:p-6 border border-[#282828] relative overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <div
        className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-3xl opacity-10 hidden md:block"
        style={{ backgroundColor: stat.color }}
      />
      <div className="relative">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl md:text-5xl font-extrabold text-white">
            <StaticNumber target={stat.value} suffix={stat.suffix} />
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
        <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed">{stat.description}</p>
      </div>
    </motion.div>
  )
}

export default function WhyDigital() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="digital" ref={sectionRef} className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Grid BG (desktop only) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none hidden md:block">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>
      {/* Top glow (desktop only) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[560px] bg-gradient-to-b from-[#F5C542]/12 to-transparent rounded-full blur-3xl pointer-events-none hidden md:block" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 w-full">
        {/* Title */}
        <motion.div
          className="text-center mb-3 md:mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Kenapa Harus Digital</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sekarang?</h3>
        </motion.div>

        <motion.p
          className="text-center text-gray-500 text-sm md:text-base mb-6 md:mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Bukan soal tren. Ini soal kelangsungan bisnis kamu.
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-10">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#F5C542]/12 to-[#D4912A]/5 rounded-2xl p-6 md:p-8 border border-[#F5C542]/25 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-white text-xl md:text-2xl font-bold text-center md:text-left">
            Bisnis kamu bisa jadi salah satu yang 23% itu{' '}
            <span style={{ color: '#F5C542' }}>mulai dari satu langkah kecil.</span>
          </p>
          <motion.button
            onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)', boxShadow: '0 4px 20px #F5C54240' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Mulai Sekarang
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
