import { motion } from "framer-motion";

/* ─── Design tokens ─── */
const C = {
  orange:  "#FF8C2E",
  orangeD: "#E85410",
  blue:    "#0080FF",
  blueD:   "#0060DD",
  gold:    "#F5C542",
  red:     "#FF4455",
  green:   "#22C55E",
  bg:      "#080808",
  card:    "#101010",
  border:  "#1e1e1e",
  border2: "#242424",
  muted:   "#8a8a8a",
  subtle:  "#a0a0a0",
};

/* ─── Image bento card ─── */
function ImgCard({
  src,
  alt,
  spanClass = "",
  contain = false,
  radiusClass = "rounded-2xl md:rounded-[22px]",
}: {
  src: string;
  alt: string;
  spanClass?: string;
  contain?: boolean;
  radiusClass?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden ${radiusClass} ring-1 ring-white/5 transition-[box-shadow,ring-color] duration-300 hover:shadow-[0_10px_24px_-14px_rgba(255,140,46,0.18)] hover:ring-white/10 ${spanClass}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={contain ? "h-auto w-full object-contain" : "h-full w-full object-cover"}
      />
      {/* interactive sheen overlay on hover */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ */
export default function MarketplaceExodus() {
  return (
    <section id="marketplace-vs-website" className="relative overflow-hidden py-14 md:py-24 lg:py-28" style={{ background: C.bg }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.orange}30, transparent)` }} />

      <div className="relative z-10 mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mx-auto mb-9 max-w-2xl text-center md:mb-14">
          <h2 className="font-climate text-[22px] leading-[1.2] text-white sm:text-[30px] lg:text-[38px]">
            Kamu Harus Punya Identitas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: C.subtle }}>
            Jualan cuma di marketplace itu seperti buka toko di mal orang lain. Inilah yang kamu dapat saat punya rumah sendiri.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:auto-rows-[minmax(200px,auto)]">

          {/* HERO — Properti Digital Milikmu (2×2) */}
          <ImgCard src="/Assets/properti_aset.webp" alt="Properti Digital Milikmu — website adalah aset yang kamu miliki" spanClass="col-span-2 md:col-span-2 lg:row-span-2" />

          {/* STAT — Nilai transaksi e-commerce (wide) */}
          <ImgCard src="/Assets/nilai_transaksi.webp" alt="Rp 487 T — nilai transaksi e-commerce Indonesia" spanClass="col-span-2 md:col-span-2" />

          {/* Harga & SEO */}
          <ImgCard src="/Assets/harga.webp" alt="Harga dan margin terkontrol" />
          <ImgCard src="/Assets/seo.webp" alt="SEO: aset jangka panjang" />

          {/* SHOWCASE — Manajemen stok & pesanan (wide) — moved below harga/seo/kampanye/brand on mobile & tablet */}
          <ImgCard src="/Assets/manajemen.webp" alt="Manajemen stok & pesanan" spanClass="order-1 lg:order-none col-span-2 md:col-span-2" />

          {/* Kampanye & Brand */}
          <ImgCard src="/Assets/kampanye.webp" alt="Kampanye bebas tanpa izin" />
          <ImgCard src="/Assets/brand.webp" alt="Brand identity penuh" />

          {/* COMPANY PROFILE — full width */}
          <ImgCard src="/Assets/compro.webp" alt="Website company profile = identitas profesional perusahaanmu" spanClass="order-2 lg:order-none col-span-2 md:col-span-2 lg:col-span-4" />

        </div>

        {/* COMPANY PROFILE benefits — 2×2 on mobile, 4-across on desktop */}
        <div className="mt-3.5 grid grid-cols-2 items-center gap-3.5 md:mt-4 md:gap-4 lg:grid-cols-4">
          <ImgCard src="/Assets/kontak.webp" alt="Kontak Resmi" contain radiusClass="rounded-lg md:rounded-xl" />
          <ImgCard src="/Assets/ditemukan.webp" alt="Ditemukan di Internet" contain radiusClass="rounded-lg md:rounded-xl" />
          <ImgCard src="/Assets/porto.webp" alt="Portofolio & Legalitas" contain radiusClass="rounded-lg md:rounded-xl" />
          <ImgCard src="/Assets/kredibilitas.webp" alt="Kredibilitas Instan" contain radiusClass="rounded-lg md:rounded-xl" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.orange}30, transparent)` }} />
    </section>
  );
}
