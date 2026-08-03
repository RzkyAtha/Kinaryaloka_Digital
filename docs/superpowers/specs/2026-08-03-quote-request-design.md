# Design: "Pilih Paket Ini" → Intake Form → PDF → Kirim ke Xero

Date: 2026-08-03
Status: Approved (pending spec review)

## Ringkasan

Tombol **"Pilih Paket Ini"** pada product cards akan membuka form intake (data calon
customer, detail bisnis, dan requirement untuk paket yang dipilih). Setelah diisi,
sistem meng-generate **PDF brief/quote request** berlogo KINARYALOKA, lalu mengirimnya
sebagai **lampiran email ke Xero inbox** menggunakan **Gmail API** atas nama Gmail user
(client-side, tanpa backend). Tim kemudian membuat Quote di Xero dan mengirim harga
final ke email user tersebut (langkah manual di sisi Xero).

## Keputusan Kunci

- **Pengiriman email: client-side via Gmail API** (`useGoogleLogin`, scope
  `openid email profile https://www.googleapis.com/auth/gmail.send`). Tanpa backend/secret.
- **PDF: berwarna sesuai brand paket** (aksen oren/biru/hijau/ungu dari `product.color`).
- **Logo: `/Assets/logo_kinarya.webp`** (di-embed ke PDF via konversi canvas → PNG dataURL,
  karena jsPDF tidak mendukung WebP langsung).
- **Semua field disertakan**: data customer inti, detail bisnis, requirement produk,
  referensi & catatan.

## Arsitektur (Alur)

1. User klik "Pilih Paket Ini" pada sebuah `product` → `RequestQuoteModal` terbuka dengan
   konteks paket (name, price, color, textColor, details, category, id).
2. User mengisi form 3 langkah.
3. Pada aksi kirim: `useGoogleLogin` (implicit/token flow) meminta izin scope di atas.
4. Dengan access token: panggil `https://www.googleapis.com/oauth2/v3/userinfo` → dapat
   `email` & `name` → prefill + kunci field email.
5. `generateQuotePdf(form, product)` → menghasilkan `Blob` PDF.
6. `sendViaGmail({ accessToken, to, subject, bodyText, pdfBlob, fileName })` → susun MIME
   multipart (teks + attachment base64url) → POST ke Gmail API
   `users.messages.send` (`userId=me`).
7. Sukses → layar konfirmasi + tombol "Unduh PDF". Gagal → pesan + retry + fallback WA.

## Komponen & Modul

- `src/components/RequestQuoteModal.tsx`
  - Props: `{ isOpen: boolean; onClose: () => void; product: Product | null }`.
  - State: langkah aktif, nilai form, status (idle/sending/success/error), pesan error,
    pdf blob terakhir (untuk unduh).
  - UI: modal (pola Framer Motion konsisten dengan `AuthModal`), stepper 3 langkah,
    validasi per langkah, layar sukses (reuse pola confetti opsional).
- `src/lib/generateQuotePdf.ts`
  - Fungsi murni `generateQuotePdf(form: QuoteForm, product: Product): Promise<Blob>`.
  - Pakai `jspdf`. Muat logo webp → `<img>` → `<canvas>` → `toDataURL('image/png')` →
    `doc.addImage`. Menggambar header berwarna `product.color`, section, footer.
- `src/lib/sendViaGmail.ts`
  - `buildMimeMessage(opts): string` (murni, dapat diuji) → RFC 2822 multipart/mixed.
  - `base64UrlEncode(str)` util.
  - `sendViaGmail(opts): Promise<void>` → `fetch` ke Gmail API dengan `Authorization: Bearer`.
- `src/config/quote.ts`
  - `XERO_INBOX_EMAIL` (alamat Xero), `QUOTE_SUBJECT_PREFIX`, `BUSINESS_WHATSAPP`.
- `src/components/Products.tsx` (update)
  - `handleSelectPackage` membuka `RequestQuoteModal` (bukan `AuthModal`).
  - `AuthModal` tetap dipakai untuk tombol login umum di tempat lain (tidak diubah).

## Tipe Data

