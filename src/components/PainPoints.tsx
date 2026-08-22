import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { QuestionMarkCircleIcon as MessageCircleQuestion, PhotoIcon as ImageOff, ChartBarIcon as BarChart3, ClockIcon as Clock, XMarkIcon as X } from '@heroicons/react/24/solid'
import { useLanguage } from '../context/LanguageContext'

const INK = '#141414'
const INK_W = 3
const PAPER = '#EDEAE3'

const NARA_INTRO =
  'Maskot sekaligus virtual assistant KINARYALOKA. Mereka yang nemenin kamu keliling layanan kami dan bantu jawab pertanyaan sebelum ngobrol sama timnya.'

const naras = [
  {
    name: 'Kirana',
    role: 'Merencanakan',
    meanings: ['Cahaya', 'Sinar', 'Pancaran'],
    blurb: 'Bisa dimaknai inspirasi yang memunculkan sebuah ide cemerlang.',
    image: '/Assets/nara_02.webp',
    color: '#C8752E',
  },
  {
    name: 'Kriya',
    role: 'Merancang',
    meanings: ['Karya', 'Kerajinan', 'Kreatifitas'],
    blurb: 'Bisa dimaknai sebagai perwujudan ide menjadi sebuah karya nyata.',
    image: '/Assets/nara_01.webp',
    color: '#E8651A',
  },
  {
    name: 'Karsa',
    role: 'Mewujudkan',
    meanings: ['Kemauan', 'Niat', 'Daya Cipta'],
    blurb: 'Bisa dimaknai dorongan agar bisa menjadikan inspirasi ke gagasan.',
    image: '/Assets/nara_03.webp',
    color: '#D4912A',
  },
]

