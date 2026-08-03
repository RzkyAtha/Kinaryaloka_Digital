import type { QuoteForm, QuoteProduct } from './quoteText'
import { buildEmailSubject, buildEmailBody } from './quoteText'

export interface ResendPayload {
  from: string
  to: string[]
  reply_to?: string
  subject: string
  text: string
  attachments: { filename: string; content: string }[]
}

export interface BuildResendPayloadInput {
  form: QuoteForm
  product: QuoteProduct
  ref: string
  /** base64 STANDAR dari byte PDF (tanpa prefix data:). */
  pdfBase64: string
  fileName: string
  from: string
  to: string
}

export function buildResendPayload(opts: BuildResendPayloadInput): ResendPayload {
  return {
    from: opts.from,
    to: [opts.to],
    reply_to: opts.form.email || undefined,
    subject: buildEmailSubject(opts.form, opts.product),
    text: buildEmailBody(opts.form, opts.product, opts.ref),
    attachments: [{ filename: opts.fileName, content: opts.pdfBase64 }],
  }
}
