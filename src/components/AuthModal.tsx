import { motion, AnimatePresence } from 'framer-motion'
import { X, User, ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

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

  // Handle Google Login Success
  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      // Decode JWT token to get user info
      const decoded: any = jwtDecode(credentialResponse.credential)
      
      console.log('Google User Data:', {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        googleId: decoded.sub
      })

      // TODO: Send to your backend API
      // Example:
      // fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: decoded.name,
      //     email: decoded.email,
      //     googleId: decoded.sub,
      //     avatar: decoded.picture,
      //     package: selectedPackage
      //   })
      // })

      // Show success message
      alert(`Selamat datang, ${decoded.name}! 🎉\n\nEmail: ${decoded.email}\nPaket: ${selectedPackage?.title || 'Belum dipilih'}`)
      
      // Close modal
      onClose()
      
      // Optional: Redirect to dashboard or save token
      // localStorage.setItem('user', JSON.stringify(decoded))
      // window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error decoding Google token:', error)
      alert('Terjadi kesalahan saat login dengan Google.')
    }
  }

  const handleGoogleError = () => {
    console.log('Google Login Failed')
    alert('Login dengan Google gagal. Silakan coba lagi.')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`${isLogin ? 'Login' : 'Signup'} dengan email: ${email}`)
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
                <div className="flex justify-center mb-4">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    width="300"
                    theme="outline"
                    text={isLogin ? "signin_with" : "signup_with"}
                    shape="rectangular"
                  />
                </div>

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
