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
  /** Logo/wordmark image shown on the selection card */
  select?: string
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
    select: '/Assets/flk_select.webp',
    color: '#0E7FA8',
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
    url: 'https://slazete.vercel.app/',
    description:
      'Website art commission yang berfokus kepada fitur pemesanan, daftar layanan komisi, dan alur pemesanan yang jelas untuk para calon klien.',
    badge: 'Art Commission',
    category: 'Website',
    status: 'Under Development',
    showcase: '/Assets/slazete_showcase.webp',
    select: '/Assets/slz_select.webp',
    color: '#B04EDF',
    details: [
      'Desain sesuai dengan gaya klien',
      'Pricelist & terms komisi yang jelas',
      'Alur pemesanan step-by-step',
      'Mobile responsive + fast loading',
    ],
  },
]
