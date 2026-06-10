import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const valueCards = [
  {
    title: 'Partner, Bukan Vendor.',
    subtitle: 'Hubungan Jangka Panjang',
    badge: 'Support Berkelanjutan',
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#FFA500',
    image: '/Assets/partner_vendor.png',
    policeText: 'PARTNER, BUKAN VENDOR',
  },
  {
    title: 'Tepat Sasaran.',
    subtitle: 'Solusi yang Relevan',
    badge: 'Riset Dulu, Baru Bangun',
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#FF2D55',
    image: '/Assets/tepatsasaran.png',
    policeText: 'TEPAT SASARAN',
  },
  {
    title: 'Langsung Kepakai.',
    subtitle: 'Praktis & Fungsional',
    badge: 'Tanpa Ribet Teknis',
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#0080FF',
    image: '/Assets/langsungkepakai.png',
    policeText: 'LANGSUNG KEPAKAI',
  },
  {
    title: 'Transparan & Jelas.',
    subtitle: 'Tanpa Biaya Tersembunyi',
    badge: 'Harga & Progress Jelas',
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#00C851',
    image: '/Assets/harga_jelas.png',
    policeText: 'TRANSPARAN & JELAS',
  },
]

const policeLineConfigs = [
  // Upper-left: shallow strip, slopes slightly down from left to right
  { rotate: 12, top: '12%', direction: 'left' as const, speed: 35, height: '44px', textSize: 'text-sm sm:text-xl', initialRotateOffset: -8, initialYOffset: -30 },
  // Upper-left: steep strip, slopes steeply up from left to right, crosses strip 1
  { rotate: -50, top: '-20%', direction: 'right' as const, speed: 30, height: '44px', textSize: 'text-sm sm:text-xl', initialRotateOffset: 10, initialYOffset: 25 },
  // Lower-right: large strip, slopes slightly up from left to right, shifted right
  { rotate: -12, top: '75%', direction: 'left' as const, speed: 40, height: '58px', textSize: 'text-lg sm:text-2xl', left: '-10%', initialRotateOffset: 6, initialYOffset: 35 },
]

