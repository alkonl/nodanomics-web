import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { comlink } from "vite-plugin-comlink";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), comlink()],
  // build: {
  //   minify: false,
  // },
  worker: {
    plugins: [comlink()],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})

