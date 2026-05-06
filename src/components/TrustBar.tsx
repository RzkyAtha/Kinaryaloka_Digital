import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 13, suffix: '+', label: 'UMKM Dipercayakan', icon: '🏪' },
  { value: 98, suffix: '%', label: 'Kepuasan Klien', icon: '⭐' },
  { value: 2020, suffix: '', label: 'Berdiri Sejak', icon: '📅' },
]

function AnimatedNumber({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number
    const duration = 1800
    const raf = requestAnimationFrame(function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    })
    return () => cancelAnimationFrame(raf)
  }, [start, target])

  return <>{count.toLocaleString('id-ID')}{suffix}</>
}

export default function TrustBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-[#0d0d0d] border-y border-[#1e1e1e] py-6 md:py-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#2a2a2a]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex-1 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 md:px-10 py-2 text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Icon circle */}
              <div className="w-12 h-12 rounded-full bg-[#831449]/15 flex items-center justify-center flex-shrink-0 text-xl border border-[#831449]/20">
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-white leading-none">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} start={isInView} />
                </p>
                <p className="text-[#7a7a7a] text-sm font-medium mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
