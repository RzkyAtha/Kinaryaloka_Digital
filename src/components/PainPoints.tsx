import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, MessageCircleQuestion, ImageOff, BarChart3, Clock, X } from 'lucide-react'

const pains = [
  {
    pain: 'Masih jawab pertanyaan harga lewat DM satu-satu setiap hari?',
    hint: 'Ada cara lebih efisien, katalog produk online yang bisa dibagikan sekali, diakses selamanya.',
    color: '#F5C542',
    gradient: 'from-[#F5C542] to-[#FF8C00]',
    icon: MessageCircleQuestion,
  },
  {
    pain: 'Pembeli minta foto produk tapi kamu kebingungan kirim ke mana?',
    hint: 'Toko online yang rapi bikin calon pembeli percaya sebelum mereka tanya apa-apa.',
    color: '#E5A830',
    gradient: 'from-[#E5A830] to-[#FF6B35]',
    icon: ImageOff,
  },
  {
    pain: 'Promosi sudah jalan, tapi tidak tahu berapa yang lihat dan berapa yang beli?',
    hint: 'Sistem digital yang tepat kasih kamu data nyata, bukan cuma perasaan.',
    color: '#D4912A',
    gradient: 'from-[#D4912A] to-[#E85D26]',
    icon: BarChart3,
  },
  {
    pain: 'Jam kerja habis untuk hal-hal yang bisa diotomasi?',
    hint: 'Kami bantu identifikasi proses mana yang bisa didigitalisasi agar waktu kamu lebih fokus ke hal yang penting.',
    color: '#C8841E',
    gradient: 'from-[#C8841E] to-[#D45A1E]',
    icon: Clock,
  },
]

export default function PainPoints() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [showNara, setShowNara] = useState(false)

  return (
    <section className="bg-[#0a0a0a] py-14 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C542]/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ background: 'linear-gradient(135deg, #F5C542, #E5A830)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Kamu Sendirian?
          </p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl mx-auto">
            Cerita ini terdengar
            <span style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> familiar?</span>
          </h2>
          <p className="text-[#666] mt-3 text-base md:text-lg max-w-xl leading-relaxed mx-auto">
            Masalah-masalah ini bukan karena bisnis kamu kurang bagus, tapi karena belum ada sistem yang mendukungnya.
          </p>
        </motion.div>

        {/* Layout: Hero Image Left + Pain Cards Right */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* ── Left: Hero Image ── */}
          <div className="lg:w-[38%] flex-shrink-0">
            <div className="rounded-3xl overflow-hidden w-full h-fit"
              style={{ boxShadow: "0 32px 150px rgba(245,197,66,0.20)" }}>
              <img
                src="/Assets/nara_rabbids.png"
                alt="Ginabo Studio"
                className="w-full h-auto block"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: "linear-gradient(to top,rgba(15,10,30,0.75),transparent)" }} />
              {/* Accent border glow */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(245,197,66,0.00)" }} />
            </div>

            {/* Button: Tunggu, siapa mereka? */}
            <button
              onClick={() => setShowNara(true)}
              className="mt-4 w-full py-3 px-5 rounded-2xl font-semibold text-sm md:text-base text-[#ffffff] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
            >
              Tunggu, siapa mereka?
            </button>
          </div>

          {/* ── Right: Pain Cards ── */}
          <div className="flex-1 grid grid-cols-2 gap-3 md:gap-5 auto-rows-fr">
          {pains.map((item, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                border: `1px solid ${item.color}35`,
                transition: { duration: 0.25 },
              }}
            >
              {/* Corner glow on hover (desktop only) */}
              <div
                className="hidden md:block absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
                style={{ backgroundColor: item.color }}
              />

              {/* Inner content */}
              <div className="relative p-4 sm:p-6 md:p-7">
                {/* Top row: icon + number */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center"
                    style={{ background: `${item.color}12`, border: `1px solid ${item.color}20` }}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: item.color }} />
                  </div>
                  <span
                    className="text-[11px] sm:text-xs font-mono font-bold tracking-wider"
                    style={{ color: `${item.color}60` }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Pain question */}
                <p className="text-white font-bold text-[13px] sm:text-lg md:text-xl leading-snug mb-3 sm:mb-4">
                  {item.pain}
                </p>

                {/* Gradient divider */}
                <div
                  className="h-px mb-3 sm:mb-4"
                  style={{ background: `linear-gradient(90deg, ${item.color}40, transparent)` }}
                />

                {/* Hint */}
                <p className="text-[#777] text-[11px] sm:text-sm md:text-[15px] leading-relaxed">
                  {item.hint}
                </p>

                {/* Arrow hint */}
                <div
                  className="mt-4 sm:mt-5 flex items-center gap-2 text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                  style={{ color: item.color }}
                >
                  Kami bisa bantu <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2D78]/20 to-transparent" />

      {/* Nara Popup Modal */}
      <AnimatePresence>
        {showNara && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowNara(false)} />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md rounded-3xl overflow-hidden p-6 md:p-8"
              style={{
                background: 'linear-gradient(145deg, rgba(20,18,30,0.98) 0%, rgba(10,10,10,0.99) 100%)',
                border: '1px solid rgba(245,197,66,0.15)',
                boxShadow: '0 24px 80px rgba(245,197,66,0.12)',
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowNara(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#999] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(245,197,66,0.3)' }}>
                  <img src="/Assets/nara_mask.png" alt="Nara" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                  Kenalan dulu, yuk!
                </h3>
                <p className="text-[#aaa] text-sm md:text-base leading-relaxed mb-4">
                  Mereka adalah <span className="font-semibold" style={{ color: '#F5C542' }}>Nara</span>, para virtual assistant dari KINARYALOKA Digital Studio. Nara hadir untuk menemani kamu menjelajahi layanan kami, menjawab pertanyaan, dan membantu kamu menemukan solusi digital yang pas untuk bisnismu.
                </p>
                <p className="text-[#777] text-xs md:text-sm leading-relaxed">
                  Santai aja, mereka ramah kok. Kalau butuh bantuan, tinggal sapa!
                </p>

                <button
                  onClick={() => setShowNara(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-sm text-[#0a0a0a] transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
                >
                  Oke, paham!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
