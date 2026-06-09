import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Monitor, Crosshair, HeartHandshake, StickyNote } from 'lucide-react'

const valueCards = [
  {
    icon: Crosshair,
    title: 'Tepat Sasaran.',
    subtitle: 'Solusi yang Relevan',
    badge: 'Riset Dulu, Baru Bangun',
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    color: '#FF2D55',
    image: '/Assets/tepatsasaran.png',
    delay: 0.1,
  },
  {
    icon: HeartHandshake,
    title: 'Partner, Bukan Vendor.',
    subtitle: 'Hubungan Jangka Panjang',
    badge: 'Support Berkelanjutan',
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    color: '#FFA500',
    image: '/Assets/partner_vendor.png',
    delay: 0.2,
  },
  {
    icon: Monitor,
    title: 'Langsung Kepakai.',
    subtitle: 'Praktis & Fungsional',
    badge: 'Tanpa Ribet Teknis',
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    color: '#0080FF',
    image: '/Assets/langsungkepakai.png',
    delay: 0.3,
  },
  {
    icon: StickyNote,
    title: 'Transparan & Jelas.',
    subtitle: 'Tanpa Biaya Tersembunyi',
    badge: 'Harga & Progress Jelas',
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    color: '#00C851',
    image: '/Assets/harga_jelas.png',
    delay: 0.2,
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
          <div className="w-full">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2 lg:hidden text-center text-[#FFCC00]">VALUE CARDS</p>
            <h3 className="text-3xl font-bold mb-8 lg:hidden text-center">
              <span className="text-white">Upaya </span>
              <span style={{ background: 'linear-gradient(135deg, #FFCC00, #FF8800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kami</span>
            </h3>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
            {valueCards.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl sm:rounded-2xl overflow-hidden"
                style={{ background: '#141416', border: '1px solid #2a2a2a' }}
              >
                {/* Image */}
                <div className="relative h-[90px] sm:h-[110px] md:h-[130px] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5">
                {/* Top row: icon + title + subtitle */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${card.color}18` }}>
                    <card.icon size={14} className="sm:hidden" style={{ color: card.color }} />
                    <card.icon size={16} className="hidden sm:block" style={{ color: card.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-[11px] sm:text-[13px] md:text-base leading-snug">{card.title}</h3>
                    <p className="text-[9px] sm:text-[11px] md:text-xs mt-0.5" style={{ color: '#777' }}>{card.subtitle}</p>
                  </div>
                </div>
                {/* Badge */}
                <div className="mb-2 sm:mb-3">
                  <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-white"
                    style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)` }}>
                    {card.badge}
                  </span>
                </div>
                {/* Quote-style description */}
                <div className="border-l-2 pl-2 sm:pl-3" style={{ borderColor: `${card.color}50` }}>
                  <p className="text-[10px] sm:text-[12px] md:text-sm leading-relaxed" style={{ color: '#999' }}>
                    {card.description}
                  </p>
                </div>
                </div>{/* end content */}
              </motion.div>
            ))}
          </div>
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
