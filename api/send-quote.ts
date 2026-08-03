import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildResendPayload } from '../src/lib/quotePayload'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const XERO_INBOX_EMAIL = process.env.XERO_INBOX_EMAIL
  const QUOTE_FROM_EMAIL = process.env.QUOTE_FROM_EMAIL

  if (!RESEND_API_KEY || !XERO_INBOX_EMAIL || !QUOTE_FROM_EMAIL) {
    res.status(500).json({ error: 'Server belum dikonfigurasi (env belum lengkap).' })
    return
  }

  const { form, product, ref, pdfBase64, fileName } = req.body || {}

  if (
    !form?.email ||
    !form?.fullName ||
    !form?.businessName ||
    !product?.title ||
    !pdfBase64 ||
    !fileName
  ) {
    res.status(400).json({ error: 'Data submission tidak lengkap.' })
    return
  }

  const payload = buildResendPayload({
    form,
    product,
    ref,
    pdfBase64,
    fileName,
    from: QUOTE_FROM_EMAIL,
    to: XERO_INBOX_EMAIL,
  })

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!r.ok) {
      const text = await r.text()
      res.status(502).json({ error: `Gagal mengirim email (Resend ${r.status}). ${text}` })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Kesalahan tak terduga di server.',
    })
  }
}
