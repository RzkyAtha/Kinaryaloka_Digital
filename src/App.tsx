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
import { ProductsProvider } from './context/ProductsContext'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #FF2D78, #FF6B9D, #0080FF)',
      }}
    />
  )
}

function MainSite() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const sections = [
        { id: 'tentang', offset: 800 },
        { id: 'produk', offset: 1000 },
        { id: 'tim', offset: 3500 },
        { id: 'digital', offset: 4300 },
      ]
      for (const section of sections) {
        if (scrollY >= section.offset) setActiveSection(section.id)
      }
      if (scrollY < 800) setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] overflow-x-hidden">
      <ScrollProgressBar />
      <FloatingWA />
      <Chatbot />
      <AnimatePresence>
        <Navbar activeSection={activeSection} />
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Hero />
          <About />
          <PainPoints />
          <MarketplaceExodus />
          <Products />
          <Team />
          <WhyDigital />
          <Process />
        </motion.main>
        <Footer />
      </AnimatePresence>
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
    <ProductsProvider>
      {isAdmin ? <AdminPanel /> : <MainSite />}
    </ProductsProvider>
  )
}

export default App