```ts
interface QuoteForm {
  // Data customer inti
  fullName: string
  email: string        // auto dari Gmail, dikunci
  whatsapp: string
  // Detail bisnis
  businessName: string
  industry: string
  city: string
  existingWebOrSocial?: string
  // Requirement
  needsDescription: string
  selectedFeatures: string[]   // dari product.details + custom
  customFeatures?: string
  deadline?: string
  budgetEstimate?: string
  // Referensi & catatan
  referenceLinks?: string
  notes?: string
  contactPreference: 'whatsapp' | 'email' | 'phone'
}
```

## Template PDF (berwarna sesuai brand paket)

- **Header**: bar warna `product.color`; logo KINARYALOKA (kiri); judul "Project Brief &
  Quote Request" (putih); kanan: `Ref: KNY-QR-YYYYMMDD-XXXX` + tanggal.
- **Section** (label tebal + garis aksen): Data Customer; Detail Bisnis; Paket Dipilih
  (nama + `IDR <price>` + daftar fitur terpilih); Requirement (deskripsi, deadline,
  budget); Referensi & Catatan.
- **Footer**: "KINARYALOKA Digital Studio" + kontak + disclaimer
  "Harga bersifat estimasi; quote final akan dikirim melalui email."
- Nomor referensi: `KNY-QR-` + `YYYYMMDD` + 4 char acak.

## Format Email

- **To**: `XERO_INBOX_EMAIL`.
- **Subject**: `[Quote Request] <businessName> — <product.name>`.
- **Body (text)**: ringkasan singkat data customer & paket (agar terbaca walau tanpa buka PDF).
- **Attachment**: `KNY-Quote-Request-<ref>.pdf`.

## Error Handling & Fallback

- Popup ditutup / `access_denied` / error Gmail API → set status `error`, tampilkan pesan
  ramah + tombol **Coba lagi** dan **Unduh PDF & kirim via WhatsApp** (buka
  `wa.me/<BUSINESS_WHATSAPP>` dengan teks ringkas; user lampirkan PDF manual).
- Gagal generate PDF → toast/inline error, form tetap terbuka.
- Validasi form: field wajib (nama, WA, nama bisnis, deskripsi kebutuhan) divalidasi
  sebelum lanjut langkah / kirim.

## Setup Manual (di luar kode, tanggung jawab pemilik)

- **Google Cloud Console** (project pemilik `GOOGLE_CLIENT_ID` yang sudah ada):
  - Aktifkan **Gmail API**.
  - OAuth consent screen: tambah scope `.../auth/gmail.send`; isi authorized JavaScript
    origins (`http://localhost:4173`, `https://www.kinaryaloka.com`, dsb).
  - Tambahkan **test users** (email yang akan mencoba) selama app belum diverifikasi.
- Konsekuensi sebelum verifikasi: layar "Google hasn't verified this app" + batas 100 test user.

## Caveat

- Alamat Xero inbox akan **ikut ter-bundle di JS client** (dapat diekstrak). Bila
  disalahgunakan, pemilik dapat "Reset email address" di Xero. Ini konsekuensi pendekatan
  tanpa backend yang sudah disetujui.
- Xero **tidak** otomatis membalas quote dari file inbox; pembuatan & pengiriman Quote
  dilakukan manual oleh pemilik di dalam Xero.

## Testing

- Belum ada test runner. Fungsi murni (`buildMimeMessage`, `base64UrlEncode`, perakitan
  data PDF) ditulis agar mudah diverifikasi.
- **Opsional**: tambah Vitest untuk unit test `buildMimeMessage` (struktur multipart &
  encoding attachment).
- Verifikasi utama **manual**: isi form → login Gmail (test user) → cek email terkirim ke
  Xero inbox dengan PDF benar; cek tombol unduh & fallback WA.

## Dependensi Baru

- `jspdf` (generate PDF client-side). Tidak perlu env/secret.
- (Opsional) `vitest` sebagai devDependency untuk unit test builder MIME.

## Out of Scope

- Integrasi Xero API resmi (OAuth Xero) untuk membuat Quote otomatis.
- Verifikasi OAuth Google (proses administratif pemilik).
- Penyimpanan data submission ke database.
