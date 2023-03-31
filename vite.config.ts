import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { packageDirectorySync } from 'pkg-dir'

const packageRoot = packageDirectorySync()

async function getImageUrls() {
  const backgroundDir = join(__dirname, 'public', 'background')
  const backgroundFiles = await fs.readdir(backgroundDir)
  const backgroundUrls = backgroundFiles.map(file => `/public/background/${file}`)

  const fontDir = join(__dirname, 'public', 'fonts')
  const fontFiles = await fs.readdir(fontDir)
  const fontUrls = fontFiles.map(file => `/public/fonts/${file}`)

  const paths = []

  const charactersDir = join(__dirname, 'public', 'characters')
  const charactersFiles = await fs.readdir(charactersDir)
  const charactersUrls = charactersFiles.map(async dir => {
    const characterDir = join(__dirname, 'public', 'characters', dir)
    const characterFiles = await fs.readdir(characterDir)
    characterFiles.map(file => paths.push(`/public/characters/${dir}/${file}`))
  })

  return [...backgroundUrls, ...fontUrls, ...charactersUrls]
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
