import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'


export default function WhyDigital() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="digital" ref={sectionRef} className="bg-black py-16 md:py-28 relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C542]/40 to-transparent" />
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F5C542]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center">
        {/* Title */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ background: 'linear-gradient(135deg, #F5C542, #E5A830)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Satu Langkah Lagi
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Bisnis kamu layak punya{' '}
            <span style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              kehadiran digital yang serius.
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 md:mb-12 max-w-[600px] mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Selama ini kamu sudah menjalankan bisnis dengan cara yang benar. Sekarang saatnya memastikan pelanggan bisa menemukan, memahami, dan mempercayai bisnis kamu secara online.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-600 text-xs md:text-sm mt-4">
            Konsultasi gratis. Tanpa komitmen. Langsung ngobrol dengan tim kami.
          </p>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C542]/20 to-transparent" />
    </section>
  )
}
