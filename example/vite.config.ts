import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Served from https://rfoel.github.io/use-prefers-color-scheme/
  base: './',
  plugins: [react()],
})
