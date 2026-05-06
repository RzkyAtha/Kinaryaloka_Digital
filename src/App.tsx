import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Team from './components/Team'
import WhyDigital from './components/WhyDigital'
import Process from './components/Process'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

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
      <CustomCursor />
      <AnimatePresence>
        <Navbar activeSection={activeSection} />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
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
