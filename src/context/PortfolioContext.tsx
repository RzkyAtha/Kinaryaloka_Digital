/** Free-form label. Any string works; the filter tabs are derived from the values used below. */
export type PortfolioCategory = string

export interface PortfolioProject {
  id: string
  name: string
  url: string
  thumbnail: string
  description: string
  badge?: string
  category: PortfolioCategory
  images?: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-flk',
    name: 'Fullink Travel',
    url: 'https://fullink-travel-sg-mfy3.vercel.app/',
    thumbnail: '/Assets/flk_thumbnail.webp',
    description:
      'Website company profile dari salah satu travel agent di singapore, dilengkapi dengan pengembangan fitur reservasi online dan tools pengelola dokumen.',
    badge: 'Overseas Client',
    category: 'Under Development',
  },
]
