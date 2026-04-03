import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true, // ที่เราเพิ่งแก้ไปจากคำถามก่อนหน้า
    proxy: {
      // เมื่อไหร่ก็ตามที่ Frontend ยิงไปที่ /api ให้ส่งต่อไปที่ http://localhost:3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})