import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: import.meta.env.VITE_BACKEND_URL,
        secure: false,
      }
    }
  },
  plugins: [react()],
})
