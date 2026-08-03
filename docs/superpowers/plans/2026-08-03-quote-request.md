# Quote Request Intake Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ubah tombol "Pilih Paket Ini" agar membuka form intake, meng-generate PDF brief/quote berlogo KINARYALOKA, dan mengirimnya sebagai lampiran email ke Xero inbox lewat Gmail API (client-side).

**Architecture:** SPA React (Vite). Tanpa backend: PDF di-generate di browser dengan `jspdf`; email dikirim via Gmail API `users.messages.send` memakai access token dari `useGoogleLogin` (`@react-oauth/google`, sudah terpasang & App dibungkus `GoogleOAuthProvider`). Fungsi murni (MIME builder, ref/filename/subject/body) dipisah agar bisa diuji dengan Vitest.

**Tech Stack:** React 18, TypeScript, Vite, framer-motion, @react-oauth/google, jspdf, Vitest (dev).

---

## File Structure

- Create: `src/config/quote.ts` — konstanta (alamat Xero, WhatsApp, scope Gmail).
- Create: `src/lib/quoteText.ts` — fungsi murni: ref, filename, subject, body email.
- Create: `src/lib/sendViaGmail.ts` — `base64UrlEncode`, `base64Utf8`, `encodeMimeHeader`, `buildMimeMessage`, `sendViaGmail`.
- Create: `src/lib/generateQuotePdf.ts` — `generateQuotePdf(form, product)` → `{ blob, base64 }`.
- Create: `src/components/RequestQuoteModal.tsx` — modal form 3 langkah + login Gmail + kirim + sukses + fallback.
- Create: `src/lib/__tests__/quoteText.test.ts`, `src/lib/__tests__/sendViaGmail.test.ts` — unit test fungsi murni.
- Create: `vitest.config.ts` — konfigurasi test (environment node).
- Modify: `package.json` — tambah dependency `jspdf`, devDependency `vitest`, script `test`.
- Modify: `src/components/Products.tsx` — ganti alur select ke `RequestQuoteModal`, hapus pemakaian `AuthModal` di file ini.

---

### Task 1: Tambah dependency & script test

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install jspdf (runtime) dan vitest (dev)**

Run:
```bash
npm install jspdf
npm install -D vitest
```
Expected: kedua paket masuk ke `package.json`, exit code 0.

- [ ] **Step 2: Tambahkan script test**

Edit `package.json` bagian `"scripts"` menjadi:
```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
```

- [ ] **Step 3: Buat konfigurasi Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add jspdf, vitest and test script for quote-request feature"
```

---

### Task 2: Konstanta konfigurasi

**Files:**
- Create: `src/config/quote.ts`

- [ ] **Step 1: Buat file konstanta**

Create `src/config/quote.ts`:
```ts
// Alamat Xero File Inbox (bersifat sensitif; ikut ter-bundle di client — konsekuensi
// pendekatan tanpa backend. Reset dari Xero jika disalahgunakan).
export const XERO_INBOX_EMAIL =
  'xero.inbox.o22gnn.7tmvam86sg6dos97@xerofiles.com'

// Nomor WhatsApp bisnis untuk fallback pengiriman manual.
export const BUSINESS_WHATSAPP = '6281357662424'

// Scope OAuth Google: identitas + izin kirim email atas nama user.
export const GMAIL_SCOPE =
  'openid email profile https://www.googleapis.com/auth/gmail.send'
```

- [ ] **Step 2: Commit**

```bash
git add src/config/quote.ts
git commit -m "feat: add quote config constants (Xero inbox, WhatsApp, Gmail scope)"
```

---

### Task 3: Fungsi teks murni (ref, filename, subject, body) — TDD

**Files:**
- Create: `src/lib/quoteText.ts`
- Test: `src/lib/__tests__/quoteText.test.ts`

- [ ] **Step 1: Tulis test yang gagal**

Create `src/lib/__tests__/quoteText.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import {
  makeQuoteRef,
  buildQuoteFileName,
  buildEmailSubject,
  buildEmailBody,
} from '../quoteText'
import type { QuoteForm, QuoteProduct } from '../quoteText'

const product: QuoteProduct = {
  title: 'Company Catalog',
  price: '5000',
  color: '#0080FF',
  details: ['Custom website multi-halaman', 'CMS produk'],
}

