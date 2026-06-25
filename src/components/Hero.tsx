import { motion } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useLanguage, Language } from '../context/LanguageContext'

const TYPEWRITER_PHRASES: Record<Language, { text: string; punctuation: string }[]> = {
  id: [
    { text: 'Selamat datang', punctuation: '!' },
    { text: 'Bisnis kamu', punctuation: ',' },
    { text: 'butuh Lebih dari', punctuation: '..' },
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
    <div className="notranslate min-h-[60px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[80px] flex items-center justify-center lg:justify-start" translate="no">
      <h1 className="font-poppins font-bold text-[32px] sm:text-[42px] md:text-[52px] lg:text-[56px] text-[#2a2a2a] leading-tight">
        {displayText}
        <span className="text-[#F5C542]">{displayText.length === fullText.length ? currentPhrase.punctuation : ''}</span>
        <span className="inline-block w-[3px] h-[0.9em] bg-[#F5C542] ml-1 animate-pulse align-middle" />
      </h1>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="min-h-screen bg-white pt-16 md:pt-20 lg:pt-20 pb-6 md:pb-10 relative overflow-hidden w-full">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-6 md:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full min-w-0">

          {/* Isometric - shows on top on mobile */}
          <motion.div
            className="relative w-full order-first lg:order-last min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[400px] md:max-w-[480px] mx-auto lg:max-w-[550px] lg:mr-auto lg:ml-0">

              {/* Hero image - main */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/Assets/KNY_deskTOPP.png"
                  alt="Digital Workspace"
                  className="w-full object-contain"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.div>
            </div>
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
              className="text-[#828282] text-[13px] leading-relaxed text-center mx-auto sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              KINARYALOKA untuk UMKM yang sudah siap.
            </motion.p>
            {/* Description - desktop */}
            <motion.p
              className="text-[#828282] hidden sm:block sm:text-[15px] md:text-[18px] lg:text-[15px] sm:max-w-[587px] lg:max-w-[460px] leading-relaxed text-justify lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              KINARYALOKA Digital Studio hadir untuk UMKM yang sudah siap kami
              bantu terjemahkan cara bisnis kamu jalan ke dalam sistem digital
              yang rapi, jelas, dan kepakai.
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
                  onClick={() => window.open('https://wa.me/6281357662424?text=' + encodeURIComponent('Halo KINARYALOKA! Saya mau konsultasi gratis 30 menit untuk bisnis saya.'), '_blank')}
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
    </section>
  )
}
