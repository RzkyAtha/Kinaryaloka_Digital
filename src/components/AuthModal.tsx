import { motion, AnimatePresence } from 'framer-motion'
import { X, User, ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage?: { title: string; price: string } | null
}

export default function AuthModal({ isOpen, onClose, selectedPackage }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleGoogleAuth = () => {
    // TODO: Integrate with Google OAuth
    // window.location.href = '/api/auth/google'
    alert('Google OAuth integration - redirecting to Google...')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle email/password auth
    alert(`${isLogin ? 'Login' : 'Signup'} with email: ${email}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9995]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9996] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#831449] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    {selectedPackage ? (
                      <ShoppingCart className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {isLogin ? 'Masuk' : 'Daftar'}
                    </h3>
                    {selectedPackage && (
                      <p className="text-white/80 text-xs">
                        {selectedPackage.title} - IDR {selectedPackage.price}K
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Google Auth Button */}
                <motion.button
                  onClick={handleGoogleAuth}
                  className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-4"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Lanjutkan dengan Google
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-sm">atau</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {!isLogin && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#831449] focus:outline-none transition-colors"
                        placeholder="Nama Anda"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#831449] focus:outline-none transition-colors"
                      placeholder="email@anda.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#831449] focus:outline-none transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-[#831449] text-white font-semibold rounded-xl hover:bg-[#6a1139] transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isLogin ? 'Masuk' : 'Daftar Sekarang'}
                  </motion.button>
                </form>

                {/* Toggle */}
                <p className="text-center text-gray-500 text-sm mt-4">
                  {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#831449] font-semibold hover:underline"
                  >
                    {isLogin ? 'Daftar' : 'Masuk'}
                  </button>
                </p>

                {/* Benefits (shown on signup) */}
                {!isLogin && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Keuntungan mendaftar:</p>
                    <div className="space-y-1">
                      {['Simpan riwayat pesanan', 'Tracking project real-time', 'Akses diskon eksklusif'].map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="w-3 h-3 text-[#831449]" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
