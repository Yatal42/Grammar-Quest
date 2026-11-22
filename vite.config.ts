import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/grammer/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist/grammer',
    emptyOutDir: true,
  },
})
