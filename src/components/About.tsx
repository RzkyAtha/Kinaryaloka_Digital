import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Target, HeartHandshake, Zap, ShieldCheck, ChevronDown } from 'lucide-react'

const valueCards = [
  {
    icon: Target,
    title: ['Tepat', 'Sasaran.'],
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#831449',
    image: '/Assets/tepatsasaran.png',
  },
  {
    icon: HeartHandshake,
    title: ['Partner,', 'Bukan Vendor.'],
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#B76431',
    image: '/Assets/partner_vendor.png',
  },
  {
    icon: Zap,
    title: ['Langsung', 'Kepakai.'],
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#004896',
    image: '/Assets/langsungkepakai.png',
  },
  {
    icon: ShieldCheck,
    title: ['Transparan', '& Jelas.'],
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#207224',
    image: '/Assets/harga_jelas.png',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section id="tentang" className="bg-black py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - 4 Value Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 w-full">
            {valueCards.map((card, index) => (
              <motion.div
                key={card.title.join(' ')}
                className="rounded-3xl relative flex flex-col cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                style={{
                  background: `radial-gradient(ellipse at 55% 25%, ${card.color}ff 0%, ${card.color}cc 100%)`,
                  boxShadow: `0 10px 40px ${card.color}55, 0 2px 8px rgba(0,0,0,0.4)`,
                  minHeight: 300,
                }}
              >
                {/* Shine highlight top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)' }}
                />

                {/* ── Illustration — top half, black bg matches image bg ── */}
                <div className="relative overflow-hidden z-[2]" style={{ height: 152, backgroundColor: '#000' }}>
                  <motion.img
                    src={card.image}
                    alt={card.title.join(' ')}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.65, delay: 0.18 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />

                </div>

                {/* ── Icon watermark background ── */}
                <div className="absolute bottom-3 right-3 pointer-events-none z-[1]" style={{ opacity: 0.08 }}>
                  <card.icon className="w-48 h-48 text-white" />
                </div>

                {/* ── Circular icon — floats over the illustration/text boundary ── */}
                <div className="px-4 relative z-10" style={{ marginTop: -18 }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-white/25"
                    style={{
                      background: 'rgba(0,0,0,0.38)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                    }}
                  >
                    <card.icon className="w-[18px] h-[18px] text-white" />
                  </div>
                </div>

                {/* ── Text content ── */}
                <div className="relative z-10 flex flex-col flex-1 px-4 pt-2 pb-4">
                  <h3 className="text-white font-bold text-[16px] sm:text-[19px] md:text-[21px] leading-tight mb-1.5">
                    {card.title.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>
                  {/* ── Dropdown description ── */}
                  <AnimatePresence initial={false}>
                    {expandedCard === index && (
                      <motion.div
                        key="desc"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 text-[10px] sm:text-[11px] md:text-[12px] leading-[1.6] font-medium pt-1 pb-3">
                          {card.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Toggle button ── */}
                  <div className="mt-auto">
                    <button
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      className="w-full h-8 rounded-full flex items-center justify-center gap-1.5 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)' }}
                    >
                      <span className="text-white text-[10px] sm:text-[11px] font-semibold tracking-wide">
                        {expandedCard === index ? 'Dimengerti.' : 'Maksudnya?'}
                      </span>
                      <motion.span
                        animate={{ rotate: expandedCard === index ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex"
                      >
                        <ChevronDown className="w-3 h-3 text-white/80" />
                      </motion.span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Content */}
          <motion.div
            className="text-white space-y-5 md:space-y-6"
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
            <div className="space-y-3 md:space-y-4 text-white text-[14px] sm:text-[16px] md:text-[18px] leading-[1.5] text-justify">
              <p>
                KINARYALOKA Digital Studio lahir dari pemahaman satu hal: kebanyakan UMKM bukan tidak mau digital, tetapi mereka tidak tahu mulai dari mana, atau sudah coba tapi hasilnya tidak kepakai.
              </p>
              <p>
                Kami tidak duduk di balik layar dan desain sesuatu yang kelihatan bagus di portofolio. Kami duduk bareng kamu untuk mempelajari cara bisnis kamu berjalan di lapangan, lalu bantu terjemahkannya ke sistem digital yang rapi, jelas, dan bisa dikontrol.
              </p>
            </div>

            {/* Quote Section */}
            <div className="flex gap-3 md:gap-4 mt-4 md:mt-8">
              <div className="w-[5px] md:w-[7px] bg-[#898989] rounded-full flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-white text-[18px] sm:text-[22px] md:text-[28px] leading-[1.2] font-bold text-right">
                  "Website itu bukan tujuan akhir, tapi alat biar operasional jadi lebih rapi dan jelas."
                </p>
                <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] font-bold text-right">
                  — KINARYALOKA Digital Studio
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
