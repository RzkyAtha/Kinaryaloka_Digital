import { motion } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useLanguage, Language } from '../context/LanguageContext'
import HeroBrandVisual from './HeroBrandVisual'
import WhatsAppPopup from './WhatsAppPopup'

const TYPEWRITER_PHRASES: Record<Language, { text: string; punctuation: string }[]> = {
  id: [
    { text: 'KINARYALOKA', punctuation: ',' },
    { text: 'menyambutmu', punctuation: '!' },
    { text: 'Bisnis kamu', punctuation: ',' },
    { text: 'butuh lebih dari', punctuation: '..' },
    { text: 'sekedar hadir', punctuation: '.' },
  ],
  en: [
    { text: 'Welcome', punctuation: '!' },
    { text: 'Your business', punctuation: ',' },
    { text: 'needs More than', punctuation: '..' },
    { text: 'just being present', punctuation: '.' },
  ],
  zh: [
    { text: '欢迎', punctuation: '！' },
    { text: '你的生意', punctuation: '，' },
    { text: '需要的不仅仅是', punctuation: '……' },
    { text: '简单地存在', punctuation: '。' },
  ],
}

function TypewriterTitle() {
  const { language } = useLanguage()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const phrases = TYPEWRITER_PHRASES[language] || TYPEWRITER_PHRASES.id
  const currentPhrase = phrases[phraseIndex % phrases.length]
  const fullText = currentPhrase.text

  // Reset typewriter when language changes
  useEffect(() => {
    setPhraseIndex(0)
    setDisplayText('')
    setIsDeleting(false)
  }, [language])

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      } else {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1800)
        return
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(fullText.slice(0, displayText.length - 1))
      } else {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
        return
      }
    }
  }, [displayText, isDeleting, fullText])

  useEffect(() => {
    const speed = isDeleting ? 40 : 80
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting])

  return (
    <div className="notranslate w-full min-h-[62px] sm:min-h-[82px] md:min-h-[100px] lg:min-h-[96px] flex items-center justify-center lg:justify-start" translate="no">
      <h1 className="font-climate whitespace-nowrap text-[28px] sm:text-[38px] md:text-[50px] lg:text-[54px] text-[#2a2a2a] leading-[1.15]">
        {displayText}
        <span className="text-[#F5C542]">{displayText.length === fullText.length ? currentPhrase.punctuation : ''}</span>
        <span className="inline-block w-[3px] h-[0.9em] bg-[#F5C542] ml-1 animate-pulse align-middle" />
      </h1>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  return (
    <section ref={sectionRef} className="min-h-screen bg-white pt-20 md:pt-16 lg:pt-16 pb-6 md:pb-10 relative overflow-hidden w-full">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-2 md:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-16 items-center w-full min-w-0">

          {/* Isometric - shows on top on mobile */}
          <motion.div
            className="relative w-full order-first lg:order-last min-w-0 -mt-4 -mb-12 sm:-mt-2 sm:-mb-8 lg:mt-0 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroBrandVisual />
          </motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 md:space-y-8 order-last lg:order-first w-full min-w-0 text-center lg:text-left lg:pl-32"
          >
            {/* Typewriter Title */}
            <TypewriterTitle />

            {/* Description - mobile */}
            <motion.p
              className="text-[#828282] text-[13px] leading-relaxed text-center mx-auto sm:hidden !mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Hadir membuatmu dilihat, kesan membuatmu berarti. 
            </motion.p>
            {/* Description - desktop */}
            <motion.p
              className="text-[#828282] hidden sm:block sm:text-[15px] md:text-[18px] lg:text-[15px] sm:max-w-[587px] lg:max-w-[460px] leading-relaxed text-justify lg:mx-0 sm:!mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Hadir membuatmu dilihat, kesan membuatmu berarti. Selamat datang di taman bermain kami!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-row justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 pt-1 md:pt-1 max-w-[300px] sm:max-w-none lg:max-w-[400px] mx-auto sm:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex-1 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-white w-full py-3 sm:py-4 md:py-5 lg:py-3 rounded-xl font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[14px] flex items-center justify-center shadow-lg text-center"
                  style={{ background: 'linear-gradient(135deg, #F5C542, #E5A830, #D4912A)', boxShadow: '0 4px 16px rgba(245,197,66,0.4)' }}
                  onClick={() => setShowWhatsApp(true)}
                >
                  <span>Ngobrol Dulu</span>
                </motion.button>
                <p className="text-[#999] text-xs text-center">Yuk, nanya-nanya dulu aja!</p>
              </div>
              <div className="flex-1 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-white w-full py-3 sm:py-4 md:py-5 lg:py-3 rounded-xl font-semibold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[14px] flex items-center justify-center shadow-lg text-center"
                  style={{ background: 'linear-gradient(135deg, #4a4a4a, #3a3a3a, #2a2a2a)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Lihat Paket</span>
                </motion.button>
                <p className="text-transparent text-xs text-center select-none" aria-hidden="true">&nbsp;</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <WhatsAppPopup open={showWhatsApp} onClose={() => setShowWhatsApp(false)} />
    </section>
  )
}