function PoliceLine({
  text,
  color,
  rotate,
  top,
  direction,
  speed,
  height,
  textSize,
  left,
  index,
  initialRotateOffset,
  initialYOffset,
}: {
  text: string
  color: string
  rotate: number
  top: string
  direction: 'left' | 'right'
  speed: number
  height: string
  textSize: string
  left?: string
  index: number
  initialRotateOffset: number
  initialYOffset: number
}) {
  const repeatedText = Array(10).fill(` ${text} \u2022`).join('')

  return (
    <motion.div
      className="absolute overflow-hidden"
      initial={{
        rotate: rotate + initialRotateOffset,
        y: initialYOffset,
        opacity: 0,
      }}
      animate={{
        rotate,
        y: 0,
        opacity: 1,
        backgroundColor: color,
      }}
      exit={{
        rotate: rotate - initialRotateOffset,
        y: -initialYOffset,
        opacity: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
        backgroundColor: { duration: 0.4 },
      }}
      style={{
        top,
        left: left || '-40%',
        width: '180%',
        height,
        backgroundColor: color,
        zIndex: 2,
        boxShadow: `0 2px 10px ${color}20`,
      }}
    >
      <motion.div
        className="flex items-center h-full"
        style={{ width: 'max-content', willChange: 'transform' }}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <span className={`whitespace-nowrap font-black text-white ${textSize} tracking-[0.12em] px-3`}>
          {repeatedText}
        </span>
        <span className={`whitespace-nowrap font-black text-white ${textSize} tracking-[0.12em] px-3`}>
          {repeatedText}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)

  const activeCard = valueCards[activeIndex]

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % valueCards.length)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + valueCards.length) % valueCards.length)
  }, [])

  return (
    <section id="tentang" className="bg-white py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Police Line Value Cards Scene */}
          <div className="w-full">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2 lg:hidden text-center text-[#FFCC00]">VALUE CARDS</p>
            <h3 className="text-3xl font-bold mb-8 lg:hidden text-center">
              <span className="text-[#2a2a2a]">Upaya </span>
              <span><span style={{ color: '#FF2D55' }}>K</span><span style={{ color: '#FFA500' }}>a</span><span style={{ color: '#0080FF' }}>m</span><span style={{ color: '#00C851' }}>i</span></span>
            </h3>

            {/* Police Line Scene Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-square max-w-[550px] mx-auto rounded-2xl overflow-hidden border border-gray-100"
              style={{ background: '#ffffff' }}
            >
              {/* Police Line Strips */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {policeLineConfigs.map((config, i) => (
                    <PoliceLine
                      key={`${activeIndex}-${i}`}
                      text={activeCard.policeText}
                      color={activeCard.color}
                      index={i}
                      {...config}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Center Floating Image */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
                <motion.div
                  className="cursor-pointer relative"
                  onClick={() => setShowPopup(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeCard.image}
                        src={activeCard.image}
                        alt={activeCard.title}
                        initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.7, rotate: 5 }}
                        transition={{ duration: 0.4 }}
                        className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain"
                        style={{ filter: `drop-shadow(0 0 15px ${activeCard.color}20)` }}
                      />
                    </AnimatePresence>
                  </motion.div>

                  {/* Click hint */}
                  <motion.p
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-[#999] whitespace-nowrap"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    klik untuk detail
                  </motion.p>
                </motion.div>
              </div>

              {/* Navigation Arrow - Left */}
              <button
                onClick={goPrev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90"
                style={{ zIndex: 20, backgroundColor: `${activeCard.color}20`, borderColor: `${activeCard.color}40`, border: `1px solid ${activeCard.color}40`, color: activeCard.color }}
                aria-label="Previous value"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Navigation Arrow - Right */}
              <button
                onClick={goNext}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90"
                style={{ zIndex: 20, backgroundColor: `${activeCard.color}20`, border: `1px solid ${activeCard.color}40`, color: activeCard.color }}
                aria-label="Next value"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 20 }}>
                {valueCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === activeIndex ? activeCard.color : 'rgba(0,0,0,0.15)',
                      transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                      boxShadow: i === activeIndex ? `0 0 8px ${activeCard.color}80` : 'none',
                    }}
                    aria-label={`Go to ${valueCards[i].title}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Content */}
          <motion.div
            className="text-[#2a2a2a] space-y-5 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Main Title */}
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1]">
              <span className="block">Bukan Agency Biasa.</span>
              <span className="block">Partner yang Ngerti</span>
              <span className="block">Bisnis Kamu.</span>
            </h2>
            
            {/* Description paragraphs */}
            <div className="space-y-3 md:space-y-4 text-[#444] text-[14px] sm:text-[16px] md:text-[18px] leading-[1.5] text-justify">
              <p>
                KINARYALOKA Digital Studio lahir dari pemahaman satu hal: kebanyakan UMKM bukan tidak mau digital, tetapi mereka tidak tahu mulai dari mana, atau sudah coba tapi hasilnya tidak kepakai.
              </p>
              <p>
                Kami tidak duduk di balik layar dan desain sesuatu yang kelihatan bagus di portofolio. Kami duduk bareng kamu untuk mempelajari cara bisnis kamu berjalan di lapangan, lalu bantu terjemahkannya ke sistem digital yang rapi, jelas, dan bisa dikontrol.
              </p>
            </div>

            {/* Quote Section */}
            <div className="flex gap-3 md:gap-4 mt-4 md:mt-8">
              <div className="w-[5px] md:w-[7px] bg-[#333] rounded-full flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-[#2a2a2a] text-[18px] sm:text-[22px] md:text-[28px] leading-[1.2] font-bold text-right">
                  "Website itu bukan tujuan akhir, tapi alat biar operasional jadi lebih rapi dan jelas."
                </p>
                <p className="text-[#2a2a2a] text-[14px] sm:text-[16px] md:text-[18px] font-bold text-right">
                  — KINARYALOKA Digital Studio
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-sm w-full rounded-2xl overflow-hidden"
              style={{ background: '#141416', border: `1px solid ${activeCard.color}30` }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
                style={{ zIndex: 10 }}
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div
                className="relative h-40 overflow-hidden flex items-center justify-center"
                style={{ background: `${activeCard.color}10` }}
              >
                <img src={activeCard.image} alt={activeCard.title} className="w-28 h-28 object-contain" loading="lazy" decoding="async" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{activeCard.title}</h3>
                <p className="text-xs sm:text-sm mb-3" style={{ color: '#777' }}>{activeCard.subtitle}</p>

                <span
                  className="inline-block text-[10px] sm:text-xs font-bold rounded-lg px-3 py-1.5 text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${activeCard.color}, ${activeCard.color}CC)` }}
                >
                  {activeCard.badge}
                </span>

                <div className="border-l-2 pl-3" style={{ borderColor: `${activeCard.color}50` }}>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#999' }}>
                    {activeCard.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
