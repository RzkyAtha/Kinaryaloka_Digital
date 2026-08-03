import { jsPDF } from 'jspdf'
import type { QuoteForm, QuoteProduct } from './quoteText'

const LOGO_URL = '/Assets/logo_kinarya.webp'

async function loadLogoPng(): Promise<{ dataUrl: string; ratio: number } | null> {
  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = LOGO_URL
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(img, 0, 0)
    return {
      dataUrl: canvas.toDataURL('image/png'),
      ratio: img.naturalWidth / img.naturalHeight,
    }
  } catch {
    return null
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export interface QuotePdfResult {
  blob: Blob
  /** base64 STANDAR (tanpa prefix data:) untuk lampiran email. */
  base64: string
}

export async function generateQuotePdf(
  form: QuoteForm,
  product: QuoteProduct,
  ref: string,
): Promise<QuotePdfResult> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 48
  const [r, g, b] = hexToRgb(product.color)

  // ── Header berwarna aksen paket ──
  const headerH = 96
  doc.setFillColor(r, g, b)
  doc.rect(0, 0, pageW, headerH, 'F')

  const logo = await loadLogoPng()
  const logoH = 56
  if (logo) {
    const logoW = logoH * logo.ratio
    doc.addImage(logo.dataUrl, 'PNG', margin, (headerH - logoH) / 2, logoW, logoH)
  }

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Project Brief & Quote Request', pageW - margin, 40, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Ref: ${ref}`, pageW - margin, 60, { align: 'right' })
  doc.text(
    new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    pageW - margin,
    76,
    { align: 'right' },
  )

  // ── Body ──
  let y = headerH + 34
  const lineH = 16

  const sectionTitle = (title: string) => {
    if (y > 760) {
      doc.addPage()
      y = margin
    }
    doc.setFillColor(r, g, b)
    doc.rect(margin, y - 10, 4, 14, 'F')
    doc.setTextColor(20, 20, 20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(title, margin + 12, y + 2)
    y += 22
  }

  const row = (label: string, value: string) => {
    if (y > 780) {
      doc.addPage()
      y = margin
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(90, 90, 90)
    doc.text(label, margin + 12, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(30, 30, 30)
    const wrapped = doc.splitTextToSize(value || '-', pageW - margin * 2 - 130)
    doc.text(wrapped, margin + 140, y)
    y += lineH * Math.max(1, wrapped.length) + 4
  }

  sectionTitle('Data Customer')
  row('Nama', form.fullName)
  row('Email', form.email)
  row('WhatsApp', form.whatsapp)
  row('Kontak Preferensi', form.contactPreference)

  sectionTitle('Detail Bisnis')
  row('Nama Bisnis', form.businessName)
  row('Industri', form.industry)
  row('Kota', form.city)
  row('Web/Sosmed', form.existingWebOrSocial || '-')

  sectionTitle('Paket Dipilih')
  row('Produk', product.title)
  row('Harga Estimasi', `IDR ${product.price}`)
  row('Fitur Terpilih', form.selectedFeatures.join('\n') || '-')
  if (form.customFeatures) row('Fitur Tambahan', form.customFeatures)

  sectionTitle('Requirement')
  row('Kebutuhan', form.needsDescription)
  row('Target Deadline', form.deadline || '-')
  row('Estimasi Budget', form.budgetEstimate || '-')

  sectionTitle('Referensi & Catatan')
  row('Referensi', form.referenceLinks || '-')
  row('Catatan', form.notes || '-')

  // ── Footer ──
  const footerY = 812
  doc.setDrawColor(220, 220, 220)
  doc.line(margin, footerY, pageW - margin, footerY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(30, 30, 30)
  doc.text('KINARYALOKA Digital Studio', margin, footerY + 16)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text(
    'Harga bersifat estimasi; quote final akan dikirim melalui email.',
    margin,
    footerY + 30,
  )

  const blob = doc.output('blob')
  const base64 = doc.output('datauristring').split(',')[1]
  return { blob, base64 }
}
