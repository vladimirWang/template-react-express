import react from '@vitejs/plugin-react'
import path from 'path'

export default {
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        // rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true
      },
    }
  }
}
