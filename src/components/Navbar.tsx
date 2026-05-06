import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { User } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  activeSection: string
}

const navItems = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'produk', label: 'Produk' },
  { id: 'tim', label: 'Tim Kami' },
  { id: 'digital', label: 'Mengapa Digital' },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.85)'
          : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 1px 32px rgba(0,0,0,0.08)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <div className="w-[77px] h-[74px] bg-black rounded-xl flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold text-3xl">K</span>
          </div>
          <span className="font-poppins font-bold text-[32px] text-gray-800">
            KINARYALOKA
          </span>
        </motion.div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative font-poppins font-bold text-[22px] transition-colors duration-200 group"
            >
              <span className={`transition-colors duration-200 ${
                activeSection === item.id ? 'text-[#831449]' : 'text-[#484848] group-hover:text-[#831449]'
              }`}>
                {item.label}
              </span>
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] bg-[#831449] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: activeSection === item.id ? '100%' : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </button>
          ))}
        </div>

        {/* User Icon */}
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: '0 6px 24px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.94 }}
          className="w-[86px] h-[71px] bg-black rounded-xl flex items-center justify-center transition-all"
        >
          <User className="w-8 h-8 text-white" />
        </motion.button>
      </div>
    </motion.nav>
  )
}
