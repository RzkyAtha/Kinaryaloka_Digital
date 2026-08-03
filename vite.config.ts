import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
})
