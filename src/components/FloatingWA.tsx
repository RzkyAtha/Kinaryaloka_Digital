import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage, Language } from '../context/LanguageContext'
import { XMarkIcon as X, LanguageIcon as Languages } from '@heroicons/react/24/solid'

function FlagID({ className = 'w-5 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <path fill="#e70011" d="M0 0h640v240H0z" />
      <path fill="#fff" d="M0 240h640v240H0z" />
    </svg>
  )
}

function FlagGB({ className = 'w-5 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
      <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
    </svg>
  )
}

function FlagCN({ className = 'w-5 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <path fill="#de2910" d="M0 0h640v480H0z" />
      <path fill="#ffde00" d="m87.2 192 16.5-50.6L54 113h53l16.4-50.6L139.7 113h53l-43 28.4 16.4 50.6-43-31.2-43 31.2z" />
      <path fill="#ffde00" d="m197 61.2 3.4-10.2-8.8-6.3h10.7l3.4-10.1 3.3 10.1h10.7l-8.7 6.3 3.3 10.2-8.7-6.4-8.6 6.4zm53.3 27.7 3.4-10.1-8.7-6.4h10.6l3.4-10.1 3.4 10.1h10.6l-8.7 6.4 3.4 10.1-8.7-6.3-8.7 6.3zm24 49 3.3-10.2-8.7-6.3h10.7l3.3-10.2 3.4 10.2h10.6l-8.7 6.3 3.4 10.2-8.7-6.4-8.6 6.4zm-24 49 3.4-10.1-8.7-6.4h10.6l3.4-10.1 3.4 10.1h10.6l-8.7 6.4 3.4 10.1-8.7-6.4-8.7 6.4z" />
    </svg>
  )
}

const LANG_OPTIONS: { id: Language; label: string; fullLabel: string; Flag: React.FC<{ className?: string }> }[] = [
  { id: 'id', label: 'ID', fullLabel: 'Bahasa Indonesia', Flag: FlagID },
  { id: 'en', label: 'EN', fullLabel: 'English', Flag: FlagGB },
  { id: 'zh', label: 'ZH', fullLabel: '中文 (Mandarin)', Flag: FlagCN },
]

export function LanguageBadge() {
  const { language, setLanguage, isTranslating } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      {/* Badge button */}
      <motion.button
        onClick={() => setShowPopup(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#2e2e2e] shadow-lg hover:bg-[#252525] transition-colors"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Ganti Bahasa"
      >
        <Languages className="w-4 h-4 text-[#F5C542]" />
        <span className="flex gap-1 items-center">
          {LANG_OPTIONS.map((l) => {
            const FlagComp = l.Flag
            return <span key={l.id} className="inline-block rounded-sm overflow-hidden shadow-sm"><FlagComp className="w-5 h-3.5" /></span>
          })}
        </span>
      </motion.button>

      {/* Popup modal — portaled to body to escape navbar stacking context */}
      {createPortal(
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
              <motion.div
                className="relative w-full max-w-sm rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(18,18,30,0.97) 0%, rgba(12,12,20,0.99) 100%)' }}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-3.5 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
                >
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-white" />
                    <h3 className="text-white font-bold text-sm">Pilih Bahasa</h3>
                  </div>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <p className="text-white/50 text-xs leading-relaxed">
                    Website ini tersedia dalam 3 bahasa. Pilih bahasa yang Anda inginkan di bawah ini. Jika bahasa belum berubah sepenuhnya, silakan refresh halaman.
                  </p>

                  {/* Language options */}
                  <div className="space-y-2">
                    {LANG_OPTIONS.map((lang) => {
                      const isActive = language === lang.id
                      return (
                        <button
                          key={lang.id}
                          onClick={() => {
                            setLanguage(lang.id)
                            if (lang.id !== 'id') setShowPopup(false)
                          }}
                          disabled={isTranslating}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                            isActive
                              ? 'border-[#F5C542]/50 bg-[#F5C542]/10'
                              : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10'
                          } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span className="inline-block rounded-sm overflow-hidden">{(() => { const F = lang.Flag; return <F className="w-8 h-6" /> })()}</span>
                          <div className="text-left flex-1">
                            <p className={`text-sm font-bold ${isActive ? 'text-[#F5C542]' : 'text-white'}`}>
                              {lang.fullLabel}
                            </p>
                            <p className="text-white/30 text-[10px]">{lang.label}</p>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}>
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                          {isTranslating && lang.id === language && (
                            <div className="w-4 h-4 border-2 border-[#F5C542]/30 border-t-[#F5C542] rounded-full animate-spin" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <p className="text-white/25 text-[10px] text-center leading-relaxed">
                    Terjemahan otomatis oleh Google Translate
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

