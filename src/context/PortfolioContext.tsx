export type PortfolioCategory = 'Website' | 'Design'
export type WebsiteSubcategory = 'E-Commerce' | 'Reservasi' | 'Company Profile'
export type DesignSubcategory = 'UI/UX' | 'Branding'
export type PortfolioSubcategory = WebsiteSubcategory | DesignSubcategory

export interface PortfolioProject {
  id: string
  name: string
  url: string
  thumbnail: string
  description: string
  badge?: string
  category: PortfolioCategory
  subcategory: PortfolioSubcategory
  images?: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-redbox',
    name: 'Redbox Barbershop',
    url: 'https://www.redboxbarbershop.com/index.html',
    thumbnail: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.redboxbarbershop.com%2Findex.html?w=800&h=500',
    description:
      'Website company profile untuk Redbox Barbershop — barbershop modern yang menyediakan layanan potong rambut, styling, dan grooming profesional. Didesain dengan tampilan yang clean dan maskulin.',
    badge: 'Client Pertama Kami',
    category: 'Website',
    subcategory: 'Reservasi',
  },
]
