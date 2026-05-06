import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { User, Menu, X } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  const scrollToSection = (id: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 1px 32px rgba(0,0,0,0.08)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-3 md:py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center gap-2 md:gap-4" whileHover={{ scale: 1.02 }}>
            <div className="w-10 h-10 md:w-[56px] md:h-[54px] lg:w-[77px] lg:h-[74px] bg-black rounded-lg md:rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-base md:text-2xl lg:text-3xl">K</span>
            </div>
            <span className="font-poppins font-bold text-lg md:text-2xl lg:text-[32px] text-gray-800">
              KINARYALOKA
            </span>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
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
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#831449] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === item.id ? '100%' : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop user icon */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="hidden lg:flex w-[70px] h-[58px] bg-black rounded-xl items-center justify-center"
            >
              <User className="w-7 h-7 text-white" />
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden w-10 h-10 rounded-lg bg-black flex items-center justify-center"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5 text-white" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5 text-white" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            {/* Menu panel */}
            <motion.div
              className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col pt-24 px-6 gap-2"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-4 px-4 rounded-xl font-bold text-xl border-b border-gray-100 transition-colors ${
                    activeSection === item.id ? 'text-[#831449] bg-[#831449]/5' : 'text-gray-800 hover:text-[#831449]'
                  }`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="mt-4 w-full py-4 bg-black rounded-xl text-white font-bold flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <User className="w-5 h-5" />
                Akun Saya
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
