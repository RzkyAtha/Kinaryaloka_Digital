import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const isoY = useSpring(rawY, { stiffness: 80, damping: 20 })
  const isoScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const isoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} className="min-h-screen bg-white pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-6 md:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Isometric - shows on top on mobile */}
          <motion.div
            className="relative w-full order-first lg:order-last"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y: isoY, scale: isoScale, opacity: isoOpacity }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/Assets/isometric.png"
                alt="Digital Workspace"
                className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[700px] mx-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 md:space-y-8 order-last lg:order-first"
          >
            {/* Title Images */}
            <div className="space-y-2 md:space-y-3">
              <motion.img
                src="/Assets/Bisnis Kamu.png"
                alt="Bisnis Kamu"
                className="h-[44px] sm:h-[58px] md:h-[70px] lg:h-[78px] object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              />
              <motion.img
                src="/Assets/Butuh Lebih Dari.png"
                alt="Butuh Lebih Dari"
                className="h-[44px] sm:h-[58px] md:h-[70px] lg:h-[78px] object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              />
              <div className="flex items-center gap-3">
                <motion.img
                  src="/Assets/Sekedar.png"
                  alt="Sekedar"
                  className="h-[44px] sm:h-[58px] md:h-[70px] lg:h-[78px] object-contain"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div
                  className="bg-[#272727] rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-4 h-[52px] md:h-[68px] lg:h-[78px] flex items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <img src="/Assets/Hadir.png" alt="Hadir" className="h-[32px] md:h-[44px] lg:h-[50px] object-contain" />
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="text-[#828282] text-[14px] sm:text-[16px] md:text-[18px] max-w-[587px] leading-relaxed text-justify"
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
              className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-full sm:w-auto space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#3a3a3a] text-white w-full px-6 md:px-10 py-4 md:py-5 rounded-xl font-semibold text-[16px] md:text-[18px] lg:text-[22px] flex items-center justify-center gap-3 shadow-lg"
                  style={{ boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
                  onClick={() => window.open('https://wa.me/6281357662424?text=' + encodeURIComponent('Halo KINARYALOKA! Saya mau konsultasi gratis 30 menit untuk bisnis saya.'), '_blank')}
                >
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  Ngobrol Dulu Yuk?
                </motion.button>
                <p className="text-[#999] text-xs text-center">Gratis 30 menit · Tanpa komitmen</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#efefef] text-[#3a3a3a] w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl font-semibold text-[16px] md:text-[18px] lg:text-[22px] flex items-center justify-center gap-3 shadow-lg"
                style={{ boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                Lihat Paket
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