function NaraList({ animated = true }: { animated?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 items-end">
      {naras.map((n, i) => (
        <motion.div
          key={n.name}
          className="relative pt-[62px]"
          initial={animated ? { opacity: 0, y: 14 } : false}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          whileHover={{ x: -2, y: -2 }}
        >
          <div
            className="flex h-full flex-col items-center px-2.5 pb-3 pt-9 text-center"
            style={{
              background: PAPER,
              borderRadius: 18,
              border: `${INK_W}px solid ${INK}`,
              boxShadow: `5px 5px 0 ${INK}`,
            }}
          >
            <span className="font-black text-[14px] leading-none" style={{ color: INK }}>
              {n.name}
            </span>
            <span
              className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em]"
              style={{ color: n.color }}
            >
              {n.role}
            </span>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {n.meanings.map((m, k) => (
                <span
                  key={m}
                  className="inline-block px-1.5 py-[2px] font-black text-[8px] uppercase tracking-[0.06em] leading-none"
                  style={{
                    background: n.color,
                    color: '#FFF7E6',
                    borderRadius: 6,
                    border: `2px solid ${INK}`,
                    boxShadow: `2px 2px 0 ${INK}`,
                    rotate: `${k % 2 === 0 ? -2.5 : 2.5}deg`,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-2.5 h-[2px] w-6 rounded-full" style={{ background: `${INK}22` }} />
            <p className="mt-2 w-full text-center text-[10.5px] leading-[1.55] tracking-[-0.01em] text-[#5a5a5a] [text-wrap:pretty]">
              {n.blurb}
            </p>
          </div>

          <img
            src={n.image}
            alt={n.name}
            className="pointer-events-none absolute left-1/2 top-0 h-[96px] w-auto -translate-x-1/2 object-contain object-bottom"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  )
}

const pains = [
  {
    title: 'MASIH\u00A0JAWAB\nDM\u00A0MANUAL?',
    pain: 'Masih jawab pertanyaan harga lewat DM satu-satu setiap hari?',
    hint: 'Ada cara lebih efisien, katalog produk online yang bisa dibagikan sekali, diakses selamanya.',
    color: '#E8651A',
    btnColor: '#B85A1E',
    icon: MessageCircleQuestion,
    images: {
      id: '/Assets/CARD_jwb_manual.webp',
      en: '/Assets/en_CARD_jwb_manual.webp',
      zh: '/Assets/zh_CARD_jwb_manual.webp',
    },
  },
  {
    title: 'BELUM\u00A0PUNYA\nTOKO?',
    pain: 'Pembeli minta foto produk tapi kamu kebingungan kirim ke mana?',
    hint: 'Toko online yang rapi bikin calon pembeli percaya sebelum mereka tanya apa-apa.',
    color: '#D4912A',
    btnColor: '#A06B1A',
    icon: ImageOff,
    images: {
      id: '/Assets/CARD_no_img.webp',
      en: '/Assets/en_CARD_no_img.webp',
      zh: '/Assets/zh_CARD_no_img.webp',
    },
  },
  {
    title: 'PROMOSI\nTANPA\u00A0DATA?',
    pain: 'Promosi sudah jalan, tapi tidak tahu berapa yang lihat dan berapa yang beli?',
    hint: 'Sistem digital yang tepat kasih kamu data nyata, bukan cuma perasaan.',
    color: '#C8752E',
    btnColor: '#B85A1E',
    icon: BarChart3,
    images: {
      id: '/Assets/CARD_no_data.webp',
      en: '/Assets/en_CARD_no_data.webp',
      zh: '/Assets/zh_CARD_no_data.webp',
    },
  },
  {
    title: 'KERJA\u00A0MANUAL\nTERUS?',
    pain: 'Jam kerja habis untuk hal-hal yang bisa diotomasi?',
    hint: 'Kami bantu identifikasi proses mana yang bisa didigitalisasi agar waktu kamu lebih fokus ke hal yang penting.',
    color: '#B85A1E',
    btnColor: '#8B3E12',
    icon: Clock,
    images: {
      id: '/Assets/CARD_no_auto.webp',
      en: '/Assets/en_CARD_no_auto.webp',
      zh: '/Assets/zh_CARD_no_auto.webp',
    },
  },
]

export default function PainPoints() {
  const isInView = true
  const [showNara, setShowNara] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const { language } = useLanguage()

  return (
    <section className="bg-[#0a0a0a] py-14 md:py-20 relative overflow-hidden">
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
          <h2 className="font-climate text-white text-[30px] sm:text-[40px] md:text-[48px] leading-[1.2] max-w-2xl mx-auto">
            Familiar?
          </h2>
          <p className="text-[#666] mt-3 text-xs md:text-sm max-w-xl leading-relaxed mx-auto">
            Masalah-masalah ini bukan karena bisnis kamu kurang bagus, tapi karena belum ada sistem yang mendukungnya.
          </p>
        </motion.div>

        {/* Layout: Hero Image Left + Pain Cards Right */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* ── Left: Hero Image ── */}
          <div className="lg:w-[38%] flex-shrink-0">
            <div className="relative w-full h-fit">
              <img
                src="/Assets/nara_new.webp"
                alt="KINARYALOKA Team"
                className="w-full h-auto block"
                width={1364}
                height={1072}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Mobile & tablet: popup trigger */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowNara(true)}
                className="mt-4 w-full py-3 px-5 rounded-2xl font-semibold text-sm md:text-base text-[#ffffff] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
              >
                Tunggu, siapa mereka?
              </button>

              {/* Hint text */}
              <p className="mt-3 text-[10px] sm:text-xs text-[#666] text-center leading-snug">
                Tekan tombol <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#666] text-[9px] font-bold text-[#888] align-middle mx-0.5">?</span> untuk membaca lebih lanjut!
              </p>
            </div>

            {/* Desktop: inline Nara introduction */}
            <div className="hidden lg:block mt-2">
              <h3 className="font-climate text-white text-[17px] leading-tight text-center">Kenalan sama Nara</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-[#8a8a8a] text-justify">{NARA_INTRO}</p>

              <div className="mt-3">
                <NaraList />
              </div>
            </div>
          </div>

          {/* ── Right: Pain Cards ── */}
          <div className="flex-1 grid grid-cols-2 gap-3 md:gap-5" style={{ minHeight: activeCard !== null ? undefined : undefined }}>
            <AnimatePresence mode="wait">
              {activeCard === null ? (
                // ── IDLE: Show all 4 cards in 2x2 grid ──
                <motion.div
                  key="grid"
                  className="col-span-2 grid grid-cols-2 gap-3 md:gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {pains.map((item, i) => (
                    <motion.div
                      key={i}
                      className="relative cursor-pointer select-none"
                      style={{
                        rotate: i % 2 === 0 ? -1.2 : 1.2,
                        borderRadius: 18,
                        border: `${INK_W}px solid ${INK}`,
                        background: '#EDEAE3',
                        boxShadow: `7px 7px 0 ${INK}`,
                      }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.35, delay: isInView ? i * 0.05 : 0 }}
                      whileHover={{ x: -3, y: -3, rotate: 0, boxShadow: `11px 11px 0 ${INK}` }}
                      whileTap={{ x: 2, y: 2, boxShadow: `3px 3px 0 ${INK}` }}
                      onClick={() => setActiveCard(i)}
                    >
                      {/* Halftone dot texture — doodle sticker vibe */}
                      <div
                        className="pointer-events-none absolute inset-0 z-[1]"
                        style={{
                          borderRadius: 15,
                          backgroundImage: `radial-gradient(${INK}1f 1.2px, transparent 1.3px)`,
                          backgroundSize: '9px 9px',
                          opacity: 0.55,
                        }}
                      />

                      {/* Card image */}
                      <div className="relative overflow-hidden" style={{ borderRadius: 15 }}>
                        <img
                          src={item.images[language]}
                          alt={item.title.replace(/\n/g, ' ')}
                          className="w-full h-auto block"
                          style={{ imageRendering: 'auto' }}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                        />
                      </div>

                      {/* Sticker accent bar — bottom */}
                      <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2]"
                        style={{
                          height: 8,
                          background: item.color,
                          borderTop: `${INK_W}px solid ${INK}`,
                          borderBottomLeftRadius: 15,
                          borderBottomRightRadius: 15,
                        }}
                      />

                      {/* Question mark sticker — top left */}
                      <button
                        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-black text-sm sm:text-base md:text-lg transition-transform duration-200 hover:scale-110"
                        style={{
                          background: item.color,
                          color: '#FFF7E6',
                          border: `${INK_W}px solid ${INK}`,
                          boxShadow: `3px 3px 0 ${INK}`,
                        }}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          setActiveCard(i)
                        }}
                        aria-label="Baca selengkapnya"
                      >
                        ?
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // ── CLICKED: Show single expanded card filling entire grid ──
                <motion.div
                  key={`expanded-${activeCard}`}
                  className="col-span-2 relative overflow-hidden"
                  style={{
                    background: PAPER,
                    borderRadius: 22,
                    border: `${INK_W}px solid ${INK}`,
                    boxShadow: `10px 10px 0 ${INK}`,
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  {/* Halftone dot texture */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(${INK}1f 1.4px, transparent 1.5px)`,
                      backgroundSize: '11px 11px',
                      opacity: 0.5,
                    }}
                  />

                  <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[320px] sm:min-h-[380px] md:min-h-[440px]">
                    {/* Decorative number — top right */}
                    <span
                      className="absolute top-4 right-5 sm:top-6 sm:right-7 font-bold pointer-events-none"
                      style={{
                        fontFamily: "'Staatliches', cursive",
                        fontSize: 'clamp(60px, 12vw, 120px)',
                        color: 'transparent',
                        WebkitTextStroke: `2px ${pains[activeCard].color}`,
                        lineHeight: 1,
                      }}
                    >
                      0{activeCard + 1}
                    </span>

                    {/* Decorative icon — bottom right */}
                    <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 pointer-events-none">
                      {(() => { const Icon = pains[activeCard].icon; return <Icon className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" style={{ color: `${INK}22` }} /> })()}
                    </div>

                    {/* Title */}
                    <p
                      className="whitespace-pre-line leading-[0.95] tracking-wide"
                      style={{
                        fontFamily: "'Staatliches', cursive",
                        color: INK,
                        fontSize: 'clamp(42px, 10vw, 80px)',
                        textShadow: `3px 3px 0 ${pains[activeCard].color}`,
                      }}
                    >
                      {pains[activeCard].title}
                    </p>

                    {/* Divider */}
                    <div
                      className="mt-5 mb-4 w-full max-w-[200px]"
                      style={{ height: INK_W, background: INK, borderRadius: 99 }}
                    />

                    {/* Pain text */}
                    <motion.p
                      className="text-sm sm:text-base md:text-lg leading-relaxed font-semibold max-w-lg"
                      style={{ color: '#1a1a1a' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      {pains[activeCard].pain}
                    </motion.p>

                    {/* Hint text */}
                    <motion.p
                      className="text-xs sm:text-sm md:text-base leading-relaxed mt-3 max-w-lg"
                      style={{ color: '#5a5a5a' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                    >
                      {pains[activeCard].hint}
                    </motion.p>

                    {/* Dimengerti button */}
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.3 }}
                    >
                      <button
                        className="px-6 py-2.5 rounded-xl text-sm sm:text-base font-black transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px]"
                        style={{
                          background: pains[activeCard].color,
                          color: '#FFF7E6',
                          border: `${INK_W}px solid ${INK}`,
                          boxShadow: `5px 5px 0 ${INK}`,
                        }}
                        onClick={() => setActiveCard(null)}
                      >
                        Dimengerti!
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C542]/20 to-transparent" />

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
                  <img src="/Assets/nara_mask.webp" alt="Nara" className="w-full h-full object-cover" loading="eager" decoding="async" />
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
