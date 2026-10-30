import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon as ChevronRight } from '@heroicons/react/24/solid'
import { useState, useEffect} from 'react'
import { LanguageBadge } from './FloatingWA'


interface NavbarProps {
  activeSection: string
  activePage: string
  onPageChange: (page: string) => void
}

const navItems = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'produk', label: 'Produk' },
  { id: 'komitmen', label: 'Komitmen' },
]

const pageItems = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
]

/** Animated hamburger -> X morph. Asymmetric middle line collapses out on open. */
function MenuToggleIcon({ open }: { open: boolean }) {
  const ease = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-white"
    >
      <motion.line
        x1="4" y1="7" x2="20" y2="7"
        animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={ease}
      />
      <motion.line
        x1="4" y1="12" x2="14" y2="12"
        animate={{ scaleX: open ? 0 : 1, opacity: open ? 0 : 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="4" y1="17" x2="20" y2="17"
        animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={ease}
      />
    </svg>
  )
}

export default function Navbar({ activeSection, activePage, onPageChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
    setPastHero(latest > 50)
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePageChange = (page: string) => {
    onPageChange(page)
    setMobileMenuOpen(false)
  }

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return
    const close = () => setMobileMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [mobileMenuOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isMobile
            ? (pastHero ? 'rgba(255,255,255,0.92)' : 'transparent')
            : (scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)'),
          backdropFilter: isMobile ? (pastHero ? 'blur(20px)' : 'none') : 'blur(20px)',
          WebkitBackdropFilter: isMobile ? (pastHero ? 'blur(20px)' : 'none') : 'blur(20px)',
          boxShadow: isMobile
            ? (pastHero ? '0 1px 32px rgba(0,0,0,0.08)' : 'none')
            : (scrolled ? '0 1px 32px rgba(0,0,0,0.08)' : 'none'),
          borderBottom: isMobile
            ? (pastHero ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent')
            : (scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent'),
        }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-3 md:py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center gap-2 md:gap-4" whileHover={{ scale: 1.02 }}>
            <img 
              src="/Assets/logo_kinarya.webp" 
              alt="KINARYALOKA"
              className="w-10 h-10 md:w-[56px] md:h-[54px] lg:w-[77px] lg:h-[74px] object-contain"
            />
            <img 
              src="/Assets/font_kinarya.webp" 
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
          <div className="flex items-center gap-4">
            {/* Language Badge */}
            <div className="hidden lg:block">
              <LanguageBadge />
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              className="lg:hidden w-10 h-10 rounded-2xl bg-[#141414] shadow-lg shadow-black/25 flex items-center justify-center transition-transform duration-200 active:scale-90"
            >
              <MenuToggleIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-x-3 top-[68px] z-40 overflow-hidden rounded-2xl border border-black/[0.06] bg-white/95 shadow-xl shadow-black/10 backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="p-2">
                {/* Page switcher - segmented control */}
                <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/[0.045] p-1">
                  {pageItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      className={`rounded-lg py-2.5 font-poppins text-[13px] font-semibold transition-all duration-200 ${
                        activePage === item.id
                          ? 'bg-[#141414] text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Section links - only on home */}
                {activePage === 'home' && (
                  <div className="mt-1 flex flex-col">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { scrollToSection(item.id); setMobileMenuOpen(false) }}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-black/[0.04]"
                      >
                        <span
                          className={`font-poppins text-[14px] ${
                            activeSection === item.id
                              ? 'font-semibold text-[#141414]'
                              : 'font-medium text-gray-500'
                          }`}
                        >
                          {item.label}
                        </span>
                        {activeSection === item.id ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Language */}
                <div className="mt-1 flex items-center justify-between border-t border-black/[0.06] px-3 pb-1 pt-3">
                  <span className="font-poppins text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    Bahasa
                  </span>
                  <LanguageBadge />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
