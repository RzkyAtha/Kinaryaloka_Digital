import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage, Language } from '../context/LanguageContext'
import { X, Globe } from 'lucide-react'

const contacts = [
  { name: 'Atha', number: '6281219579683' },
  { name: 'Adhit', number: '6281357662424' },
]
const WA_MESSAGE = encodeURIComponent('Halo KINARYALOKA! Saya mau konsultasi gratis 30 menit untuk bisnis saya.')

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
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#2e2e2e] shadow-lg hover:bg-[#252525] transition-colors"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Ganti Bahasa"
      >
        <Globe className="w-3.5 h-3.5 text-[#F5C542]" />
        <span className="text-[10px] sm:text-xs font-semibold text-white/80">3 bahasa tersedia</span>
        <span className="flex gap-1 ml-1 items-center">
          {LANG_OPTIONS.map((l) => {
            const FlagComp = l.Flag
            return <span key={l.id} className="inline-block rounded-sm overflow-hidden shadow-sm"><FlagComp className="w-5 h-3.5" /></span>
          })}
        </span>
      </motion.button>

      {/* Popup modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
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
                  <Globe className="w-5 h-5 text-white" />
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
      </AnimatePresence>
    </>
  )
}

export default function FloatingWA() {
  const [showMenu, setShowMenu] = useState(false)

  const handleContact = (number: string) => {
    setShowMenu(false)
    window.open(`https://wa.me/${number}?text=${WA_MESSAGE}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-5 z-[9990] flex flex-col items-end gap-3">
      {/* Contact picker */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl shadow-2xl overflow-hidden min-w-[200px]"
          >
            <div className="px-4 py-2.5 border-b border-[#2e2e2e]">
              <p className="text-white text-sm font-bold">Hubungi via WhatsApp</p>
              <p className="text-[#888] text-[10px] mt-0.5">Pilih tim kami</p>
            </div>
            {contacts.map((c) => (
              <button
                key={c.number}
                onClick={() => handleContact(c.number)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{c.name}</p>
                  <p className="text-[#888] text-[10px]">Chat sekarang</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        onClick={() => setShowMenu((v) => !v)}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
        aria-label="Chat WhatsApp"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8 relative z-10" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </div>
  )
}
