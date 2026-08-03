import { describe, it, expect } from 'vitest'
import { buildResendPayload } from '../quotePayload'
import type { QuoteForm, QuoteProduct } from '../quoteText'

const product: QuoteProduct = {
  title: 'Company Catalog',
  price: '5000',
  color: '#0080FF',
  details: ['CMS produk'],
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
  customFeatures: '',
  deadline: '',
  budgetEstimate: '',
  referenceLinks: '',
  notes: '',
  contactPreference: 'whatsapp',
}

describe('buildResendPayload', () => {
  const payload = buildResendPayload({
    form,
    product,
    ref: 'KNY-QR-20260803-AB12',
    pdfBase64: 'QUJD',
    fileName: 'brief.pdf',
    from: 'quote@kinaryaloka.com',
    to: 'xero.inbox@xerofiles.com',
  })

  it('sets from, to array and reply_to from customer email', () => {
    expect(payload.from).toBe('quote@kinaryaloka.com')
    expect(payload.to).toEqual(['xero.inbox@xerofiles.com'])
    expect(payload.reply_to).toBe('budi@gmail.com')
  })

  it('includes subject, body and PDF attachment', () => {
    expect(payload.subject).toBe('[Quote Request] Toko Budi — Company Catalog')
    expect(payload.text).toContain('KNY-QR-20260803-AB12')
    expect(payload.attachments).toEqual([
      { filename: 'brief.pdf', content: 'QUJD' },
    ])
  })
})
