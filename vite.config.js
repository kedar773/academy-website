import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/academy-website/' : '/'),
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three-vendor',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 10,
            },
            {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 5,
            },
          ],
        },
      },
    },
  },
})
