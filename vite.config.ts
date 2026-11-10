import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static HTML per page, sitemap.xml and robots.txt are generated after the build
// by scripts/prerender.mjs (see the "build" script in package.json).
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
