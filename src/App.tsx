import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Team from './components/Team'
import WhyDigital from './components/WhyDigital'
import Process from './components/Process'
import Footer from './components/Footer'
import PainPoints from './components/PainPoints'
import MarketplaceExodus from './components/MarketplaceExodus'
import FloatingWA from './components/FloatingWA'
import Chatbot from './components/Nara'
import AdminPanel from './components/AdminPanel'
import Portfolio from './components/Portfolio'
import { ProductsProvider } from './context/ProductsContext'
import { PortfolioProvider } from './context/PortfolioContext'
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
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  useEffect(() => {
    if (activePage !== 'home') return
    const sectionIds = ['tentang', 'produk', 'komitmen', 'digital']
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
      <FloatingWA />
      <Chatbot />
      <Navbar activeSection={activeSection} activePage={activePage} onPageChange={setActivePage} />
      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Hero />
            <About />
            <PainPoints />
            <MarketplaceExodus />
            <Products />
            <Team />
            <WhyDigital />
            <Process />
          </motion.main>
        ) : (
          <motion.main key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Portfolio />
          </motion.main>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin')

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <LanguageProvider>
      <ProductsProvider>
        <PortfolioProvider>
          {isAdmin ? <AdminPanel /> : <MainSite />}
        </PortfolioProvider>
      </ProductsProvider>
    </LanguageProvider>
  )
}

export default App
