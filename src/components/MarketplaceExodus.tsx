import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  Home,
  Lock,
  Megaphone,
  Search,
  Package,
  CheckCircle2,
  XCircle,
  Layers,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";


/* ─── Design tokens ─── */
const C = {
  orange:  "#FF8C2E",
  blue:    "#0080FF",
  blueD:   "#0060DD",
  crimson: "#F5C542",
  pink:    "#D4912A",
  red:     "#FF4455",
  bg:      "#080808",
  card:    "#111111",
  border:  "#1e1e1e",
  border2: "#252525",
  muted:   "#888888",
  subtle:  "#808080",
};

const gradAmber = `linear-gradient(135deg, ${C.orange}, #f5a55a)`;

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



export const ownBenefits = [
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

  const casesSectionRef = useRef(null);
  const analogyRef      = useRef(null);
  const ownRef          = useRef(null);
  const compareRef      = useRef(null);
  const ctaRef          = useRef(null);

  const casesInView   = useInView(casesSectionRef, { once: true, margin: "-40px" }); void casesInView;
  const analogyInView = useInView(analogyRef,      { once: true, margin: "-40px" });
  const ownInView     = useInView(ownRef,           { once: true, margin: "-40px" }); void ownInView;
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
            <div className="inline-flex items-center rounded-lg px-3 py-1.5 mb-4 backdrop-blur-md"
              style={{ background: "linear-gradient(135deg, rgba(255,140,46,0.7), rgba(245,165,90,0.7))", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 20px rgba(255,140,46,0.25)" }}>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
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
          <div className="inline-flex items-center justify-center rounded-lg px-4 py-2 mb-3 backdrop-blur-md"
            style={{ background: "linear-gradient(135deg, rgba(255,140,46,0.7), rgba(245,165,90,0.7))", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 20px rgba(255,140,46,0.25)" }}>
            <span className="text-[13px] md:text-sm font-semibold text-white">
              Sudah waktunya punya rumah digital sendiri.
            </span>
          </div>
          <p className="text-[12px] md:text-sm lg:text-base mb-6 max-w-md mx-auto leading-relaxed" style={{ color: C.subtle }}>
            Kami bantu kamu mulai dari titik yang paling masuk akal, tidak perlu sekaligus.{" "}
            <strong className="text-white">Mulai dan bisa langsung kepakai.</strong>
          </p>
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