const form: QuoteForm = {
  fullName: 'Budi Santoso',
  email: 'budi@gmail.com',
  whatsapp: '08123456789',
  businessName: 'Toko Budi',
  industry: 'Retail',
  city: 'Bandung',
  existingWebOrSocial: '@tokobudi',
  needsDescription: 'Butuh katalog online',
  selectedFeatures: ['CMS produk'],
  customFeatures: 'Integrasi WA',
  deadline: '2026-09-01',
  budgetEstimate: '5jt',
  referenceLinks: 'https://contoh.com',
  notes: 'Warna dominan biru',
  contactPreference: 'whatsapp',
}

describe('quoteText', () => {
  it('makeQuoteRef formats KNY-QR-YYYYMMDD-XXXX', () => {
    const ref = makeQuoteRef(new Date('2026-08-03T10:00:00Z'), 'ab12')
    expect(ref).toBe('KNY-QR-20260803-AB12')
  })

  it('buildQuoteFileName wraps ref', () => {
    expect(buildQuoteFileName('KNY-QR-20260803-AB12')).toBe(
      'KNY-Quote-Request-KNY-QR-20260803-AB12.pdf',
    )
  })

  it('buildEmailSubject includes business and product', () => {
    expect(buildEmailSubject(form, product)).toBe(
      '[Quote Request] Toko Budi — Company Catalog',
    )
  })

  it('buildEmailBody includes key customer + package info', () => {
    const body = buildEmailBody(form, product, 'KNY-QR-20260803-AB12')
    expect(body).toContain('Toko Budi')
    expect(body).toContain('Company Catalog')
    expect(body).toContain('IDR 5000')
    expect(body).toContain('budi@gmail.com')
    expect(body).toContain('KNY-QR-20260803-AB12')
  })
})
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npm test`
Expected: FAIL (module `../quoteText` belum ada).

- [ ] **Step 3: Implementasi minimal**

Create `src/lib/quoteText.ts`:
```ts
export interface QuoteProduct {
  title: string
  price: string
  color: string
  details: string[]
}

