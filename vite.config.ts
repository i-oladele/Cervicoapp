import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Local HTTPS (needed to test push notifications on a phone) uses mkcert
// certificates that each developer generates and never commits:
//   mkcert localhost 127.0.0.1 ::1
// Without them the dev server runs on plain HTTP and builds are unaffected.
const certKey = './localhost+2-key.pem'
const certFile = './localhost+2.pem'
const https =
  fs.existsSync(certKey) && fs.existsSync(certFile)
    ? { key: fs.readFileSync(certKey), cert: fs.readFileSync(certFile) }
    : undefined

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Plugin to resolve figma:asset/ imports
    {
      name: 'figma-assets',
      resolveId(id) {
        if (id.startsWith('figma:asset/')) {
          const assetId = id.replace('figma:asset/', '')
          return path.resolve(__dirname, './src/assets', assetId)
        }
        return null
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    https,
    port: 5175,
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
