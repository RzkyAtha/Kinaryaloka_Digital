import { motion } from 'framer-motion'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { useRef } from 'react'
import { LanguageBadge } from './FloatingWA'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="min-h-screen bg-white pt-28 md:pt-32 lg:pt-36 pb-12 md:pb-20 relative overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-6 md:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full min-w-0">

          {/* Isometric - shows on top on mobile */}
          <motion.div
            className="relative w-full order-first lg:order-last min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/Assets/KNY_DESKTOP.png"
                alt="Digital Workspace"
                className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[700px] mx-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 md:space-y-8 order-last lg:order-first w-full min-w-0"
          >
            {/* Language Badge */}
            <div className="mb-2">
              <LanguageBadge />
            </div>

            {/* Title Images */}
            <div className="space-y-2 md:space-y-3 w-full">
              <motion.img
                src="/Assets/Bisnis Kamu.png"
                alt="Bisnis Kamu"
                className="h-[50px] sm:h-[58px] md:h-[70px] lg:h-[78px] object-contain object-left max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              />
              <motion.img
                src="/Assets/Butuh Lebih Dari.png"
                alt="Butuh Lebih Dari"
                className="h-[50px] sm:h-[58px] md:h-[70px] lg:h-[78px] object-contain object-left max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              />
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <motion.img
                  src="/Assets/Sekedar.png"
                  alt="Sekedar"
                  className="h-[50px] sm:h-[58px] md:h-[70px] lg:h-[78px] object-contain object-left max-w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div
                  className="bg-[#272727] rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-4 h-[58px] sm:h-[62px] md:h-[68px] lg:h-[78px] flex items-center flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <img src="/Assets/Hadir.png" alt="Hadir" className="h-[38px] sm:h-[40px] md:h-[44px] lg:h-[50px] object-contain" />
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="text-[#828282] text-[13px] sm:text-[15px] md:text-[18px] max-w-full sm:max-w-[587px] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              KINARYALOKA Digital Studio hadir untuk UMKM yang sudah siap kami
              bantu terjemahkan cara bisnis kamu jalan ke dalam sistem digital
              yang rapi, jelas, dan kepakai.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 md:pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex-1 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-white w-full px-3 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl font-semibold text-[13px] sm:text-[16px] md:text-[18px] lg:text-[22px] flex items-center justify-center gap-2 sm:gap-3 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #F5C542, #E5A830, #D4912A)', boxShadow: '0 4px 16px rgba(229,168,48,0.35)' }}
                  onClick={() => window.open('https://wa.me/6281357662424?text=' + encodeURIComponent('Halo KINARYALOKA! Saya mau konsultasi gratis 30 menit untuk bisnis saya.'), '_blank')}
                >
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  Ngobrol Dulu Yuk?
                </motion.button>
                <p className="text-[#999] text-xs text-center">Gratis 30 menit · Tanpa komitmen</p>
              </div>
              <div className="flex-1 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-white w-full px-3 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl font-semibold text-[13px] sm:text-[16px] md:text-[18px] lg:text-[22px] flex items-center justify-center gap-2 sm:gap-3 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #4a4a4a, #3a3a3a, #2a2a2a)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                  Lihat Paket
                </motion.button>
                <p className="text-transparent text-xs text-center select-none" aria-hidden="true">&nbsp;</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
