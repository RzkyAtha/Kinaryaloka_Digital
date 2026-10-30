import { motion, AnimatePresence } from 'framer-motion'
import {
  GlobeAltIcon as Globe,
  XMarkIcon as X,
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight,
  LockClosedIcon as Lock,
  EyeIcon as Eye,
  CodeBracketIcon as CodeBracket,
} from '@heroicons/react/24/solid'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../context/PortfolioContext'

const mshot = (url: string, w: number, h: number) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}`

const STATUS_GLOW: Record<PortfolioProject['status'], string> = {
  Deployed: '#22C55E',
  'Under Development': '#F5C542',
}

// --- Site preview - live screenshot via mshots, fallback ke gambar project ----
function SiteShot({
  project,
  w,
  h,
  fit = 'cover',
  className = '',
}: {
  project: PortfolioProject
  w: number
  h: number
  fit?: 'cover' | 'contain'
  className?: string
}) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const src =
    project.showcase ||
    (project.url ? mshot(project.url, w, h) : project.thumbnail || project.images?.[0] || '')

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#efefec] ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-black/10 border-t-[#141414]" />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Globe className="h-7 w-7 text-black/20" />
          <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
            Preview unavailable
          </span>
        </div>
      )}
      {src && (
        <img
          src={src}
          alt={project.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full transition-opacity duration-500 ${
            fit === 'contain' ? 'object-contain' : 'object-cover object-top'
          } ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}

// --- Lightbox Slideshow ------------------------------------------------------
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
    setCurrent((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    if (images.length <= 1) return
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, goNext, goPrev])

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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
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
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="text-white">
          <h3 className="max-w-[60vw] truncate text-base font-bold sm:text-lg">{project.name}</h3>
          <p className="text-xs text-white/50">
            {current + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative z-10 flex h-full w-full items-center justify-center px-4 py-20 sm:px-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`${project.name} - ${current + 1}`}
            className="max-h-full max-w-full select-none rounded-xl object-contain"
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

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-4 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-4 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              className={`rounded-full transition-all duration-200 ${
                i === current ? 'h-2 w-6 bg-[#F5C542]' : 'h-2 w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// --- Main Portfolio Component ------------------------------------------------
export default function Portfolio() {
  const projects = PORTFOLIO_PROJECTS
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  const selected = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [projects, selectedId]
  )

  useEffect(() => {
    if (selectedId) detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedId])
  const hasGallery = !!selected?.images && selected.images.length > 0
  const hostname = useMemo(() => {
    try {
      return selected?.url ? new URL(selected.url).hostname : ''
    } catch {
      return ''
    }
  }, [selected])

  const handleOpen = () => {
    if (!selected) return
    if (hasGallery) setLightboxProject(selected)
    else if (selected?.url) window.open(selected.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] pb-16 pt-32 md:pb-24">
      {/* -- Giant backdrop word -- */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 select-none whitespace-nowrap font-poppins text-[16vw] font-extrabold uppercase leading-none tracking-tight text-[#e9eaec]"
      >
        Showcase
      </span>

      <div className="relative mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-10">
        {/* -- Editorial header -- */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[38px] uppercase leading-[0.95] tracking-tight sm:text-[48px] md:text-[56px]">
            <span className="block font-prompt font-extrabold text-[#141414]">Tampilan</span>
            <span className="block font-prompt font-extrabold text-[#757575]">Portfolio</span>
          </h2>
          <p className="max-w-md text-[13px] leading-relaxed text-[#6b6b70]">
            Lihat langsung website yang sudah kami bangun, pilih projek di panel showcase, lalu
            kunjungi versi live-nya.
          </p>
        </div>

        {/* -- Grid / Detail view - swap layaknya pindah halaman -- */}
        <AnimatePresence mode="wait" initial={false}>
          {selected === null && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-10 md:mt-14"
            >
          <div className="-mx-3 flex flex-wrap justify-center gap-3 pb-2 sm:mx-0 sm:gap-4">
            {projects.map((p) => {
              const isSel = p.id === selectedId
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    setSelectedId((prev) => (prev === p.id ? null : p.id))
                  }
                  whileTap={{ scale: 0.97 }}
                  className="group relative h-[320px] w-[calc(50%-6px)] shrink-0 cursor-pointer overflow-hidden rounded-[20px] border-4 border-white bg-white text-left transition-all duration-300 sm:aspect-[3/4] sm:h-auto sm:w-[300px] sm:rounded-[30px] sm:border-[6px]"
                  style={{
                    boxShadow: isSel
                      ? `0 0 0 2px ${p.color}, 0 14px 32px ${p.color}38, 0 4px 12px rgba(0,0,0,0.10)`
                      : '0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  aria-pressed={isSel}
                  aria-label={`Lihat projek ${p.name}`}
                >
                  {/* Banner - showcase image */}
                  <div className="absolute inset-x-0 top-0 h-[44%] overflow-hidden">
                    <SiteShot project={p} w={600} h={420} />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Status pill - kanan atas card */}
                  <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/50 py-0.5 pl-1 pr-2.5 backdrop-blur-md sm:right-4 sm:top-4 sm:gap-1.5 sm:py-1 sm:pl-1.5 sm:pr-3">
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full sm:h-5 sm:w-5"
                      style={{ background: STATUS_GLOW[p.status] }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="font-poppins text-[9px] font-semibold text-white sm:text-[10px]">
                      {p.status}
                    </span>
                  </span>

                  {/* Avatar - numpuk di tepi bawah banner */}
                  <span
                    className="absolute left-3 top-[44%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white transition-shadow duration-300 sm:left-4 sm:h-14 sm:w-14"
                    style={{
                      boxShadow: isSel
                        ? `0 0 0 3px #fff, 0 0 0 5px ${p.color}, 0 4px 12px rgba(0,0,0,0.2)`
                        : '0 0 0 3px #fff, 0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                      />
                    ) : (
                      <Globe className="h-5 w-5 text-black/40 sm:h-6 sm:w-6" />
                    )}
                  </span>

                  {/* Body - konten di background putih */}
                  <div className="absolute inset-x-0 bottom-0 top-[44%] flex flex-col px-3 pb-3 pt-9 sm:px-4 sm:pb-4 sm:pt-10">
                    {/* Name + bookmark */}
                    <div className="flex shrink-0 items-center justify-between gap-2">
                      <h4 className="truncate font-poppins text-[15px] font-bold leading-tight text-[#141414] sm:text-[19px]">
                        {p.name}
                      </h4>
                      <span className="flex shrink-0 items-center gap-1.5 text-[#141414]/60">
                        <CodeBracket className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        <Globe className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                      </span>
                    </div>
                    <span className="mt-0.5 block shrink-0 truncate font-poppins text-[10px] text-[#8a8a90] sm:mt-1 sm:text-[12px]">
                      {p.badge || p.category}
                    </span>


                    {/* Stats + CTA */}
                    {p.stats && (
                      <div className="mt-auto grid shrink-0 grid-cols-3 gap-1">
                        {p.stats.map((s) => (
                          <div key={s.label}>
                            <span className="block font-poppins text-[13px] font-bold text-[#141414] sm:text-[16px]">
                              {s.value}
                            </span>
                            <span className="block truncate font-poppins text-[9px] text-[#9a9aa0] sm:text-[10px]">
                              {s.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto shrink-0 sm:mt-0">
                      <div className="mt-2.5 sm:mt-3.5">
                        <span className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#141414] font-poppins text-[13px] font-semibold text-white transition-all duration-300 group-hover:bg-black sm:h-11">
                          <span className="leading-none">
                            {isSel ? 'Selected' : 'Tap to view'}
                          </span>
                          <Eye className="h-[18px] w-[18px] shrink-0" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
            </motion.div>
          )}

          {/* -- Detail view - menggantikan grid setelah card diklik -- */}
          {selected && (
            <motion.div
              key={`detail-${selected.id}`}
              ref={detailRef}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-10 scroll-mt-28 md:mt-14"
            >
              {/* Back button */}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-black/10 bg-white py-2 pl-3 pr-4 font-poppins text-[11px] font-semibold text-[#141414] transition-all duration-300 hover:border-black/25 hover:shadow-md"
              >
                <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Kembali
              </button>

              <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-10">
              {/* -- Right: selected project detail -- */}
              <div className="order-2">
                <div>
                  <h3 className="font-poppins text-[26px] font-bold leading-tight text-[#141414] sm:text-[30px]">
                    {selected.name}
                  </h3>
                  {selected.badge && (
                    <span
                      className="mt-1 block font-poppins text-[12px] font-medium"
                      style={{ color: selected.color }}
                    >
                      {selected.badge}
                    </span>
                  )}
                  <p className="mt-2.5 text-justify text-[12.5px] leading-relaxed text-[#6b6b70]">
                    {selected.description}
                  </p>

                  {/* Details */}
                  <ul className="mt-4 space-y-1.5">
                    {selected.details.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span
                          className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                          style={{ background: selected.color }}
                        />
                        <span className="text-[11px] leading-relaxed text-[#6b6b70]">{d}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={handleOpen}
                    className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#141414] px-6 py-3 font-poppins text-[12px] font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg"
                  >
                    {hasGallery ? 'Lihat Gallery' : 'Kunjungi Website'}
                  </button>
                </div>
              </div>

              {/* -- Left: floating browser mockup -- */}
              <div className="order-1">
                <div className="relative mx-auto w-full max-w-[560px]">
                  {/* Browser window */}
                  <div className="relative z-10 flex justify-center">
                    <div
                      className="w-[86%] overflow-hidden rounded-xl bg-[#141414]"
                      style={{
                        boxShadow: `0 24px 48px ${selected.color}26, 0 12px 24px rgba(0,0,0,0.12)`,
                        transition: 'box-shadow 400ms ease',
                      }}
                    >
                      {/* Chrome bar */}
                      <div className="flex items-center gap-2 px-3 py-2">
                        <span className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#55555c]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#F5C542]" />
                        </span>
                        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-[#26262b] px-3 py-1 font-poppins text-[9px] font-medium tracking-wide text-white/60">
                          <Lock className="h-2.5 w-2.5 shrink-0 text-[#F5C542]" />
                          <span className="truncate">{hostname || selected.name}</span>
                        </span>
                        <span className="w-[46px] shrink-0" aria-hidden="true" />
                      </div>
                      {/* Viewport */}
                      <button
                        type="button"
                        onClick={handleOpen}
                        className="relative block aspect-[7588/6296] w-full cursor-pointer outline-none"
                        aria-label={`Buka ${selected.name}`}
                      >
                        <SiteShot key={selected.id} project={selected} w={880} h={550} fit="contain" />
                      </button>
                    </div>
                  </div>

                  {/* Floating status chip */}
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-[2%] top-0 z-20 flex items-center gap-1.5 rounded-lg px-3 py-2 font-poppins text-[10px] font-semibold text-white shadow-sm"
                    style={{
                      background: hasGallery ? selected.color : STATUS_GLOW[selected.status],
                      boxShadow: `0 6px 16px ${hasGallery ? selected.color : STATUS_GLOW[selected.status]}66, 0 2px 6px rgba(0,0,0,0.15)`,
                    }}
                  >
                    {hasGallery ? 'Gallery' : selected.status}
                  </motion.span>
                </div>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-10 text-center text-[10px] leading-relaxed text-[#9a9aa0] sm:text-xs">
          Preview di atas adalah live screenshot dari situs aslinya - klik untuk membukanya. Produk
          kami dapat dikenali dengan adanya{' '}
          <span className="inline-flex translate-y-[1px] items-center gap-1 rounded-md bg-[#2a2a2a] px-2 py-[3px] align-middle">
            <span className="text-[9px] font-medium leading-none text-gray-300">Powered by</span>
            <img
              src="/Assets/logo_kinarya.webp"
              alt="Kinaryaloka"
              className="h-3.5 w-3.5 shrink-0 object-contain"
            />
          </span>{' '}
          di tiap footer websitenya, hak cipta dilindungi.
        </p>
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
