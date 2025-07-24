import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/SYSC-1006-2006/',
  plugins: [
    react(),
  ],
  build: {
    sourcemap: true,
  },
});

