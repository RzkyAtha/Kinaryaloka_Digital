import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Home,
  Users,
  BarChart3,
  RefreshCw,
  Lock,
  Megaphone,
  Search,
  Package,
  Star,
  CheckCircle2,
  XCircle,
  Zap,
  Layers,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

const TikTokIcon = ({ size = 16, style, className }: { size?: number; style?: React.CSSProperties; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={style} className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const TokopediaIcon = ({ size = 16, style, className }: { size?: number; style?: React.CSSProperties; className?: string }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={style} className={className} fill="currentColor">
    <path d="M100 10C51.4 10 12 49.4 12 98s39.4 88 88 88 88-39.4 88-88S148.6 10 100 10zm0 12c41.9 0 76 34.1 76 76S141.9 174 100 174 24 139.9 24 98s34.1-76 76-76z"/>
    <circle cx="72" cy="95" r="18"/>
    <circle cx="128" cy="95" r="18"/>
    <circle cx="72" cy="95" r="8" fill="rgba(0,0,0,0.35)"/>
    <circle cx="128" cy="95" r="8" fill="rgba(0,0,0,0.35)"/>
    <path d="M88 125c0 6.6 5.4 12 12 12s12-5.4 12-12H88z"/>
    <path d="M60 60 L72 48 L84 60"/>
    <path d="M116 60 L128 48 L140 60"/>
  </svg>
);

/* ─── Design tokens ─── */
const C = {
  orange:  "#FF8C2E",
  blue:    "#0080FF",
  blueD:   "#0060DD",
  crimson: "#FF2D78",
  pink:    "#FF6B9D",
  red:     "#FF4455",
  bg:      "#080808",
  card:    "#111111",
  border:  "#1e1e1e",
  border2: "#252525",
  muted:   "#888888",
  subtle:  "#808080",
};

const gradAmber = `linear-gradient(135deg, ${C.orange}, #f5a55a)`;
const gradBlue  = `linear-gradient(135deg, ${C.blueD}, ${C.blue})`;
const gradRed   = `linear-gradient(135deg, ${C.red}, #f87171)`;

/* ─── Helpers ─── */
const GradText = ({ children, grad = gradAmber }: { children: React.ReactNode; grad?: string }) => (
  <span style={{ background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: delay * 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const SectionLabel = ({ children, color = C.crimson }: { children: React.ReactNode; color?: string }) => (
  <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-2.5" style={{ color }}>
    {children}
  </p>
);

/* ─── Data ─── */
const feeData = [
  {
    platform: "Tokopedia",
    subtitle: "E-Commerce Platform",
    icon: TokopediaIcon,
    highlight: "1-10%",
    label: "Biaya Layanan",
    detail: "Berlaku untuk Power Merchant sesuai kategori produk yang dijual.",
    source: "CNBC Indonesia",
    sourceUrl: "https://www.cnbcindonesia.com/tech/20240827143811-37-566757/biaya-layanan-tokopedia-naik-16-september-2024-jadi-segini",
    color: "#00C851",
    gradient: "linear-gradient(135deg, #00C851, #00A844)",
  },
  {
    platform: "TikTok Shop",
    subtitle: "Social Commerce",
    icon: TikTokIcon,
    highlight: "15×",
    label: "Kenaikan batas komisi",
    detail: "Dari maks. Rp 40.000 → Rp 650.000 per item. Berlaku 18 Mei 2026.",
    source: "CNBC Indonesia",
    sourceUrl: "https://www.cnbcindonesia.com/tech/20260518172505-37-735699/menteri-umkm-tindak-tiktok-shop-usai-naikkan-biaya-komisi-seller",
    color: "#69C9D0",
    gradient: "linear-gradient(135deg, #69C9D0, #EE1D52)",
  },
];

export const brandCases = [
  {
    brand: "True To Skin",
    category: "Kosmetik Lokal",
    action: "Keluar dari TikTok Shop",
    quote: "Skema baru memaksa penjual menanggung ongkir pembeli sekaligus ongkir retur. Cost naik drastis tanpa jaminan margin.",
    icon: ShoppingBag,
    color: C.orange,
  },
  {
    brand: "Noera",
    category: "Beauty Brand",
    action: "Tegaskan Integritas Produk",
    quote: "Harga yang dibayar konsumen seharusnya untuk kualitas produk, bukan habis untuk biaya transaksi di perantara digital.",
    icon: DollarSign,
    color: C.blue,
  },
];

const costRows = [
  { label: "Omset per bulan",          labelMobile: "Omset per bulan",        value: "Rp 100.000.000", pct: null,  type: "neutral" as const },
  { label: "Komisi platform",          labelMobile: "Komisi platform",         value: "−Rp 15.000.000", pct: "15%", type: "loss"    as const },
  { label: "Biaya layanan & PPN",      labelMobile: "Layanan & PPN",           value: "−Rp 2.000.000",  pct: "2%",  type: "loss"    as const },
  { label: "Iklan dalam platform",     labelMobile: "Iklan platform",          value: "−Rp 10.000.000", pct: "10%", type: "loss"    as const },
  { label: "Subsidi ongkir & logistik",labelMobile: "Ongkir & logistik",       value: "−Rp 9.000.000",  pct: "9%",  type: "loss"    as const },
  { label: "Promo wajib & flash sale", labelMobile: "Promo & flash sale",      value: "−Rp 5.000.000",  pct: "5%",  type: "loss"    as const },
  { label: "Retur & pengembalian",     labelMobile: "Retur",                   value: "−Rp 3.000.000",  pct: "3%",  type: "loss"    as const },
  { label: "Packaging & operasional",  labelMobile: "Packaging",               value: "−Rp 3.000.000",  pct: "3%",  type: "loss"    as const },
  { label: "Yang masuk kantong",       labelMobile: "Yang masuk kantong",      value: "Rp 53.000.000",  pct: "53%", type: "result"  as const },
];

const dbBenefits = [
  { icon: Users,     title: "Kenali Siapa Pelangganmu",   color: C.blue,   desc: "Nama, HP, alamat, riwayat belanja, produk favorit, tersimpan rapi. Hubungi kapanpun tanpa bayar platform." },
  { icon: RefreshCw, title: "Repeat Order Tanpa Iklan",   color: C.orange, desc: "Pelanggan lama 5× lebih mudah membeli lagi. Kirim promo WhatsApp ke 500 pembeli setiamu, gratis." },
  { icon: BarChart3, title: "Analitik Bisnis yang Nyata", color: C.blue,   desc: "Produk terlaris, kota asal, jam pembelian puncak. Data ini milikmu, bukan dijual platform ke pesaingmu." },
  { icon: Star,      title: "Program Loyalitas Sendiri",  color: C.orange, desc: "Sistem poin, membership, reward, tanpa bergantung fitur platform. Pelanggan loyal adalah asetmu." },
];

const ownBenefits = [
  { icon: Home,      short: "Bukan ngontrak, tapi punya sendiri",  title: "Rumah Digital Milikmu",      color: C.orange, desc: "Website adalah properti digital milikmu. Tidak bisa dihapus, tidak bisa dinaikkan sewanya tiba-tiba, tidak bisa diubah aturannya sepihak." },
  { icon: Lock,      short: "Tidak ada potongan mengejutkan",       title: "Harga & Margin Kamu Kontrol", color: C.blue,   desc: "Kamu yang tentukan harga jual, margin, kapan diskon. Tidak ada platform yang tiba-tiba ambil 15–30% tanpa bisa ditolak." },
  { icon: Search,    short: "Ditemukan tanpa bayar iklan terus",    title: "SEO: Aset Jangka Panjang",  color: C.orange, desc: "Website teroptimasi bisa muncul di Google bertahun-tahun. Sekali investasi konten, mendatangkan pembeli organik 3–5 tahun ke depan." },
  { icon: Megaphone, short: "Promo, bundling, flash sale sesukamu", title: "Kampanye Bebas Tanpa Izin",  color: C.blue,   desc: "Flash sale 2 jam? Bundling produk? Diskon khusus pelanggan lama? Di website sendiri, semua itu kapanpun tanpa izin platform." },
  { icon: Package,   short: "Sistem yang kerja saat kamu tidur",    title: "Manajemen Stok & Pesanan",   color: C.orange, desc: "Pesanan masuk otomatis tercatat, stok terupdate real-time, notifikasi ke tim. Operasional rapi, error human berkurang drastis." },
  { icon: Layers,    short: "Ceritakan brand-mu tanpa batas",       title: "Brand Experience Penuh",     color: C.blue,   desc: "Tampilan, warna, tone of voice, video, cerita founder. Semua kamu atur. Konsumen merasakan brand-mu, bukan produk di antara pesaing." },
];

const comparisonRows = [
  { aspect: "Data pelanggan milik sendiri",    market: false, own: true  },
  { aspect: "Kontrol margin & harga",          market: false, own: true  },
  { aspect: "Visibilitas tanpa iklan terus",   market: false, own: true  },
  { aspect: "Bebas promo & bundling",          market: false, own: true  },
  { aspect: "Brand story bebas diatur",        market: false, own: true  },
  { aspect: "Program loyalitas sendiri",       market: false, own: true  },
  { aspect: "Analitik bisnis milik sendiri",   market: false, own: true  },
  { aspect: "Biaya tidak berubah tiba-tiba",   market: false, own: true  },
  { aspect: "Jangkauan pasar luas (awal)",     market: true,  own: false },
  { aspect: "Payment infrastructure ready",    market: true,  own: true  },
];

/* ══════════════════════════════════════════════════ */
export default function MarketplaceExodus() {
  const [showMore, setShowMore] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);

  const feeSectionRef   = useRef(null);
  const casesSectionRef = useRef(null);
  const analogyRef      = useRef(null);
  const ownRef          = useRef(null);
  const compareRef      = useRef(null);
  const ctaRef          = useRef(null);

  const feeInView     = useInView(feeSectionRef,   { once: true, margin: "-40px" });
  const casesInView   = useInView(casesSectionRef, { once: true, margin: "-40px" }); void casesInView;
  const analogyInView = useInView(analogyRef,      { once: true, margin: "-40px" });
  const ownInView     = useInView(ownRef,           { once: true, margin: "-40px" });
  const compareInView = useInView(compareRef,       { once: true, margin: "-40px" });
  const ctaInView     = useInView(ctaRef,           { once: true, margin: "-40px" });

  return (
    <section
      id="marketplace-vs-website"
      ref={wrapRef}
      className="relative overflow-hidden py-10 md:py-20 lg:py-28"
      style={{ background: C.bg }}
    >
      {/* ── Ambient glow (hidden on mobile for performance) ── */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse, ${C.crimson} 0%, transparent 70%)` }} />
        <div className="absolute bottom-32 left-0 w-[600px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
          style={{ background: `radial-gradient(ellipse, ${C.orange} 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[350px] rounded-full blur-[100px] opacity-[0.05]"
          style={{ background: `radial-gradient(ellipse, ${C.blueD} 0%, transparent 70%)` }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.crimson}60, transparent)` }} />

      {/* ── Container ── */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ══ 1. HEADER ══ */}
        <FadeUp className="text-center mb-10 md:mb-16 lg:mb-20">
          {/* Alert badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-5"
            style={{ background: `${C.red}15`, border: `1px solid ${C.red}30` }}>
            <AlertTriangle size={11} style={{ color: C.red }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.red }}>
              Peringatan untuk Pebisnis UMKM
            </span>
          </div>

          <h2 className="font-poppins font-extrabold text-[22px] sm:text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.12] mb-3 md:mb-5">
            Brand Besar Mulai Tinggalkan{" "}
            <GradText grad={gradAmber}>Marketplace</GradText>
          </h2>
          <p className="font-poppins text-[12px] sm:text-xl md:text-3xl lg:text-4xl text-white/45 leading-snug mb-4 md:mb-6">
            Kamu Harusnya Melakukan Hal yang Sama
          </p>
        </FadeUp>

        {/* ══ 2. FEE CRISIS ══ */}
        <div ref={feeSectionRef} className="mb-10 md:mb-16 lg:mb-20">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {feeData.map((item, i) => (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, y: 28 }}
                animate={feeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6"
                style={{ background: C.card, border: `1px solid ${C.border2}` }}
              >
                {/* Top row: icon + platform + subtitle */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18` }}>
                    <item.icon size={14} className="sm:hidden" style={{ color: item.color }} />
                    <item.icon size={16} className="hidden sm:block" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-[11px] sm:text-[13px] md:text-base leading-snug">{item.platform}</h3>
                    <p className="text-[9px] sm:text-[11px] md:text-xs mt-0.5" style={{ color: C.muted }}>{item.subtitle}</p>
                  </div>
                </div>
                {/* Badge: highlight + label */}
                <div className="mb-2 sm:mb-3">
                  <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-semibold rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1"
                    style={{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                    {item.label}: {item.highlight}
                  </span>
                </div>
                {/* Quote-style detail */}
                <div className="border-l-2 pl-2 sm:pl-3" style={{ borderColor: `${item.color}50` }}>
                  <p className="text-[10px] sm:text-[12px] md:text-sm leading-relaxed" style={{ color: C.subtle }}>
                    {item.detail}
                  </p>
                </div>
                {/* Source link */}
                {item.source && item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 sm:mt-3 text-[9px] sm:text-[10px] md:text-[11px] font-semibold rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-white transition-all hover:scale-[1.03] hover:brightness-110"
                    style={{ background: item.gradient, boxShadow: `0 4px 16px ${item.color}40` }}
                  >
                    Sumber: {item.source}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>


        {/* ══ 4. ANALOGI TOKO MAL ══ */}
        <div ref={analogyRef} className="mb-10 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={analogyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 overflow-hidden relative"
            style={{ background: C.card, border: `1px solid ${C.border2}` }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-[0.06] pointer-events-none hidden md:block"
              style={{ background: C.orange }} />

            <div className="text-center mb-5 md:mb-8 relative">
              <SectionLabel color={C.orange}>Bayangkan Ini</SectionLabel>
              <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                Jualan di Marketplace Itu Seperti{" "}
                <GradText grad={gradAmber}>Buka Toko di Mal Orang Lain</GradText>
              </h3>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 md:gap-5">
              {/* Ngontrak */}
              <div className="rounded-xl md:rounded-2xl p-4 md:p-6"
                style={{ background: `${C.red}08`, border: `1px solid ${C.red}20` }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${C.red}18` }}>
                    <AlertTriangle size={14} style={{ color: C.red }} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase" style={{ color: `${C.red}80` }}>Situasi sekarang</p>
                    <h4 className="font-bold text-white text-[12px] md:text-sm">Toko di Mal, Ngontrak</h4>
                  </div>
                </div>
                <ul className="space-y-2">
                  {[
                    "Sewa naik setiap tahun, kamu tidak bisa protes",
                    "Aturan promosi ikut kebijakan mal",
                    "Pembeli datang ke mal, bukan ke tokomu",
                    "Data pengunjung mal milik pengelola mal",
                    "Kalau mal tutup, tokomu ikut hilang",
                    "Bersaing dengan ratusan toko di sebelahmu",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <XCircle size={12} className="shrink-0 mt-0.5" style={{ color: C.red }} />
                      <span className="text-[11px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milik sendiri */}
              <div className="rounded-xl md:rounded-2xl p-4 md:p-6"
                style={{ background: `${C.blue}08`, border: `1px solid ${C.blue}25` }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${C.blue}18` }}>
                    <Home size={14} style={{ color: C.blue }} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase" style={{ color: `${C.blue}90` }}>Yang kamu butuhkan</p>
                    <h4 className="font-bold text-white text-[12px] md:text-sm">Rumah Digital Milik Sendiri</h4>
                  </div>
                </div>
                <ul className="space-y-2">
                  {[
                    "Bayar sekali bangun, milik selamanya",
                    "Promo, diskon, harga, kamu yang atur",
                    "Pelanggan datang langsung ke brandmu",
                    "Database pelanggan 100% milikmu",
                    "Tidak bisa dihapus atau diubah sepihak",
                    "Tampil unik, tidak bersaing di satu halaman",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: C.blue }} />
                      <span className="text-[11px] md:text-xs leading-relaxed text-white/65">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={analogyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-bold text-white/55 text-center text-[13px] md:text-lg lg:text-xl mt-6 md:mt-8 max-w-2xl mx-auto leading-snug"
            >
              &ldquo;Pengusaha cerdas tidak selamanya ngontrak.{" "}
              <span className="text-white">Pada titik tertentu, mereka bangun rumah sendiri.</span>&rdquo;
            </motion.p>
          </motion.div>
        </div>

        {/* ── Mobile "Read More" toggle ── */}
        {!showMore && (
          <div className="text-center mb-6">
            <motion.button
              onClick={() => setShowMore(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              Baca Lebih Lanjut
              <ChevronDown size={16} />
            </motion.button>
          </div>
        )}

        <div className={showMore ? '' : 'hidden'}>

        {/* ══ 5. SIMULASI BIAYA ══ */}
        <div className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-6 md:mb-10 px-2">
            <SectionLabel color={C.red}>Hitung Dulu Sebelum Lanjut</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[18px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight break-words">
              Berapa yang{" "}
              <GradText grad={gradRed}>Kamu Rugi</GradText>
              <br className="sm:hidden" />
              {" "}Setiap Bulan?
            </h3>
            <p className="text-[12px] md:text-sm mt-2.5 max-w-lg mx-auto leading-relaxed" style={{ color: C.subtle }}>
              Simulasi nyata untuk toko dengan omset{" "}
              <strong className="text-white">Rp 100 juta per bulan</strong>{" "}
              di marketplace Indonesia 2026.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            {/* ── Tabel Potongan ── */}
            <div className="rounded-2xl overflow-hidden max-w-2xl mx-auto"
              style={{ background: C.card, border: `1px solid ${C.border2}` }}>

              {/* Table header */}
              <div className="grid grid-cols-[1fr_32px_auto] sm:grid-cols-[1fr_48px_auto] px-3 sm:px-5 md:px-6 py-2.5"
                style={{ background: "#181818", borderBottom: `1px solid ${C.border2}` }}>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase" style={{ color: C.muted }}>Komponen</span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-center" style={{ color: C.muted }}>%</span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-right w-[88px] sm:w-[110px] md:w-[132px]" style={{ color: C.muted }}>Jumlah</span>
              </div>

              {costRows.map((row, i) => {
                const isResult  = row.type === "result"
                const isLoss    = row.type === "loss"
                const isNeutral = row.type === "neutral"
                return (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_32px_auto] sm:grid-cols-[1fr_48px_auto] items-center px-3 sm:px-5 md:px-6 py-2.5 md:py-3.5"
                    style={{
                      borderBottom: i < costRows.length - 1 ? `1px solid ${C.border}` : undefined,
                      background: isResult ? `${C.blue}10` : isNeutral ? `rgba(255,255,255,0.02)` : undefined,
                    }}
                  >
                    {/* Label + mini bar */}
                    <div className="pr-2 sm:pr-3 min-w-0">
                      <span
                        className="text-[11px] sm:text-[12px] md:text-[13px] leading-tight block"
                        style={{
                          color: isResult ? "#fff" : isNeutral ? "rgba(255,255,255,0.9)" : C.subtle,
                          fontWeight: isResult || isNeutral ? 600 : 400,
                        }}
                      >
                        <span className="sm:hidden">{row.labelMobile}</span>
                        <span className="hidden sm:inline">{row.label}</span>
                      </span>
                      {isLoss && row.pct && (
                        <div className="mt-1 h-[2px] sm:h-[3px] rounded-full overflow-hidden" style={{ background: `${C.red}20`, maxWidth: 80 }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: C.red }}
                            initial={{ width: 0 }}
                            whileInView={{ width: row.pct }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Pct badge */}
                    <div className="flex justify-center">
                      {row.pct && (
                        <span
                          className="text-[9px] sm:text-[10px] font-bold rounded px-1 py-0.5 tabular-nums"
                          style={{
                            color: isResult ? C.blue : isLoss ? C.red : C.subtle,
                            background: isResult ? `${C.blue}15` : isLoss ? `${C.red}15` : "transparent",
                          }}
                        >
                          {row.pct}
                        </span>
                      )}
                    </div>

                    {/* Value */}
                    <span
                      className="font-poppins font-bold text-[10px] sm:text-[12px] md:text-[13px] tabular-nums shrink-0 text-right w-[88px] sm:w-[110px] md:w-[132px]"
                      style={{
                        color: isLoss ? C.red : isResult ? C.blue : "white",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* ── Summary cards ── */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
              {/* Per Rp 100rb */}
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center"
                style={{ background: `${C.red}0a`, border: `1px solid ${C.red}25` }}>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] mb-1 sm:mb-1.5 leading-snug" style={{ color: C.subtle }}>
                  Tiap Rp 100.000 masuk
                </p>
                <p className="font-poppins font-extrabold text-[16px] sm:text-[22px] md:text-3xl leading-none mb-1" style={{ color: C.red }}>
                  Rp 47rb
                </p>
                <p className="text-[9px] sm:text-[10px] leading-snug" style={{ color: C.muted }}>
                  dipotong platform
                </p>
              </div>

              {/* Total bulanan */}
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center"
                style={{ background: `${C.orange}0a`, border: `1px solid ${C.orange}25` }}>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] mb-1 sm:mb-1.5 leading-snug" style={{ color: C.subtle }}>
                  Potongan per bulan
                </p>
                <p className="font-poppins font-extrabold text-[16px] sm:text-[22px] md:text-3xl leading-none mb-1" style={{ color: C.orange }}>
                  Rp 47 Jt
                </p>
                <p className="text-[9px] sm:text-[10px] leading-snug" style={{ color: C.muted }}>
                  dari 8 pos berbeda
                </p>
              </div>

              {/* Tahunan */}
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center"
                style={{ background: `${C.red}12`, border: `1px solid ${C.red}30` }}>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] mb-1 sm:mb-1.5 leading-snug" style={{ color: C.subtle }}>
                  Hilang dalam 1 tahun
                </p>
                <p className="font-poppins font-extrabold text-[16px] sm:text-[22px] md:text-3xl leading-none mb-1" style={{ color: C.red }}>
                  Rp 564 Jt
                </p>
                <p className="text-[9px] sm:text-[10px] leading-snug" style={{ color: C.muted }}>
                  ke kantong platform
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ══ 6. DATABASE: HARTA KARUN ══ */}
        <div className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-6 md:mb-10">
            <SectionLabel color={C.blue}>Nilai yang Paling Sering Dilewatkan</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
              Database Pelanggan:{" "}
              <GradText grad={gradBlue}>Harta Karun yang Kamu Buang</GradText>
            </h3>
            <p className="text-[12px] md:text-sm lg:text-base mt-3 max-w-2xl mx-auto leading-relaxed" style={{ color: C.subtle }}>
              Di marketplace, kamu mungkin punya 1.000 pembeli. Tapi coba jawab:{" "}
              <strong className="text-white/80">kamu tahu nama, nomor HP, dan kebiasaan belanja mereka?</strong>
            </p>
          </FadeUp>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 sm:mb-6 md:mb-8">
            {[
              { number: "5×",      label: "lebih murah",          desc: "Menjual ke pelanggan lama vs menarik pelanggan baru", color: C.blue },
              { number: "60–70%",  label: "kemungkinan beli lagi", desc: "Pelanggan existing yang pernah puas dengan produkmu",  color: C.orange },
              { number: "0 Rupiah",label: "biaya remarketing",     desc: "Kirim promo WhatsApp ke database pelangganmu sendiri", color: C.blue },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 md:p-6 text-center"
                style={{ background: `${s.color}0e`, border: `1px solid ${s.color}25` }}
              >
                <p className="font-poppins font-extrabold text-[28px] md:text-4xl mb-1" style={{ color: s.color }}>{s.number}</p>
                <p className="font-bold text-white text-[12px] md:text-sm mb-1">{s.label}</p>
                <p className="text-[10px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {dbBenefits.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.07}>
                <div className="rounded-2xl p-4 md:p-5 h-full"
                  style={{ background: C.card, border: `1px solid ${C.border2}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${b.color}18` }}>
                      <b.icon size={16} style={{ color: b.color }} />
                    </div>
                    <h4 className="font-bold text-white text-[13px] md:text-base leading-snug">{b.title}</h4>
                  </div>
                  <div className="h-[1.5px] rounded-full mb-3 w-8" style={{ background: b.color }} />
                  <p className="text-[12px] md:text-sm leading-relaxed" style={{ color: C.subtle }}>{b.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ══ 7. 6 KEUNGGULAN SISTEM SENDIRI ══ */}
        <div ref={ownRef} className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-6 md:mb-10">
            <SectionLabel color={C.orange}>Mengapa Harus Punya Sendiri</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
              6 Kelebihan Nyata Punya{" "}
              <GradText grad={gradAmber}>Rumah Digital Sendiri</GradText>
            </h3>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {ownBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 14 }}
                animate={ownInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-4 md:p-5 relative overflow-hidden group"
                style={{ background: C.card, border: `1px solid ${C.border2}` }}
              >
                {/* Hover glow */}
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none hidden md:block"
                  style={{ background: b.color }} />

                {/* Accent line that animates in */}
                <motion.div
                  className="h-[2px] rounded-full mb-4 origin-left"
                  style={{ background: b.color }}
                  initial={{ scaleX: 0 }}
                  animate={ownInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
                />

                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${b.color}18` }}>
                    <b.icon size={16} style={{ color: b.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold mb-0.5 tracking-wide leading-none" style={{ color: C.muted }}>
                      {b.short}
                    </p>
                    <h4 className="font-bold text-white text-[13px] md:text-[15px] leading-snug">{b.title}</h4>
                  </div>
                </div>
                <p className="text-[11px] md:text-[12px] leading-relaxed mt-2.5" style={{ color: C.subtle }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ 8. TABEL PERBANDINGAN ══ */}
        <div ref={compareRef} className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-5 md:mb-8">
            <SectionLabel>Perbandingan Langsung</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl text-white leading-tight">
              Marketplace vs Website Sendiri
            </h3>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-2xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border2}` }}>
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_auto]" style={{ background: "#181818", borderBottom: `1px solid ${C.border2}` }}>
                <div className="px-3 md:px-5 py-3 md:py-4">
                  <p className="font-bold text-[11px] md:text-sm" style={{ color: C.muted }}>Aspek</p>
                </div>
                <div className="w-[72px] md:w-[110px] px-2 md:px-4 py-3 md:py-4 text-center flex flex-col items-center justify-center"
                  style={{ borderLeft: `1px solid ${C.border2}` }}>
                  <XCircle size={12} style={{ color: C.red }} className="mb-0.5 md:hidden" />
                  <p className="font-bold text-[10px] md:text-sm" style={{ color: C.red }}>
                    <span className="hidden md:inline">Marketplace</span>
                    <span className="md:hidden">Market</span>
                  </p>
                </div>
                <div className="w-[72px] md:w-[110px] px-2 md:px-4 py-3 md:py-4 text-center flex flex-col items-center justify-center"
                  style={{ borderLeft: `1px solid ${C.border2}` }}>
                  <CheckCircle2 size={12} style={{ color: C.blue }} className="mb-0.5 md:hidden" />
                  <p className="font-bold text-[10px] md:text-sm" style={{ color: C.blue }}>
                    <span className="hidden md:inline">Website Sendiri</span>
                    <span className="md:hidden">Website</span>
                  </p>
                </div>
              </div>

              {comparisonRows.map((row, i) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, x: -10 }}
                  animate={compareInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.15 }}
                  className="grid grid-cols-[1fr_auto_auto] transition-colors duration-150 hover:bg-white/[0.02]"
                  style={{ borderBottom: i < comparisonRows.length - 1 ? `1px solid ${C.border}` : undefined }}
                >
                  <div className="px-3 md:px-5 py-3 md:py-3.5">
                    <p className="text-[11px] md:text-xs leading-snug" style={{ color: C.subtle }}>{row.aspect}</p>
                  </div>
                  <div className="w-[72px] md:w-[110px] py-3 md:py-3.5 flex items-center justify-center"
                    style={{ borderLeft: `1px solid ${C.border}` }}>
                    {row.market
                      ? <CheckCircle2 size={14} style={{ color: C.blue }} />
                      : <XCircle size={14} style={{ color: `${C.red}60` }} />
                    }
                  </div>
                  <div className="w-[72px] md:w-[110px] py-3 md:py-3.5 flex items-center justify-center"
                    style={{ borderLeft: `1px solid ${C.border}` }}>
                    {row.own
                      ? <CheckCircle2 size={14} style={{ color: C.blue }} />
                      : <XCircle size={14} style={{ color: `${C.red}60` }} />
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-[10px] md:text-xs text-center mt-3" style={{ color: `${C.muted}90` }}>
              * Marketplace tetap relevan sebagai kanal akuisisi pelanggan baru, bukan satu-satunya fondasi bisnis.
            </p>
          </FadeUp>
        </div>

        {/* ══ 9. KONTEKS PASAR ══ */}
        <FadeUp className="mb-8 md:mb-10">
          <div
            className="rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 relative overflow-hidden text-center"
            style={{
              background: `linear-gradient(135deg, ${C.blue}12 0%, ${C.card} 50%, ${C.orange}10 100%)`,
              border: `1px solid ${C.border2}`,
            }}
          >
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
              style={{ background: C.orange }} />
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Zap size={11} style={{ color: C.orange }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.orange }}>
                Bukan Pilih Salah Satu
              </span>
            </div>
            <p className="font-poppins font-bold text-[17px] sm:text-xl md:text-2xl lg:text-3xl text-white mb-3 md:mb-4 leading-snug max-w-3xl mx-auto">
              Nilai transaksi e-commerce Indonesia{" "}
              <GradText grad={gradAmber}>Rp 487 triliun</GradText> di 2024.{" "}
              Marketplace tidak bisa diabaikan, tapi tidak boleh jadi{" "}
              <em>satu-satunya</em> fondasimu.
            </p>
            <p className="text-[12px] md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: C.subtle }}>
              Strategi yang tepat:{" "}
              <strong className="text-white">
                gunakan marketplace untuk menjangkau pembeli baru, lalu arahkan ke ekosistem milikmu sendiri.
              </strong>{" "}
              Website jadi pusat, marketplace jadi corong masuk.
            </p>
          </div>
        </FadeUp>

        {/* ══ 10. CTA ══ */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 28 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Home size={14} style={{ color: C.orange }} />
            <span className="text-[13px] md:text-sm font-semibold" style={{ color: C.orange }}>
              Sudah waktunya punya rumah digital sendiri.
            </span>
          </div>
          <p className="text-[12px] md:text-sm lg:text-base mb-6 max-w-md mx-auto leading-relaxed" style={{ color: C.subtle }}>
            Kami bantu kamu mulai dari titik yang paling masuk akal, tidak perlu sekaligus.{" "}
            <strong className="text-white">Mulai dan bisa langsung kepakai.</strong>
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <motion.button
              onClick={() => document.querySelector("#produk")?.scrollIntoView({ behavior: "smooth" })}
              whileTap={{ scale: 0.97 }}
              className="font-poppins font-semibold px-6 py-[14px] rounded-full text-[13px] md:text-sm flex items-center gap-2 justify-center sm:w-auto transition-opacity active:opacity-80"
              style={{ background: gradAmber, color: "#fff", minHeight: 48 }}
            >
              Lihat Paket yang Tepat
              <ArrowRight size={14} />
            </motion.button>
            <motion.button
              onClick={() => document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" })}
              whileTap={{ scale: 0.97 }}
              className="font-poppins font-semibold px-6 py-[14px] rounded-full text-[13px] md:text-sm flex items-center gap-2 justify-center sm:w-auto transition-colors active:opacity-80"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "white",
                minHeight: 48,
              }}
            >
              Diskusi Dulu, Gratis
            </motion.button>
          </div>
        </motion.div>

        {/* ── Mobile "Show Less" toggle ── */}
        {showMore && (
          <div className="text-center mt-8">
            <motion.button
              onClick={() => setShowMore(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              Tampilkan Lebih Singkat
              <ChevronDown size={16} className="rotate-180" />
            </motion.button>
          </div>
        )}

        </div>{/* end collapsible wrapper */}

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.crimson}30, transparent)` }} />
    </section>
  );
}
