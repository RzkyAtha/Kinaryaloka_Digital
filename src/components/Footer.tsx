import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleOvalLeftIcon as MessageCircle, XMarkIcon as X } from '@heroicons/react/24/solid'
import { useLanguage } from '../context/LanguageContext'
import { LANG_OPTIONS } from './FloatingWA'

// Brand logos (not available in Heroicons) - custom inline SVGs
function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Music2({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 3c.32 2.19 1.62 3.75 3.72 4v2.46c-1.3 0-2.57-.4-3.72-1.13v5.9a5.42 5.42 0 1 1-5.42-5.42c.19 0 .37.01.56.03v2.55a2.9 2.9 0 1 0 2.35 2.84V3h2.51z" />
    </svg>
  )
}

type PolicySection = { heading: string; body: string }

const POLICIES: Record<string, { title: string; sections: PolicySection[] }> = {
  faq: {
    title: 'Pertanyaan Umum (FAQ)',
    sections: [
      {
        heading: 'Berapa lama proses pengerjaan?',
        body: 'Tergantung kompleksitas - landing page sekitar 7-14 hari kerja, company profile multi-halaman 2-3 minggu, dan e-commerce 3-4 minggu. Timeline pasti selalu dicantumkan di penawaran sebelum project dimulai.',
      },
      {
        heading: 'Apakah harga sudah termasuk domain & hosting?',
        body: 'Tergantung paket yang dipilih. Rincian lengkap (domain, hosting, SSL, jumlah halaman, fitur) selalu kami tuliskan transparan di penawaran - tidak ada biaya tersembunyi.',
      },
      {
        heading: 'Bagaimana sistem pembayarannya?',
        body: 'Pembayaran DP untuk memulai pengerjaan, lalu pelunasan saat project selesai dan siap serah terima. Semua pembayaran dicatat lewat invoice resmi.',
      },
      {
        heading: 'Bisakah request fitur tambahan di tengah pengerjaan?',
        body: 'Bisa. Penambahan di luar scope awal akan kami estimasikan dulu biaya dan waktunya, lalu dikerjakan setelah kamu menyetujuinya.',
      },
      {
        heading: 'Apakah ada garansi setelah project selesai?',
        body: 'Ada. Setiap project mendapat masa garansi bug-fixing gratis. Detail lengkapnya ada di bagian Revisi & Maintenance.',
      },
    ],
  },
  pemesanan: {
    title: 'Kebijakan Pemesanan',
    sections: [
      {
        heading: 'Alur Pemesanan',
        body: 'Konsultasi gratis - penawaran & invoice - pembayaran DP - pengerjaan - sesi review - pelunasan - serah terima akses & file.',
      },
      {
        heading: 'Pembayaran',
        body: 'Pengerjaan dimulai setelah DP diterima. Pelunasan dilakukan sebelum serah terima final (file, kredensial, dan deployment). Semua transaksi menggunakan invoice resmi.',
      },
      {
        heading: 'Pembatalan',
        body: 'Pembatalan sebelum pengerjaan dimulai mendapat pengembalian DP penuh. Setelah pengerjaan berjalan, DP tidak dapat dikembalikan dan biaya dihitung proporsional dari progres yang sudah selesai.',
      },
      {
        heading: 'Kebutuhan dari Klien',
        body: 'Timeline bisa bergeser jika materi dari klien (teks, foto, logo, akses) terlambat diberikan. Kami akan selalu menginformasikan dampaknya lebih dulu.',
      },
    ],
  },
  revisi: {
    title: 'Revisi & Maintenance',
    sections: [
      {
        heading: 'Revisi Minor',
        body: 'Perubahan teks, warna, gambar, dan penyesuaian kecil lainnya termasuk revisi minor dan gratis selama masa review yang disepakati di penawaran.',
      },
      {
        heading: 'Revisi Mayor / Scope Baru',
        body: 'Perubahan struktur halaman, fitur baru, atau redesign di luar konsep awal dihitung sebagai pekerjaan tambahan dengan estimasi biaya terpisah yang kami sampaikan transparan.',
      },
      {
        heading: 'Garansi Bug-Fixing',
        body: 'Setiap project mendapat garansi perbaikan bug/error teknis gratis selama 30 hari sejak serah terima, untuk fungsi yang memang sudah tercakup dalam scope.',
      },
      {
        heading: 'Maintenance',
        body: 'Untuk pembaruan konten, backup, dan monitoring berkala, tersedia paket maintenance bulanan yang bisa diaktifkan kapan saja.',
      },
    ],
  },
  syarat: {
    title: 'Syarat & Ketentuan',
    sections: [
      {
        heading: 'Kepemilikan Hasil',
        body: 'Seluruh hasil akhir (desain, kode, aset yang kami buatkan) menjadi milik klien sepenuhnya setelah pelunasan. Kami berhak menampilkan hasil di portofolio kecuali ada perjanjian kerahasiaan.',
      },
      {
        heading: 'Konten dari Klien',
        body: 'Klien bertanggung jawab atas legalitas materi yang diberikan (teks, gambar, logo). Kami dapat menolak materi yang melanggar hukum atau hak cipta pihak lain.',
      },
      {
        heading: 'Batasan Layanan',
        body: 'Sejalan dengan prinsip kami, KINARYALOKA tidak menerima project yang bertentangan dengan hukum dan syariah (judi, riba, konten dewasa, dan sejenisnya).',
      },
      {
        heading: 'Perubahan Kesepakatan',
        body: 'Perubahan scope, timeline, atau biaya di luar penawaran awal selalu dikomunikasikan dan disepakati tertulis sebelum dikerjakan.',
      },
    ],
  },
  privasi: {
    title: 'Kebijakan Privasi',
    sections: [
      {
        heading: 'Data yang Kami Kumpulkan',
        body: 'Nama, kontak (WhatsApp/email), dan detail kebutuhan project yang kamu isi melalui form atau chat - hanya untuk keperluan komunikasi dan pengerjaan project.',
      },
      {
        heading: 'Penggunaan Data',
        body: 'Data tidak dijual atau dibagikan ke pihak ketiga untuk kepentingan pemasaran. Data hanya dipakai untuk menghubungi kamu, menyusun penawaran, dan administrasi project.',
      },
      {
        heading: 'Layanan Pihak Ketiga',
        body: 'Website ini menggunakan layanan seperti Google Fonts dan Google Translate yang dapat memproses data teknis dasar (alamat IP, bahasa) sesuai kebijakan masing-masing layanan.',
      },
      {
        heading: 'Keamanan',
        body: 'Kami menjaga data project dan kredensial klien secara rahasia dan hanya membagikannya ke pihak yang terlibat langsung dalam pengerjaan.',
      },
    ],
  },
}

