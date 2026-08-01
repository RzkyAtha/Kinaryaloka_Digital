import { motion, AnimatePresence } from 'framer-motion'
import { ArrowTopRightOnSquareIcon as ExternalLink, GlobeAltIcon as Globe, XMarkIcon as X, ChevronLeftIcon as ChevronLeft, ChevronRightIcon as ChevronRight, PhotoIcon as Image } from '@heroicons/react/24/solid'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { PORTFOLIO_PROJECTS, PortfolioProject, PortfolioCategory, PortfolioSubcategory } from '../context/PortfolioContext'

const mainTabs: { id: PortfolioCategory; label: string; color: string; glow: string }[] = [
  { id: 'Website', label: 'Website', color: '#E5A830', glow: '#E5A83050' },
  { id: 'Design', label: 'Design', color: '#D4912A', glow: '#D4912A50' },
]

const subTabs: Record<PortfolioCategory, { id: PortfolioSubcategory; label: string }[]> = {
  Website: [
    { id: 'Reservasi', label: 'Reservasi' },
    { id: 'E-Commerce', label: 'E-Commerce' },
    { id: 'Company Profile', label: 'Company Profile' },
  ],
  Design: [
    { id: 'UI/UX', label: 'UI/UX' },
    { id: 'Branding', label: 'Branding' },
  ],
}

function ThumbnailImage({ src, alt, hasUrl, url, isDesign }: { src?: string; alt: string; hasUrl: boolean; url?: string; isDesign?: boolean }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const imgSrc = src || (hasUrl && url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500` : '')

  return (
    <>
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-3 border-gray-300 border-t-[#D4912A] animate-spin" />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2">
          <Globe className="w-8 h-8 text-gray-300" />
          <span className="text-xs text-gray-400">Gagal memuat gambar</span>
        </div>
      )}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          loading="eager"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${isDesign ? 'scale-[1.05]' : ''}`}
        />
      )}
    </>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Lightbox Slideshow ──────────────────────────────────────────────────────
