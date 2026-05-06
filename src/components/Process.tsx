import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Hubungi kami via WhatsApp',
    color: '#831449',
  },
  {
    number: '02',
    title: 'Cerita soal bisnis & kebutuhanmu',
    color: '#3a3a3a',
  },
  {
    number: '03',
    title: 'Kami rekomendasikan paket yang tepat',
    color: '#3a3a3a',
  },
  {
    number: '04',
    title: 'Project dimulai dengan rapi dan terstruktur',
    color: '#831449',
  },
]

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-[#fdfdfd] py-20 relative overflow-hidden" ref={ref}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Left Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#831449]/50 to-transparent" />

      {/* Bottom Right Glow */}
      <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] bg-[#831449]/5 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Proses Kerja Kami
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Kita Ngobrol Dulu.
              <br />
              <span className="text-gray-400">Tanpa Komitmen,</span>
              <br />
              Loh Ya.
            </h2>

            <div className="w-16 h-1 bg-[#831449] rounded mb-6" />

            <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
              Kami gak akan langsung nawarin paket di awal kok. Kami dengarkan dulu, 
              cara bisnis kamu berjalan, apa yang sudah jalan, dan apa yang masih 
              mentok. Dari situ baru kami rekomendasikan yang paling masuk akal.
            </p>

            <motion.button
              className="bg-[#1a1a1a] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-black transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              Ngobrol Dulu Yuk?
            </motion.button>
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer group hover:border-[#831449]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ x: 10 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg transition-colors"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <p className="font-semibold text-gray-800 text-lg">
                  {step.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
