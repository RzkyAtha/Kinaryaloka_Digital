import { motion, AnimatePresence } from 'framer-motion'
import { X, User, ShoppingCart, Check, Sparkles, PartyPopper, ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useState, useRef } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import confetti from 'canvas-confetti'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage?: { title: string; price: string } | null
}

// 🎉 Confetti Party Animation
const triggerConfetti = () => {
  const duration = 3000
  const end = Date.now() + duration

  const colors = ['#000000', '#ffffff', '#333333', '#666666']

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
  
  // Big burst in center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors
  })
}

export default function AuthModal({ isOpen, onClose, selectedPackage }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successData, setSuccessData] = useState<{name: string, email: string} | null>(null)

  // Admin secret access
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [showAdminPwd, setShowAdminPwd] = useState(false)
  const clickCountRef = useRef(0)
  const lastClickRef = useRef(0)
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Handle Google Login Success
  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential)
      
      console.log('Google User Data:', {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        googleId: decoded.sub
      })

      setSuccessData({ name: decoded.name, email: decoded.email })
      setShowSuccess(true)
      triggerConfetti()

      // TODO: Send to backend API
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
    // Simulate signup success
    setSuccessData({ name: name || 'User', email: email })
    setShowSuccess(true)
    triggerConfetti()
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    onClose()
  }

  const handleLoginButtonClick = (e: React.MouseEvent) => {
    const now = Date.now()
    if (clickCountRef.current === 1 && now - lastClickRef.current < 2000) {
      e.preventDefault()
      clickCountRef.current = 0
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
      setShowAdminLogin(true)
      return
    }
    clickCountRef.current = 1
    lastClickRef.current = now
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0 }, 2000)
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminUsername === 'admin' && adminPassword === '036012') {
      sessionStorage.setItem('kinaryaloka_admin_auth', '1')
      setAdminError('')
      onClose()
      window.location.hash = 'admin'
    } else {
      setAdminError('Username atau password salah.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9995]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Success Celebration Modal */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="fixed inset-0 z-[9997] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-4 border-black"
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.5, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {/* Success Header */}
                  <div className="bg-black px-6 py-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4"
                    >
                      <PartyPopper className="w-10 h-10 text-black" />
                    </motion.div>
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white font-black text-2xl md:text-3xl uppercase tracking-tight"
                    >
                      Selamat Bergabung!
                    </motion.h2>
                  </div>

                  {/* Success Content */}
                  <div className="p-6 md:p-8 text-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-black" />
                        <span className="text-black font-bold text-lg">Digitalisasi 5.0 Indonesia</span>
                        <Sparkles className="w-5 h-5 text-black" />
                      </div>
                      
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-2">
                        <span className="font-bold text-black">Selamat {successData?.name}!</span>
                      </p>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                        Anda telah menjadi bagian dari perjalanan <span className="font-bold text-black">Digitalisasi 5.0 Indonesia</span>. Bersama KINARYALOKA, bisnis Anda siap melaju ke era digital yang lebih maju.
                      </p>

                      <div className="bg-black text-white rounded-2xl p-4 mb-6">
                        <p className="text-sm uppercase tracking-wider mb-1">Email Terdaftar</p>
                        <p className="font-bold text-lg">{successData?.email}</p>
                      </div>

                      {selectedPackage && (
                        <div className="bg-gray-100 rounded-xl p-4 mb-6">
                          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Paket Dipilih</p>
                          <p className="font-bold text-black text-lg">{selectedPackage.title}</p>
                          <p className="text-gray-600">IDR {selectedPackage.price}K</p>
                        </div>
                      )}

                      <motion.button
                        onClick={handleCloseSuccess}
                        className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Mulai Perjalanan Digital 🚀
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Auth Modal */}
          {!showSuccess && (
            <motion.div
              className="fixed inset-0 z-[9996] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200"
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header - Black & White */}
                <div className="bg-black px-6 py-5 flex items-center justify-between">
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div 
                      className="w-11 h-11 bg-white rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 10 }}
                    >
                      {showAdminLogin ? (
                        <ShieldCheck className="w-5 h-5 text-black" />
                      ) : selectedPackage ? (
                        <ShoppingCart className="w-5 h-5 text-black" />
                      ) : (
                        <User className="w-5 h-5 text-black" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-white font-black text-xl tracking-tight">
                        {showAdminLogin ? 'ADMIN' : isLogin ? 'MASUK' : 'DAFTAR'}
                      </h3>
                      {!showAdminLogin && selectedPackage && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-white/70 text-xs"
                        >
                          {selectedPackage.title} • IDR {selectedPackage.price}K
                        </motion.p>
                      )}
                      {showAdminLogin && (
                        <p className="text-white/50 text-xs">KINARYALOKA Admin Panel</p>
                      )}
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={onClose}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">
                  {/* ── Admin Login (hidden trigger) ─────────────────── */}
                  <AnimatePresence mode="wait">
                  {showAdminLogin && (
                    <motion.div
                      key="admin-form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                    >
                      <button
                        onClick={() => { setShowAdminLogin(false); setAdminError('') }}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-black text-xs font-semibold mb-5 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke login
                      </button>
                      <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">Username</label>
                          <input
                            value={adminUsername}
                            onChange={e => setAdminUsername(e.target.value)}
                            required autoComplete="username" placeholder="Username admin"
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">Password</label>
                          <div className="relative">
                            <input
                              type={showAdminPwd ? 'text' : 'password'}
                              value={adminPassword}
                              onChange={e => setAdminPassword(e.target.value)}
                              required autoComplete="current-password" placeholder="Password admin"
                              className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all font-medium"
                            />
                            <button
                              type="button" onClick={() => setShowAdminPwd(v => !v)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                            >
                              {showAdminPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        {adminError && (
                          <p className="text-red-500 text-xs font-medium">{adminError}</p>
                        )}
                        <motion.button
                          type="submit"
                          className="w-full py-4 bg-black text-white font-bold text-base rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                        >
                          <ShieldCheck className="w-4 h-4" /> Masuk Admin
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                  </AnimatePresence>
                  {/* ── Normal Login / Register ──────────────────────── */}
                  {!showAdminLogin && (
                    <>
                      {/* Google Auth Button */}
                      <motion.div
                        className="flex justify-center mb-5"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                          size="large"
                          width="300"
                          theme="outline"
                          text={isLogin ? "signin_with" : "signup_with"}
                          shape="rectangular"
                        />
                      </motion.div>

                      {/* Divider */}
                      <motion.div
                        className="flex items-center gap-3 mb-5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-xs uppercase tracking-wider">atau dengan email</span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </motion.div>

                      {/* Email Form */}
                      <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {!isLogin && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">Nama Lengkap</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all duration-200 font-medium"
                              placeholder="Nama lengkap Anda"
                              required={!isLogin}
                            />
                          </motion.div>
                        )}
                        <div>
                          <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all duration-200 font-medium"
                            placeholder="nama@email.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all duration-200 font-medium"
                            placeholder="Minimal 8 karakter"
                            required
                          />
                        </div>

                        <motion.button
                          type="submit"
                          onClick={handleLoginButtonClick}
                          className="w-full py-4 bg-black text-white font-bold text-base rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg shadow-black/20"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isLogin ? 'Masuk Sekarang →' : 'Daftar & Gabung →'}
                        </motion.button>
                      </motion.form>

                      {/* Toggle */}
                      <motion.p
                        className="text-center text-gray-500 text-sm mt-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                        <motion.button
                          onClick={() => setIsLogin(!isLogin)}
                          className="text-black font-bold hover:underline"
                          whileHover={{ scale: 1.05 }}
                        >
                          {isLogin ? 'Daftar Gratis' : 'Masuk'}
                        </motion.button>
                      </motion.p>

                      {/* Benefits (shown on signup) */}
                      <AnimatePresence>
                        {!isLogin && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-5 pt-5 border-t-2 border-gray-100"
                          >
                            <p className="text-xs font-bold text-black uppercase tracking-wider mb-3">Keuntungan Member:</p>
                            <div className="space-y-2">
                              {[
                                'Simpan riwayat pesanan',
                                'Tracking project real-time',
                                'Akses diskon eksklusif',
                                'Prioritas customer support'
                              ].map((benefit, i) => (
                                <motion.div
                                  key={benefit}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 * i }}
                                >
                                  <motion.div
                                    className="w-5 h-5 bg-black rounded-md flex items-center justify-center"
                                    whileHover={{ rotate: 360 }}
                                  >
                                    <Check className="w-3 h-3 text-white" />
                                  </motion.div>
                                  {benefit}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