function Lightbox({
  project,
  onClose,
}: {
  project: PortfolioProject
  onClose: () => void
}) {
  const images = useMemo(() => {
    const list: string[] = []
    if (project.thumbnail) list.push(project.thumbnail)
    if (project.images) list.push(...project.images)
    return list
  }, [project])

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = useCallback(() => {
    if (images.length <= 1) return
    setDirection(1)
    setCurrent(prev => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    if (images.length <= 1) return
    setDirection(-1)
    setCurrent(prev => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, goNext, goPrev])

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = e.changedTouches[0].clientX - touchStart
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext()
      else goPrev()
    }
    setTouchStart(null)
  }

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (images.length === 0) return null

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="text-white">
          <h3 className="font-bold text-base sm:text-lg truncate max-w-[60vw]">{project.name}</h3>
          <p className="text-white/50 text-xs">{current + 1} / {images.length}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image area */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-16 py-20"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`${project.name} - ${current + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl select-none"
            draggable={false}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-6 h-2 bg-[#F5C542]'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── Main Portfolio Component ────────────────────────────────────────────────
export default function Portfolio() {
  const projects = PORTFOLIO_PROJECTS
  const [mainCategory, setMainCategory] = useState<PortfolioCategory>('Website')
  const [activeSub, setActiveSub] = useState<PortfolioSubcategory>(subTabs['Website'][0].id)
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null)

  const filteredProjects = useMemo(
    () => projects.filter((p) =>
      p.category === mainCategory && p.subcategory === activeSub
    ),
    [projects, mainCategory, activeSub]
  )

  const currentMainTab = mainTabs.find(t => t.id === mainCategory)!
  const currentSubTabs = subTabs[mainCategory]

  return (
    <section className="min-h-screen bg-[#f5f5f5] pt-32 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <span className="inline-block px-5 py-2 rounded-lg text-white font-bold text-sm mb-4 tracking-wide" style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}>
            PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2a2a2a] mb-4">
            Projek yang Telah <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #F5C542, #D4912A)' }}>Kami</span> Kerjakan
          </h2>
        </motion.div>

        {/* Main Category Tabs */}
        <motion.div
          className="flex flex-col items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[#1a1a1a] p-1.5 rounded-2xl flex gap-1 border border-[#2a2a2a]">
            {mainTabs.map((tab) => {
              const isActive = mainCategory === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => { setMainCategory(tab.id); setActiveSub(subTabs[tab.id][0].id) }}
                  className="relative px-6 md:px-10 py-2.5 md:py-3 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-colors duration-200 outline-none cursor-pointer"
                  style={{ color: isActive ? '#fff' : '#666' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-tab-pill"
                      className="absolute inset-0 rounded-xl z-0"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-tab-glow"
                      className="absolute inset-0 rounded-xl z-0 blur-md"
                      style={{ backgroundColor: tab.glow }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Sub-category pills */}
          <div className="flex gap-2">
            {currentSubTabs.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(sub.id)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeSub === sub.id
                    ? 'text-white shadow-md'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
                style={activeSub === sub.id ? { background: currentMainTab.color } : {}}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Subtitle */}
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto inline-flex items-center justify-center flex-wrap gap-1 mt-2">
            <span>Produk kami dapat dikenali dengan adanya</span>
            <span className="inline-flex items-center gap-1.5 bg-[#2a2a2a] rounded-md px-2.5 py-1">
              <span className="text-gray-300 text-xs font-medium">Powered by</span>
              <img src="/Assets/logo_kinarya.webp" alt="Kinaryaloka" className="h-4 w-4 object-contain" />
            </span>
            <span>di tiap footer websitenya, hak cipta dilindungi.</span>
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <AnimatePresence mode="popLayout">
        <motion.div
          key={`${mainCategory}-${activeSub}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -12 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => {
            const hasUrl = !!project.url
            const hasGallery = project.category === 'Design' && project.images && project.images.length > 0
            return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`group bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-shadow duration-300 ${hasGallery ? 'cursor-pointer' : ''}`}
              onClick={hasGallery ? () => setLightboxProject(project) : undefined}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                <ThumbnailImage src={project.thumbnail} alt={project.name} hasUrl={hasUrl} url={project.url} isDesign={project.category === 'Design'} />
                {/* Overlay on hover - website projects */}
                {hasUrl && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 bg-white text-[#2a2a2a] rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Kunjungi Website
                    </motion.a>
                  </div>
                )}
                {/* Gallery overlay - design projects */}
                {hasGallery && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1.5 text-white">
                      <Image className="w-6 h-6" />
                      <span className="text-sm font-semibold">{project.images!.length + (project.thumbnail ? 1 : 0)} gambar</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                {project.badge && (
                  <span className="inline-block px-3 py-1 rounded-lg text-white font-bold text-xs mb-3" style={{ background: 'linear-gradient(135deg, #F5C542, #D4912A)' }}>
                    {project.badge}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#2a2a2a] mb-1">{project.name}</h3>
                <p className="text-xs font-semibold text-[#D4912A] mb-3">{project.category} &middot; {project.subcategory}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                {hasUrl ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#D4912A] font-semibold text-sm hover:underline"
                    onClick={e => e.stopPropagation()}
                  >
                    <span>{new URL(project.url).hostname}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : hasGallery ? (
                  <span className="inline-flex items-center gap-1.5 text-[#D4912A] font-semibold text-sm">
                    <Image className="w-3.5 h-3.5" />
                    Lihat Gallery
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[#D4912A] font-semibold text-sm">
                    {project.category}
                  </span>
                )}
              </div>
            </motion.div>
            )
          })}

          {/* Coming Soon placeholder */}
          <motion.div
            variants={cardVariants}
            className="bg-white/50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-[320px] text-center p-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400 mb-2">Projek Selanjutnya</h3>
            <p className="text-gray-400 text-sm">Segera hadir...</p>
          </motion.div>
        </motion.div>
        </AnimatePresence>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <Lightbox
            key={lightboxProject.id}
            project={lightboxProject}
            onClose={() => setLightboxProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
