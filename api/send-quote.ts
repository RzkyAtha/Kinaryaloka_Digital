import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleQuoteRequest } from '../src/lib/handleQuote'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const result = await handleQuoteRequest(req.body || {}, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    XERO_INBOX_EMAIL: process.env.XERO_INBOX_EMAIL,
    QUOTE_FROM_EMAIL: process.env.QUOTE_FROM_EMAIL,
  })

  res.status(result.status).json(result.body)
}
