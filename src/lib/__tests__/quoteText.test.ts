import { describe, it, expect } from 'vitest'
import {
  makeQuoteRef,
  buildQuoteFileName,
  buildWhatsAppMessage,
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

  it('buildWhatsAppMessage includes ref and key customer + package info', () => {
    const msg = buildWhatsAppMessage(form, product, 'KNY-QR-20260803-AB12')
    expect(msg).toContain('KNY-QR-20260803-AB12')
    expect(msg).toContain('Toko Budi')
    expect(msg).toContain('Company Catalog')
    expect(msg).toContain('IDR 5000')
    expect(msg).toContain('budi@gmail.com')
  })

  it('buildWhatsAppMessage falls back to "-" for empty optional fields', () => {
    const sparse: QuoteForm = {
      ...form,
      industry: '',
      city: '',
      existingWebOrSocial: '',
      customFeatures: '',
      deadline: '',
      budgetEstimate: '',
      referenceLinks: '',
      notes: '',
    }
    const msg = buildWhatsAppMessage(sparse, product, 'KNY-QR-20260803-AB12')
    expect(msg).toContain('Industri: -')
    expect(msg).toContain('Catatan: -')
  })
})
