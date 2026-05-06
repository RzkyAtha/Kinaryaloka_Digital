import { useState, useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShoppingCart, ArrowRight } from 'lucide-react'

// ─── Magic Card: 3D tilt + spotlight + glow border ──────────────────
function MagicCard({
  children,
  accentColor,
}: {
  children: React.ReactNode
  accentColor: string
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
      className="relative rounded-2xl overflow-hidden bg-[#fefefe] cursor-none"
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
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'webdesign', label: 'Web Design' },
  { id: 'branding', label: 'Branding' },
]

interface Product {
  title: string
  price: string
  image: string
  description: string
  color: string
  textColor: string
  badge?: string
}

interface TabData {
  featured: Product
  cards: Product[]
}

const products: Record<string, TabData> = {
  ecommerce: {
    featured: {
      title: 'E-Commerce Full Brand',
      price: '15000',
      image: '/Assets/wd_ungu.png',
      description: 'E-commerce profesional + identitas brand lengkap. Dari toko online canggih hingga visual brand yang siap bersaing.',
      color: '#831449',
      textColor: '#831449',
      badge: 'Flagship',
    },
    cards: [
      {
        title: 'Katalog Digital',
        price: '2500',
        image: '/Assets/wd_oren.png',
        description: 'Website katalog produk online. Pelanggan lihat produk & pesan langsung via WhatsApp. Tanpa ribet dengan payment gateway.',
        color: '#b76431',
        textColor: '#bb6732',
      },
      {
        title: 'Toko Online',
        price: '5000',
        image: '/Assets/wd_biru.png',
        description: 'Toko online lengkap dengan keranjang belanja & payment gateway. Pelanggan bisa checkout langsung di website kamu.',
        color: '#004896',
        textColor: '#004896',
      },
      {
        title: 'Olshop Full',
        price: '8000',
        image: '/Assets/wd_hijau.png',
        description: 'Platform jual beli penuh fitur seperti inventori, multi-varian produk, voucher diskon, hingga laporan penjualan real-time.',
        color: '#207224',
        textColor: '#004896',
      },
    ],
  },
  webdesign: {
    featured: {
      title: 'Full Digital Package',
      price: '12000',
      image: '/Assets/wd_ungu.png',
      description: 'Transformasi digital menyeluruh dari mulai sistem, website, hingga identitas visual dan strategi konten.',
      color: '#831449',
      textColor: '#831449',
      badge: 'Flagship',
    },
    cards: [
      {
        title: 'Paket Reservasi',
        price: '2500',
        image: '/Assets/wd_oren.png',
        description: 'Sistem booking online siap pakai tanpa perlu website. Ideal untuk bisnis layanan yang masih pakai manual.',
        color: '#b76431',
        textColor: '#bb6732',
      },
      {
        title: 'Website & Reservasi',
        price: '5000',
        image: '/Assets/wd_biru.png',
        description: 'Website profesional lengkap dengan sistem booking simpel. Bisnis kamu terlihat serius di mata pelanggan.',
        color: '#004896',
        textColor: '#004896',
      },
      {
        title: 'Website Pro',
        price: '8000',
        image: '/Assets/wd_hijau.png',
        description: 'Web design multi-halaman dengan sistem reservasi bertenaga database. Data pelanggan tersimpan rapi, bisa diakses kapan saja.',
        color: '#207224',
        textColor: '#004896',
      },
    ],
  },
  branding: {
    featured: {
      title: 'Paket Branding Lengkap',
      price: '4000',
      image: '/Assets/br_hijau.png',
      description: 'Solusi branding end-to-end: visual identity, semua copywriting, dan marketing kit siap pakai.',
      color: '#207224',
      textColor: '#207224',
      badge: 'Flagship',
    },
    cards: [
      {
        title: 'Paket Branding',
        price: '1500',
        image: '/Assets/br_oren.png',
        description: 'Identitas brand lengkap untuk membuat bisnismu profesional dan mudah diingat, dari logo hingga nama yang filosofis.',
        color: '#b76431',
        textColor: '#bb6732',
      },
      {
        title: 'Branding + Copywriting',
        price: '2500',
        image: '/Assets/br_biru.png',
        description: 'Branding lengkap dengan copywriting profesional untuk website, social media, dan marketing material.',
        color: '#004896',
        textColor: '#004896',
      },
      {
        title: 'Complete Branding',
        price: '4000',
        image: '/Assets/br_hijau.png',
        description: 'Solusi branding end-to-end: visual identity, semua copywriting, dan marketing kit siap pakai.',
        color: '#207224',
        textColor: '#004896',
      },
    ],
  },
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('ecommerce')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentProducts = products[activeTab as keyof typeof products]

  return (
    <section id="produk" className="bg-black py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">Produk Kami</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[#2a2a2a] p-1 rounded-xl flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#e9e9e9] text-black'
                    : 'bg-transparent text-white hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Product Card (Large) — with spotlight */}
        <motion.div
          className="mb-6 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MagicCard accentColor={currentProducts.featured.color}>
          <div className="grid md:grid-cols-[515px_1fr]">
            {/* Left - Image with zoom on hover */}
            <div className="relative h-[300px] md:h-[441px] overflow-hidden group">
              <motion.img
                src={currentProducts.featured.image}
                alt={currentProducts.featured.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Color tint overlay on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: currentProducts.featured.color + '20' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Right - Content */}
            <div className="p-8 relative">
              {/* Badge */}
              {currentProducts.featured.badge && (
                <div className="bg-[#e70000] text-white px-4 py-2 rounded-md font-semibold text-sm inline-block mb-4">
                  {currentProducts.featured.badge}
                </div>
              )}

              {/* Title */}
              <h3 className="font-bold text-[32px] md:text-[44px] text-[#404040] leading-tight mb-4">
                {currentProducts.featured.title}
              </h3>

              {/* Description */}
              <p className="text-[#9f9f9f] text-base md:text-lg leading-relaxed text-justify max-w-[671px] mb-6">
                {currentProducts.featured.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl md:text-[40px] font-semibold text-[#454545]">
                  <span style={{ color: currentProducts.featured.textColor }}>IDR</span>
                </span>
                <span className="text-2xl md:text-[40px] font-semibold text-[#454545]">
                  {currentProducts.featured.price}K
                </span>
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full md:w-[671px] py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 text-lg"
                style={{ backgroundColor: currentProducts.featured.color, boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ShoppingCart className="w-6 h-6" />
                Pilih Paket Ini
              </motion.button>

              {/* Detail Link */}
              <button 
                className="absolute top-8 right-8 text-lg font-semibold flex items-center gap-1 hover:underline"
                style={{ color: currentProducts.featured.textColor }}
              >
                Detail &gt;
              </button>
            </div>
          </div>
          </MagicCard>
        </motion.div>

        {/* 3 Smaller Product Cards — MagicCard */}
        <div className="grid md:grid-cols-3 gap-6">
          {currentProducts.cards.map((product: Product, index: number) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagicCard accentColor={product.color}>
                {/* Image with scale + color tint */}
                <div className="relative h-[200px] overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Color tint */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: product.color + '25' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  />
                  {/* Price floating tag that slides up on hover */}
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

                {/* Content */}
                <div className="p-6">
                  {/* Title and Detail */}
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      className="font-bold text-[28px] md:text-[32px] text-[#404040] leading-tight"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </motion.h3>
                    <motion.button
                      className="text-lg font-semibold flex items-center gap-1 whitespace-nowrap mt-2"
                      style={{ color: product.textColor }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Detail <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Description */}
                  <p className="text-[#9f9f9f] text-sm leading-relaxed text-justify mb-4">
                    {product.description}
                  </p>

                  {/* Price — pulses on mount */}
                  <motion.div
                    className="flex items-baseline gap-2 mb-4"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[28px] md:text-[32px] font-semibold" style={{ color: product.textColor }}>IDR</span>
                    <span className="text-[28px] md:text-[32px] font-semibold text-[#454545]">{product.price}K</span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                    style={{ backgroundColor: product.color, boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
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
      </div>
    </section>
  )
}
