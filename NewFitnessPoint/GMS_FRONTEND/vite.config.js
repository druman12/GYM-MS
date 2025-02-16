import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/static/", // Ensure assets are served from Django's static URL
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
})
