export type Character = {
  title: string
  gif: string
  img: string
  number: number
}

interface CharacterData {
  name: string
  paths: string[]
}

const buildCharacter = (data: CharacterData, index: number): Character => {
  const gifPath = data.paths.find(path => path.includes('_gif')) || ''
  const imgPath = data.paths.find(path => !path.includes('_gif')) || ''

  return {
    title: data.name,
    gif: gifPath,
    img: imgPath,
    number: index
  }
}

export const getCharacters = async (): Promise<Character[]> => {
  const heroImages = import.meta.glob('/public/characters/*/*')
  const images = await Promise.all(Object.values(heroImages).map(importImage => importImage()))
  const imagePaths: string[] = images.map((image: any) => image.default)

  const characters: Record<string, CharacterData> = imagePaths.reduce((acc: Record<string, CharacterData>, path) => {
    const name = path.split('/')[3]
    const character = acc[name] || { name, paths: [] }
    character.paths.push(path)

    acc[name] = character
    return acc
  }, {})

  return Object.values(characters)
    .map((data, index) => buildCharacter(data, index))
    .sort((a, b) => (a.title > b.title ? 1 : -1))
}
