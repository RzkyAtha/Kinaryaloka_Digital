import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShoppingCart, X, Check } from 'lucide-react'
import AuthModal from './AuthModal'
import { PRODUCTS, Product as CtxProduct } from '../context/ProductsContext'

// ─── Magic Card: 3D tilt + spotlight + glow border ──────────────────
function MagicCard({
  children,
  accentColor,
  fullHeight = false,
}: {
  children: React.ReactNode
  accentColor: string
  fullHeight?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [spotX, setSpotX] = useState(50)
  const [spotY, setSpotY] = useState(50)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spring = { stiffness: 200, damping: 22, mass: 0.4 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), spring)
  const scale = useSpring(isHovered ? 1.04 : 1, { stiffness: 300, damping: 25 })
  const shadowY = useSpring(isHovered ? 40 : 8, { stiffness: 300, damping: 25 })
  const shadowBlur = useSpring(isHovered ? 60 : 16, { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relX)
    mouseY.set(relY)
    setSpotX(((e.clientX - rect.left) / rect.width) * 100)
    setSpotY(((e.clientY - rect.top) / rect.height) * 100)
  }, [mouseX, mouseY])

  const handleLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? `0 ${shadowY.get()}px ${shadowBlur.get()}px -12px ${accentColor}80, 0 20px 40px -8px rgba(0,0,0,0.3)`
          : '0 4px 16px rgba(0,0,0,0.15)',
      }}
      className={`magic-card-3d relative rounded-2xl overflow-hidden bg-[#fefefe] cursor-pointer${fullHeight ? ' flex flex-col h-full' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
    >
      {/* Gradient border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        animate={isHovered ? {
          boxShadow: `inset 0 0 0 1.5px ${accentColor}60`,
          opacity: 1
        } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(circle 180px at ${spotX}% ${spotY}%, rgba(255,255,255,0.18) 0%, transparent 70%)`
            : 'none',
          transition: 'background 0.05s',
        }}
      />

      {children}
    </motion.div>
  )
}

const tabs = [
  { id: 'ecommerce', label: 'E-Commerce', color: '#F5C542', glow: '#F5C54250' },
  { id: 'webdesign', label: 'Web Design', color: '#E5A830', glow: '#E5A83050' },
  { id: 'branding', label: 'Branding',   color: '#D4912A', glow: '#D4912A50' },
]

interface UIProduct {
  title: string
  price: string
  image: string
  description: string
  color: string
  textColor: string
  badge?: string
  details?: string[]
}

interface TabData {
  featured?: UIProduct
  cards: UIProduct[]
}

function toUIProduct(p: CtxProduct): UIProduct {
  return {
    title: p.name,
    price: p.price,
    image: p.image,
    description: p.description,
    color: p.color,
    textColor: p.textColor,
    badge: p.badge,
    details: p.details,
  }
}

function groupProducts(ctxProducts: CtxProduct[]): Record<string, TabData> {
  const result: Record<string, TabData> = {
    ecommerce: { cards: [] },
    webdesign: { cards: [] },
    branding: { cards: [] },
  }
  for (const p of ctxProducts) {
    const ui = toUIProduct(p)
    if (p.isFeatured) {
      result[p.category].featured = ui
    } else {
      result[p.category].cards.push(ui)
    }
  }
  return result
}

