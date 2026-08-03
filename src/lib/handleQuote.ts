import { buildResendPayload } from './quotePayload'
import type { QuoteForm, QuoteProduct } from './quoteText'

export interface QuoteRequestBody {
  form?: QuoteForm
  product?: QuoteProduct
  ref?: string
  pdfBase64?: string
  fileName?: string
}

export interface QuoteEnv {
  RESEND_API_KEY?: string
  XERO_INBOX_EMAIL?: string
  QUOTE_FROM_EMAIL?: string
}

export interface QuoteResult {
  status: number
  body: { ok?: true; error?: string }
}

/**
 * Logika inti pengiriman quote — framework-agnostic sehingga bisa dipakai oleh
 * Vercel Function (api/send-quote.ts) maupun dev middleware Vite.
 */
export async function handleQuoteRequest(
  body: QuoteRequestBody,
  env: QuoteEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<QuoteResult> {
  const { RESEND_API_KEY, XERO_INBOX_EMAIL, QUOTE_FROM_EMAIL } = env
  if (!RESEND_API_KEY || !XERO_INBOX_EMAIL || !QUOTE_FROM_EMAIL) {
    return {
      status: 500,
      body: { error: 'Server belum dikonfigurasi (env belum lengkap).' },
    }
  }

  const { form, product, ref, pdfBase64, fileName } = body || {}
  if (
    !form?.email ||
    !form?.fullName ||
    !form?.businessName ||
    !product?.title ||
    !pdfBase64 ||
    !fileName
  ) {
    return { status: 400, body: { error: 'Data submission tidak lengkap.' } }
  }

  const payload = buildResendPayload({
    form,
    product,
    ref: ref ?? '',
    pdfBase64,
    fileName,
    from: QUOTE_FROM_EMAIL,
    to: XERO_INBOX_EMAIL,
  })

  try {
    const r = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!r.ok) {
      const text = await r.text()
      return {
        status: 502,
        body: { error: `Gagal mengirim email (Resend ${r.status}). ${text}` },
      }
    }
    return { status: 200, body: { ok: true } }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: err instanceof Error ? err.message : 'Kesalahan tak terduga di server.',
      },
    }
  }
}
