# Setup Fitur Quote Request (Gmail → Xero)

## Google Cloud Console (project pemilik GOOGLE_CLIENT_ID)
1. Aktifkan **Gmail API** (APIs & Services → Library → Gmail API → Enable).
2. OAuth consent screen:
   - Tambah scope `https://www.googleapis.com/auth/gmail.send`.
   - Authorized JavaScript origins: `http://localhost:4173`, `http://localhost:5173`,
     `https://www.kinaryaloka.com`, `https://kinaryaloka.com`.
   - Tambahkan **Test users** (email yang akan menguji) selama app belum diverifikasi.
3. Sebelum verifikasi Google: akan muncul layar "Google hasn't verified this app"
   (klik Advanced → Continue). Batas 100 test user.

## Verifikasi manual fitur
1. `npm run build && npm run preview`, buka `http://localhost:4173`.
2. Buka section Produk → klik "Pilih Paket Ini" pada salah satu paket.
3. Isi 3 langkah form (nama, WA, bisnis wajib; deskripsi kebutuhan wajib).
4. Klik "Login Gmail & Kirim" → login dengan **test user** → izinkan scope.
5. Cek: muncul layar "Request Terkirim!" dan tombol "Unduh PDF" menghasilkan PDF benar.
6. Cek Xero File Inbox: email masuk dengan lampiran `KNY-Quote-Request-*.pdf`.
7. Uji fallback: batalkan popup Google → muncul pesan error + tombol "Kirim via WhatsApp".

## Catatan
- Alamat Xero ada di `src/config/quote.ts` (ikut ter-bundle di client).
- Pembuatan Quote harga final dilakukan manual di Xero, lalu dikirim ke email customer.
- Chunk `RequestQuoteModal` besar (~134 KB gzip) karena `jspdf` membawa html2canvas/dompurify,
  namun di-lazy-load (hanya dimuat saat modal dibuka) sehingga tidak membebani initial load.
