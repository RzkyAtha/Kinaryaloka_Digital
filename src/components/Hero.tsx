import { motion } from 'framer-motion'
import { MessageCircle, ShoppingBag } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title Images */}
            <div className="space-y-3">
              <motion.img
                src="/Assets/Bisnis Kamu.png"
                alt="Bisnis Kamu"
                className="h-[70px] md:h-[78px] object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              />
              <motion.img
                src="/Assets/Butuh Lebih Dari.png"
                alt="Butuh Lebih Dari"
                className="h-[70px] md:h-[78px] object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              />
              <div className="flex items-center gap-4">
                <motion.img
                  src="/Assets/Sekedar.png"
                  alt="Sekedar"
                  className="h-[70px] md:h-[78px] object-contain"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div
                  className="bg-[#272727] rounded-xl px-6 py-4 h-[78px] flex items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <img
                    src="/Assets/Hadir.png"
                    alt="Hadir"
                    className="h-[50px] object-contain"
                  />
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="text-[#828282] text-[18px] max-w-[587px] leading-[26px] text-justify"
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
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3a3a3a] text-white px-10 py-5 rounded-xl font-semibold text-[22px]
                           transition-all duration-200 hover:opacity-85
                           cursor-pointer flex items-center gap-3 shadow-lg"
                style={{ boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
              >
                <MessageCircle className="w-6 h-6" />
                Ngobrol Dulu Yuk?
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#efefef] text-[#3a3a3a] px-10 py-5 rounded-xl font-semibold text-[22px]
                           transition-all duration-200 hover:opacity-85
                           cursor-pointer flex items-center gap-3 shadow-lg"
                style={{ boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
              >
                <ShoppingBag className="w-6 h-6" />
                Lihat Paket
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Isometric Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/Assets/isometric.png"
                alt="Digital Workspace"
                className="w-full max-w-[700px] mx-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
