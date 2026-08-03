import { defineConfig, loadEnv, type Connect, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { handleQuoteRequest } from './src/lib/handleQuote'

// Mount /api/send-quote saat `vite dev` dan `vite preview`, karena Vercel
// Functions (folder api/) tidak dijalankan oleh server Vite lokal.
function quoteApiDevPlugin(env: Record<string, string>): PluginOption {
  const middleware: Connect.NextHandleFunction = (req, res) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }
    let raw = ''
    req.on('data', (chunk) => (raw += chunk))
    req.on('end', async () => {
      let body: unknown = {}
      try {
        body = JSON.parse(raw || '{}')
      } catch {
        /* biarkan body kosong → 400 */
      }
      const result = await handleQuoteRequest(body as never, {
        RESEND_API_KEY: env.RESEND_API_KEY,
        XERO_INBOX_EMAIL: env.XERO_INBOX_EMAIL,
        QUOTE_FROM_EMAIL: env.QUOTE_FROM_EMAIL,
      })
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    })
  }
  return {
    name: 'quote-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/send-quote', middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/send-quote', middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), quoteApiDevPlugin(env)],
    base: '/',
    server: {
      watch: {
        usePolling: true,
        interval: 300,
      },
      hmr: true,
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion': ['framer-motion'],
            'auth-vendor': ['@react-oauth/google', 'jwt-decode', 'canvas-confetti'],
          },
        },
      },
    },
  }
})
