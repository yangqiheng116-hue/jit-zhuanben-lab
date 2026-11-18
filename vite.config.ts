import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 使用相对基准路径，便于部署到 GitHub Pages 子路径或 Cloudflare Pages。
export default defineConfig({
  plugins: [react()],
  base: './',
})
