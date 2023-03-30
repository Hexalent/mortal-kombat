import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { packageDirectorySync } from 'pkg-dir'

const packageRoot = packageDirectorySync()

async function getImageUrls() {
  const backgroundDir = join(__dirname, 'public', 'background')
  const charactersDir = join(__dirname, 'public', 'characters')

  const backgroundFiles = await fs.readdir(backgroundDir)
  const characterFiles = await fs.readdir(charactersDir)

  const backgroundUrls = backgroundFiles.map(file => `/public/background/${file}`)
  const characterUrls = characterFiles.map(file => `/public/characters/${file}`)

  return [...backgroundUrls, ...characterUrls]
}

export default defineConfig(async () => {
  const imageUrls = await getImageUrls()

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(packageRoot, './src')
      }
    },
    define: {
      'import.meta.imageUrls': JSON.stringify(imageUrls)
    }
  }
})
