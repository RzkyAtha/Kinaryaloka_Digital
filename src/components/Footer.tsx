import { motion } from 'framer-motion'
import { Moon, Instagram, MessageCircle, Music2 } from 'lucide-react'

const footerLinks = {
  produk: [
    { label: 'E-Commerce', href: '#produk' },
    { label: 'Web Design', href: '#produk' },
    { label: 'Branding', href: '#produk' },
  ],
  bantuan: [
    { label: 'FAQ', href: '#' },
    { label: 'Kebijakan Pemesanan', href: '#' },
    { label: 'Kebijakan Revisi & Maintenance', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
  ],
}

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-[#2a2a2a] text-white py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Column */}
          <div>
            <img 
              src="/Assets/logo_kinarya.png" 
              alt="KINARYALOKA"
              className="h-10 md:h-12 w-auto object-contain mb-4"
              loading="eager"
            />
            
            <div className="flex items-start gap-3 mb-6">
              <Moon className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Due to our beliefs policy, we would like to announce that 
                we will not be taking part on any business which is against 
                the sharia law, thank you for your understanding :)
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: MessageCircle, label: 'WhatsApp' },
                { Icon: Music2, label: 'TikTok' },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-[#3a3a3a] flex items-center justify-center hover:bg-[#F5C542] transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Produk</h4>
            <ul className="space-y-2">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Bantuan</h4>
            <ul className="space-y-2">
              {footerLinks.bantuan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter & Copyright */}
        <div
          className="border-t border-[#3a3a3a] pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © KINARYALOKA. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-500 text-xs">Powered by</span>
              <img 
                src="/Assets/logo_kinarya.png" 
                alt="KINARYALOKA"
                className="h-4 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
