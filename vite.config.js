import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const markdownFiles = import.meta.glob('../content/*.md', { as: 'raw' });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

