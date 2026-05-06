import { motion } from 'framer-motion'
import { Moon, Instagram, MessageCircle, Music2, Mail } from 'lucide-react'

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">KINARYALOKA</h3>
            
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
              {[Instagram, MessageCircle, Music2].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#3a3a3a] flex items-center justify-center hover:bg-[#831449] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
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
          </motion.div>

          {/* Help Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>

        {/* Newsletter & Copyright */}
        <motion.div
          className="border-t border-[#3a3a3a] pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Newsletter */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Masukan emailmu disini"
                className="bg-[#3a3a3a] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#831449]"
              />
            </div>
            <motion.button
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © KINARYALOKA. All Rights Reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Powered by <span className="text-white font-semibold">V</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
