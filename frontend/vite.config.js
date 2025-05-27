import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // configuration to proxy to burp VVVV
    port: 8081,
    host: '127.0.0.1'
  }
})
