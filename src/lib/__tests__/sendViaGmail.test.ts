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
    expect(mime).toContain(base64Utf8('Halo dunia'))
    expect(mime).toContain('Content-Type: application/pdf; name="brief.pdf"')
    expect(mime).toContain('QUJD')
    expect(mime).toMatch(/--kny_boundary_[a-z0-9]+--(?:\r\n)?$/)
  })
})