export interface QuoteForm {
  fullName: string
  email: string
  whatsapp: string
  businessName: string
  industry: string
  city: string
  existingWebOrSocial?: string
  needsDescription: string
  selectedFeatures: string[]
  customFeatures?: string
  deadline?: string
  budgetEstimate?: string
  referenceLinks?: string
  notes?: string
  contactPreference: 'whatsapp' | 'email' | 'phone'
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

export function makeQuoteRef(date: Date = new Date(), suffix?: string): string {
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const rand = (suffix ?? Math.random().toString(36).slice(2, 6)).toUpperCase()
  return `KNY-QR-${y}${m}${d}-${rand}`
}

export function buildQuoteFileName(ref: string): string {
  return `KNY-Quote-Request-${ref}.pdf`
}

export function buildEmailSubject(form: QuoteForm, product: QuoteProduct): string {
  return `[Quote Request] ${form.businessName} — ${product.title}`
}

export function buildEmailBody(
  form: QuoteForm,
  product: QuoteProduct,
  ref: string,
): string {
  return [
    `Halo Tim KINARYALOKA,`,
    ``,
    `Ada permintaan quote baru (${ref}).`,
    ``,
    `— Data Customer —`,
    `Nama       : ${form.fullName}`,
    `Email      : ${form.email}`,
    `WhatsApp   : ${form.whatsapp}`,
    `Kontak pref: ${form.contactPreference}`,
    ``,
    `— Detail Bisnis —`,
    `Bisnis     : ${form.businessName}`,
    `Industri   : ${form.industry}`,
    `Kota       : ${form.city}`,
    `Web/Sosmed : ${form.existingWebOrSocial || '-'}`,
    ``,
    `— Paket —`,
    `Produk     : ${product.title}`,
    `Harga est. : IDR ${product.price}`,
    ``,
    `— Requirement —`,
    `Kebutuhan  : ${form.needsDescription}`,
    `Fitur      : ${form.selectedFeatures.join(', ') || '-'}`,
    `Fitur lain : ${form.customFeatures || '-'}`,
    `Deadline   : ${form.deadline || '-'}`,
    `Budget     : ${form.budgetEstimate || '-'}`,
    ``,
    `— Referensi & Catatan —`,
    `Referensi  : ${form.referenceLinks || '-'}`,
    `Catatan    : ${form.notes || '-'}`,
    ``,
    `PDF brief lengkap terlampir.`,
  ].join('\n')
}
```

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm test`
Expected: PASS (4 test).

- [ ] **Step 5: Commit**

```bash
git add src/lib/quoteText.ts src/lib/__tests__/quoteText.test.ts
git commit -m "feat: add pure quote text helpers with tests"
```

---

### Task 4: MIME builder & Gmail sender — TDD (fungsi murni)

**Files:**
- Create: `src/lib/sendViaGmail.ts`
- Test: `src/lib/__tests__/sendViaGmail.test.ts`

- [ ] **Step 1: Tulis test yang gagal**

Create `src/lib/__tests__/sendViaGmail.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import {
  base64UrlEncode,
  base64Utf8,
  encodeMimeHeader,
  buildMimeMessage,
} from '../sendViaGmail'

describe('sendViaGmail helpers', () => {
  it('base64UrlEncode has no +, / or = padding', () => {
    const out = base64UrlEncode('hello>>>world???')
    expect(out).not.toMatch(/[+/=]/)
  })

  it('base64Utf8 round-trips unicode', () => {
    const b64 = base64Utf8('Toko Büdi — 日本')
    const decoded = Buffer.from(b64, 'base64').toString('utf8')
    expect(decoded).toBe('Toko Büdi — 日本')
  })

  it('encodeMimeHeader wraps as RFC2047 base64', () => {
    const h = encodeMimeHeader('Toko Büdi')
    expect(h.startsWith('=?UTF-8?B?')).toBe(true)
    expect(h.endsWith('?=')).toBe(true)
  })

  it('buildMimeMessage contains headers, body and base64 attachment', () => {
    const mime = buildMimeMessage({
      to: 'inbox@xerofiles.com',
      subject: 'Toko Büdi',
      bodyText: 'Halo dunia',
      attachmentBase64: 'QUJD', // "ABC"
      fileName: 'brief.pdf',
    })
    expect(mime).toContain('To: inbox@xerofiles.com')
    expect(mime).toContain('Subject: =?UTF-8?B?')
    expect(mime).toContain('Content-Type: multipart/mixed; boundary=')
    expect(mime).toContain('Halo dunia')
    expect(mime).toContain('Content-Type: application/pdf; name="brief.pdf"')
    expect(mime).toContain('QUJD')
    expect(mime).toMatch(/--kny_boundary_[a-z0-9]+--\r\n?$/)
  })
})
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npm test`
Expected: FAIL (module `../sendViaGmail` belum ada).

- [ ] **Step 3: Implementasi**

Create `src/lib/sendViaGmail.ts`:
```ts
function toBinaryFromUtf8(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return binary
}

function btoaSafe(binary: string): string {
  if (typeof btoa === 'function') return btoa(binary)
  // Node fallback (untuk lingkungan test)
  return Buffer.from(binary, 'binary').toString('base64')
}

/** base64 (standar) dari string UTF-8. */
export function base64Utf8(input: string): string {
  return btoaSafe(toBinaryFromUtf8(input))
}

/** base64url dari string UTF-8, tanpa padding. */
export function base64UrlEncode(input: string): string {
  return base64Utf8(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/** Encode header MIME berisi unicode sesuai RFC 2047. */
export function encodeMimeHeader(value: string): string {
  return `=?UTF-8?B?${base64Utf8(value)}?=`
}

export interface MimeOptions {
  to: string
  subject: string
  bodyText: string
  /** base64 STANDAR dari byte PDF (tanpa prefix data:). */
  attachmentBase64: string
  fileName: string
}

export function buildMimeMessage(o: MimeOptions): string {
  const boundary = 'kny_boundary_' + Math.random().toString(36).slice(2)
  return [
    `To: ${o.to}`,
    'MIME-Version: 1.0',
    `Subject: ${encodeMimeHeader(o.subject)}`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    base64Utf8(o.bodyText),
    '',
    `--${boundary}`,
    `Content-Type: application/pdf; name="${o.fileName}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${o.fileName}"`,
    '',
    o.attachmentBase64,
    '',
    `--${boundary}--`,
  ].join('\r\n')
}

export async function sendViaGmail(
  opts: MimeOptions & { accessToken: string },
): Promise<void> {
  const raw = base64UrlEncode(buildMimeMessage(opts))
  const res = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    },
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gmail send failed: ${res.status} ${text}`)
  }
}
```

Catatan: test `buildMimeMessage` memakai `bodyText: 'Halo dunia'` → di-encode base64. Sesuaikan assertion: ganti `expect(mime).toContain('Halo dunia')` menjadi `expect(mime).toContain(base64Utf8('Halo dunia'))`. Perbarui import test agar menyertakan `base64Utf8` (sudah diimport) dan ubah baris assertion tersebut sebelum menjalankan.

- [ ] **Step 4: Perbarui assertion body pada test**

Edit `src/lib/__tests__/sendViaGmail.test.ts`, ganti baris:
```ts
    expect(mime).toContain('Halo dunia')
