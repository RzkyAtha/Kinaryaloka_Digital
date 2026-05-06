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
import TrustBar from './components/TrustBar'
import PainPoints from './components/PainPoints'
import FloatingWA from './components/FloatingWA'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #831449, #c9547a, #004896)',
      }}
    />
  )
}

function App() {
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
        if (scrollY >= section.offset) {
          setActiveSection(section.id)
        }
      }
      
      if (scrollY < 800) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <ScrollProgressBar />
      <FloatingWA />
      <AnimatePresence>
        <Navbar activeSection={activeSection} />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <TrustBar />
          <About />
          <PainPoints />
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

export default App
