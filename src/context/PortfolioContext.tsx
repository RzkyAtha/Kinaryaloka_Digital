/** Free-form label. Any string works; it's shown as the project type tag. */
export type PortfolioCategory = string

export type PortfolioStatus = 'Deployed' | 'Under Development'

export interface PortfolioProject {
  id: string
  name: string
  url: string
  thumbnail?: string
  description: string
  badge?: string
  category: PortfolioCategory
  status: PortfolioStatus
  /** Local showcase image shown in the browser mockup (falls back to live mshot) */
  showcase?: string
  /** Client logo shown as avatar on the selection card */
  logo?: string
  /** Mini stats row on the selection card (3 items) */
  stats?: { value: string; label: string }[]
  images?: string[]
  /** Accent color - border, glow, highlight */
  color: string
  /** Bullet points shown in the detail panel */
  details: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-flk',
    name: 'Fullink Travel',
    url: 'https://fullinktravel.com',
    description:
      'Website company profile dari salah satu travel agent di singapore, dilengkapi dengan tools custom pengelola dokumen Invoice dan Purchase Order.',
    badge: 'International Travel Agent',
    category: 'Website',
    status: 'Deployed',
    showcase: '/Assets/fullink_showcase.webp',
    logo: '/Assets/fullink_logo.webp',
    color: '#0E7FA8',
    stats: [
      { value: '2', label: 'custom tools' },
      { value: 'SG', label: 'based' },
      { value: '100%', label: 'responsive' },
    ],
    details: [
      'Company profile multi-halaman',
      'Desain modern & clean',
      'Tools pengelola dokumen',
      'Mobile responsive + fast loading',
    ],
  },
  {
    id: 'proj-slz',
    name: 'Slazete',
    url: 'https://slazete.com/',
    description:
      'Website art commission yang berfokus kepada fitur pemesanan, daftar layanan komisi, dan alur pemesanan yang jelas untuk para calon klien.',
    badge: 'Art Commission',
    category: 'Website',
    status: 'Under Development',
    showcase: '/Assets/slazete_showcase.webp',
    logo: '/Assets/slazete_logo.webp',
    color: '#B04EDF',
    stats: [
      { value: '3', label: 'tier komisi' },
      { value: 'EN·ID', label: 'bilingual' },
      { value: '100%', label: 'responsive' },
    ],
    details: [
      'Desain sesuai dengan gaya klien',
      'Pricelist & terms komisi yang jelas',
      'Alur pemesanan step-by-step',
      'Mobile responsive + fast loading',
    ],
  },
]
