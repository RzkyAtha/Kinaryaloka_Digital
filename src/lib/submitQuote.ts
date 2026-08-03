import type { QuoteForm, QuoteProduct } from './quoteText'
import { QUOTE_ENDPOINT } from '../config/quote'

export interface SubmitQuoteInput {
  form: QuoteForm
  product: QuoteProduct
  ref: string
  /** base64 STANDAR dari byte PDF (tanpa prefix data:). */
  pdfBase64: string
  fileName: string
}

export async function submitQuote(input: SubmitQuoteInput): Promise<void> {
  const res = await fetch(QUOTE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    let msg = `Gagal mengirim request (${res.status}).`
    try {
      const data = await res.json()
      if (data?.error) msg = data.error
    } catch {
      /* abaikan parse error */
    }
    throw new Error(msg)
  }
}
