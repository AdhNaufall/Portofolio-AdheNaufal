import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Serve parent img directory at /img/ in dev
const serveParentImg = () => ({
  name: 'serve-parent-img',
  configureServer(server) {
    server.middlewares.use('/img', (req, res, next) => {
      const imgPath = path.resolve(__dirname, '../img', decodeURIComponent(req.url.slice(1) || ''))
      if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
        const ext = path.extname(imgPath).toLowerCase()
        const types = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.gif':'image/gif', '.heic':'image/heic', '.HEIC':'image/heic' }
        res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
        fs.createReadStream(imgPath).pipe(res)
      } else { next() }
    })
  }
})

export default defineConfig({
  plugins: [react(), serveParentImg()],
})
