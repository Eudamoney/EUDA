import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // One app serves every country: /tax-calculator/spain and /tax-calculator/uk (see src/lib/countries.ts).
  base: '/tax-calculator/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