```
menjadi:
```ts
    expect(mime).toContain(base64Utf8('Halo dunia'))
```

- [ ] **Step 5: Jalankan test, pastikan lulus**

Run: `npm test`
Expected: PASS (semua test Task 3 & 4).

- [ ] **Step 6: Commit**

```bash
git add src/lib/sendViaGmail.ts src/lib/__tests__/sendViaGmail.test.ts
git commit -m "feat: add Gmail MIME builder and sender with tests"
```

---

### Task 5: Generator PDF berlogo (berwarna sesuai brand paket)

**Files:**
- Create: `src/lib/generateQuotePdf.ts`

Catatan: melibatkan `jspdf`, `Image`, dan `<canvas>` (API browser) sehingga diverifikasi manual, bukan unit test.

- [ ] **Step 1: Implementasi generator**

Create `src/lib/generateQuotePdf.ts`:
```ts
import { jsPDF } from 'jspdf'
import type { QuoteForm, QuoteProduct } from './quoteText'

const LOGO_URL = '/Assets/logo_kinarya.webp'

async function loadLogoPng(): Promise<{ dataUrl: string; ratio: number } | null> {
  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = LOGO_URL
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(img, 0, 0)
    return {
      dataUrl: canvas.toDataURL('image/png'),
      ratio: img.naturalWidth / img.naturalHeight,
    }
  } catch {
    return null
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export interface QuotePdfResult {
  blob: Blob
  /** base64 STANDAR (tanpa prefix data:) untuk lampiran email. */
  base64: string
}

export async function generateQuotePdf(
  form: QuoteForm,
  product: QuoteProduct,
  ref: string,
): Promise<QuotePdfResult> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 48
  const [r, g, b] = hexToRgb(product.color)

  // ── Header berwarna aksen paket ──
  const headerH = 96
  doc.setFillColor(r, g, b)
  doc.rect(0, 0, pageW, headerH, 'F')

  const logo = await loadLogoPng()
  const logoH = 56
  if (logo) {
    const logoW = logoH * logo.ratio
    doc.addImage(logo.dataUrl, 'PNG', margin, (headerH - logoH) / 2, logoW, logoH)
  }

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Project Brief & Quote Request', pageW - margin, 40, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Ref: ${ref}`, pageW - margin, 60, { align: 'right' })
  doc.text(
    new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    pageW - margin,
    76,
    { align: 'right' },
  )

  // ── Body ──
  let y = headerH + 34
  const lineH = 16

  const sectionTitle = (title: string) => {
    if (y > 760) {
      doc.addPage()
      y = margin
    }
    doc.setFillColor(r, g, b)
    doc.rect(margin, y - 10, 4, 14, 'F')
    doc.setTextColor(20, 20, 20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(title, margin + 12, y + 2)
    y += 22
  }

  const row = (label: string, value: string) => {
    if (y > 780) {
      doc.addPage()
      y = margin
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(90, 90, 90)
    doc.text(label, margin + 12, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(30, 30, 30)
    const wrapped = doc.splitTextToSize(value || '-', pageW - margin * 2 - 130)
    doc.text(wrapped, margin + 140, y)
    y += lineH * Math.max(1, wrapped.length) + 4
  }

  sectionTitle('Data Customer')
  row('Nama', form.fullName)
  row('Email', form.email)
  row('WhatsApp', form.whatsapp)
  row('Kontak Preferensi', form.contactPreference)

  sectionTitle('Detail Bisnis')
  row('Nama Bisnis', form.businessName)
  row('Industri', form.industry)
  row('Kota', form.city)
  row('Web/Sosmed', form.existingWebOrSocial || '-')

  sectionTitle('Paket Dipilih')
  row('Produk', product.title)
  row('Harga Estimasi', `IDR ${product.price}`)
  row('Fitur Terpilih', form.selectedFeatures.join('\n') || '-')
  if (form.customFeatures) row('Fitur Tambahan', form.customFeatures)

  sectionTitle('Requirement')
  row('Kebutuhan', form.needsDescription)
  row('Target Deadline', form.deadline || '-')
  row('Estimasi Budget', form.budgetEstimate || '-')

  sectionTitle('Referensi & Catatan')
  row('Referensi', form.referenceLinks || '-')
  row('Catatan', form.notes || '-')

  // ── Footer ──
  const footerY = 812
  doc.setDrawColor(220, 220, 220)
  doc.line(margin, footerY, pageW - margin, footerY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(30, 30, 30)
  doc.text('KINARYALOKA Digital Studio', margin, footerY + 16)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text(
    'Harga bersifat estimasi; quote final akan dikirim melalui email.',
    margin,
    footerY + 30,
  )

  const blob = doc.output('blob')
  const base64 = doc.output('datauristring').split(',')[1]
  return { blob, base64 }
}
```

- [ ] **Step 2: Verifikasi kompilasi TypeScript**

Run: `npx tsc --noEmit`
Expected: tidak ada error terkait `generateQuotePdf.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/generateQuotePdf.ts
git commit -m "feat: add branded quote PDF generator with logo header"
```

---

### Task 6: Komponen RequestQuoteModal

**Files:**
- Create: `src/components/RequestQuoteModal.tsx`

- [ ] **Step 1: Implementasi komponen**

Create `src/components/RequestQuoteModal.tsx`:
```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon as X,
  ArrowRightIcon as ArrowRight,
  ArrowLeftIcon as ArrowLeft,
  CheckIcon as Check,
  PaperAirplaneIcon as Send,
  ArrowDownTrayIcon as Download,
} from '@heroicons/react/24/solid'
import { useGoogleLogin } from '@react-oauth/google'
import type { QuoteForm, QuoteProduct } from '../lib/quoteText'
import {
  makeQuoteRef,
  buildQuoteFileName,
  buildEmailSubject,
  buildEmailBody,
} from '../lib/quoteText'
import { generateQuotePdf } from '../lib/generateQuotePdf'
import { sendViaGmail } from '../lib/sendViaGmail'
import { XERO_INBOX_EMAIL, BUSINESS_WHATSAPP, GMAIL_SCOPE } from '../config/quote'

export interface RequestQuoteProduct extends QuoteProduct {
  textColor?: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  product: RequestQuoteProduct | null
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: QuoteForm = {
  fullName: '',
  email: '',
  whatsapp: '',
  businessName: '',
  industry: '',
  city: '',
  existingWebOrSocial: '',
  needsDescription: '',
  selectedFeatures: [],
  customFeatures: '',
  deadline: '',
  budgetEstimate: '',
  referenceLinks: '',
  notes: '',
  contactPreference: 'whatsapp',
}

export default function RequestQuoteModal({ isOpen, onClose, product }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<QuoteForm>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [lastBlob, setLastBlob] = useState<Blob | null>(null)
  const [lastFileName, setLastFileName] = useState('')

  const accent = product?.color ?? '#000000'

  const set = <K extends keyof QuoteForm>(key: K, value: QuoteForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleFeature = (feat: string) =>
    setForm((f) => ({
      ...f,
      selectedFeatures: f.selectedFeatures.includes(feat)
        ? f.selectedFeatures.filter((x) => x !== feat)
        : [...f.selectedFeatures, feat],
    }))

  const reset = () => {
    setStep(1)
    setForm(EMPTY)
    setStatus('idle')
    setErrorMsg('')
    setLastBlob(null)
    setLastFileName('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const step1Valid =
    form.fullName.trim() && form.whatsapp.trim() && form.businessName.trim()
  const step2Valid = form.needsDescription.trim()

  const downloadPdf = () => {
    if (!lastBlob) return
    const url = URL.createObjectURL(lastBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = lastFileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const fallbackWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo KINARYALOKA, saya ${form.fullName} dari ${form.businessName} ingin request paket ${product?.title}. (PDF brief akan saya lampirkan)`,
    )
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${text}`, '_blank')
  }

  const doSendWithToken = async (accessToken: string) => {
    if (!product) return
    try {
      setStatus('sending')
      // Ambil email user dari userinfo dan kunci ke form
      let email = form.email
      try {
        const uRes = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${accessToken}` } },
        )
        if (uRes.ok) {
          const info = await uRes.json()
          if (info.email) email = info.email
        }
      } catch {
        /* abaikan; pakai email dari form jika ada */
      }
      const filledForm: QuoteForm = { ...form, email }
      setForm(filledForm)

      const ref = makeQuoteRef()
      const fileName = buildQuoteFileName(ref)
      const { blob, base64 } = await generateQuotePdf(filledForm, product, ref)
      setLastBlob(blob)
      setLastFileName(fileName)

      await sendViaGmail({
        accessToken,
        to: XERO_INBOX_EMAIL,
        subject: buildEmailSubject(filledForm, product),
        bodyText: buildEmailBody(filledForm, product, ref),
        attachmentBase64: base64,
        fileName,
      })
      setStatus('success')
    } catch (err) {
      console.error(err)
      setErrorMsg(
        err instanceof Error ? err.message : 'Terjadi kesalahan saat mengirim.',
      )
      setStatus('error')
    }
  }

  const login = useGoogleLogin({
    flow: 'implicit',
    scope: GMAIL_SCOPE,
    onSuccess: (resp) => doSendWithToken(resp.access_token),
    onError: () => {
      setErrorMsg('Login/izin Gmail dibatalkan. Coba lagi atau kirim via WhatsApp.')
      setStatus('error')
    },
  })

  const inputCls =
    'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none transition-all font-medium text-sm'
  const labelCls =
    'text-xs font-bold text-black uppercase tracking-wider block mb-1.5'

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9995]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-[9996] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-6 py-5 flex items-center justify-between flex-shrink-0"
                style={{ background: accent }}
              >
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">
                    Pilih Paket Ini
                  </h3>
                  <p className="text-white/80 text-xs">
                    {product.title} • IDR {product.price}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto">
                {status === 'success' ? (
                  <div className="text-center py-6">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ background: accent }}
                    >
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-black mb-2">
                      Request Terkirim!
                    </h4>
                    <p className="text-gray-600 text-sm mb-6">
                      Tim KINARYALOKA akan mengirim quote harga final ke email kamu
                      melalui Xero. Terima kasih!
                    </p>
                    <button
                      onClick={downloadPdf}
                      className="w-full py-3 rounded-xl border-2 border-black text-black font-bold text-sm flex items-center justify-center gap-2 mb-2"
                    >
                      <Download className="w-4 h-4" /> Unduh PDF
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full py-3 rounded-xl bg-black text-white font-bold text-sm"
                    >
                      Selesai
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Stepper */}
                    <div className="flex items-center gap-2 mb-5">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className="h-1.5 flex-1 rounded-full transition-colors"
                          style={{ background: s <= step ? accent : '#e5e7eb' }}
                        />
                      ))}
                    </div>

                    {step === 1 && (
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Nama Lengkap *</label>
                          <input
                            className={inputCls}
                            value={form.fullName}
                            onChange={(e) => set('fullName', e.target.value)}
                            placeholder="Nama kamu"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>WhatsApp *</label>
                          <input
                            className={inputCls}
                            value={form.whatsapp}
                            onChange={(e) => set('whatsapp', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Nama Bisnis / Brand *</label>
                          <input
                            className={inputCls}
                            value={form.businessName}
                            onChange={(e) => set('businessName', e.target.value)}
                            placeholder="Nama bisnis"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Industri</label>
                            <input
                              className={inputCls}
                              value={form.industry}
                              onChange={(e) => set('industry', e.target.value)}
                              placeholder="mis. F&B"
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Kota</label>
                            <input
                              className={inputCls}
                              value={form.city}
                              onChange={(e) => set('city', e.target.value)}
                              placeholder="mis. Bandung"
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Website / Sosmed (opsional)</label>
                          <input
                            className={inputCls}
                            value={form.existingWebOrSocial}
                            onChange={(e) =>
                              set('existingWebOrSocial', e.target.value)
                            }
                            placeholder="@instagram / url"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Deskripsi Kebutuhan *</label>
                          <textarea
                            className={inputCls}
                            rows={3}
                            value={form.needsDescription}
                            onChange={(e) =>
                              set('needsDescription', e.target.value)
                            }
                            placeholder="Ceritakan tujuan & kebutuhanmu"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Fitur yang Diinginkan</label>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                            {product.details.map((feat) => (
                              <label
                                key={feat}
                                className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={form.selectedFeatures.includes(feat)}
                                  onChange={() => toggleFeature(feat)}
                                  className="mt-0.5"
                                />
                                {feat}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Fitur Tambahan (opsional)</label>
                          <input
                            className={inputCls}
                            value={form.customFeatures}
                            onChange={(e) => set('customFeatures', e.target.value)}
                            placeholder="Fitur lain di luar daftar"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Target Deadline</label>
                            <input
                              type="date"
                              className={inputCls}
                              value={form.deadline}
                              onChange={(e) => set('deadline', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Estimasi Budget</label>
                            <input
                              className={inputCls}
                              value={form.budgetEstimate}
                              onChange={(e) =>
                                set('budgetEstimate', e.target.value)
                              }
                              placeholder="mis. 5jt"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Link Referensi (opsional)</label>
                          <input
                            className={inputCls}
                            value={form.referenceLinks}
                            onChange={(e) => set('referenceLinks', e.target.value)}
                            placeholder="Link contoh yang kamu suka"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Catatan (opsional)</label>
                          <textarea
                            className={inputCls}
                            rows={2}
                            value={form.notes}
                            onChange={(e) => set('notes', e.target.value)}
                            placeholder="Catatan tambahan"
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Preferensi Kontak</label>
                          <select
                            className={inputCls}
                            value={form.contactPreference}
                            onChange={(e) =>
                              set(
                                'contactPreference',
                                e.target.value as QuoteForm['contactPreference'],
                              )
                            }
                          >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                            <option value="phone">Telepon</option>
                          </select>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-3 text-sm">
                          <p className="font-bold text-black">{product.title}</p>
                          <p className="text-gray-600">IDR {product.price}</p>
                        </div>
                        {status === 'error' && (
                          <div className="text-red-600 text-xs font-medium">
                            {errorMsg}
                            <button
                              onClick={fallbackWhatsApp}
                              className="block mt-2 underline font-bold"
                            >
                              Kirim via WhatsApp
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Nav buttons */}
                    <div className="flex gap-3 mt-6">
                      {step > 1 && (
                        <button
                          onClick={() => setStep((s) => s - 1)}
                          className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm flex items-center gap-1"
                        >
                          <ArrowLeft className="w-4 h-4" /> Kembali
                        </button>
                      )}
                      {step < 3 && (
                        <button
                          onClick={() => setStep((s) => s + 1)}
                          disabled={
                            (step === 1 && !step1Valid) ||
                            (step === 2 && !step2Valid)
                          }
                          className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-1 disabled:opacity-50"
                          style={{ background: accent }}
                        >
                          Lanjut <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {step === 3 && (
                        <button
                          onClick={() => login()}
                          disabled={status === 'sending'}
                          className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                          style={{ background: accent }}
                        >
                          {status === 'sending' ? (
                            'Mengirim...'
                          ) : (
                            <>
                              <Send className="w-4 h-4" /> Login Gmail & Kirim
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Verifikasi kompilasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error di `RequestQuoteModal.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/RequestQuoteModal.tsx
git commit -m "feat: add RequestQuoteModal multi-step intake form"
```

---

### Task 7: Wire ke Products.tsx (ganti alur AuthModal → RequestQuoteModal)

**Files:**
- Modify: `src/components/Products.tsx`

- [ ] **Step 1: Ganti import lazy AuthModal → RequestQuoteModal**

Di `src/components/Products.tsx`, ganti baris:
```tsx
const AuthModal = lazy(() => import('./AuthModal'))
```
menjadi:
```tsx
const RequestQuoteModal = lazy(() => import('./RequestQuoteModal'))
```

- [ ] **Step 2: Ubah state & handler**

Ganti blok state (baris ~234-236) dari:
```tsx
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ title: string; price: string } | null>(null)
  const [detailProduct, setDetailProduct] = useState<UIProduct | null>(null)
```
menjadi:
```tsx
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<UIProduct | null>(null)
  const [detailProduct, setDetailProduct] = useState<UIProduct | null>(null)
```

Ganti handler (baris ~241-244) dari:
```tsx
  const handleSelectPackage = (title: string, price: string) => {
    setSelectedPackage({ title, price })
    setAuthModalOpen(true)
  }
```
menjadi:
```tsx
  const handleSelectPackage = (product: UIProduct) => {
    setSelectedProduct(product)
    setQuoteOpen(true)
  }
```

- [ ] **Step 3: Perbarui tanda tangan `DetailModal.onSelect`**

Ganti definisi `DetailModal` (baris ~145) header dari:
```tsx
function DetailModal({ product, onClose, onSelect }: { product: UIProduct | null; onClose: () => void; onSelect: (title: string, price: string) => void }) {
```
menjadi:
```tsx
function DetailModal({ product, onClose, onSelect }: { product: UIProduct | null; onClose: () => void; onSelect: (product: UIProduct) => void }) {
```

Dan tombol CTA-nya (baris ~215) dari:
```tsx
                onClick={() => { onSelect(product.title, product.price); onClose() }}
```
menjadi:
```tsx
                onClick={() => { onSelect(product); onClose() }}
```

- [ ] **Step 4: Perbarui semua pemanggil `handleSelectPackage`**

Ganti tiap pemanggil agar mengoper objek produk:
- `handleSelectPackage(allMobileProducts[0].title, allMobileProducts[0].price)` → `handleSelectPackage(allMobileProducts[0])`
- `handleSelectPackage(product.title, product.price)` (dua tempat: mobile grid & cards) → `handleSelectPackage(product)`
- `handleSelectPackage(currentProducts.featured!.title, currentProducts.featured!.price)` → `handleSelectPackage(currentProducts.featured!)`

- [ ] **Step 5: Ganti render AuthModal → RequestQuoteModal**

Ganti blok (baris ~575-584):
```tsx
        {/* Auth Modal */}
        {authModalOpen && (
          <Suspense fallback={null}>
            <AuthModal
              isOpen={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
              selectedPackage={selectedPackage}
            />
          </Suspense>
        )}
```
menjadi:
```tsx
        {/* Request Quote Modal */}
        {quoteOpen && (
          <Suspense fallback={null}>
            <RequestQuoteModal
              isOpen={quoteOpen}
              onClose={() => setQuoteOpen(false)}
              product={selectedProduct}
            />
          </Suspense>
        )}
```

- [ ] **Step 6: Perbarui manualChunks (auth-vendor)**

Di `vite.config.ts`, `manualChunks.auth-vendor` masih valid karena `AuthModal` tetap dipakai `Navbar`. Tidak ada perubahan. (Langkah verifikasi saja — pastikan build tidak error.)

- [ ] **Step 7: Build & test**

Run: `npm run build && npm test`
Expected: build sukses (tsc + vite), semua unit test PASS. Tidak ada error "unused" (mis. `selectedPackage`/`authModalOpen` sudah tidak ada).

- [ ] **Step 8: Commit**

```bash
git add src/components/Products.tsx
git commit -m "feat: wire Pilih Paket Ini to RequestQuoteModal"
```

---

### Task 8: Verifikasi manual & dokumentasi setup Google

**Files:**
- Create: `docs/quote-request-setup.md`

- [ ] **Step 1: Tulis dokumen setup**

Create `docs/quote-request-setup.md`:
```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/quote-request-setup.md
git commit -m "docs: add Google Cloud setup and manual verification guide"
```

---

## Self-Review

**Spec coverage:**
- Form data customer/bisnis/requirement/referensi → Task 6 (RequestQuoteModal) + Task 3 (types).
- Generate PDF berlogo & profesional (warna brand paket) → Task 5.
- Kirim ke Xero via Gmail (client-side) → Task 4 + Task 6 (useGoogleLogin).
- Trigger dari "Pilih Paket Ini" → Task 7.
- Error handling & fallback WA → Task 6.
- Setup Google & caveat → Task 8 + Task 2 (config).
- Testing fungsi murni → Task 3 & 4 (Vitest).

**Placeholder scan:** Tidak ada TODO/TBD; semua langkah berisi kode lengkap.

**Type consistency:** `QuoteForm`/`QuoteProduct` didefinisikan di `quoteText.ts` dan dipakai konsisten di `sendViaGmail`, `generateQuotePdf`, `RequestQuoteModal`. `handleSelectPackage(product: UIProduct)` konsisten di semua call site & `DetailModal.onSelect`. `generateQuotePdf(form, product, ref)` dipanggil dengan 3 argumen di modal.