const footerLinks: { title: string; links: { label: string; href: string; policy?: string }[] }[] = [
  {
    title: 'Produk',
    links: [
      { label: 'Website', href: '#produk' },
      { label: 'Design/Branding', href: '#produk' },
      { label: 'Custom Tools', href: '#produk' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'FAQ', href: '#', policy: 'faq' },
      { label: 'Kebijakan Pemesanan', href: '#', policy: 'pemesanan' },
      { label: 'Revisi & Maintenance', href: '#', policy: 'revisi' },
      { label: 'Syarat & Ketentuan', href: '#', policy: 'syarat' },
      { label: 'Kebijakan Privasi', href: '#', policy: 'privasi' },
    ],
  },
]

export default function Footer() {
  const { language, setLanguage } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)
  const [openPolicyId, setOpenPolicyId] = useState<string | null>(null)
  const policy = openPolicyId ? POLICIES[openPolicyId] : null
  const current = LANG_OPTIONS.find((l) => l.id === language) ?? LANG_OPTIONS[0]
  const CurrentFlag = current.Flag

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
    <footer className="bg-black py-12 text-white md:py-16">
      <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8">
        {/* Region / Language */}
        <div className="mb-12 md:mb-16">
          <p className="mb-3 text-[13px] text-white/50">Region / Bahasa Saat Ini</p>
          <div className="flex items-center gap-3">
            <span className="inline-block h-6 w-6 overflow-hidden rounded-full">
              <CurrentFlag className="h-full w-full object-cover" />
            </span>
            <span className="text-[15px] text-white">Indonesia / {current.fullLabel}</span>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="text-[15px] text-white underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Ubah
            </button>
          </div>
          {langOpen && (
            <div className="mt-4 flex flex-wrap gap-2">
              {LANG_OPTIONS.map((l) => {
                const Flag = l.Flag
                const isActive = l.id === language
                return (
                  <button
                    key={l.id}
                    onClick={() => { setLanguage(l.id); setLangOpen(false) }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                      isActive ? 'bg-white/15 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="inline-block overflow-hidden rounded-sm">
                      <Flag className="h-3.5 w-5" />
                    </span>
                    {l.fullLabel}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Link columns */}
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mb-16 md:gap-8">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 text-[13px] text-white/50">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.policy ? setOpenPolicyId(link.policy) : scrollToSection(link.href)}
                      className="text-left text-[15px] leading-snug text-white transition-opacity hover:opacity-60"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="mb-12 flex items-center gap-6 md:mb-16">
          {[
            { Icon: Instagram, label: 'Instagram' },
            { Icon: MessageCircle, label: 'WhatsApp' },
            { Icon: Music2, label: 'TikTok' },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="cursor-pointer text-white transition-opacity hover:opacity-60"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="text-[13px]">
          <p className="mb-2 text-white">© 2026 KINARYALOKA. All Rights Reserved.</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/40">
            Due to our beliefs policy, we would like to announce that we will not be taking part in
            any business which is against the sharia law, thank you for your understanding.
          </p>
        </div>
      </div>
    </footer>

    {/* Policy modal - light editorial style */}
    <AnimatePresence>
      {policy && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(5px)' }}
            onClick={() => setOpenPolicyId(null)}
          />
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#f7f7f5] p-5 sm:p-7"
            style={{
              border: '1.5px solid rgba(0,0,0,0.08)',
              boxShadow: '0 24px 60px rgba(10,10,12,0.35)',
            }}
            initial={{ scale: 0.92, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 18 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Blueprint paper grid */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(42,42,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.03) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
                maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 100%)',
              }}
            />

            <button
              onClick={() => setOpenPolicyId(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.05] text-[#8a8a90] transition-all hover:bg-black/10 hover:text-[#141414]"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              <h3 className="pr-8 font-poppins text-[22px] font-extrabold uppercase leading-tight tracking-tight text-[#141414] sm:text-[26px]">
                {policy.title}
              </h3>

              <div className="mt-4 max-h-[52vh] space-y-3 overflow-y-auto pr-1">
                {policy.sections.map((s) => (
                  <div
                    key={s.heading}
                    className="rounded-xl bg-white p-4"
                    style={{ border: '1.5px solid rgba(0,0,0,0.08)' }}
                  >
                    <h4 className="font-poppins text-[13px] font-semibold text-[#141414]">
                      {s.heading}
                    </h4>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-[#6b6b70]">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
