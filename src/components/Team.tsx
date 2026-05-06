import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Team() {
  const sectionRef = useRef(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const rotateX = useTransform(y, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relX)
    mouseY.set(relY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <section id="tim" className="bg-black py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#831449]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Magnetic + Float container */}
          <motion.div
            ref={imgRef}
            className="relative select-none"
            style={{
              rotateX: isHovered ? rotateX : 0,
              rotateY: isHovered ? rotateY : 0,
              transformStyle: 'preserve-3d',
              perspective: '1200px',
            }}
            animate={isHovered ? {} : {
              y: [0, -14, 0],
              transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glow behind image */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={isHovered ? {
                boxShadow: '0 0 80px 20px rgba(131,20,73,0.35), 0 0 160px 40px rgba(131,20,73,0.15)'
              } : {
                boxShadow: '0 0 40px 8px rgba(131,20,73,0.12)'
              }}
              transition={{ duration: 0.4 }}
            />

            <img
              src="/Assets/tim_kami.png"
              alt="Tim Kami"
              className="w-full h-auto object-contain rounded-3xl relative z-10"
              draggable={false}
            />

            {/* Shine overlay on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none z-20"
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
                  : 'none',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
