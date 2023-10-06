import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   minify: false,
  // },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})

