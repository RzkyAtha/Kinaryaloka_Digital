function toBinaryFromUtf8(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return binary
}

function btoaSafe(binary: string): string {
  if (typeof btoa === 'function') return btoa(binary)
  // Node fallback (untuk lingkungan test)
  return Buffer.from(binary, 'binary').toString('base64')
}

/** base64 (standar) dari string UTF-8. */
export function base64Utf8(input: string): string {
  return btoaSafe(toBinaryFromUtf8(input))
}

/** base64url dari string UTF-8, tanpa padding. */
export function base64UrlEncode(input: string): string {
  return base64Utf8(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/** Encode header MIME berisi unicode sesuai RFC 2047. */
export function encodeMimeHeader(value: string): string {
  return `=?UTF-8?B?${base64Utf8(value)}?=`
}

export interface MimeOptions {
  to: string
  subject: string
  bodyText: string
  /** base64 STANDAR dari byte PDF (tanpa prefix data:). */
  attachmentBase64: string
  fileName: string
}

export function buildMimeMessage(o: MimeOptions): string {
  const boundary = 'kny_boundary_' + Math.random().toString(36).slice(2)
  return [
    `To: ${o.to}`,
    'MIME-Version: 1.0',
    `Subject: ${encodeMimeHeader(o.subject)}`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    base64Utf8(o.bodyText),
    '',
    `--${boundary}`,
    `Content-Type: application/pdf; name="${o.fileName}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${o.fileName}"`,
    '',
    o.attachmentBase64,
    '',
    `--${boundary}--`,
  ].join('\r\n')
}

export async function sendViaGmail(
  opts: MimeOptions & { accessToken: string },
): Promise<void> {
  const raw = base64UrlEncode(buildMimeMessage(opts))
  const res = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    },
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gmail send failed: ${res.status} ${text}`)
  }
}
