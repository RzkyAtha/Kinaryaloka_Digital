import { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Team from './components/Team'
import Process from './components/Process'
import Footer from './components/Footer'
import PainPoints from './components/PainPoints'
import MarketplaceExodus from './components/MarketplaceExodus'
import FloatingWA from './components/FloatingWA'
import Chatbot from './components/Nara'
import Portfolio from './components/Portfolio'
import { LanguageProvider } from './context/LanguageContext'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #F5C542, #D4912A, #0080FF)',
      }}
    />
  )
}

function MainSite() {
  const [activeSection, setActiveSection] = useState('')
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    // Use requestAnimationFrame to avoid interfering with AnimatePresence transitions
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }, [activePage])

  useEffect(() => {
    if (activePage !== 'home') return
    const sectionIds = ['tentang', 'produk', 'komitmen']
    const handleScroll = () => {
      const offset = 200
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offset) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activePage])

  return (
    <div className="min-h-screen bg-[#f5f5f5] overflow-x-hidden">
      <ScrollProgressBar />
      <FloatingWA activePage={activePage} />
      <Chatbot activePage={activePage} />
      <Navbar activeSection={activeSection} activePage={activePage} onPageChange={setActivePage} />
      <motion.main
        key={activePage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {activePage === 'home' ? (
          <>
            <Hero />
            <About />
            <PainPoints />
            <MarketplaceExodus />
            <Products />
            <Team />
            <Process />
          </>
        ) : (
          <Portfolio />
        )}
      </motion.main>
      <Footer />
    </div>
  )
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-[#2a2a2a] mb-4">Terjadi Kesalahan</h2>
            <p className="text-gray-500 mb-6">Halaman mengalami error. Silakan muat ulang.</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <MainSite />
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
