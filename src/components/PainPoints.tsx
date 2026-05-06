import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const pains = [
  {
    emoji: '💬',
    pain: 'Masih jawab pertanyaan harga lewat DM satu-satu setiap hari?',
    hint: 'Ada cara lebih efisien — katalog produk online yang bisa dibagikan sekali, diakses selamanya.',
    color: '#831449',
  },
  {
    emoji: '📦',
    pain: 'Pembeli minta foto produk tapi kamu kebingungan kirim ke mana?',
    hint: 'Toko online yang rapi bikin calon pembeli percaya sebelum mereka tanya apa-apa.',
    color: '#004896',
  },
  {
    emoji: '📉',
    pain: 'Promosi sudah jalan, tapi tidak tahu berapa yang lihat dan berapa yang beli?',
    hint: 'Sistem digital yang tepat kasih kamu data nyata — bukan cuma perasaan.',
    color: '#b76431',
  },
  {
    emoji: '⏰',
    pain: 'Jam kerja habis untuk hal-hal yang bisa diotomasi?',
    hint: 'Kami bantu identifikasi proses mana yang bisa didigitalisasi agar waktu kamu lebih fokus ke hal yang penting.',
    color: '#207224',
  },
]

export default function PainPoints() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#0a0a0a] py-14 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#831449]/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#831449] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Kamu Sendirian?
          </p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
            Cerita ini terdengar
            <span className="text-[#831449]"> familiar?</span>
          </h2>
          <p className="text-[#666] mt-3 text-base md:text-lg max-w-xl leading-relaxed">
            Masalah-masalah ini bukan karena bisnis kamu kurang bagus — tapi karena belum ada sistem yang mendukungnya.
          </p>
        </motion.div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {pains.map((item, i) => (
            <motion.div
              key={i}
              className="group relative bg-[#131313] border border-[#202020] rounded-2xl p-6 md:p-7 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, borderColor: item.color + '50', transition: { duration: 0.2 } }}
            >
              {/* Glow */}
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: item.color }}
              />

              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl origin-left"
                style={{ backgroundColor: item.color }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />

              {/* Emoji */}
              <div className="text-3xl mb-4">{item.emoji}</div>

              {/* Pain question */}
              <p className="text-white font-bold text-lg md:text-xl leading-snug mb-3">
                {item.pain}
              </p>

              {/* Divider */}
              <div className="h-px bg-[#2a2a2a] mb-3" />

              {/* Hint */}
              <p className="text-[#888] text-sm md:text-base leading-relaxed">
                {item.hint}
              </p>

              {/* Arrow hint */}
              <div
                className="mt-4 flex items-center gap-1.5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                style={{ color: item.color }}
              >
                Kami bisa bantu <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          className="mt-10 md:mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[#555] text-sm md:text-base">
            Tidak harus semuanya sekaligus.{' '}
            <button
              className="text-[#c9547a] font-semibold hover:underline underline-offset-2"
              onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Mulai dari satu langkah kecil →
            </button>
          </p>
        </motion.div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#831449]/20 to-transparent" />
    </section>
  )
}
