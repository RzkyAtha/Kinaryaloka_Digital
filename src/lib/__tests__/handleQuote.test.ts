import { describe, it, expect, vi } from 'vitest'
import { handleQuoteRequest } from '../handleQuote'
import type { QuoteRequestBody, QuoteEnv } from '../handleQuote'

const fullEnv: QuoteEnv = {
  RESEND_API_KEY: 're_test',
  XERO_INBOX_EMAIL: 'xero@xerofiles.com',
  QUOTE_FROM_EMAIL: 'quote@kinaryaloka.com',
}

const validBody: QuoteRequestBody = {
  form: {
    fullName: 'Budi',
    email: 'budi@gmail.com',
    whatsapp: '0812',
    businessName: 'Toko Budi',
    industry: 'Retail',
    city: 'Bandung',
    needsDescription: 'x',
    selectedFeatures: [],
    contactPreference: 'whatsapp',
  },
  product: { title: 'Kit', price: '15000', color: '#000000', details: [] },
  ref: 'KNY-QR-1',
  pdfBase64: 'QUJD',
  fileName: 'brief.pdf',
}

describe('handleQuoteRequest', () => {
  it('returns 500 when env incomplete', async () => {
    const res = await handleQuoteRequest(validBody, {}, vi.fn())
    expect(res.status).toBe(500)
  })

  it('returns 400 when body incomplete', async () => {
    const res = await handleQuoteRequest({ ...validBody, pdfBase64: '' }, fullEnv, vi.fn())
    expect(res.status).toBe(400)
  })

  it('calls Resend and returns 200 on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response)
    const res = await handleQuoteRequest(validBody, fullEnv, fetchMock)
    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({ method: 'POST' }),
    )
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(sentBody.to).toEqual(['xero@xerofiles.com'])
    expect(sentBody.reply_to).toBe('budi@gmail.com')
    expect(sentBody.attachments[0].filename).toBe('brief.pdf')
  })

  it('returns 502 when Resend fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'unauthorized',
    } as Response)
    const res = await handleQuoteRequest(validBody, fullEnv, fetchMock)
    expect(res.status).toBe(502)
  })
})
