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
    thumbnail: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.redboxbarbershop.com?w=800&h=500',
    description:
      'Website company profile untuk Redbox Barbershop — barbershop modern yang menyediakan layanan potong rambut, styling, dan grooming profesional. Didesain dengan tampilan yang clean dan maskulin.',
    badge: 'Client Pertama Kami',
    category: 'Website',
    subcategory: 'Reservasi',
  },
  {
    id: 'proj-ginabo',
    name: 'Ginabo Skincare',
    url: 'https://www.ginabo.id/',
    thumbnail: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.ginabo.id?w=800&h=500',
    description:
      'Website e-commerce untuk Ginabo — brand skincare lokal dengan tagline "Sentuhan Mewah Setiap Hari". Menyediakan produk daily skincare solution meliputi brightening, hydration, soothing, dan barrier support. Dilengkapi fitur keranjang belanja dan autentikasi pengguna.',
    badge: 'Client Pertama Kami',
    category: 'Website',
    subcategory: 'E-Commerce',
  },
]
