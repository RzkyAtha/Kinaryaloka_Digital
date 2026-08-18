import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon as X } from '@heroicons/react/24/solid'

export const WA_CONTACTS = [
  { name: 'Atha', number: '6281219579683', role: 'Mastermind' },
  { name: 'Adhit', number: '6281357662424', role: 'Manager' },
]

export const WA_MESSAGE = encodeURIComponent(
  'Halo KINARYALOKA! Saya mau konsultasi gratis 30 menit untuk bisnis saya.'
)

function WhatsAppGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function WhatsAppPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const openChat = (number: string) => {
    onClose()
    window.open(`https://wa.me/${number}?text=${WA_MESSAGE}`, '_blank')
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Hubungi via WhatsApp"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(18,18,30,0.97) 0%, rgba(12,12,20,0.99) 100%)' }}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative flex items-center justify-between px-5 py-3.5"
              style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
            >
              <div className="flex items-center gap-2 text-white">
                <WhatsAppGlyph className="h-5 w-5" />
                <h3 className="text-sm font-bold">Ngobrol Dulu Yuk</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
                aria-label="Tutup"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-xs leading-relaxed text-white/50">
                Konsultasi gratis 30 menit, tanpa biaya dan tanpa keharusan lanjut. Pilih tim yang mau kamu ajak ngobrol.
              </p>

              <div className="space-y-2">
                {WA_CONTACTS.map((c) => (
                  <button
                    key={c.number}
                    onClick={() => openChat(c.number)}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition-all hover:border-white/10 hover:bg-white/5"
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}
                    >
                      <WhatsAppGlyph className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-white">{c.name}</span>
                      <span className="block text-[10px] text-white/35">{c.role}</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5C542]">Chat</span>
                  </button>
                ))}
              </div>

              <p className="text-center text-[10px] leading-relaxed text-white/25">
                Kamu akan diarahkan ke WhatsApp dengan pesan pembuka yang sudah siap.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
