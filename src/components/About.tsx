import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, HeartHandshake, Zap, ShieldCheck } from 'lucide-react'

const valueCards = [
  {
    icon: Target,
    title: ['Tepat', 'Sasaran.'],
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
  },
  {
    icon: HeartHandshake,
    title: ['Partner,', 'Bukan Vendor.'],
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
  },
  {
    icon: Zap,
    title: ['Langsung', 'Kepakai.'],
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
  },
  {
    icon: ShieldCheck,
    title: ['Transparan', '& Jelas.'],
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
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
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
            {valueCards.map((card, index) => (
              <motion.div
                key={card.title.join(' ')}
                className="bg-[#3b3b3b] rounded-xl relative overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{ boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
              >
                {/* Dark header bar with title */}
                <div className="bg-[#212121] rounded-r-xl py-3 md:py-5 pl-4 md:pl-6 pr-3 md:pr-4 mt-6 md:mt-8 mr-2 md:mr-3">
                  <h3 className="text-white font-bold text-[18px] sm:text-[22px] md:text-[26px] leading-tight">
                    {card.title.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>
                </div>

                {/* Icon and description row */}
                <div className="p-3 md:p-4 flex gap-2 md:gap-3 items-start mt-1 md:mt-2">
                  {/* Icon in black square */}
                  <div className="bg-black rounded-lg w-[56px] h-[56px] md:w-[72px] md:h-[72px] lg:w-[90px] lg:h-[88px] flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  {/* Description */}
                  <p className="text-white text-[10px] sm:text-[11px] leading-[13px] font-semibold text-justify pt-1">
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