function DetailModal({ product, onClose, onSelect }: { product: UIProduct | null; onClose: () => void; onSelect: (title: string, price: string) => void }) {
  if (!product) return null
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: '#fff' }}
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image strip */}
            <div className="relative h-32 overflow-hidden flex-shrink-0">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${product.color}99, ${product.color}ee)` }} />
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {product.badge && (
                  <span className="bg-[#e70000] text-white text-xs font-bold px-3 py-1 rounded-lg mr-2">{product.badge}</span>
                )}
                <h3 className="text-white font-bold text-2xl leading-tight">{product.title}</h3>
                <p className="text-white/80 text-sm font-semibold mt-0.5">IDR {product.price}K</p>
              </div>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature list */}
            <div className="overflow-y-auto flex-1 p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: product.color }}>Yang Kamu Dapatkan</p>
              <ul className="space-y-2.5">
                {product.details?.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: product.color + '20' }}>
                      <Check className="w-3 h-3" style={{ color: product.color }} />
                    </div>
                    <span className="text-[#404040] text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="p-5 pt-0 flex-shrink-0">
              <motion.button
                onClick={() => { onSelect(product.title, product.price); onClose() }}
                className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-base"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}dd)`, boxShadow: `0 4px 20px ${product.color}50` }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Pilih Paket Ini
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('ecommerce')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ title: string; price: string } | null>(null)
  const [detailProduct, setDetailProduct] = useState<UIProduct | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const products = useMemo(() => groupProducts(PRODUCTS), [])

  const handleSelectPackage = (title: string, price: string) => {
    setSelectedPackage({ title, price })
    setAuthModalOpen(true)
  }

  const currentProducts = products[activeTab as keyof typeof products]

  // Merge all products for mobile layout
  const allMobileProducts: UIProduct[] = useMemo(() => {
    const all: UIProduct[] = []
    if (currentProducts.featured) all.push(currentProducts.featured)
    all.push(...currentProducts.cards)
    return all
  }, [currentProducts])
  const isOddCount = allMobileProducts.length % 2 !== 0

  return (
    <section id="produk" className="bg-black py-12 md:py-20" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Produk Kami</h2>
          <p className="text-white/50 text-sm md:text-base mt-3">Harga fleksibel dan bisa nego sesuai kebutuhan.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[#1a1a1a] p-1.5 rounded-2xl flex gap-1 border border-[#2a2a2a]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-5 md:px-7 py-2.5 md:py-3 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-colors duration-200 outline-none cursor-pointer"
                  style={{ color: isActive ? '#fff' : '#666' }}
                >
                  {/* Sliding pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-xl z-0"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  {/* Glow when active */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-glow"
                      className="absolute inset-0 rounded-xl z-0 blur-md"
                      style={{ backgroundColor: tab.glow }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  {/* Label */}
                  <span className="relative z-10">
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Cards — crossfade on tab change */}
        <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >

        {/* ═══ MOBILE LAYOUT ═══ */}
        <div className="md:hidden">
          {/* If odd: first product is standalone large card */}
          {isOddCount && allMobileProducts.length > 0 && (
            <motion.div
              className="mb-3 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MagicCard accentColor={allMobileProducts[0].color}>
                <div className="relative h-[160px] overflow-hidden">
                  <img src={allMobileProducts[0].image} alt={allMobileProducts[0].title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-3 relative">
                  {allMobileProducts[0].badge && (
                    <div className="bg-[#e70000] text-white px-2.5 py-1 rounded-lg font-bold text-[10px] inline-block mb-2">{allMobileProducts[0].badge}</div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[16px] text-[#404040] leading-tight">{allMobileProducts[0].title}</h3>
                    <button onClick={() => setDetailProduct(allMobileProducts[0])} className="text-[11px] font-semibold flex items-center gap-0.5 whitespace-nowrap" style={{ color: allMobileProducts[0].textColor }}>
                      Detail
                    </button>
                  </div>
                  <p className="text-[#9f9f9f] text-[11px] leading-relaxed mb-2">{allMobileProducts[0].description}</p>
                  <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className="text-[18px] font-semibold" style={{ color: allMobileProducts[0].textColor }}>IDR</span>
                    <span className="text-[18px] font-semibold text-[#454545]">{allMobileProducts[0].price}K</span>
                  </div>
                  <motion.button
                    onClick={() => handleSelectPackage(allMobileProducts[0].title, allMobileProducts[0].price)}
                    className="w-full py-2.5 rounded-lg text-white font-semibold flex items-center justify-center gap-1.5 text-[12px]"
                    style={{ background: `linear-gradient(135deg, ${allMobileProducts[0].color}, ${allMobileProducts[0].color}cc)`, boxShadow: `0 4px 16px ${allMobileProducts[0].color}50` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Pilih Paket Ini
                  </motion.button>
                </div>
              </MagicCard>
            </motion.div>
          )}

          {/* 2x2 grid for remaining (or all if even) */}
          <div className="grid grid-cols-2 gap-2.5">
            {(isOddCount ? allMobileProducts.slice(1) : allMobileProducts).map((product, index) => (
              <motion.div
                key={product.title}
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagicCard accentColor={product.color} fullHeight>
                  <div className="relative h-[110px] overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2.5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-bold text-[13px] text-[#404040] leading-tight">
                        {product.title}
                      </h3>
                      <button onClick={() => setDetailProduct(product)} className="text-[10px] font-semibold flex items-center gap-0.5 whitespace-nowrap shrink-0 ml-1" style={{ color: product.textColor }}>
                        Detail
                      </button>
                    </div>
                    <p className="text-[#9f9f9f] text-[10px] leading-relaxed mb-1.5">{product.description}</p>
                    <div className="flex items-baseline gap-1 mb-2 mt-auto">
                      <span className="text-[14px] font-semibold" style={{ color: product.textColor }}>IDR</span>
                      <span className="text-[14px] font-semibold text-[#454545]">{product.price}K</span>
                    </div>
                    <motion.button
                      onClick={() => handleSelectPackage(product.title, product.price)}
                      className="w-full py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-1.5 text-[11px]"
                      style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`, boxShadow: `0 4px 16px ${product.color}50` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Pilih Paket Ini
                    </motion.button>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ DESKTOP LAYOUT ═══ */}
        <div className="hidden md:block">

        {/* Featured Product Card (Large) — with spotlight */}
        {currentProducts.featured && (
        <motion.div
          className="mb-6 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MagicCard accentColor={currentProducts.featured.color}>
          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
            {/* Left - Image */}
            <div className="relative h-[300px] overflow-hidden group">
              <motion.img
                src={currentProducts.featured.image}
                alt={currentProducts.featured.title}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: currentProducts.featured.color + '20' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Right - Content */}
            <div className="p-6 relative">
              {currentProducts.featured.badge && (
                <div className="bg-[#e70000] text-white px-3 py-1.5 rounded-lg font-bold text-xs inline-block mb-3">
                  {currentProducts.featured.badge}
                </div>
              )}
              <h3 className="font-bold text-[24px] lg:text-[30px] text-[#404040] leading-tight mb-3">
                {currentProducts.featured.title}
              </h3>
              <p className="text-[#9f9f9f] text-sm lg:text-base leading-relaxed text-justify max-w-[671px] mb-4">
                {currentProducts.featured.description}
              </p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl lg:text-2xl font-semibold" style={{ color: currentProducts.featured.textColor }}>IDR</span>
                <span className="text-xl lg:text-2xl font-semibold text-[#454545]">{currentProducts.featured.price}K</span>
              </div>
              <motion.button
                onClick={() => handleSelectPackage(currentProducts.featured!.title, currentProducts.featured!.price)}
                className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-base"
                style={{ background: `linear-gradient(135deg, ${currentProducts.featured.color}, ${currentProducts.featured.color}cc)`, boxShadow: `0 4px 16px ${currentProducts.featured.color}50` }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ShoppingCart className="w-6 h-6" />
                Pilih Paket Ini
              </motion.button>
              <button
                onClick={() => setDetailProduct(currentProducts.featured!)}
                className="absolute top-6 right-6 text-sm font-semibold flex items-center gap-1.5 hover:underline cursor-pointer transition-colors duration-200"
                style={{ color: currentProducts.featured.textColor }}
              >
                Detail
              </button>
            </div>
          </div>
          </MagicCard>
        </motion.div>
        )}

        {/* 3 Smaller Product Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {currentProducts.cards.map((product: UIProduct, index: number) => (
            <motion.div
              key={product.title}
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagicCard accentColor={product.color} fullHeight>
                <div className="relative h-[160px] overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: product.color + '25' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  />
                  <motion.div
                    className="absolute bottom-3 right-3 px-3 py-1 rounded-lg text-white font-bold text-sm"
                    style={{ backgroundColor: product.color }}
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    IDR {product.price}K
                  </motion.div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      className="font-bold text-[20px] md:text-[22px] text-[#404040] leading-tight"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </motion.h3>
                    <motion.button
                      onClick={() => setDetailProduct(product)}
                      className="text-sm font-semibold flex items-center gap-1 whitespace-nowrap mt-1"
                      style={{ color: product.textColor }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Detail
                    </motion.button>
                  </div>
                  <p className="text-[#9f9f9f] text-xs leading-relaxed text-justify mb-3 flex-1">
                    {product.description}
                  </p>
                  <motion.div
                    className="flex items-baseline gap-2 mb-4"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg md:text-xl font-semibold" style={{ color: product.textColor }}>IDR</span>
                    <span className="text-lg md:text-xl font-semibold text-[#454545]">{product.price}K</span>
                  </motion.div>
                  <motion.button
                    onClick={() => handleSelectPackage(product.title, product.price)}
                    className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`, boxShadow: `0 4px 16px ${product.color}50` }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${product.color}60` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Pilih Paket Ini
                  </motion.button>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        </div>{/* end desktop layout */}

        </motion.div>
        </AnimatePresence>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          selectedPackage={selectedPackage}
        />

        {/* Detail Modal */}
        <DetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onSelect={handleSelectPackage}
        />
      </div>
    </section>
  )
}
