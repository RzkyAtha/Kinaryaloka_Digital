export interface QuoteProduct {
  title: string
  price: string
  color: string
  details: string[]
}

export interface QuoteForm {
  fullName: string
  email: string
  whatsapp: string
  businessName: string
  industry: string
  city: string
  existingWebOrSocial?: string
  needsDescription: string
  selectedFeatures: string[]
  customFeatures?: string
  deadline?: string
  budgetEstimate?: string
  referenceLinks?: string
  notes?: string
  contactPreference: 'whatsapp' | 'email' | 'phone'
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

export function makeQuoteRef(date: Date = new Date(), suffix?: string): string {
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const rand = (suffix ?? Math.random().toString(36).slice(2, 6)).toUpperCase()
  return `KNY-QR-${y}${m}${d}-${rand}`
}

export function buildQuoteFileName(ref: string): string {
  return `KNY-Quote-Request-${ref}.pdf`
}

export function buildEmailSubject(form: QuoteForm, product: QuoteProduct): string {
  return `[Quote Request] ${form.businessName} — ${product.title}`
}

export function buildEmailBody(
  form: QuoteForm,
  product: QuoteProduct,
  ref: string,
): string {
  return [
    `Halo Tim KINARYALOKA,`,
    ``,
    `Ada permintaan quote baru (${ref}).`,
    ``,
    `— Data Customer —`,
    `Nama       : ${form.fullName}`,
    `Email      : ${form.email}`,
    `WhatsApp   : ${form.whatsapp}`,
    `Kontak pref: ${form.contactPreference}`,
    ``,
    `— Detail Bisnis —`,
    `Bisnis     : ${form.businessName}`,
    `Industri   : ${form.industry}`,
    `Kota       : ${form.city}`,
    `Web/Sosmed : ${form.existingWebOrSocial || '-'}`,
    ``,
    `— Paket —`,
    `Produk     : ${product.title}`,
    `Harga est. : IDR ${product.price}`,
    ``,
    `— Requirement —`,
    `Kebutuhan  : ${form.needsDescription}`,
    `Fitur      : ${form.selectedFeatures.join(', ') || '-'}`,
    `Fitur lain : ${form.customFeatures || '-'}`,
    `Deadline   : ${form.deadline || '-'}`,
    `Budget     : ${form.budgetEstimate || '-'}`,
    ``,
    `— Referensi & Catatan —`,
    `Referensi  : ${form.referenceLinks || '-'}`,
    `Catatan    : ${form.notes || '-'}`,
    ``,
    `PDF brief lengkap terlampir.`,
  ].join('\n')
}
