# Setup Fitur Quote Request (Serverless + Resend → Xero)

Alur: customer isi form (termasuk **email**) → PDF di-generate di browser →
di-POST ke **Vercel Function** `/api/send-quote` → function kirim email + lampiran PDF
ke **Xero File Inbox** via **Resend**. `reply_to` = email customer. Alamat Xero &
API key **hanya ada di server (env)**, tidak terekspos ke client.

## 1. Resend
1. Daftar di https://resend.com (free tier: 3.000 email/bln, 100/hari).
2. **Verifikasi domain** (mis. `kinaryaloka.com`): menu **Domains → Add Domain**,
   lalu tambahkan DNS record (SPF/DKIM) yang diberikan Resend ke pengelola DNS domain.
   - Tanpa domain terverifikasi, Resend hanya mengizinkan pengiriman dari
     `onboarding@resend.dev` dan hanya ke email pemilik akun (mode uji).
3. Menu **API Keys → Create** → salin API key (dipakai sebagai `RESEND_API_KEY`).
4. Tentukan alamat pengirim di domain terverifikasi, mis. `quote@kinaryaloka.com`
   (dipakai sebagai `QUOTE_FROM_EMAIL`).

## 2. Environment Variables (Vercel → Project → Settings → Environment Variables)
Set 3 variabel ini (Production + Preview):

| Nama | Contoh nilai | Keterangan |
|---|---|---|
| `RESEND_API_KEY` | `re_xxx...` | API key dari Resend |
| `XERO_INBOX_EMAIL` | `xero.inbox.o22gnn...@xerofiles.com` | Alamat Xero File Inbox tujuan |
| `QUOTE_FROM_EMAIL` | `quote@kinaryaloka.com` | Pengirim (domain terverifikasi di Resend) |

> Jangan taruh nilai ini di kode/`.env` yang ter-commit. Set hanya di dashboard Vercel.

## 3. Deploy
- Push ke repo yang terhubung Vercel, atau `vercel --prod`.
- Vercel otomatis: build Vite (output `dist`) + deploy function `api/send-quote.ts`
  sebagai `/api/send-quote`. Tidak perlu `vercel.json` khusus.

## 4. Uji lokal (opsional)
- Fungsi `/api/*` tidak jalan di `npm run dev`/`npm run preview`. Gunakan:
  ```bash
  npm i -g vercel   # sekali saja
  vercel dev        # serve Vite + function sekaligus
  ```
  Set 3 env di atas via `vercel env pull` atau file `.env` lokal (jangan commit).

## 5. Verifikasi manual fitur
1. Buka situs (hasil deploy atau `vercel dev`).
2. Section Produk → klik "Pilih Paket Ini".
3. Isi form: **Email**, Nama, WhatsApp, Nama Bisnis wajib; deskripsi kebutuhan wajib.
4. Step 3 → klik **"Kirim Request"**.
5. Cek: muncul "Request Terkirim!" + tombol "Unduh PDF" menghasilkan PDF benar.
6. Cek Xero File Inbox: email masuk dengan lampiran `KNY-Quote-Request-*.pdf`,
   `reply-to` = email customer.
7. Uji fallback: matikan sementara `RESEND_API_KEY` → submit → muncul pesan error +
   tombol "Kirim via WhatsApp".

## Catatan
- Pembuatan Quote harga final dilakukan manual di Xero, lalu dikirim ke email customer.
- Chunk `RequestQuoteModal` besar (~133 KB gzip) karena `jspdf` membawa html2canvas/dompurify,
  namun di-lazy-load (hanya dimuat saat modal dibuka) sehingga tidak membebani initial load.
- Batas payload function Vercel (~4.5 MB) jauh di atas ukuran PDF brief (biasanya <200 KB).
