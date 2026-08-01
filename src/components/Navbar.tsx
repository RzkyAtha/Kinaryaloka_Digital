import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { UserIcon as User, Bars3Icon as Menu, XMarkIcon as X } from '@heroicons/react/24/solid'
import { useState, useEffect, lazy, Suspense } from 'react'
import { LanguageBadge } from './FloatingWA'

const AuthModal = lazy(() => import('./AuthModal'))

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

export default function Navbar({ activeSection, activePage, onPageChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
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
              className="lg:hidden w-10 h-10 rounded-xl bg-black flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>

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
              className="fixed top-[64px] left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="px-5 py-5 space-y-4">
                {/* Page links */}
                <div className="space-y-1">
                  {pageItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-[15px] transition-all duration-200 ${
                        activePage === item.id
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Section links - only on home */}
                {activePage === 'home' && (
                  <>
                    <div className="h-px bg-gray-200" />
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { scrollToSection(item.id); setMobileMenuOpen(false) }}
                          className={`w-full text-left px-4 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 ${
                            activeSection === item.id
                              ? 'text-[#D4912A] bg-[#F5C542]/10'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Language Badge - mobile */}
                <div className="h-px bg-gray-200" />
                <div className="flex justify-center py-1">
                  <LanguageBadge />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      {authModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  )
}
