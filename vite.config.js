import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
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
