import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon as X,
  ArrowRightIcon as ArrowRight,
  ArrowLeftIcon as ArrowLeft,
  CheckIcon as Check,
  PaperAirplaneIcon as Send,
  ArrowDownTrayIcon as Download,
} from '@heroicons/react/24/solid'
import type { QuoteForm, QuoteProduct } from '../lib/quoteText'
import { makeQuoteRef, buildQuoteFileName } from '../lib/quoteText'
import { generateQuotePdf } from '../lib/generateQuotePdf'
import { submitQuote } from '../lib/submitQuote'
import { BUSINESS_WHATSAPP } from '../config/quote'

export interface RequestQuoteProduct extends QuoteProduct {
  textColor?: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  product: RequestQuoteProduct | null
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: QuoteForm = {
  fullName: '',
  email: '',
  whatsapp: '',
  businessName: '',
  industry: '',
  city: '',
  existingWebOrSocial: '',
  needsDescription: '',
  selectedFeatures: [],
  customFeatures: '',
  deadline: '',
  budgetEstimate: '',
  referenceLinks: '',
  notes: '',
  contactPreference: 'whatsapp',
}

export default function RequestQuoteModal({ isOpen, onClose, product }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<QuoteForm>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [lastBlob, setLastBlob] = useState<Blob | null>(null)
  const [lastFileName, setLastFileName] = useState('')

  const accent = product?.color ?? '#000000'

  const set = <K extends keyof QuoteForm>(key: K, value: QuoteForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleFeature = (feat: string) =>
    setForm((f) => ({
      ...f,
      selectedFeatures: f.selectedFeatures.includes(feat)
        ? f.selectedFeatures.filter((x) => x !== feat)
        : [...f.selectedFeatures, feat],
    }))

  const reset = () => {
    setStep(1)
    setForm(EMPTY)
    setStatus('idle')
    setErrorMsg('')
    setLastBlob(null)
    setLastFileName('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const step1Valid =
    form.fullName.trim() &&
    emailValid &&
    form.whatsapp.trim() &&
    form.businessName.trim()
  const step2Valid = form.needsDescription.trim()

  const downloadPdf = () => {
    if (!lastBlob) return
    const url = URL.createObjectURL(lastBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = lastFileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const fallbackWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo KINARYALOKA, saya ${form.fullName} dari ${form.businessName} ingin request paket ${product?.title}. (PDF brief akan saya lampirkan)`,
    )
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${text}`, '_blank')
  }

  const handleSend = async () => {
    if (!product) return
    try {
      setStatus('sending')
      const ref = makeQuoteRef()
      const fileName = buildQuoteFileName(ref)
      const { blob, base64 } = await generateQuotePdf(form, product, ref)
      setLastBlob(blob)
      setLastFileName(fileName)

      await submitQuote({ form, product, ref, pdfBase64: base64, fileName })
      setStatus('success')
    } catch (err) {
      console.error(err)
      setErrorMsg(
        err instanceof Error ? err.message : 'Terjadi kesalahan saat mengirim.',
      )
      setStatus('error')
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none transition-all font-medium text-sm'
  const labelCls =
    'text-xs font-bold text-black uppercase tracking-wider block mb-1.5'

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9995]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-[9996] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-6 py-5 flex items-center justify-between flex-shrink-0"
                style={{ background: accent }}
              >
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">
                    Pilih Paket Ini
                  </h3>
                  <p className="text-white/80 text-xs">
                    {product.title} • IDR {product.price}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto">
                {status === 'success' ? (
                  <div className="text-center py-6">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ background: accent }}
                    >
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-black mb-2">
                      Request Terkirim!
                    </h4>
                    <p className="text-gray-600 text-sm mb-6">
                      Tim KINARYALOKA akan mengirim quote harga final ke email kamu
                      melalui Xero. Terima kasih!
                    </p>
                    <button
                      onClick={downloadPdf}
                      className="w-full py-3 rounded-xl border-2 border-black text-black font-bold text-sm flex items-center justify-center gap-2 mb-2"
                    >
                      <Download className="w-4 h-4" /> Unduh PDF
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full py-3 rounded-xl bg-black text-white font-bold text-sm"
                    >
                      Selesai
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Stepper */}
                    <div className="flex items-center gap-2 mb-5">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className="h-1.5 flex-1 rounded-full transition-colors"
                          style={{ background: s <= step ? accent : '#e5e7eb' }}
                        />
                      ))}
                    </div>

                    {step === 1 && (
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Nama Lengkap *</label>
                          <input
                            className={inputCls}
                            value={form.fullName}
                            onChange={(e) => set('fullName', e.target.value)}
                            placeholder="Nama kamu"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Email *</label>
                          <input
                            type="email"
                            className={inputCls}
                            value={form.email}
                            onChange={(e) => set('email', e.target.value)}
                            placeholder="email@kamu.com"
                          />
                          <p className="text-[11px] text-gray-400 mt-1">
                            Quote harga final akan dikirim ke email ini.
                          </p>
                        </div>
                        <div>
                          <label className={labelCls}>WhatsApp *</label>
                          <input
                            className={inputCls}
                            value={form.whatsapp}
                            onChange={(e) => set('whatsapp', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Nama Bisnis / Brand *</label>
                          <input
                            className={inputCls}
                            value={form.businessName}
                            onChange={(e) => set('businessName', e.target.value)}
                            placeholder="Nama bisnis"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Industri</label>
                            <input
                              className={inputCls}
                              value={form.industry}
                              onChange={(e) => set('industry', e.target.value)}
                              placeholder="mis. F&B"
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Kota</label>
                            <input
                              className={inputCls}
                              value={form.city}
                              onChange={(e) => set('city', e.target.value)}
                              placeholder="mis. Bandung"
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Website / Sosmed (opsional)</label>
                          <input
                            className={inputCls}
                            value={form.existingWebOrSocial}
                            onChange={(e) =>
                              set('existingWebOrSocial', e.target.value)
                            }
                            placeholder="@instagram / url"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Deskripsi Kebutuhan *</label>
                          <textarea
                            className={inputCls}
                            rows={3}
                            value={form.needsDescription}
                            onChange={(e) =>
                              set('needsDescription', e.target.value)
                            }
                            placeholder="Ceritakan tujuan & kebutuhanmu"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Fitur yang Diinginkan</label>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                            {product.details.map((feat) => (
                              <label
                                key={feat}
                                className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={form.selectedFeatures.includes(feat)}
                                  onChange={() => toggleFeature(feat)}
                                  className="mt-0.5"
                                />
                                {feat}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Fitur Tambahan (opsional)</label>
                          <input
                            className={inputCls}
                            value={form.customFeatures}
                            onChange={(e) => set('customFeatures', e.target.value)}
                            placeholder="Fitur lain di luar daftar"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Target Deadline</label>
                            <input
                              type="date"
                              className={inputCls}
                              value={form.deadline}
                              onChange={(e) => set('deadline', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Estimasi Budget</label>
                            <input
                              className={inputCls}
                              value={form.budgetEstimate}
                              onChange={(e) =>
                                set('budgetEstimate', e.target.value)
                              }
                              placeholder="mis. 5jt"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Link Referensi (opsional)</label>
                          <input
                            className={inputCls}
                            value={form.referenceLinks}
                            onChange={(e) => set('referenceLinks', e.target.value)}
                            placeholder="Link contoh yang kamu suka"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Catatan (opsional)</label>
                          <textarea
                            className={inputCls}
                            rows={2}
                            value={form.notes}
                            onChange={(e) => set('notes', e.target.value)}
                            placeholder="Catatan tambahan"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Preferensi Kontak</label>
                          <select
                            className={inputCls}
                            value={form.contactPreference}
                            onChange={(e) =>
                              set(
                                'contactPreference',
                                e.target.value as QuoteForm['contactPreference'],
                              )
                            }
                          >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                            <option value="phone">Telepon</option>
                          </select>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-3 text-sm">
                          <p className="font-bold text-black">{product.title}</p>
                          <p className="text-gray-600">IDR {product.price}</p>
                        </div>
                        {status === 'error' && (
                          <div className="text-red-600 text-xs font-medium">
                            {errorMsg}
                            <button
                              onClick={fallbackWhatsApp}
                              className="block mt-2 underline font-bold"
                            >
                              Kirim via WhatsApp
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Nav buttons */}
                    <div className="flex gap-3 mt-6">
                      {step > 1 && (
                        <button
                          onClick={() => setStep((s) => s - 1)}
                          className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm flex items-center gap-1"
                        >
                          <ArrowLeft className="w-4 h-4" /> Kembali
                        </button>
                      )}
                      {step < 3 && (
                        <button
                          onClick={() => setStep((s) => s + 1)}
                          disabled={
                            (step === 1 && !step1Valid) ||
                            (step === 2 && !step2Valid)
                          }
                          className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-1 disabled:opacity-50"
                          style={{ background: accent }}
                        >
                          Lanjut <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {step === 3 && (
                        <button
                          onClick={handleSend}
                          disabled={status === 'sending'}
                          className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                          style={{ background: accent }}
                        >
                          {status === 'sending' ? (
                            'Mengirim...'
                          ) : (
                            <>
                              <Send className="w-4 h-4" /> Kirim Request
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
