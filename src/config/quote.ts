// Endpoint serverless (Vercel) yang menerima submission form + PDF, lalu
// meneruskannya ke Xero inbox via Resend. Alamat Xero & API key disimpan di
// environment variable server (tidak terekspos ke client).
export const QUOTE_ENDPOINT = '/api/send-quote'

// Nomor WhatsApp bisnis untuk fallback pengiriman manual.
export const BUSINESS_WHATSAPP = '6281357662424'
