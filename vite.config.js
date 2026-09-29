import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// For GitHub Pages:
// - If you deploy to <username>.github.io (user site), keep base: "/"
// - If you deploy to <username>.github.io/<repo>/ (project site), set base: "/<repo>/"
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true,
    port: 4004,
    strictPort: true,
    open: false,
    cors: true,
  },
  preview: {
    host: true,
    port: 4004,
    strictPort: true,
    open: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
})
