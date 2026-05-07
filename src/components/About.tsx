import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, HeartHandshake, Zap, ShieldCheck } from 'lucide-react'

const valueCards = [
  {
    icon: Target,
    title: ['Tepat', 'Sasaran.'],
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#831449',
  },
  {
    icon: HeartHandshake,
    title: ['Partner,', 'Bukan Vendor.'],
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#B76431',
  },
  {
    icon: Zap,
    title: ['Langsung', 'Kepakai.'],
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#004896',
  },
  {
    icon: ShieldCheck,
    title: ['Transparan', '& Jelas.'],
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#207224',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="tentang" className="bg-black py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - 4 Value Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 w-full">
            {valueCards.map((card, index) => (
              <motion.div
                key={card.title.join(' ')}
                className="rounded-2xl relative overflow-hidden cursor-pointer group flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  backgroundColor: card.color,
                  boxShadow: `0 4px 24px ${card.color}55`,
                }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 100%)` }}
                />

                {/* Watermark icon */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.10] pointer-events-none">
                  <card.icon className="w-28 h-28 md:w-36 md:h-36 text-white" />
                </div>

                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: `inset 0 0 40px ${card.color}80` }}
                />

                {/* Top accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: 'rgba(255,255,255,0.35)' }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-4 md:p-5">
                  {/* Icon box */}
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 border border-white/10">
                    <card.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-[18px] sm:text-[22px] md:text-[26px] leading-tight mb-2 md:mb-3">
                    {card.title.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-[11px] sm:text-[12px] md:text-[13px] leading-[1.5] font-medium">
                    {card.description}
                  </p>
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
