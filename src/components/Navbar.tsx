import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { User } from 'lucide-react'
import { useState } from 'react'
import AuthModal from './AuthModal'

interface NavbarProps {
  activeSection: string
  activePage: string
  onPageChange: (page: string) => void
}

const navItems = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'produk', label: 'Produk' },
  { id: 'komitmen', label: 'Komitmen' },
  { id: 'digital', label: 'Mengapa Digital' },
]

const pageItems = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
]

export default function Navbar({ activeSection, activePage, onPageChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePageChange = (page: string) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
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
            <img 
              src="/Assets/logo_kinarya.png" 
              alt="KINARYALOKA"
              className="w-10 h-10 md:w-[56px] md:h-[54px] lg:w-[77px] lg:h-[74px] object-contain"
            />
            <img 
              src="/Assets/font_kinarya.png" 
              alt="KINARYALOKA"
              className="h-6 md:h-9 lg:h-11 object-contain"
            />
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Page-level pill tabs */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1.5">
              {pageItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`relative px-5 py-2 rounded-full font-poppins font-semibold text-[15px] transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Section links - only show on home */}
            {activePage === 'home' && (
              <>
                <div className="w-px h-6 bg-gray-300" />
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative font-poppins font-medium text-[17px] transition-colors duration-200 group"
                  >
                    <span className={`transition-colors duration-200 ${
                      activeSection === item.id ? 'text-[#F5C542]' : 'text-[#8a8a8a] group-hover:text-[#F5C542]'
                    }`}>
                      {item.label}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #F5C542, #D4912A)' }}
                      initial={{ width: 0 }}
                      animate={{ width: activeSection === item.id ? '100%' : 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile page tabs (Home / Portfolio) */}
            <div className="flex lg:hidden items-center gap-1 bg-gray-100 rounded-xl p-1">
              {pageItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop user icon */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setAuthModalOpen(true)}
              className="hidden lg:flex w-[70px] h-[58px] bg-black rounded-xl items-center justify-center"
            >
              <User className="w-7 h-7 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.nav>


      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  )
}
